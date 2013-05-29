package de.fme.jsconsole.batch;

import java.util.Collection;
import java.util.HashMap;

import org.alfresco.repo.batch.BatchProcessor.BatchProcessWorker;
import org.alfresco.repo.jscript.ScriptNode;
import org.alfresco.repo.security.authentication.AuthenticationUtil;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.ScriptService;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

/**
 * a batch process worker which uses the scriptservice to execute the provided script for a set of nodes.
 * 
 * @author jgoldhammer
 * 
 */
public final class ScriptedBatchProcessWorker implements BatchProcessWorker<Collection<NodeRef>> {
	private final boolean runAsSystem;
	private final Scriptable batchScope;
	private final String processorFunction;
	private Context context;
	private static final String PROCESSING_SCRIPT = "\n for (var index = 0; index < nodes.length; index++) {process(nodes[index]);}";
	private ScriptService scriptService;
	private ServiceRegistry serviceRegistry;

	ScriptedBatchProcessWorker(boolean runAsSystem, Scriptable batchScope, String processorFunction, Context context,
			ServiceRegistry serviceRegistry, ScriptService scriptService) {
		this.runAsSystem = runAsSystem;
		this.batchScope = batchScope;
		this.processorFunction = processorFunction;
		this.context = context;
		this.serviceRegistry = serviceRegistry;
		this.scriptService = scriptService;
	}

	@Override
	public void beforeProcess() throws Throwable {
		if (runAsSystem) {
			AuthenticationUtil.setRunAsUserSystem();
		}
	}

	@Override
	public void afterProcess() throws Throwable {

	}

	@Override
	public String getIdentifier(Collection<NodeRef> entries) {
		return entries.toString();
	}

	@Override
	public void process(Collection<NodeRef> entries) throws Throwable {
		HashMap<String, Object> model = new HashMap<String, Object>();
		Object[] scriptNodes = new Object[entries.size()];
		int counter = 0;
		for (NodeRef nodeRef : entries) {
			scriptNodes[counter] = new ScriptNode(nodeRef, serviceRegistry);
			counter++;
		}

		model.put("nodes", context.newArray(batchScope, scriptNodes));
		String javascriptCode = processorFunction + PROCESSING_SCRIPT;

		scriptService.executeScriptString("javascript", javascriptCode, model);

	}
}