package de.fme.jsconsole;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;

import org.alfresco.repo.content.MimetypeMap;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptResponse;

/**
 * Stores the base result of a script and template execution on the Javascript Console and
 * is used internally by the {@link ExecuteWebscript}.
 *
 * @author Florian Maul (fme AG)
 *
 */
public class JavascriptConsoleResultBase implements Serializable {

    private static final long serialVersionUID = 4149990179052751784L;

    private String renderedTemplate = "";

	private String spaceNodeRef = "";

	private String spacePath = "";

	private String scriptPerformance;

	private String freemarkerPerformance;

	private String webscriptPerformance;

	private int scriptOffset;

	public void setWebscriptPerformance(String webscriptPerformance) {
		this.webscriptPerformance = webscriptPerformance;
	}

	public void setScriptPerformance(String scriptPerformance) {
		this.scriptPerformance = scriptPerformance;
	}

	public void setFreemarkerPerformance(String freemarkerPerformance) {
		this.freemarkerPerformance = freemarkerPerformance;
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
	
	public String getWebscriptPerformance() {
	    return this.webscriptPerformance;
	}
	
	public String getScriptPerformance() {
        return this.scriptPerformance;
    }
	
	public String getFreemarkerPerformance() {
        return this.freemarkerPerformance;
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

	public void writeJson(WebScriptResponse response, List<String> printOutput) throws IOException {
		response.setContentEncoding("UTF-8");
		response.setContentType(MimetypeMap.MIMETYPE_JSON);

		try {
			JSONObject jsonOutput = new JSONObject();
			jsonOutput.put("renderedTemplate", getRenderedTemplate());
			jsonOutput.put("printOutput", printOutput);
			jsonOutput.put("spaceNodeRef", getSpaceNodeRef());
			jsonOutput.put("spacePath", getSpacePath());
			jsonOutput.put("result", new JSONArray());
			jsonOutput.put("scriptPerf", scriptPerformance);
			jsonOutput.put("freemarkerPerf", freemarkerPerformance);
			jsonOutput.put("webscriptPerf", webscriptPerformance);
			jsonOutput.put("scriptOffset", scriptOffset);

			response.getWriter().write(jsonOutput.toString());

		} catch (JSONException e) {
			throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR,
					"Error writing json response.", e);
		}
	}
	
	public JavascriptConsoleResultBase toBaseResult() {
	    final JavascriptConsoleResultBase base = new JavascriptConsoleResultBase();
	    base.setFreemarkerPerformance(this.freemarkerPerformance);
	    base.setRenderedTemplate(this.renderedTemplate);
	    base.setScriptOffset(this.scriptOffset);
	    base.setScriptPerformance(this.scriptPerformance);
	    base.setSpaceNodeRef(this.spaceNodeRef);
	    base.setSpacePath(this.spacePath);
	    base.setWebscriptPerformance(this.webscriptPerformance);
	    
	    return base;
	}

	@Override
	public String toString() {
		return "JavascriptConsoleResultBase [renderedTemplate=" + renderedTemplate
				+ ", spaceNodeRef=" + spaceNodeRef + ", spacePath=" + spacePath
				+ ", scriptPerformance=" + scriptPerformance + ", freemarkerPerformance=" + freemarkerPerformance + "]";
	}

	public void setScriptOffset(int scriptOffset) {
		this.scriptOffset = scriptOffset;
	}

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((freemarkerPerformance == null) ? 0 : freemarkerPerformance.hashCode());
        result = prime * result + ((renderedTemplate == null) ? 0 : renderedTemplate.hashCode());
        result = prime * result + scriptOffset;
        result = prime * result + ((scriptPerformance == null) ? 0 : scriptPerformance.hashCode());
        result = prime * result + ((spaceNodeRef == null) ? 0 : spaceNodeRef.hashCode());
        result = prime * result + ((spacePath == null) ? 0 : spacePath.hashCode());
        result = prime * result + ((webscriptPerformance == null) ? 0 : webscriptPerformance.hashCode());
        return result;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
        {
            return true;
        }
        if (obj == null)
        {
            return false;
        }
        if (!(obj instanceof JavascriptConsoleResultBase))
        {
            return false;
        }
        JavascriptConsoleResultBase other = (JavascriptConsoleResultBase) obj;
        if (freemarkerPerformance == null)
        {
            if (other.freemarkerPerformance != null)
            {
                return false;
            }
        }
        else if (!freemarkerPerformance.equals(other.freemarkerPerformance))
        {
            return false;
        }
        if (renderedTemplate == null)
        {
            if (other.renderedTemplate != null)
            {
                return false;
            }
        }
        else if (!renderedTemplate.equals(other.renderedTemplate))
        {
            return false;
        }
        if (scriptOffset != other.scriptOffset)
        {
            return false;
        }
        if (scriptPerformance == null)
        {
            if (other.scriptPerformance != null)
            {
                return false;
            }
        }
        else if (!scriptPerformance.equals(other.scriptPerformance))
        {
            return false;
        }
        if (spaceNodeRef == null)
        {
            if (other.spaceNodeRef != null)
            {
                return false;
            }
        }
        else if (!spaceNodeRef.equals(other.spaceNodeRef))
        {
            return false;
        }
        if (spacePath == null)
        {
            if (other.spacePath != null)
            {
                return false;
            }
        }
        else if (!spacePath.equals(other.spacePath))
        {
            return false;
        }
        if (webscriptPerformance == null)
        {
            if (other.webscriptPerformance != null)
            {
                return false;
            }
        }
        else if (!webscriptPerformance.equals(other.webscriptPerformance))
        {
            return false;
        }
        return true;
    }

}
