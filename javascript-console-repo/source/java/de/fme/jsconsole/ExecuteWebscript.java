package de.fme.jsconsole;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.repo.jscript.RhinoScriptProcessor;
import org.alfresco.repo.jscript.ScriptNode;
import org.alfresco.repo.jscript.ScriptUtils;
import org.alfresco.repo.security.authentication.AuthenticationUtil;
import org.alfresco.repo.security.permissions.AccessDeniedException;
import org.alfresco.repo.transaction.RetryingTransactionHelper.RetryingTransactionCallback;
import org.alfresco.scripts.ScriptResourceHelper;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.transaction.TransactionService;
import org.alfresco.util.MD5;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.Resource;
import org.springframework.extensions.webscripts.AbstractWebScript;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.Container;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Description;
import org.springframework.extensions.webscripts.ScriptContent;
import org.springframework.extensions.webscripts.ScriptProcessor;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.TemplateProcessor;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptResponse;

/**
 * Implements a webscript that is used to execute arbitrary scripts and freemarker templates
 * the same way a {@link DeclarativeWebScript} would do.
 * 
 * @author Florian Maul (fme AG)
 * @version 1.0
 *
 */
public class ExecuteWebscript extends AbstractWebScript {

	private static final Log log = LogFactory.getLog(ExecuteWebscript.class);

	private ScriptUtils scriptUtils;

	private TransactionService transactionService;
	
	private Resource preRollScriptResource;

	private String preRollScript = "";

	private Resource postRollScriptResource;

	private String postRollScript = "";

	private RhinoScriptProcessor rhinoScriptProcessor;
	
	@Override
	public void init(Container container, Description description) {
		super.init(container, description);
		try {
			preRollScript = readScriptFromResource(preRollScriptResource);
			postRollScript = readScriptFromResource(postRollScriptResource);
		} catch (IOException e) {
			log.error("Could not read base import script.");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.extensions.webscripts.WebScript#execute(org.
	 * springframework.extensions.webscripts.WebScriptRequest,
	 * org.springframework.extensions.webscripts.WebScriptResponse)
	 */
	@Override
	public void execute(WebScriptRequest request, WebScriptResponse response) throws IOException {

		JavascriptConsoleRequest jsreq = JavascriptConsoleRequest.readJson(request);
		
		String script = ScriptResourceHelper.resolveScriptImports(jsreq.script, rhinoScriptProcessor, log);
		
		ScriptContent scriptContent = new StringScriptContent(preRollScript + script + "\n" + postRollScript);
		JavascriptConsoleResult result = runScriptWithTransactionAndAuthentication(request, response, jsreq, scriptContent);
		
		if (!result.isStatusResponseSent()) {
			result.writeJson(response);
		}
	}

	private String readScriptFromResource(Resource resource) throws IOException {
		@SuppressWarnings("unchecked")
		List<String> lines = (List<String>) IOUtils.readLines(resource.getInputStream());
		
		StringBuffer script = new StringBuffer();
		for (String line : lines) {
			script.append(line.replace("\n", ""));
		}
		return script.toString();
	}
	
	private JavascriptConsoleResult runScriptWithTransactionAndAuthentication(final WebScriptRequest request,
			final WebScriptResponse response, final JavascriptConsoleRequest jsreq, final ScriptContent scriptContent) {

		log.debug("running script as user " + jsreq.runas);
		return AuthenticationUtil.runAs(new AuthenticationUtil.RunAsWork<JavascriptConsoleResult>() {
			public JavascriptConsoleResult doWork() {

				if (jsreq.useTransaction) {
					log.debug("Using transction to execute script: " + (jsreq.transactionReadOnly ? "readonly" : "readwrite"));
					return transactionService.getRetryingTransactionHelper().doInTransaction(
							new RetryingTransactionCallback<JavascriptConsoleResult>() {
								public JavascriptConsoleResult execute() throws Exception {
									return executeScriptContent(request, response, scriptContent, jsreq.template, jsreq.spaceNodeRef,
											jsreq.urlargs, jsreq.documentNodeRef);
								}
							}, jsreq.transactionReadOnly);
				} else {
					try {
						log.debug("Executing script script without transaction.");
						return executeScriptContent(request, response, scriptContent, jsreq.template, jsreq.spaceNodeRef, 
								jsreq.urlargs, jsreq.documentNodeRef);
					} catch (IOException e) {
						throw new RuntimeException(e);
					}
				}
			}
		}, jsreq.runas);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.alfresco.web.scripts.WebScript#execute(org.alfresco.web.scripts.
	 * WebScriptRequest, org.alfresco.web.scripts.WebScriptResponse)
	 */
	private JavascriptConsoleResult executeScriptContent(WebScriptRequest req, WebScriptResponse res, ScriptContent scriptContent,
			String template, String spaceNodeRef, Map<String, String> urlargs, String documentNodeRef) throws IOException {
		JavascriptConsoleResult output = new JavascriptConsoleResult();

		// retrieve requested format
		String format = req.getFormat();

		try {
			// construct model for script / template
			Status status = new Status();
			Cache cache = new Cache(getDescription().getRequiredCache());
			Map<String, Object> model = new HashMap<String, Object>(8, 1.0f);
			model.put("status", status);
			model.put("cache", cache);

			Map<String, Object> scriptModel = createScriptParameters(req, res, null, model);

			augmentScriptModelArgs(scriptModel, urlargs);

			// add return model allowing script to add items to template model
			Map<String, Object> returnModel = new HashMap<String, Object>(8, 1.0f);
			scriptModel.put("model", returnModel);

			JavascriptConsoleScriptObject javascriptConsole = new JavascriptConsoleScriptObject();
			scriptModel.put("jsconsole", javascriptConsole);

			if (StringUtils.isNotBlank(spaceNodeRef)) {
				javascriptConsole.setSpace(scriptUtils.getNodeFromString(spaceNodeRef));
			} else {
				Object ch = scriptModel.get("companyhome");
				if (ch instanceof NodeRef) {
					javascriptConsole.setSpace(scriptUtils.getNodeFromString(ch.toString()));
				} else {
					javascriptConsole.setSpace((ScriptNode) ch);
				}
			}
			scriptModel.put("space", javascriptConsole.getSpace());

			if (StringUtils.isNotBlank(documentNodeRef)) {
				scriptModel.put("document", scriptUtils.getNodeFromString(documentNodeRef));
			}			
			
			ScriptProcessor scriptProcessor = getContainer().getScriptProcessorRegistry().getScriptProcessorByExtension("js");
			scriptProcessor.executeScript(scriptContent, scriptModel);

			output.setPrintOutput(javascriptConsole.getPrintOutput());

			ScriptNode newSpace = javascriptConsole.getSpace();
			output.setSpaceNodeRef(newSpace.getNodeRef().toString());
			try {
				output.setSpacePath(newSpace.getDisplayPath() + "/" + newSpace.getName());
			} catch (AccessDeniedException ade) {
				output.setSpacePath("/");
			}

			mergeScriptModelIntoTemplateModel(scriptContent, returnModel, model);

			// create model for template rendering
			Map<String, Object> templateModel = createTemplateParameters(req, res, model);

			// is a redirect to a status specific template required?
			if (status.getRedirect()) {
				sendStatus(req, res, status, cache, format, templateModel);
				output.setStatusResponseSent(true);
			} else {
				// apply location
				String location = status.getLocation();
				if (location != null && location.length() > 0) {
					if (log.isDebugEnabled())
						log.debug("Setting location to " + location);
					res.setHeader(WebScriptResponse.HEADER_LOCATION, location);
				}

				if (StringUtils.isNotBlank(template)) {
					TemplateProcessor templateProcessor = getContainer().getTemplateProcessorRegistry().getTemplateProcessorByExtension("ftl");
					StringWriter sw = new StringWriter();
					templateProcessor.processString(template, templateModel, sw);
					if (log.isDebugEnabled()) {
						log.debug("Template output:" + sw.toString());
					}
					output.setRenderedTemplate(sw.toString());
				}
			}
		} catch (Throwable e) {
			if (log.isDebugEnabled()) {
				StringWriter stack = new StringWriter();
				e.printStackTrace(new PrintWriter(stack));
				log.debug("Caught exception; decorating with appropriate status template : " + stack.toString());
			}

			throw createStatusException(e, req, res);
		}
		return output;
	}

	private void augmentScriptModelArgs(Map<String, Object> scriptModel, Map<String, String> additionalUrlArgs) {
		@SuppressWarnings("unchecked")
		Map<String, String> args = (Map<String, String>) scriptModel.get("args");
		
		args.putAll(additionalUrlArgs);
	}

	/**
	 * Merge script generated model into template-ready model
	 * 
	 * @param scriptContent
	 *            script content
	 * @param scriptModel
	 *            script model
	 * @param templateModel
	 *            template model
	 */
	final private void mergeScriptModelIntoTemplateModel(ScriptContent scriptContent, Map<String, Object> scriptModel,
			Map<String, Object> templateModel) {
		// determine script processor
		ScriptProcessor scriptProcessor = getContainer().getScriptProcessorRegistry().getScriptProcessor(scriptContent);
		if (scriptProcessor != null) {
			for (Map.Entry<String, Object> entry : scriptModel.entrySet()) {
				// retrieve script model value
				Object value = entry.getValue();
				Object templateValue = scriptProcessor.unwrapValue(value);
				templateModel.put(entry.getKey(), templateValue);
			}
		}
	}

	/**
	 * Render a template (of given format) to the Web Script Response
	 * 
	 * @param format
	 *            template format (null, default format)
	 * @param model
	 *            data model to render
	 * @param writer
	 *            where to output
	 */
	final protected void renderFormatTemplate(String format, Map<String, Object> model, Writer writer) {
		format = (format == null) ? "" : format;

		String templatePath = getDescription().getId() + "." + format;

		if (log.isDebugEnabled())
			log.debug("Rendering template '" + templatePath + "'");

		renderTemplate(templatePath, model, writer);
	}

	public void setScriptUtils(ScriptUtils scriptUtils) {
		this.scriptUtils = scriptUtils;
	}

	public void setTransactionService(TransactionService transactionService) {
		this.transactionService = transactionService;
	}

	public void setPostRollScriptResource(Resource postRollScriptResource) {
		this.postRollScriptResource = postRollScriptResource;
	}

	public void setPreRollScriptResource(Resource preRollScriptResource) {
		this.preRollScriptResource = preRollScriptResource;
	}
	
	public void setRhinoScriptProcessor(RhinoScriptProcessor rhinoScriptProcessor) {
		this.rhinoScriptProcessor = rhinoScriptProcessor;
	}

	private static class StringScriptContent implements ScriptContent {
		private final String content;

		public StringScriptContent(String content) {
			this.content = content;
		}

		@Override
		public InputStream getInputStream() {
			return new ByteArrayInputStream(content.getBytes(Charset.forName("UTF-8")));
		}

		@Override
		public String getPath() {
			return MD5.Digest(content.getBytes()) + ".js";
		}

		@Override
		public String getPathDescription() {
			return "Javascript Console Script";
		}

		@Override
		public Reader getReader() {
			return new StringReader(content);
		}

		@Override
		public boolean isCachable() {
			return false;
		}

		@Override
		public boolean isSecure() {
			return true;
		}
	}
	
}
