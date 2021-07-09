package de.fme.jsconsole;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.util.Streams;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.extensions.surf.util.Content;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptRequestImpl;
import org.springframework.extensions.webscripts.servlet.FormData.FormField;
import org.springframework.extensions.webscripts.servlet.WebScriptServletRequest;

import de.fme.jsconsole.request.MockFormData;
import de.fme.jsconsole.request.MockHttpServletRequest;
import de.fme.jsconsole.request.MockWebScriptRequest;

/**
 * Parses and stores the input data for the Javascript Console {@link ExecuteWebscript} and contains
 * the logic to decode the request body JSON data.
 *
 * @author Florian Maul (fme AG)
 *
 */
public class JavascriptConsoleRequest {

	private static final int DEFAULT_DUMP_LIMIT = 10;

	public final String script;
	public final String template;
	public final String spaceNodeRef;
	public final String runas;
	public final boolean useTransaction;
	public final boolean transactionReadOnly;
	public final String documentNodeRef;
	public final Integer dumpLimit;
	public final WebScriptRequest mockRequest;

	public final String resultChannel;

	private JavascriptConsoleRequest(String script, String template,
            String spaceNodeRef, String transaction, String runas, String documentNodeRef, Integer dumpLimit, String resultChannel, WebScriptRequest mockRequest) {
        super();
        this.script = script;
        this.template = template;
        this.spaceNodeRef = spaceNodeRef;
        this.documentNodeRef = documentNodeRef;
        this.dumpLimit = dumpLimit;
        this.transactionReadOnly = "readonly".equalsIgnoreCase(transaction);
        this.useTransaction = transactionReadOnly || "readwrite".equalsIgnoreCase(transaction);
        this.runas = runas;
        this.resultChannel = resultChannel;
        this.mockRequest = mockRequest;
    }

	/**
     * parses the query string
     * is used because HttpUtils.parseQueryString is deprecated
     * @param queryString
     * @return
     */
    protected static Map<String, String> parseQueryString(String queryString) {
        Map<String, String> map = new HashMap<String, String>();

        String[] parameters = queryString.split("&");
        for(int i = 0; i < parameters.length; i++) {
            String[] keyAndValue = parameters[i].split("=");
            if(keyAndValue.length != 2) {
                // "invalid url parameter " + parameters[i]);
                continue;
            }
            String key = keyAndValue[0];
            String value = keyAndValue[1];
            map.put(key, value);
        }

        return map;
    }
    
    protected static WebScriptRequest parseMockRequest(String requestType, String requestContent, String requestHeaders, String urlargs, WebScriptRequest request) {
    	MockHttpServletRequest mockRequest = new MockHttpServletRequest();
    	mockRequest.setCharacterEncoding("UTF-8");
    	mockRequest.setContentType(requestType);
    	mockRequest.setParameters(parseQueryString(urlargs));
    	
    	JSONTokener jsonTokener = new JSONTokener(requestHeaders);
    	try {	
			JSONArray jsonHeaders = new JSONArray(jsonTokener);
			for(int i = 0 ; i < jsonHeaders.length(); ++i) {
				JSONObject jsonHeader = (JSONObject) jsonHeaders.get(i);
				if(jsonHeader.has("name") && jsonHeader.has("value")) {
					mockRequest.addHeader(jsonHeader.getString("name"), jsonHeader.getString("value"));
				}
			}
    	} catch (JSONException e) {
			throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR,
					"Error reading json request (part: headers).", e);
		}
    	
    	mockRequest.setContent(requestContent.getBytes());
        
    	MockWebScriptRequest mockWebScript = new MockWebScriptRequest(request.getRuntime(), mockRequest, request.getServiceMatch(), null);
    	if(requestType.equals(WebScriptRequestImpl.MULTIPART_FORM_DATA)){

        	MockFormData mockFormData = new MockFormData();
        	FileItemFactory fileItemFactory = new DiskFileItemFactory();
            
        	JSONTokener jsonMpFieldsTokener = new JSONTokener(request.getParameter("mp-fields"));
        	try {   
        	         JSONArray mpFields = new JSONArray(jsonMpFieldsTokener);
        	         for(int i = 0 ; i < mpFields.length(); ++i) {
        	        	 JSONObject mpField = (JSONObject) mpFields.get(i);
        	             String key = mpField.getString("name");
        	             FormField formField = null;
        	             if(mpField.getString("type").equals("param")) {
        	                  mockRequest.addParameter(key, request.getParameter(key));
        	                  
        	                  FileItem fileItem = fileItemFactory.createItem(key, null, true, null);
        	                  Streams.copy(new ByteArrayInputStream(request.getParameter(key).getBytes()), fileItem.getOutputStream(), true);
        	                  formField = mockFormData.new FormField(fileItem);
        	              } else {
        	            	  // file type
        	            	  formField = ((WebScriptServletRequest)request).getFileField(key);
        	            	  
        	              }
        	             mockFormData.addFormField(formField);
        	          }
        	} catch (IOException | JSONException e) {
        	         throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR,
        	                                     "Error reading json request (part: form data fields).", e);
        	}
        	
        	mockWebScript.setMockFormData(mockFormData);
    	}
    	
    	return mockWebScript;
    }

	public static JavascriptConsoleRequest readFormData(WebScriptRequest request) {
		String script = request.getParameter("script");
		String template = request.getParameter("template");
		String spaceNodeRef = request.getParameter("spaceNodeRef");
		String transaction = request.getParameter("transaction");
		String urlargs = request.getParameter("urlargs");
		String documentNodeRef = request.getParameter("documentNodeRef");
		int dumpLimit = DEFAULT_DUMP_LIMIT;
		if(request.getParameter("dumpLimit") != null){
			dumpLimit = Integer.parseInt(request.getParameter("dumpLimit"));
		}
		//String logOutputChannel = request.getParameter("printOutputChannel");
		String resultChannel = request.getParameter("resultChannel");
		String requestType = request.getParameter("requestType");
		String requestContent = request.getParameter("requestContent");
		String requestHeaders = request.getParameter("requestHeaders");
		WebScriptRequest mockRequest = parseMockRequest(requestType, requestContent, requestHeaders, urlargs, request);
		
		String runas = request.getParameter("runas");
		if (runas == null) {
			runas = "";
		}
		
		return new JavascriptConsoleRequest(script, template, spaceNodeRef, transaction, runas, documentNodeRef, dumpLimit, resultChannel, mockRequest);
		
	}
	
	public static JavascriptConsoleRequest readJson(WebScriptRequest request) {
		Content content = request.getContent();

		InputStreamReader br = new InputStreamReader(content.getInputStream(),
				Charset.forName("UTF-8"));
		JSONTokener jsonTokener = new JSONTokener(br);
		try {
			JSONObject jsonInput = new JSONObject(jsonTokener);

			String script = jsonInput.getString("script");
			String template = jsonInput.getString("template");
			String spaceNodeRef = jsonInput.getString("spaceNodeRef");
			String transaction = jsonInput.getString("transaction");
			String urlargs = jsonInput.getString("urlargs");
			String documentNodeRef = jsonInput.getString("documentNodeRef");
			int dumpLimit = DEFAULT_DUMP_LIMIT;
			if(jsonInput.has("dumpLimit")){
				dumpLimit = jsonInput.getInt("dumpLimit");
			}
			String logOutputChannel = jsonInput.has("printOutputChannel") ? jsonInput.getString("printOutputChannel") : null;
			String resultChannel = jsonInput.has("resultChannel") ? jsonInput.getString("resultChannel") : null;
			String requestType = jsonInput.has("requestType") ? jsonInput.getString("requestType") : null;
			String requestContent = jsonInput.has("requestContent") ? jsonInput.getString("requestContent") : null;
			String requestHeaders = jsonInput.has("requestHeaders") ? jsonInput.getString("requestHeaders") : null;
			
			String runas = jsonInput.getString("runas");
			if (runas == null) {
				runas = "";
			}
			
			WebScriptRequest mockRequest = parseMockRequest(requestType, requestContent, requestHeaders, urlargs, request);
			
			return new JavascriptConsoleRequest(script, template, spaceNodeRef, transaction, runas, documentNodeRef, dumpLimit, resultChannel, mockRequest);
		} catch (JSONException e) {
			throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR,
					"Error reading json request body.", e);
		}
	}

	@Override
	public String toString() {
		return "JavascriptConsoleRequest [script=" + script + ", template=" + template + ", spaceNodeRef=" + spaceNodeRef
				+ ", runas=" + runas + ", useTransaction=" + useTransaction + ", transactionReadOnly=" + transactionReadOnly
				+ ", documentNodeRef=" + documentNodeRef + ", dumpLimit=" + dumpLimit + ", mockRequest=" + mockRequest
				+ ", resultChannel=" + resultChannel + "]";
	}
	
	

}
