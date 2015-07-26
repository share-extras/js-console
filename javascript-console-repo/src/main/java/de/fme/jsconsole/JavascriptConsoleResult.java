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
public class JavascriptConsoleResult extends JavascriptConsoleResultBase {

    private static final long serialVersionUID = 1988880899541060406L;

    private List<String> printOutput = new ArrayList<String>();

	private boolean statusResponseSent = false;

	private List<JsConsoleDump> dumpOutput;

	public void setPrintOutput(List<String> printOutput) {
		this.printOutput = printOutput;
	}
	
	public List<String> getPrintOutput() {
	    return this.printOutput;
	}

	public void writeJson(WebScriptResponse response) throws IOException {
		response.setContentEncoding("UTF-8");
		response.setContentType(MimetypeMap.MIMETYPE_JSON);

		try {
			JSONObject jsonOutput = generateJsonOutput();
			response.getWriter().write(jsonOutput.toString());

		} catch (JSONException e) {
			throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR,
					"Error writing json response.", e);
		}
		this.writeJson(response, getPrintOutput());
	}

	/**
	 * @return
	 * @throws JSONException
	 */
	public JSONObject generateJsonOutput() throws JSONException {
		JSONObject jsonOutput = new JSONObject();
		jsonOutput.put("renderedTemplate", getRenderedTemplate());
		jsonOutput.put("printOutput", getPrintOutput());
		jsonOutput.put("dumpOutput", this.dumpOutput);
		jsonOutput.put("spaceNodeRef", getSpaceNodeRef());
		jsonOutput.put("spacePath", getSpacePath());
		jsonOutput.put("result", new JSONArray());
		jsonOutput.put("scriptPerf", getScriptPerformance());
		jsonOutput.put("freemarkerPerf", getFreemarkerPerformance());
		jsonOutput.put("webscriptPerf", getWebscriptPerformance());
		jsonOutput.put("scriptOffset", getScriptPerformance());
		return jsonOutput;
	}

	public boolean isStatusResponseSent() {
		return statusResponseSent;
	}

	public void setStatusResponseSent(boolean statusResponseSent) {
		this.statusResponseSent = statusResponseSent;
	}

	public void setDumpOutput(List<JsConsoleDump> dumpOutput) {
		this.dumpOutput = dumpOutput;
	}

}
