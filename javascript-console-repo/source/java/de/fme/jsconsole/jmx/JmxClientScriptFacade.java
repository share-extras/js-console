package de.fme.jsconsole.jmx;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import javax.management.JMException;
import javax.management.MBeanServer;
import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;

import org.alfresco.repo.jscript.NativeMap;
import org.alfresco.repo.processor.BaseProcessorExtension;

/**
 * wraps some simple jmx functions 
 * 
 * @author jgoldhammer
 *
 */
public class JmxClientScriptFacade extends BaseProcessorExtension {
	private MBeanServer alfrescoMBeanServer;

	public void setAlfrescoMBeanServer(MBeanServer alfrescoMBeanServer) {
		this.alfrescoMBeanServer = alfrescoMBeanServer;
	}
	
	public String getAlfProperty(String propertyName) {
		ObjectName globalPropertiesObjectName;
		try {
			globalPropertiesObjectName = new ObjectName("Alfresco:Name=GlobalProperties");
			StringWriter sw = new StringWriter();
			PrintWriter writer = new PrintWriter(sw, true);
			JmxDumpUtil.printMBeanInfo(alfrescoMBeanServer, globalPropertiesObjectName, writer, propertyName);
			return sw.getBuffer().toString();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MalformedObjectNameException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} catch (JMException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String listAlfProperties() {
		ObjectName globalPropertiesObjectName;
		try {
			globalPropertiesObjectName = new ObjectName("Alfresco:Name=GlobalProperties");
			StringWriter sw = new StringWriter();
			PrintWriter writer = new PrintWriter(sw, true);
			JmxDumpUtil.printMBeanInfo(alfrescoMBeanServer, globalPropertiesObjectName, writer, null);
			return sw.getBuffer().toString();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MalformedObjectNameException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} catch (JMException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public NativeMap getAlfProperties() {
		ObjectName globalPropertiesObjectName;
		try {
			globalPropertiesObjectName = new ObjectName("Alfresco:Name=GlobalProperties");
			Map<Object, Object> simpleMBeanInfo = JmxDumpUtil.getSimpleMBeanInfo(alfrescoMBeanServer, globalPropertiesObjectName);
			return NativeMap.wrap(null, simpleMBeanInfo);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MalformedObjectNameException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} catch (JMException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getSystemProperty(String propertyName) {
		ObjectName globalPropertiesObjectName;
		try {
			globalPropertiesObjectName = new ObjectName("Alfresco:Name=SystemProperties");
			StringWriter sw = new StringWriter();
			PrintWriter writer = new PrintWriter(sw, true);
			JmxDumpUtil.printMBeanInfo(alfrescoMBeanServer, globalPropertiesObjectName, writer, propertyName);
			return sw.getBuffer().toString();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MalformedObjectNameException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} catch (JMException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String listSystemProperties() {
		ObjectName globalPropertiesObjectName;
		try {
			globalPropertiesObjectName = new ObjectName("Alfresco:Name=SystemProperties");
			StringWriter sw = new StringWriter();
			PrintWriter writer = new PrintWriter(sw, true);
			JmxDumpUtil.printMBeanInfo(alfrescoMBeanServer, globalPropertiesObjectName, writer, null);
			return sw.getBuffer().toString();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MalformedObjectNameException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} catch (JMException e) {
			e.printStackTrace();
		}
		return null;
	}
}
