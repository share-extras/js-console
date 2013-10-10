package de.fme.jsconsole;


import java.io.IOException;

import org.alfresco.service.cmr.oauth2.OAuth2CredentialsStoreService;
import org.alfresco.service.cmr.remotecredentials.OAuth2CredentialsInfo;
import org.json.JSONException;
import org.json.JSONStringer;
import org.json.JSONWriter;
import org.springframework.extensions.webscripts.AbstractWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptResponse;

/**
 * Fetch an OAuth 2.0 ticket from the credentials store.
 * 
 * @author Will Abson
 */
public class GetOAuthToken extends AbstractWebScript
{

    // Services
    private OAuth2CredentialsStoreService    oauth2CredentialsStoreService;
    
    public void setOauth2CredentialsStoreService(OAuth2CredentialsStoreService oauth2CredentialsStoreService)
    {
        this.oauth2CredentialsStoreService = oauth2CredentialsStoreService;
    }

    @Override
    public void execute(WebScriptRequest req, WebScriptResponse resp)
            throws IOException
    {
        String keyName = req.getParameter("name");
        
        if (keyName == null || "".equals(keyName))
        {
            throw new WebScriptException("A key name must be specified");
        }
        
        OAuth2CredentialsInfo credentialInfo = oauth2CredentialsStoreService.getPersonalOAuth2Credentials(keyName);
        
        if (credentialInfo != null)
        {
            try
            {
                // Start object
                JSONWriter jsonObj = new JSONStringer().object();
                // Add string values
                jsonObj.key("accessToken").value(credentialInfo.getOAuthAccessToken());
                jsonObj.key("refreshToken").value(credentialInfo.getOAuthRefreshToken());
                jsonObj.key("ticketExpiresAt").value(credentialInfo.getOAuthTicketExpiresAt());
                jsonObj.key("ticketTokenIssuedAt").value(credentialInfo.getOAuthTicketIssuedAt());
                // End object
                jsonObj.endObject();
                
                // Write JSON to the response body
                resp.getWriter().write(jsonObj.toString());
            }
            catch (JSONException e)
            {
                throw new WebScriptException("Error building JSON data", e);
            }
        }
        else
        {
            throw new WebScriptException(Status.STATUS_NOT_FOUND, "Could not find credentials with name " + keyName);
        }
    }

}

