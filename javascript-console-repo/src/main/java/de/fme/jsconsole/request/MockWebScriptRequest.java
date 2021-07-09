package de.fme.jsconsole.request;

import javax.servlet.http.HttpServletRequest;

import org.springframework.extensions.config.ServerProperties;
import org.springframework.extensions.webscripts.Match;
import org.springframework.extensions.webscripts.Runtime;
import org.springframework.extensions.webscripts.WebScriptRequestImpl;
import org.springframework.extensions.webscripts.servlet.FormData;
import org.springframework.extensions.webscripts.servlet.WebScriptServletRequest;

/**
 * Adds methods to WebScriptServletRequest to parse a multipart form data
 * 
 * @author <a href="mailto:lukasz.tworek@p0n3.net">Lukasz Tworek</a>
 *
 */
public class MockWebScriptRequest extends WebScriptServletRequest {

	private FormData mockFormData;
	private String contentType;

	public MockWebScriptRequest(Runtime container, HttpServletRequest req, Match serviceMatch, ServerProperties serverProperties) {
		super(container, req, serviceMatch, serverProperties);
		this.contentType = req.getContentType();

	}

	@Override
	public String getContentType() {
		return this.contentType;
	}

	@Override
	public Object parseContent() {
		if (this.contentType.equals(WebScriptRequestImpl.MULTIPART_FORM_DATA)) {
			return mockFormData;
		}
		return super.parseContent();
	}

	public void setMockFormData(FormData mockFormData) {
		this.mockFormData = mockFormData;
	}

	@Override
	public String toString() {
		return "MockWebScriptRequest [mockFormData=" + mockFormData + ", contentType=" + contentType + "]";
	}

}
