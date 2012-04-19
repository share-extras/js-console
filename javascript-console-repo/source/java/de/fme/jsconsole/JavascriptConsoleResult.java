package de.fme.jsconsole;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.alfresco.repo.content.MimetypeMap;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptResponse;

/**
 * Stores the result of a script and template execution on the Javascript Console and 
 * is used internally by the {@link ExecuteWebscript}.
 * 
 * @author Florian Maul (fme AG)
 *
 */
public class JavascriptConsoleResult {

	private String renderedTemplate = "";
	
	private List<String> printOutput = new ArrayList<String>();
	
	private String spaceNodeRef = "";
	
	private String spacePath = "";

	public void setPrintOutput(List<String> printOutput) {
		this.printOutput = printOutput;
	}
	
	public void setRenderedTemplate(String renderedTemplate) {
		this.renderedTemplate = renderedTemplate;
	}
	
	public void setSpaceNodeRef(String spaceNodeRef) {
		this.spaceNodeRef = spaceNodeRef;
	}
	
	public void setSpacePath(String spacePath) {
		this.spacePath = spacePath;
	}
	
	public List<String> getPrintOutput() {
		return printOutput;
	}
	
	public String getRenderedTemplate() {
		return renderedTemplate;
	}
	
	public String getSpaceNodeRef() {
		return spaceNodeRef;
	}
	
	public String getSpacePath() {
		return spacePath;
	}
	
	public void writeJson(WebScriptResponse response) throws IOException {
		response.setContentEncoding("UTF-8");
		response.setContentType(MimetypeMap.MIMETYPE_JSON);

		try {
			JSONObject jsonOutput = new JSONObject();
			jsonOutput.put("renderedTemplate", getRenderedTemplate());
			jsonOutput.put("printOutput", getPrintOutput());
			jsonOutput.put("spaceNodeRef", getSpaceNodeRef());
			jsonOutput.put("spacePath", getSpacePath());
			jsonOutput.put("result", new JSONArray());

			response.getWriter().write(jsonOutput.toString());

		} catch (JSONException e) {
			throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR,
					"Error writing json response.", e);
		}
	}
}
