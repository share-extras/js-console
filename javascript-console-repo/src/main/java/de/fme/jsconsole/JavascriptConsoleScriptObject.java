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
import org.alfresco.repo.jscript.ScriptNode.ScriptContentData;
import org.alfresco.repo.lock.mem.LockState;
import org.alfresco.repo.security.authority.script.ScriptGroup;
import org.alfresco.repo.security.authority.script.ScriptUser;
import org.alfresco.repo.site.script.Site;
import org.alfresco.service.cmr.audit.AuditQueryParameters;
import org.alfresco.service.cmr.audit.AuditService;
import org.alfresco.service.cmr.audit.AuditService.AuditQueryCallback;
import org.alfresco.service.cmr.dictionary.DictionaryService;
import org.alfresco.service.cmr.dictionary.TypeDefinition;
import org.alfresco.service.cmr.lock.LockService;
import org.alfresco.service.cmr.lock.LockStatus;
import org.alfresco.service.cmr.lock.LockType;
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
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.extensions.webscripts.ScriptContent;
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
public class JavascriptConsoleScriptObject {

	private List<String> printOutput = new ArrayList<String>();

	private List<JsConsoleDump> dumpOutput = new LinkedList<JsConsoleDump>();

	private ScriptNode space = null;

	private NodeService nodeService;

	private Logger logger;

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

	public static final String JSON_KEY_ENTRY_ID = "id";
	public static final String JSON_KEY_ENTRY_APPLICATION = "application";
	public static final String JSON_KEY_ENTRY_USER = "user";
	public static final String JSON_KEY_ENTRY_TIME = "time";
	public static final String JSON_KEY_ENTRY_VALUES = "values";

	private AtomicInteger dumpCounter = new AtomicInteger();

	private int dumpLimit;

	private LockService lockService;

	public JavascriptConsoleScriptObject(NodeService nodeService, PermissionService permissionService,
			NamespaceService namespaceService, VersionService versionService, ContentService contentService,
			DictionaryService dictionaryService, RuleService ruleService, WorkflowService workflowService,
			RenditionService renditionService, TaggingService tagService, CategoryService categoryService,
			WebDavService webDavService, AuditService auditService, SysAdminParams sysAdminParams, int dumpLimit, LockService lockService) {
		this.nodeService = nodeService;
		this.permissionService = permissionService;
		this.namespaceService = namespaceService;
		this.versionService = versionService;
		this.contentService = contentService;
		this.dictionaryService = dictionaryService;
		this.workflowService = workflowService;
		this.renditionService = renditionService;
		this.ruleService = ruleService;
		this.tagService = tagService;
		this.categoryService = categoryService;
		this.webDavService = webDavService;
		this.auditService = auditService;
		this.sysAdminParams = sysAdminParams;
		this.lockService = lockService;
		this.dumpLimit = dumpLimit;
	}
	
	/**
	 * Default constructor with print output stored in an internal data structure.
	 */
	public JavascriptConsoleScriptObject()
	{
	    // NO-OP as default constructor
	}
	
	/**
	 * Alternative constructor that allows clients to provide a specific data structure for print output management.
	 */
	public JavascriptConsoleScriptObject(List<String> printOutput)
    {
        this.printOutput = printOutput;
    }
	
	public ScriptNode getSpace() {
		return space;
	}

	public void setSpace(ScriptNode space) {
		this.space = space;
	}

	public JavascriptConsoleScriptLogger getLogger() {
		return new JavascriptConsoleScriptLogger(this);
	}

	public void print(Object obj) {

		if (obj != null) {

			Object value = ScriptValueConverter.unwrapValue(obj);

			if (value instanceof Collection<?>) {
				Collection<?> col = (Collection<?>) value;
				Iterator<?> colIter = col.iterator();
				int counter = 0;
				while (colIter.hasNext()) {
					printOutput.add("" + counter + " : " + formatValue(colIter.next()));
					counter++;
				}
			} else {
				printOutput.add(formatValue(value));
			}
		} else {
			printOutput.add("null");
		}

	}

	@SuppressWarnings("unchecked")
	private String formatValue(Object value) {

		if (value == null)
			return "null";

		if (value instanceof ScriptNode) {
			return formatScriptNode((ScriptNode) value);
		} else if (value instanceof ScriptContent) {
			return formatScriptContent((ScriptContent) value);
		} else if (value instanceof ScriptGroup) {
			return formatScriptGroup((ScriptGroup) value);
		} else if (value instanceof ScriptUser) {
			return formatScriptUser((ScriptUser) value);
		} else if (value instanceof NodeRef) {
			return formatNodeRef((NodeRef) value);
		} else if (value instanceof ChildAssociationRef) {
			return formatChildAssoc((ChildAssociationRef) value);
		} else if (value instanceof ScriptContentData) {
			return formatScriptContentData((ScriptContentData) value);
		} else if (value instanceof Site) {
			return formatSite((Site) value);
		} else if (value instanceof Map) {
			return formatMap((Map<String, Object>) value);
		}
		return value.toString();
	}

	private String formatMap(Map<String, Object> map) {
		StringBuffer buffer = new StringBuffer();
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			if (entry != null) {
				buffer.append(formatValue(entry.getKey()));
				buffer.append(" : ");
				buffer.append(formatValue(entry.getValue()));
				buffer.append("\n");
			}
		}
		return buffer.toString();
	}

	private String formatScriptUser(ScriptUser value) {
		return "ScriptUser: " + value.getUserName() + " (" + value.getFullName() + ")";
	}

	private String formatSite(Site site) {
		return "Site: " + site.getShortName() + " (" + site.getTitle() + ", " + site.getNode().getNodeRef() + ")";
	}

	private String formatScriptGroup(ScriptGroup value) {
		return "ScriptGroup: " + value.getShortName() + " (" + value.getFullName() + ")";
	}

	private String formatScriptContent(ScriptContent value) {
		return "ScriptContent: " + value.getPath();
	}

	private String formatChildAssoc(ChildAssociationRef value) {
		return "ChildAssociationRef: parent=" + value.getParentRef().toString() + ", child=" + value.getChildRef().toString();
	}

	private String formatNodeRef(NodeRef value) {
		return "NodeRef: " + value.toString();
	}

	private String formatScriptContentData(ScriptContentData value) {
		return "ScriptContentData: " + value.getMimetype() + " Size:" + value.getSize() + " URL:" + value.getUrl();
	}

	private String formatScriptNode(ScriptNode value) {
		return value.getName() + " (" + value.getNodeRef() + ")";
	}

	public List<String> getPrintOutput() {
	    // defensive copy
		return new ArrayList<String>(this.printOutput);
	}

	public List<JsConsoleDump> getDumpOutput() {
		return dumpOutput;
	}

	public void addDump(Object obj) {
		if (obj != null) {
			Object value = ScriptValueConverter.unwrapValue(obj);

			if (value instanceof Collection<?>) {
				Collection<?> col = (Collection<?>) value;
				Iterator<?> colIter = col.iterator();
				int currentValue = dumpCounter.get();
				while (colIter.hasNext()) {
					if (currentValue <= dumpLimit) {
						dumpOutput.add(dumpObject(colIter.next()));
						currentValue = dumpCounter.incrementAndGet();
					} else {

					}
				}
			} else {
				int currentValue = dumpCounter.getAndIncrement();
				if (currentValue <= dumpLimit) {
					dumpOutput.add(dumpObject(value));
				} else {

				}
			}
		}
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

				if (logger.isDebugEnabled())
					logger.debug("Ignoring property '" + nextLongQName + "' as it's namespace is not registered");
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

					entry.put(JSON_KEY_ENTRY_ID, entryId);
					entry.put(JSON_KEY_ENTRY_APPLICATION, applicationName);
					if (user != null) {
						entry.put(JSON_KEY_ENTRY_USER, user);
					}
					entry.put(JSON_KEY_ENTRY_TIME, new Date(time));
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
						entry.put(JSON_KEY_ENTRY_VALUES, valueStrings);
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

}
