package de.fme.jsconsole.jobs;

import java.util.HashMap;
import java.util.Map;

import javax.management.MBeanServer;

import org.alfresco.repo.processor.BaseProcessorExtension;

/**
 * fascade to the solr index check service
 * 
 * ENTERPRISE ONLY
 * 
 * @author jgoldhammer
 * 
 */
public class JobsScriptFacade extends BaseProcessorExtension {
	Map<String, ScriptJob> jobs = new HashMap<String, ScriptJob>();
	private MBeanServer alfrescoMBeanServer;

	public void setAlfrescoMBeanServer(MBeanServer alfrescoMBeanServer) {
		this.alfrescoMBeanServer = alfrescoMBeanServer;
	}
	
	public void init() {
		// read jobs from jmx and fill the hashmap
		
		
	}
	
	public ScriptJob getJob(String name) {
		return jobs.get(name);
	}
	
	public String listJobs() {
		return jobs.keySet().toString();
	}
}
