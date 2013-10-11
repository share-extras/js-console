package de.fme.jsconsole;

import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.extensions.surf.util.Content;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;

/**
 * Parses and stores the input data for the Javascript Console {@link ExecuteWebscript} and contains
 * the logic to decode the request body JSON data.
 * 
 * @author Florian Maul (fme AG)
 *
 */
public class JavascriptConsoleRequest {
	public final String script;
	public final String template;
	public final String spaceNodeRef;
	public final String runas;
	public final boolean useTransaction;
	public final boolean transactionReadOnly;
	public final Map<String, String> urlargs;
	public final String documentNodeRef;

	private JavascriptConsoleRequest(String script, String template,
			String spaceNodeRef, String transaction, String runas, String urlargs, String documentNodeRef) {
		super();
		this.script = script;
		this.template = template;
		this.spaceNodeRef = spaceNodeRef;
		this.documentNodeRef = documentNodeRef;
		this.urlargs = parseQueryString(urlargs);
		this.transactionReadOnly = "readonly".equalsIgnoreCase(transaction);
		this.useTransaction = transactionReadOnly || "readwrite".equalsIgnoreCase(transaction);
		this.runas = runas;
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

			String runas = jsonInput.getString("runas");
			if (runas == null) {
				runas = "";
			}
			
			return new JavascriptConsoleRequest(script, template, spaceNodeRef, transaction, runas, urlargs, documentNodeRef);
			
		} catch (JSONException e) {
			throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR,
					"Error reading json request body.", e);
		}
	}

	@Override
	public String toString() {
		return "JavascriptConsoleRequest [script=" + script + ", template=" + template + ", spaceNodeRef=" + spaceNodeRef
				+ ", runas=" + runas + ", useTransaction=" + useTransaction + ", transactionReadOnly=" + transactionReadOnly
				+ ", urlargs=" + urlargs + ", documentNodeRef=" + documentNodeRef + "]";
	}
	
	
}
