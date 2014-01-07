/**
 *
 */
package de.fme.jsconsole;

import org.alfresco.repo.cache.SimpleCache;
import org.alfresco.service.descriptor.Descriptor;
import org.alfresco.service.descriptor.DescriptorService;
import org.alfresco.util.PropertyCheck;
import org.alfresco.util.VersionNumber;
import org.springframework.beans.factory.config.AbstractFactoryBean;

/**
 * @author <a href="mailto:axel.faust@prodyna.com">Axel Faust</a>, <a href="http://www.prodyna.com">PRODYNA AG</a>
 */
public class VersionAwareCacheFactoryBean extends AbstractFactoryBean<Object>
{
    protected String alf42ClassName;
    protected String preAlf42ClassName;

    protected DescriptorService descriptorService;

    @Override
    public void afterPropertiesSet() throws Exception
    {
        PropertyCheck.mandatory(this, "descriptorService", this.descriptorService);

        PropertyCheck.mandatory(this, "alf42ClassName", this.alf42ClassName);
        PropertyCheck.mandatory(this, "preAlf42ClassName", this.preAlf42ClassName);

        super.afterPropertiesSet();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Object createInstance() throws Exception
    {
        final Descriptor serverDescriptor = this.descriptorService.getServerDescriptor();
        final VersionNumber versionNumber = serverDescriptor.getVersionNumber();

        final VersionNumber alf42Version = new VersionNumber("4.2");

        final String className;

        if (alf42Version.compareTo(versionNumber) <= 0)
        {
            className = this.alf42ClassName;
        }
        else
        {
            className = this.preAlf42ClassName;
        }

        Object resultObject = null;
        // need to do this reflectively as 4.2 class is not be available in 4.0/4.1
        final Class<?> forName = Class.forName(className);
        if (SimpleCache.class.isAssignableFrom(forName))
        {
            resultObject = forName.newInstance();
        }

        return resultObject;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Class<?> getObjectType()
    {
        return SimpleCache.class;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isSingleton()
    {
        return false;
    }

    /**
     * @param alf42ClassName
     *            the alf42ClassName to set
     */
    public final void setAlf42ClassName(final String alf42ClassName)
    {
        this.alf42ClassName = alf42ClassName;
    }

    /**
     * @param preAlf42ClassName
     *            the preAlf42ClassName to set
     */
    public final void setPreAlf42ClassName(final String preAlf42ClassName)
    {
        this.preAlf42ClassName = preAlf42ClassName;
    }

    /**
     * @param descriptorService
     *            the descriptorService to set
     */
    public final void setDescriptorService(final DescriptorService descriptorService)
    {
        this.descriptorService = descriptorService;
    }
}
