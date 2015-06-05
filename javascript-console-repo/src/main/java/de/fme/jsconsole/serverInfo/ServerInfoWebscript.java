/**
 * 
 */
package de.fme.jsconsole.serverInfo;

import java.io.IOException;
import java.util.List;

import org.alfresco.repo.tenant.TenantService;
import org.alfresco.service.cmr.module.ModuleDetails;
import org.alfresco.service.cmr.module.ModuleService;
import org.alfresco.service.cmr.workflow.WorkflowService;
import org.alfresco.service.license.LicenseService;
import org.springframework.extensions.webscripts.AbstractWebScript;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptResponse;

/**
 * @author jgoldhammer
 * 
 */
public class ServerInfoWebscript extends AbstractWebScript {

	private WorkflowService workflowService;

	public void setWorkflowService(WorkflowService workflowService) {
		this.workflowService = workflowService;
	}

	private LicenseService licenseService;
	private TenantService tenantService;
	private ModuleService moduleService;

	public String getModules() {
		List<ModuleDetails> allModules = moduleService.getAllModules();

		for (ModuleDetails moduleDetails : allModules) {
			
//			modulesText += module.id + " v" + module.version;
//			if (i != modulesList.size() - 1) {
//				modulesText += " - ";
//			}
		}
		return null;
	}

	@Override
	public void execute(WebScriptRequest req, WebScriptResponse res) throws IOException {

		int workflowDefinitionSize = workflowService.getAllDefinitions().size();
		Integer remainingDays = licenseService.getLicense().getRemainingDays();

	}

}
