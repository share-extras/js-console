package de.fme.jsconsole;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.admin.SysAdminParams;
import org.alfresco.repo.jscript.ScriptNode;
import org.alfresco.repo.lock.mem.LockState;
import org.alfresco.service.cmr.audit.AuditQueryParameters;
import org.alfresco.service.cmr.audit.AuditService;
import org.alfresco.service.cmr.audit.AuditService.AuditQueryCallback;
import org.alfresco.service.cmr.dictionary.DictionaryService;
import org.alfresco.service.cmr.lock.LockService;
import org.alfresco.service.cmr.rendition.RenditionService;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.ContentReader;
import org.alfresco.service.cmr.repository.ContentService;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeRef.Status;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.repository.datatype.DefaultTypeConverter;
import org.alfresco.service.cmr.repository.datatype.TypeConversionException;
import org.alfresco.service.cmr.rule.Rule;
import org.alfresco.service.cmr.rule.RuleService;
import org.alfresco.service.cmr.search.CategoryService;
import org.alfresco.service.cmr.security.AccessPermission;
import org.alfresco.service.cmr.security.PermissionService;
import org.alfresco.service.cmr.tagging.TaggingService;
import org.alfresco.service.cmr.version.Version;
import org.alfresco.service.cmr.version.VersionHistory;
import org.alfresco.service.cmr.version.VersionService;
import org.alfresco.service.cmr.webdav.WebDavService;
import org.alfresco.service.cmr.workflow.WorkflowService;
import org.alfresco.service.namespace.NamespaceException;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.apache.commons.io.FileUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.extensions.webscripts.ScriptValueConverter;

import com.google.common.base.Function;
import com.google.common.collect.Iterables;

/**
 * Implements the 'jsconsole' Javascript extension object that is available in
 * the Javascript Console and is used internally for print output and
 * communication between Java code and Javascript by the
 * {@link ExecuteWebscript}.
 *
 * @author Florian Maul (fme AG)
 *
 */
public class DumpService {

	private static final Log logger = LogFactory.getLog("org.alfresco.repo.jscript.ScriptLogger");

	private NodeService nodeService;

	private PermissionService permissionService;

	private NamespaceService namespaceService;

	private VersionService versionService;

	private ContentService contentService;

	private DictionaryService dictionaryService;

	private RuleService ruleService;

	private WorkflowService workflowService;

	private RenditionService renditionService;

	private CategoryService categoryService;

	private TaggingService tagService;

	private WebDavService webDavService;

	private AuditService auditService;

	private SysAdminParams sysAdminParams;

	private AtomicInteger dumpCounter = new AtomicInteger();

	private int dumpLimit;

	private LockService lockService;

	public List<JsConsoleDump> addDump(Object obj) {
		List<JsConsoleDump> dumpOutput = new LinkedList<JsConsoleDump>();

		if (obj != null) {
			Object value = ScriptValueConverter.unwrapValue(obj);

			if (value instanceof Collection<?>) {
				Collection<?> col = (Collection<?>) value;
				Iterator<?> colIter = col.iterator();
				int currentValue = dumpCounter.get();
				while (colIter.hasNext()) {
					if (dumpLimit != -1 || currentValue <= dumpLimit) {
						dumpOutput.add(dumpObject(colIter.next()));
						currentValue = dumpCounter.incrementAndGet();
					} else {
						logger.warn("Reached dump limit");
					}
				}
			} else {
				int currentValue = dumpCounter.getAndIncrement();
				if (dumpLimit != -1 || currentValue <= dumpLimit) {
					dumpOutput.add(dumpObject(value));
				} else {
					logger.warn("Reached dump limit");
				}
			}
		}
		return dumpOutput;
	}

	private JsConsoleDump dumpObject(Object value) {

		final NodeRef nodeRef = extractNodeRef(value);

		// This method is used by the /api/metadata web script
		String jsonStr = "{}";

		if (this.nodeService.exists(nodeRef)) {
			JSONObject json = new JSONObject();

			try {
				// add type info
				json.put("nodeRef", nodeRef.toString());
				QName type = nodeService.getType(nodeRef);
				String typeString = type.toPrefixString(namespaceService);
				json.put("type", typeString);
				json.put("path", nodeService.getPath(nodeRef));
				json.put("displayPath", nodeService.getPath(nodeRef).toDisplayPath(nodeService, permissionService));

				Status nodeStatus = this.nodeService.getNodeStatus(nodeRef);
				json.put("transactionId", nodeStatus.getDbTxnId());
				json.put("isDeleted", nodeStatus.isDeleted());

				extractProperties(nodeRef, json);
				extractAspects(nodeRef, json);
				extractPermissionInformation(nodeRef, json);
				extractVersionInformation(nodeRef, json);
				extractContentInformation(nodeRef, json, type);
				extractRulesInformation(nodeRef, json);
				extractWorkflowInformation(nodeRef, json);
				extractRenditionInformation(nodeRef, json);
				extractTagsInformation(nodeRef, json);
				extractLockInformation(nodeRef,json);
				//rating

				json.put(
						"webdav url",
						sysAdminParams.getAlfrescoProtocol() + "://" + sysAdminParams.getAlfrescoHost() + ":"
								+ sysAdminParams.getAlfrescoPort() + "/" + sysAdminParams.getAlfrescoContext()
								+ webDavService.getWebdavUrl(nodeRef));

				json.put("audits", getAudits(nodeRef, true));
				json.put("audit count", getAudits(nodeRef, false).size());

			} catch (JSONException error) {
				error.printStackTrace();
			}

			jsonStr = json.toString();
		}

		return new JsConsoleDump(nodeRef.toString(), jsonStr);
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractTagsInformation(final NodeRef nodeRef, JSONObject json) throws JSONException {
		List<String> tags = tagService.getTags(nodeRef);
		json.put("tags count", tags.size());

		JSONArray tagsJson = new JSONArray();
		for (String tag : tags) {
			tagsJson.put(tag);

		}
		json.put("tags", tagsJson);
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractWorkflowInformation(final NodeRef nodeRef, JSONObject json) throws JSONException {
		json.put("workflows (active/completed)", workflowService.getWorkflowsForContent(nodeRef, true).size() + " / "
				+ workflowService.getWorkflowsForContent(nodeRef, false).size());
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @param type
	 * @throws JSONException
	 */
	private void extractContentInformation(final NodeRef nodeRef, JSONObject json, QName type) throws JSONException {
		if (dictionaryService.isSubClass(type, ContentModel.TYPE_CONTENT)) {
			ContentReader contentReader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);
			if (contentReader != null) {
				json.put("content encoding", contentReader.getEncoding());
				json.put("content mimetype", contentReader.getMimetype());
				json.put("content size", FileUtils.byteCountToDisplaySize(contentReader.getSize()));
				json.put("content locale", contentReader.getLocale());
				json.put("content lastModified", new Date(contentReader.getLastModified()));
				json.put("content url", contentReader.getContentUrl());
			}
		}
	}

	 /**
     * @param json
	 * @param nodeRef
	 * @return true if the node is currently locked
	 * @throws JSONException
     */
    public void extractLockInformation(NodeRef nodeRef, JSONObject json) throws JSONException
    {
		Set<QName> nodeAspects = this.nodeService.getAspects(nodeRef);

        if (nodeAspects.contains(ContentModel.ASPECT_LOCKABLE))
        {
            LockState lockState = this.lockService.getLockState(nodeRef);
            json.put("lock Status", this.lockService.getLockStatus(nodeRef).toString());
            json.put("lock Type", this.lockService.getLockType(nodeRef));
            json.put("lock Owner", lockState.getOwner());
            json.put("lock ExpireDate", lockState.getExpires());
            json.put("lock LifeTime", lockState.getLifetime());
            json.put("lock additional info", lockState.getAdditionalInfo());
        }else{
            json.put("lock Status", "-");

        }
    }

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractVersionInformation(final NodeRef nodeRef, JSONObject json) throws JSONException {
		json.put("isAVersion", versionService.isAVersion(nodeRef));
		json.put("isVersioned", versionService.isVersioned(nodeRef));

		VersionHistory versionHistory = versionService.getVersionHistory(nodeRef);
		if (versionHistory != null) {
			json.put("version count", versionHistory.getAllVersions().size());
			json.put("version count tooltip", Iterables.transform(versionHistory.getAllVersions(), new Function<Version, String>(){

				@Override
				public String apply(Version input) {
					return input.getVersionProperties().toString();
				}

			}));
		} else {
			json.put("version count", "0");
		}
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractProperties(final NodeRef nodeRef, JSONObject json) throws JSONException {
		// add properties
		Map<QName, Serializable> nodeProperties = this.nodeService.getProperties(nodeRef);

		Map<String, Serializable> nodePropertiesShortQNames = new TreeMap<String, Serializable>();
		for (QName nextLongQName : nodeProperties.keySet()) {
			try {
				nodePropertiesShortQNames.put(nextLongQName.toPrefixString(namespaceService),
						nodeProperties.get(nextLongQName));
			} catch (NamespaceException ne) {
				// ignore properties that do not have a registered
				// namespace

				if (logger.isDebugEnabled()) {
					logger.debug("Ignoring property '" + nextLongQName + "' as it's namespace is not registered");
				}
			}
		}

		json.put("properties", nodePropertiesShortQNames);
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractAspects(final NodeRef nodeRef, JSONObject json) throws JSONException {
		// add aspects as an array
		Set<QName> nodeAspects = this.nodeService.getAspects(nodeRef);
		Set<String> nodeAspectsShortQNames = new LinkedHashSet<String>(nodeAspects.size());
		for (QName nextLongQName : nodeAspects) {
			nodeAspectsShortQNames.add(nextLongQName.toPrefixString(namespaceService));
		}
		json.put("aspects", nodeAspectsShortQNames);
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractPermissionInformation(final NodeRef nodeRef, JSONObject json) throws JSONException {
		json.put("inheritPermissions", permissionService.getInheritParentPermissions(nodeRef));

		JSONArray permissionJson = new JSONArray();

		Set<AccessPermission> permissions = permissionService.getAllSetPermissions(nodeRef);
		for (AccessPermission accessPermission : permissions) {
			JSONObject permission = new JSONObject();
			permission.put("authority", accessPermission.getAuthority());
			permission.put("authorityType", accessPermission.getAuthorityType());
			permission.put("accessStatus", accessPermission.getAccessStatus());
			permission.put("permission", accessPermission.getPermission());
			permission.put("directly", accessPermission.isSetDirectly());
			permissionJson.put(permission);
		}

		json.put("permissions", permissionJson);
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractRenditionInformation(final NodeRef nodeRef, JSONObject json) throws JSONException {
		List<ChildAssociationRef> renditions = renditionService.getRenditions(nodeRef);
		json.put("renditions count", renditions.size());

		JSONArray renditionsJson = new JSONArray();
		for (ChildAssociationRef rendition : renditions) {
			JSONObject rendtionJson = new JSONObject();
			rendtionJson.put("typeName", rendition.getTypeQName().toPrefixString(namespaceService));
			rendtionJson.put("qName", rendition.getQName().toPrefixString(namespaceService));
			rendtionJson.put("childType", nodeService.getType(rendition.getChildRef()).toPrefixString(namespaceService));
			renditionsJson.put(rendtionJson);
		}
		json.put("renditions", renditionsJson);
	}

	/**
	 * @param nodeRef
	 * @param json
	 * @throws JSONException
	 */
	private void extractRulesInformation(final NodeRef nodeRef, JSONObject json) throws JSONException {
		List<Rule> rulesLocal = ruleService.getRules(nodeRef, false);
		json.put("rules local ", rulesLocal.size());

		List<Rule> rules = ruleService.getRules(nodeRef, true);
		json.put("rules inherited ", rules.size() - rulesLocal.size());
		JSONArray rulesJson = new JSONArray();

		for (Rule rule : rules) {
			JSONObject ruleJson = new JSONObject();
			ruleJson.put("title", rule.getTitle());
			ruleJson.put("description", rule.getDescription());
			ruleJson.put("asynchronous", rule.getExecuteAsynchronously());
			ruleJson.put("disabled", rule.getRuleDisabled());
			ruleJson.put("ruleNode", rule.getNodeRef());
			ruleJson.put("ruleTypes", rule.getRuleTypes().toString());
			ruleJson.put("action", rule.getAction().getTitle());
			ruleJson.put("inherit", rule.isAppliedToChildren());
			NodeRef owningNodeRef = ruleService.getOwningNodeRef(rule);
			ruleJson.put("owningNodeRef", owningNodeRef.toString());
			rulesJson.put(ruleJson);
		}

		json.put("rules", rulesJson);
	}

	/**
	 * @param value
	 * @return
	 */
	private NodeRef extractNodeRef(Object value) {
		final NodeRef nodeRef;
		if (value instanceof ScriptNode) {
			nodeRef = ((ScriptNode) value).getNodeRef();
		} else if (value instanceof NodeRef) {
			nodeRef = (NodeRef) value;
		} else if (value instanceof String) {
			nodeRef = new NodeRef((String) value);
		} else {
			throw new IllegalArgumentException("value of type " + value.getClass().getSimpleName() + " is not supported for dump");
		}
		return nodeRef;
	}

	private Collection<Map<String, Object>> getAudits(NodeRef nodeRef, final boolean limited) {

		// Execute the query
		AuditQueryParameters params = new AuditQueryParameters();
		params.setForward(false);
		params.addSearchKey(null, nodeRef.toString());

		final List<Map<String, Object>> entries = new ArrayList<Map<String, Object>>();
		AuditQueryCallback callback = new AuditQueryCallback() {
			@Override
			public boolean valuesRequired() {
				if (limited) {
					return true;
				} else {
					return false;
				}
			}

			@Override
			public boolean handleAuditEntryError(Long entryId, String errorMsg, Throwable error) {
				return true;
			}

			@Override
			public boolean handleAuditEntry(Long entryId, String applicationName, String user, long time,
					Map<String, Serializable> values) {

				Map<String, Object> entry = new HashMap<String, Object>(11);
				if (limited) {

					entry.put(JavascriptConsoleScriptObject.JSON_KEY_ENTRY_ID, entryId);
					entry.put(JavascriptConsoleScriptObject.JSON_KEY_ENTRY_APPLICATION, applicationName);
					if (user != null) {
						entry.put(JavascriptConsoleScriptObject.JSON_KEY_ENTRY_USER, user);
					}
					entry.put(JavascriptConsoleScriptObject.JSON_KEY_ENTRY_TIME, new Date(time));
					if (values != null) {
						// Convert values to Strings
						Map<String, String> valueStrings = new HashMap<String, String>(values.size() * 2);
						for (Map.Entry<String, Serializable> mapEntry : values.entrySet()) {
							String key = mapEntry.getKey();
							Serializable value = mapEntry.getValue();
							try {
								String valueString = DefaultTypeConverter.INSTANCE.convert(String.class, value);
								valueStrings.put(key, valueString);
							} catch (TypeConversionException e) {
								// Use the toString()
								valueStrings.put(key, value.toString());
							}

						}
						entry.put(JavascriptConsoleScriptObject.JSON_KEY_ENTRY_VALUES, valueStrings);
					}
					entries.add(entry);
					return true;
				} else {
					entries.add(entry);
					return true;
				}
			}
		};
		int limit;
		if (limited) {
			limit = 5;
		} else {
			limit = -1;
		}
		auditService.auditQuery(callback, params, limit);
		return entries;
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}

	public void setPermissionService(PermissionService permissionService) {
		this.permissionService = permissionService;
	}

	public void setNamespaceService(NamespaceService namespaceService) {
		this.namespaceService = namespaceService;
	}

	public void setVersionService(VersionService versionService) {
		this.versionService = versionService;
	}

	public void setContentService(ContentService contentService) {
		this.contentService = contentService;
	}

	public void setDictionaryService(DictionaryService dictionaryService) {
		this.dictionaryService = dictionaryService;
	}

	public void setRuleService(RuleService ruleService) {
		this.ruleService = ruleService;
	}

	public void setWorkflowService(WorkflowService workflowService) {
		this.workflowService = workflowService;
	}

	public void setRenditionService(RenditionService renditionService) {
		this.renditionService = renditionService;
	}

	public void setCategoryService(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	public void setTagService(TaggingService tagService) {
		this.tagService = tagService;
	}

	public void setWebDavService(WebDavService webDavService) {
		this.webDavService = webDavService;
	}

	public void setAuditService(AuditService auditService) {
		this.auditService = auditService;
	}

	public void setSysAdminParams(SysAdminParams sysAdminParams) {
		this.sysAdminParams = sysAdminParams;
	}

	public void setDumpCounter(AtomicInteger dumpCounter) {
		this.dumpCounter = dumpCounter;
	}

	public void setDumpLimit(int dumpLimit) {
		this.dumpLimit = dumpLimit;
	}

	public void setLockService(LockService lockService) {
		this.lockService = lockService;
	}

}
