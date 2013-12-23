package de.fme.jsconsole;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.repo.cache.SimpleCache;
import org.alfresco.util.Pair;
import org.alfresco.util.PropertyCheck;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;

/**
 * 
 * @author Axel Faust, <a href="http://www.prodyna.com">PRODYNA AG</a>
 */
public class PrintOutputGet extends DeclarativeWebScript implements InitializingBean
{

    private SimpleCache<Pair<String, Integer>, List<String>> backingCache;

    /**
     * 
     * {@inheritDoc}
     */
    @Override
    public void afterPropertiesSet()
    {
        PropertyCheck.mandatory(this, "backingCache", this.backingCache);
    }

    /**
     * @param backingCache
     *            the backingCache to set
     */
    public final void setBackingCache(final SimpleCache<Pair<String, Integer>, List<String>> backingCache)
    {
        this.backingCache = backingCache;
    }

    /**
     * 
     * {@inheritDoc}
     */
    @Override
    protected Map<String, Object> executeImpl(final WebScriptRequest req, final Status status, final Cache cache)
    {
        final Map<String, Object> model = new HashMap<String, Object>();
        final String outputChannel = req.getServiceMatch().getTemplateVars().get("outputChannel");

        if (outputChannel != null && outputChannel.trim().length() > 0)
        {

            final List<String> printOutput = new ArrayList<String>();

            for (int chunk = 0; chunk < Integer.MAX_VALUE; chunk++)
            {
                final Pair<String, Integer> chunkKey = new Pair<String, Integer>(outputChannel, Integer.valueOf(chunk));
                final List<String> chunkOutput = this.backingCache.get(chunkKey);
                if (chunkOutput != null)
                {
                    printOutput.addAll(chunkOutput);
                }
                else
                {
                    break;
                }
            }

            model.put("printOutput", printOutput);
        }
        else
        {
            throw new WebScriptException(Status.STATUS_BAD_REQUEST, "The print output channel has not been specified");
        }

        return model;
    }
}
