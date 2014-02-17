package de.fme.jsconsole;

public class JsConsoleDump {

	private String json;
	private String nodeRef;

	public JsConsoleDump(String nodeRef, String json) {
		this.nodeRef = nodeRef;
		this.json = json;
	}

	public String getNodeRef() {
		return nodeRef;
	}

	public String getJson() {
		return json;
	}

	@Override
	public String toString() {
		return json;
	}

}
