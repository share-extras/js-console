package de.fme.jsconsole;


import java.io.IOException;
import java.util.Date;

import org.alfresco.service.cmr.oauth2.OAuth2CredentialsStoreService;
import org.alfresco.service.cmr.remoteticket.NoSuchSystemException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.extensions.webscripts.AbstractWebScript;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptResponse;

/**
 * Save an OAuth 2.0 ticket into the credentials store.
 * 
 * @author Will Abson
 */
public class SaveOAuthToken extends AbstractWebScript
{

    private static Log logger = LogFactory.getLog(SaveOAuthToken.class);
    
    // Services
    private OAuth2CredentialsStoreService    oauth2CredentialsStoreService;
    
    public void setOauth2CredentialsStoreService(OAuth2CredentialsStoreService oauth2CredentialsStoreService)
    {
        this.oauth2CredentialsStoreService = oauth2CredentialsStoreService;
    }

    @Override
    public void execute(WebScriptRequest req, WebScriptResponse arg1)
            throws IOException
    {
        String jsonStr = req.getContent().getContent();
        if (logger.isDebugEnabled())
        {
            logger.debug("Got JSON data: " + jsonStr);
        }
        
        try
        {
            JSONObject reqJson = new JSONObject(new JSONTokener(jsonStr));

            String remoteSystem = reqJson.getString("name"), 
                    accessToken = reqJson.getString("token"), 
                    refreshToken = reqJson.getString("refreshToken");
            
            if (logger.isDebugEnabled())
            {
                logger.debug("Name: " + remoteSystem);
                logger.debug("Access token: " + accessToken);
                logger.debug("Refresh token: " + refreshToken);
            }
            
            Date expiresIn = null; // TODO need to pick an arbitrary date?
            
            try
            {
                oauth2CredentialsStoreService.storePersonalOAuth2Credentials(remoteSystem, accessToken, refreshToken, expiresIn, new Date());
            }
            catch (NoSuchSystemException nsse)
            {
                throw nsse;
            }
            
        }
        catch (JSONException e)
        {
            throw new WebScriptException("A problem occurred parsing the request JSON", e);
        }
        
    }

}
