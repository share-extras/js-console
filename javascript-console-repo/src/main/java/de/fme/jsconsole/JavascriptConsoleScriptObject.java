package de.fme.jsconsole;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.alfresco.repo.jscript.ScriptNode;
import org.alfresco.repo.jscript.ScriptNode.ScriptContentData;
import org.alfresco.repo.security.authority.script.ScriptGroup;
import org.alfresco.repo.security.authority.script.ScriptUser;
import org.alfresco.repo.site.script.Site;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.NodeRef;
import org.springframework.extensions.webscripts.ScriptContent;
import org.springframework.extensions.webscripts.ScriptValueConverter;

/**
 * Implements the 'jsconsole' Javascript extension object that is available in
 * the Javascript Console and is used internally for print output and
 * communication between Java code and Javascript by the
 * {@link ExecuteWebscript}.
 *
 * @author Florian Maul (fme AG)
 *
 */
public class JavascriptConsoleScriptObject {

	private List<String> printOutput = new ArrayList<String>();

	private ScriptNode space = null;

	public static final String JSON_KEY_ENTRY_ID = "id";
	public static final String JSON_KEY_ENTRY_APPLICATION = "application";
	public static final String JSON_KEY_ENTRY_USER = "user";
	public static final String JSON_KEY_ENTRY_TIME = "time";
	public static final String JSON_KEY_ENTRY_VALUES = "values";


	/**
	 * Default constructor with print output stored in an internal data structure.
	 */
	public JavascriptConsoleScriptObject()
	{
	    // NO-OP as default constructor
	}

	/**
	 * Alternative constructor that allows clients to provide a specific data structure for print output management.
	 */
	public JavascriptConsoleScriptObject(List<String> printOutput)
    {
        this.printOutput = printOutput;
    }

	public ScriptNode getSpace() {
		return space;
	}

	public void setSpace(ScriptNode space) {
		this.space = space;
	}

	public JavascriptConsoleScriptLogger getLogger() {
		return new JavascriptConsoleScriptLogger(this);
	}

	public void print(Object obj) {

		if (obj != null) {

			Object value = ScriptValueConverter.unwrapValue(obj);

			if (value instanceof Collection<?>) {
				Collection<?> col = (Collection<?>) value;
				Iterator<?> colIter = col.iterator();
				int counter = 0;
				while (colIter.hasNext()) {
					printOutput.add("" + counter + " : " + formatValue(colIter.next()));
					counter++;
				}
			} else {
				printOutput.add(formatValue(value));
			}
		} else {
			printOutput.add("null");
		}

	}

	@SuppressWarnings("unchecked")
	private String formatValue(Object value) {

		if (value == null) {
			return "null";
		}

		if (value instanceof ScriptNode) {
			return formatScriptNode((ScriptNode) value);
		} else if (value instanceof ScriptContent) {
			return formatScriptContent((ScriptContent) value);
		} else if (value instanceof ScriptGroup) {
			return formatScriptGroup((ScriptGroup) value);
		} else if (value instanceof ScriptUser) {
			return formatScriptUser((ScriptUser) value);
		} else if (value instanceof NodeRef) {
			return formatNodeRef((NodeRef) value);
		} else if (value instanceof ChildAssociationRef) {
			return formatChildAssoc((ChildAssociationRef) value);
		} else if (value instanceof ScriptContentData) {
			return formatScriptContentData((ScriptContentData) value);
		} else if (value instanceof Site) {
			return formatSite((Site) value);
		} else if (value instanceof Map) {
			return formatMap((Map<String, Object>) value);
		}
		return value.toString();
	}

	private String formatMap(Map<String, Object> map) {
		StringBuffer buffer = new StringBuffer();
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			if (entry != null) {
				buffer.append(formatValue(entry.getKey()));
				buffer.append(" : ");
				buffer.append(formatValue(entry.getValue()));
				buffer.append("\n");
			}
		}
		return buffer.toString();
	}

	private String formatScriptUser(ScriptUser value) {
		return "ScriptUser: " + value.getUserName() + " (" + value.getFullName() + ")";
	}

	private String formatSite(Site site) {
		return "Site: " + site.getShortName() + " (" + site.getTitle() + ", " + site.getNode().getNodeRef() + ")";
	}

	private String formatScriptGroup(ScriptGroup value) {
		return "ScriptGroup: " + value.getShortName() + " (" + value.getFullName() + ")";
	}

	private String formatScriptContent(ScriptContent value) {
		return "ScriptContent: " + value.getPath();
	}

	private String formatChildAssoc(ChildAssociationRef value) {
		return "ChildAssociationRef: parent=" + value.getParentRef().toString() + ", child=" + value.getChildRef().toString();
	}

	private String formatNodeRef(NodeRef value) {
		return "NodeRef: " + value.toString();
	}

	private String formatScriptContentData(ScriptContentData value) {
		return "ScriptContentData: " + value.getMimetype() + " Size:" + value.getSize() + " URL:" + value.getUrl();
	}

	private String formatScriptNode(ScriptNode value) {
		return value.getName() + " (" + value.getNodeRef() + ")";
	}

	public List<String> getPrintOutput() {
	    // defensive copy
		return new ArrayList<String>(this.printOutput);
	}

}
