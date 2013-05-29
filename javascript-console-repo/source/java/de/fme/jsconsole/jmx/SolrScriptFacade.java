package de.fme.jsconsole.jmx;

import java.io.IOException;

import javax.management.openmbean.OpenDataException;

import org.alfresco.enterprise.repo.admin.indexcheck.SOLRIndexCheckService;
import org.alfresco.enterprise.repo.admin.indexcheck.SOLRNodeInfo;
import org.alfresco.repo.jscript.ScriptNode;
import org.alfresco.repo.processor.BaseProcessorExtension;
import org.alfresco.util.ParameterCheck;

/**
 * fascade to the solr index check service
 * 
 * ENTERPRISE ONLY
 * 
 * @author jgoldhammer
 * 
 */
public class SolrScriptFacade extends BaseProcessorExtension {

	private SOLRIndexCheckService solrIndexService;

	public void setSolrIndexCheckService(SOLRIndexCheckService solrIndexService) {
		this.solrIndexService = solrIndexService;
	}

	public ScriptNodeIndexState getIndexState(ScriptNode node) throws OpenDataException, IOException {
		ParameterCheck.mandatory("solrIndexService - ENTERPRISE EDITION ONLY", solrIndexService);

		SOLRNodeInfo solrNodeInfo = solrIndexService.nodeReport("alfresco",
				(Long) node.getProperties().get(org.alfresco.model.ContentModel.PROP_NODE_DBID));

		ScriptNodeIndexState indexState = new ScriptNodeIndexState(solrNodeInfo);
		return indexState;
	}

}
