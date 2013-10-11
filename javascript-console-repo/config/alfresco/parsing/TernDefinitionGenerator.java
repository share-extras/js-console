package de.fme.jsconsole.parsing;

import java.beans.Introspector;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.VariableDeclaration;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Multimap;
import com.google.common.collect.Sets;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import de.fme.jsconsole.PerfLog;

/**
 * Testing the behaviour.
 *
 * @author jgoldhammer
 *
 */
public class TernDefinitionGenerator {

	/**
     *
     */
	private static final String REPO_SCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-repository-src/java/org/alfresco/repo";
	private static final String REMOTESCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-remote-api-src/java/org/alfresco/repo";
	private static final String UTIL_SCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-repository-src/java/org/alfresco/util";
	private static final String SITE_SCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-repository-src/java/org/alfresco/service/cmr/site";
	private static final String INVITE_SCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-repository-src/java/org/alfresco/repo/invitation/script";
	private static final String WORKFLOW_SCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-repository-src/java/org/alfresco/service/cmr/workflow";
	private static String SURF_SCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/spring-webscripts-1.2.0-SNAPSHOT-sources/org/springframework/extensions/webscripts";
	private static final String MODEL_SCRIPT = "C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-datamodel-src/java/org/alfresco";

	public static final List<String> IGNORED_METHODS_BY_NAME;
	public static Multimap<String, String> IGNORED_METHODS_IN_CLASSES;
	public static final List<Integer> IGNORED_FIELDS_BY_MODIFIER;
	public static final HashMap<String, String> ROOTOBJECTMAPPING = new HashMap<String, String>();
	public static final Map<String, Map<String, String>> DEFINITEDRETURNPARAMS = new HashMap<String, Map<String, String>>();
	private static final int PRIVATE_MODIFIER = 2;
	private static List<String> IGNORED_CLASSES = Lists.newArrayList();
	private static List<String> hiddenTypes = new ArrayList<String>();
	static {

		IGNORED_CLASSES.add("org.alfresco.repo.template.Site");
		IGNORED_CLASSES.add("org.alfresco.repo.template.People");
		IGNORED_CLASSES.add("org.alfresco.repo.template.AVM");

		IGNORED_METHODS_BY_NAME = new ArrayList<String>();
		IGNORED_METHODS_BY_NAME.add("setServiceRegistry");
		IGNORED_METHODS_BY_NAME.add("getServiceRegistry");
		IGNORED_METHODS_BY_NAME.add("setScope");
		IGNORED_METHODS_BY_NAME.add("newInstance");
		IGNORED_METHODS_BY_NAME.add("getPrototype");
		IGNORED_METHODS_BY_NAME.add("setPrototype");
		IGNORED_METHODS_BY_NAME.add("getParentScope");
		IGNORED_METHODS_BY_NAME.add("setParentScope");
		IGNORED_METHODS_BY_NAME.add("setBehaviourFilter");
		IGNORED_METHODS_BY_NAME.add("hasInstance");
		IGNORED_METHODS_BY_NAME.add("initScope");
		IGNORED_METHODS_BY_NAME.add("setUserNameGenerator");
		IGNORED_METHODS_BY_NAME.add("setContentUsageService");
		IGNORED_METHODS_BY_NAME.add("setUserRegistrySynchronizer");
		IGNORED_METHODS_BY_NAME.add("setContentUsageService");
		IGNORED_METHODS_BY_NAME.add("setSiteService");
		IGNORED_METHODS_BY_NAME.add("getPeopleImplSearch");
		IGNORED_METHODS_BY_NAME.add("setAuthorityDAO");
		IGNORED_METHODS_BY_NAME.add("setTenantService");
		IGNORED_METHODS_BY_NAME.add("setActionTrackingService");
		IGNORED_METHODS_BY_NAME.add("setPersonService");
		IGNORED_METHODS_BY_NAME.add("setNodeService");
		IGNORED_METHODS_BY_NAME.add("setInvitationService");
		IGNORED_METHODS_BY_NAME.add("setActivityService");
		IGNORED_METHODS_BY_NAME.add("getActivityService");
		IGNORED_METHODS_BY_NAME.add("setTransferService");
		IGNORED_METHODS_BY_NAME.add("gettransferService");
		IGNORED_METHODS_BY_NAME.add("makeScriptGroups");
		IGNORED_METHODS_BY_NAME.add("loadRenditionDefinitionImpl");
		IGNORED_METHODS_BY_NAME.add("setNamespaceService");
		IGNORED_METHODS_BY_NAME.add("setAuthenticationContext");
		IGNORED_METHODS_BY_NAME.add("setSearchService");
		IGNORED_METHODS_BY_NAME.add("onBootstrap");
		IGNORED_METHODS_BY_NAME.add("setRepositoryWorkflowDefsLocations");
		IGNORED_METHODS_BY_NAME.add("getDictionaryDAO");
		IGNORED_METHODS_BY_NAME.add("setRepositoryHelper");
		IGNORED_METHODS_BY_NAME.add("setJsonConversionComponent");
		IGNORED_METHODS_BY_NAME.add("setSearchSubsystemSwitchableApplicationContextFactory");
		IGNORED_METHODS_BY_NAME.add("setFormService");
		IGNORED_METHODS_BY_NAME.add("setReplicationService");
		IGNORED_METHODS_BY_NAME.add("setStoreUrl");
		IGNORED_METHODS_BY_NAME.add("setAuthenticationService");
		IGNORED_METHODS_BY_NAME.add("setPreferenceService");
		IGNORED_METHODS_BY_NAME.add("getCrossRepositoryCopyHelper");
		IGNORED_METHODS_BY_NAME.add("setSourceBeanName");
		IGNORED_METHODS_BY_NAME.add("setPermissionService");
		IGNORED_METHODS_BY_NAME.add("getTransferService");
		IGNORED_METHODS_BY_NAME.add("getAuthorityService");
		IGNORED_METHODS_BY_NAME.add("getExecutionDetails");
		IGNORED_METHODS_BY_NAME.add("getRenderingEngineDefinition");
		IGNORED_METHODS_BY_NAME.add("afterPropertiesSet");
		IGNORED_METHODS_BY_NAME.add("getValueConverter");
		IGNORED_METHODS_BY_NAME.add("createValueConverter");
		IGNORED_METHODS_BY_NAME.add("setAuthorityService");

		IGNORED_METHODS_IN_CLASSES = ArrayListMultimap.create();
		IGNORED_METHODS_IN_CLASSES.put("Search", "query1");
		IGNORED_METHODS_IN_CLASSES.put("Search", "query2");
		IGNORED_METHODS_IN_CLASSES.put("Search", "query3");
		IGNORED_METHODS_IN_CLASSES.put("NodeRef", "getNodeRefs1");
		IGNORED_METHODS_IN_CLASSES.put("NodeRef", "logNodeRefError");
		IGNORED_METHODS_IN_CLASSES.put("ScriptUser", "getAuthorityType");
		IGNORED_METHODS_IN_CLASSES.put("Authority", "getAuthorityType");
		IGNORED_METHODS_IN_CLASSES.put("ScriptPagingDetails", "buildPagingRequest");
		IGNORED_METHODS_IN_CLASSES.put("ScriptableHashMap", "getDefaultValue");
		IGNORED_METHODS_IN_CLASSES.put("ScriptGroup", "getAuthorityType");
		IGNORED_METHODS_IN_CLASSES.put("ScriptGroup", "setAuthorityType");
		IGNORED_METHODS_IN_CLASSES.put("ScriptNode", "getNamespacePrefixResolver");
		IGNORED_METHODS_IN_CLASSES.put("ScriptActionTrackingService", "getExecutingActions1");
		IGNORED_METHODS_IN_CLASSES.put("ScriptRenditionDefinition", "getRenditionDefinition");
		IGNORED_METHODS_IN_CLASSES.put("ScriptReplicationDefinition", "getReplicationDefinition");
		IGNORED_METHODS_IN_CLASSES.put("ScriptPagingDetails", "getConfidence");
		IGNORED_METHODS_IN_CLASSES.put("QName", "resolveToQNameString");
		IGNORED_METHODS_IN_CLASSES.put("QName", "resolveToQName");
		IGNORED_METHODS_IN_CLASSES.put("QName", "createQName1");
		IGNORED_METHODS_IN_CLASSES.put("QName", "createQName2");
		IGNORED_METHODS_IN_CLASSES.put("QName", "createQName3");
		IGNORED_METHODS_IN_CLASSES.put("QName", "getNamespacePrefixResolver");
		IGNORED_METHODS_IN_CLASSES.put("QName", "toPrefixString1");
		IGNORED_METHODS_IN_CLASSES.put("QName", "getPrefixedQName");
		IGNORED_METHODS_IN_CLASSES.put("ScriptableUtils", "parseXMLNodeModel");
		IGNORED_METHODS_IN_CLASSES.put("AtomService", "setAbderaService");
		IGNORED_METHODS_IN_CLASSES.put("AtomService", "setAbderaService");
		IGNORED_METHODS_IN_CLASSES.put("AtomService", "setAbderaService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setPaging");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISDictionaryService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISAccessControlService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISChangeLogService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISQueryService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISAccessControlService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISChangeLogService");
		IGNORED_METHODS_IN_CLASSES.put("CMISScript", "setCMISReferenceFactory");

		IGNORED_FIELDS_BY_MODIFIER = new ArrayList<Integer>();
		IGNORED_FIELDS_BY_MODIFIER.add(PRIVATE_MODIFIER);

		ROOTOBJECTMAPPING.put("Cache", "cache");
		ROOTOBJECTMAPPING.put("DefaultUrlModel", "url");
		ROOTOBJECTMAPPING.put("FormatModel", "format");
		ROOTOBJECTMAPPING.put("Activity", "activities");
		ROOTOBJECTMAPPING.put("Actions", "actions");
		ROOTOBJECTMAPPING.put("ApplicationScriptUtils", "appUtils");
		ROOTOBJECTMAPPING.put("AVM", "avm");
		ROOTOBJECTMAPPING.put("BulkImport", "bulkFSImport");
		ROOTOBJECTMAPPING.put("Classification", "classification");
		// ROOTOBJECTMAPPING.put("cmis", "CMISLocalConnectionManagerImpl");
		ROOTOBJECTMAPPING.put("CMISScript", "cmisServer");
		ROOTOBJECTMAPPING.put("CrossRepositoryCopy", "crossRepoCopy");
		ROOTOBJECTMAPPING.put("Imap", "imap");
		ROOTOBJECTMAPPING.put("FormatModel", "format");
		ROOTOBJECTMAPPING.put("JSONUtils", "jsonUtils");
		ROOTOBJECTMAPPING.put("ScriptLogger", "logger");
		ROOTOBJECTMAPPING.put("ScriptMessage", "msg");
		ROOTOBJECTMAPPING.put("Paging", "paging");
		ROOTOBJECTMAPPING.put("People", "people");
		ROOTOBJECTMAPPING.put("Presence", "presence");
		ROOTOBJECTMAPPING.put("Search", "search");
		ROOTOBJECTMAPPING.put("Session", "session");
		ROOTOBJECTMAPPING.put("SlingshotDocLibCustomResponse", "slingshotDocLib");
		ROOTOBJECTMAPPING.put("ScriptableUtils", "stringUtils");
		ROOTOBJECTMAPPING.put("ScriptTestUtils", "test");
		ROOTOBJECTMAPPING.put("ScriptUtils", "utils");
		ROOTOBJECTMAPPING.put("WebProjects", "webprojects");
		ROOTOBJECTMAPPING.put("WorkflowManager", "workflow");
		ROOTOBJECTMAPPING.put("ActionTrackingService", "actionTrackingService");
		// ROOTOBJECTMAPPING.put("AtomService", "atom");
		ROOTOBJECTMAPPING.put("ScriptCommentService", "commentService");
		ROOTOBJECTMAPPING.put("ScriptFormService", "formService");
		ROOTOBJECTMAPPING.put("ScriptAuthorityService", "groups");
		ROOTOBJECTMAPPING.put("ScriptInvitationService", "invitations");
		ROOTOBJECTMAPPING.put("ScriptPreferenceService", "preferenceService");
		ROOTOBJECTMAPPING.put("ScriptRatingService", "ratingService");
		ROOTOBJECTMAPPING.put("ScriptRenditionService", "renditionService");
		ROOTOBJECTMAPPING.put("ScriptReplicationService", "replicationService");
		ROOTOBJECTMAPPING.put("ScriptSiteService", "siteService");
		ROOTOBJECTMAPPING.put("ScriptTaggingService", "taggingService");
		ROOTOBJECTMAPPING.put("ScriptThumbnailService", "thumbnailService");
		ROOTOBJECTMAPPING.put("ScriptTransferService", "transfer");
		ROOTOBJECTMAPPING.put("ScriptActionTrackingService", "actionTrackingService");

		HashMap<String, String> value = Maps.newHashMap();
		value.put("getTasks", "[JscriptWorkflowTask]");

		DEFINITEDRETURNPARAMS.put("JscriptWorkflowPath", value);

		value = Maps.newHashMap();
		value.put("getCreatedDate", "Date.prototype");

		DEFINITEDRETURNPARAMS.put("AVMScriptStore", value);

		value = Maps.newHashMap();
		value.put("getCreatedDate", "Date.prototype");

		DEFINITEDRETURNPARAMS.put("ScriptPreferenceService", value);

		value = Maps.newHashMap();
		value.put("getAssignedTasks", "[JscriptWorkflowTask]");
		value.put("getCompletedTasks", "[JscriptWorkflowTask]");
		value.put("getPooledTasks", "[JscriptWorkflowTask]");
		value.put("getLatestDefinitions", "[JscriptWorkflowDefinition]");
		value.put("getAllDefinitions", "[JscriptWorkflowDefinition]");
		value.put("getAssignedTasksByState", "[JscriptWorkflowTask]");

		DEFINITEDRETURNPARAMS.put("WorkflowManager", value);

		value = Maps.newHashMap();
		value.put("getProperties", "Properties");
		value.put("getPackageResources", "[ScriptNode]");
		DEFINITEDRETURNPARAMS.put("JscriptWorkflowTask", value);

		value = Maps.newHashMap();
		value.put("getActiveInstances", "[JscriptWorkflowInstance]");
		DEFINITEDRETURNPARAMS.put("JscriptWorkflowDefinition", value);

		value = Maps.newHashMap();
		value.put("getTransitions", "[JscriptWorkflowTransition]");
		DEFINITEDRETURNPARAMS.put("JscriptWorkflowNode", value);

		value = Maps.newHashMap();
		value.put("getStartDate", "Date.prototype");
		value.put("getEndDate", "Date.prototype");
		value.put("getPaths", "[JscriptWorkflowPath]");
		DEFINITEDRETURNPARAMS.put("JscriptWorkflowInstance", value);

		value = Maps.newHashMap();
		value.put("getAspects", "[string]");
		value.put("getPermissions", "[string]");
		value.put("getDirectPermissions", "[string]");
		value.put("getFullPermissions", "[string]");
		value.put("getSettablePermissions", "[string]");
		value.put("getVersionHistory", "[ScriptVersion]");
		value.put("getActiveWorkflows", "[JscriptWorkflowInstance]");
		value.put("getPropertyNames", "[string]");
		value.put("getTypePropertyNames", "[string]");
		value.put("getProperties", "Properties");
		DEFINITEDRETURNPARAMS.put("ScriptNode", value);

		value = Maps.newHashMap();
		value.put("getPeople", "[NodeRef]");
		DEFINITEDRETURNPARAMS.put("People", value);

		value = Maps.newHashMap();
		value.put("getAllCategoryNodes", "[CategoryNode]");
		value.put("getRootCategories", "[CategoryNode]");
		value.put("getCategoryUsage", "[Tag]");
		DEFINITEDRETURNPARAMS.put("Classification", value);

		hiddenTypes.add("BaseScopableProcessorExtension");
		hiddenTypes.add("BaseTemplateProcessorExtension");
		hiddenTypes.add("CropContentMethod");
		hiddenTypes.add("ShortQNameMethod");
		hiddenTypes.add("BulkImport");

	}

	// use ASTParse to parse string
	public static void parse(String str, ParsingContext context) throws JSONException {

		ASTParser parser = setupParser(str);

		final CompilationUnit cu = (CompilationUnit) parser.createAST(null);
		List<TypeDeclaration> types = cu.types();
		String packageName = null;
		if (cu.getPackage() != null) {
			packageName = cu.getPackage().getName().toString();
		}
		for (AbstractTypeDeclaration declaration : types) {
			TypeDeclaration typeDeclaration;
			if (declaration instanceof TypeDeclaration) {
				typeDeclaration = (TypeDeclaration) declaration;
				String typeName = typeDeclaration.getName().toString();

				if (!IGNORED_CLASSES.contains(packageName + "." + typeName)) {

					Type superclassType = typeDeclaration.getSuperclassType();
					if (superclassType instanceof SimpleType) {
						SimpleType simpleParentClass = (SimpleType) superclassType;

						boolean isRootObject = simpleParentClass.getName().toString().equals("BaseScopableProcessorExtension")
								|| simpleParentClass.getName().toString().equals("BaseProcessorExtension");
						if (isRootObject) {
							context.putRootType(typeName, typeDeclaration);
						} else {
							context.putInterestingTypes(typeName, typeDeclaration);
						}
					} else {
						context.putInterestingTypes(typeName, typeDeclaration);
					}

					if (ROOTOBJECTMAPPING.containsKey(typeName)) {
						context.putRootType(typeName, typeDeclaration);
					}

					if (packageName != null) {
						context.putPackageDeclaration(typeName, packageName);
					}
				}
			}
		}
	}

	/**
	 * @param definition
	 * @throws JSONException
	 *
	 */
	private static void addRootObjects(JsonObject definition) throws JSONException {
		JsonObject description = new JsonObject();
		description.addProperty("!type", "ScriptNode");
		description.addProperty("!doc", "The company home ScriptNode. See ScriptNode API for properties and methods.");
		definition.add("companyHome", description);

		description = new JsonObject();
		description.addProperty("!type", "ScriptNode");
		description.addProperty("!doc", "The current document ScriptNode (if any)");
		definition.add("document", description);

		description = new JsonObject();
		description.addProperty("!type", "ScriptNode");
		description
				.addProperty(
						"!doc",
						"The ScriptNode representing the Person object of the currently authenticated user. See ScriptNode API for properties and methods.");
		definition.add("person", description);

		description = new JsonObject();
		description.addProperty("!type", "ScriptNode");
		description.addProperty("!doc",
				"The store root ScriptNode. The repository root folder. See ScriptNode API for properties and methods.");
		definition.add("roothome", description);

		description = new JsonObject();
		description.addProperty("!type", "ScriptNode");
		description
				.addProperty("!doc",
						"The ScriptNode representing the script object itself. This is only available if the script is loaded from the Java classpath.");
		definition.add("script", description);

		description = new JsonObject();
		description.addProperty("!type", "ScriptNode");
		description
				.addProperty(
						"!doc",
						"The current space ScriptNode (if any). For a script executing from a rule, the space object is the space in which the rule resides. If the rule is inherited, this may not be the expected space.");
		definition.add("space", description);

		description = new JsonObject();
		description.addProperty("!type", "ScriptNode");
		description.addProperty("!doc",
				"The current user's Home Space ScriptNode. See ScriptNode API for properties and methods.");
		definition.add("userhome", description);

		description = new JsonObject();
		description.addProperty("!type", "bool");
		description.addProperty("!doc", "True if the user is logged in as a guest.");
		definition.add("guest", description);

		description = new JsonObject();
		description.addProperty("!type", "?");
		description.addProperty("!doc",
				"Used to pass a model from the control script to the view renderer (template). Web scripts only.");
		definition.add("model", description);

		description = new JsonObject();
		description.addProperty("!type", "?");
		description.addProperty("!doc", "Server details");
		definition.add("server", description);

		description = new JsonObject();
		description.addProperty("!type", "Map");
		description.addProperty("!doc", "List of arguments passed to the script");
		definition.add("args", description);

		description = new JsonObject();
		description.addProperty("!type", "Map");
		description.addProperty("!doc", "a map of (array) arguments from Web Script Request (for scripting)");
		definition.add("argsM", description);

	}

	/**
	 * @param typeDeclaration
	 * @param additionalTypesAsList
	 * @param allTypes
	 * @param shouldTrackTypes
	 * @throws JSONException
	 */
	private static Map<String, JsonElement> handleMethods(TypeDeclaration typeDeclaration, Set<String> additionalTypesAsList,
			List<String> allTypes) {
		// System.out.println("------------------methods-----------");

		Map<String, JsonElement> methodsAsJson = new HashMap<String, JsonElement>();
		List<String> methodNamesList = new ArrayList<String>();

		MethodDeclaration[] methods = typeDeclaration.getMethods();
		for (int i = 0; i < methods.length; i++) {
			MethodDeclaration methodDeclaration = methods[i];

			JsonObject definition = new JsonObject();
			// System.out.println("Name:" + methodDeclaration.getName());
			int modifier = methodDeclaration.getModifiers();

			// System.out.println("\n\n");
			String methodName = methodDeclaration.getName().toString();

			String newMethodName = methodName;
			int counter = 1;
			while (methodNamesList.contains(newMethodName)) {
				newMethodName = methodName + counter;
				counter++;
			}
			methodNamesList.add(newMethodName);

			Collection<String> ignoredMethod = IGNORED_METHODS_IN_CLASSES.get(typeDeclaration.getName().toString());

			if (modifier != 2 && !IGNORED_METHODS_BY_NAME.contains(methodDeclaration.getName().toString())
					&& !methodDeclaration.getName().toString().equals(typeDeclaration.getName().toString())
					&& (ignoredMethod.size() == 0 || !ignoredMethod.contains(newMethodName))) {
				JsonObject methodProperties = new JsonObject();

				if (!StringUtils.equals(newMethodName, methodName)) {
					methodProperties.addProperty("!original", methodName);
				}

				boolean hasParameters = false;
				boolean hasReturnType = false;
				List<String> parameters = getMethodParameters(methodDeclaration, typeDeclaration, additionalTypesAsList, allTypes);

				if (parameters.size() > 0) {
					hasParameters = true;
				}

				// System.out.println("Method Parameters:" + parameters);
				String returnType = null;
				Type returnType2 = methodDeclaration.getReturnType2();

				if (returnType2 != null) {

					hasReturnType = true;

					if (returnType2 instanceof ParameterizedType) {
						ParameterizedType type = (ParameterizedType) returnType2;
						// System.out.println("Type:" + type);

						if (type.getType() instanceof SimpleType) {
							SimpleType simpleType = (SimpleType) type.getType();
							String elementType = simpleType.getName().getFullyQualifiedName();
							if (elementType.equals("Object")) {
								returnType = "[ScriptNode]";
							} else {

								returnType = getSimpleType(simpleType, methodDeclaration, typeDeclaration, true,
												additionalTypesAsList, allTypes) ;
							}
						} else {
							returnType = type.toString();
						}

					} else if (returnType2 instanceof ArrayType) {
						ArrayType type = (ArrayType) returnType2;
						// System.out.println("Type:" + type);
						if (type.getElementType() instanceof SimpleType) {
							SimpleType simpleType = (SimpleType) type.getElementType();
							String elementType = simpleType.getName().getFullyQualifiedName();
							if (elementType.equals("Object")) {
								returnType = "[ScriptNode]";
							} else {

								returnType = "["
										+ getSimpleType(simpleType, methodDeclaration, typeDeclaration, true,
												additionalTypesAsList, allTypes) + "]";
							}
						} else {
							returnType = type.toString();
						}

					} else if (returnType2 instanceof SimpleType) {
						returnType = getSimpleType(returnType2, methodDeclaration, typeDeclaration, true, additionalTypesAsList,
								allTypes);

					} else if (returnType2 instanceof PrimitiveType) {
						PrimitiveType type = (PrimitiveType) returnType2;
						Code primitiveTypeCode = type.getPrimitiveTypeCode();
						if (primitiveTypeCode.equals(PrimitiveType.BOOLEAN)) {
							returnType = "bool";
						} else if (primitiveTypeCode.equals(PrimitiveType.DOUBLE) || primitiveTypeCode.equals(PrimitiveType.INT)
								|| primitiveTypeCode.equals(PrimitiveType.FLOAT) || primitiveTypeCode.equals(PrimitiveType.SHORT)
								|| primitiveTypeCode.equals(PrimitiveType.LONG)) {
							returnType = "number";
						} else if (primitiveTypeCode.equals(PrimitiveType.VOID)) {
							hasReturnType = false;
						}
						// System.out.println("primitive Type:" +
						// primitiveTypeCode);
					} else {
						System.err.println("Not recognized:" + returnType2);
					}

				}

				String typeDefinition = null;
				if (hasParameters && hasReturnType) {
					typeDefinition = MessageFormat.format("fn({0}) -> {1}", StringUtils.join(parameters, ", "), returnType);
				} else if (hasParameters && !hasReturnType) {
					typeDefinition = MessageFormat.format("fn({0})", StringUtils.join(parameters, ", "));
				} else if (!hasParameters && hasReturnType) {
					typeDefinition = MessageFormat.format("fn() -> {0}", returnType);

				} else if (!hasParameters && !hasReturnType) {
					typeDefinition = "fn()";
				}

				methodProperties.addProperty("!type", typeDefinition);

				// System.out.println("Return type:" + returnType2);
				int modifiers = methodDeclaration.getModifiers();

				// System.out.println("Modifiers:" + modifiers);

				Block body = methodDeclaration.getBody();
				// System.out.println("Body:" + body);

				Javadoc javadoc = methodDeclaration.getJavadoc();
				String escapedDoc = null;
				if (javadoc != null) {
					List<TagElement> tags = javadoc.tags();
					String javadocComplete = StringUtils.join(tags, ",");
					escapedDoc = StringEscapeUtils.escapeJavaScript(javadocComplete).trim();
					methodProperties.addProperty("!doc", escapedDoc);
				}

				if (!hasParameters && hasReturnType && methodName.startsWith("get") && !methodName.endsWith("get")) {
					JsonObject fieldProperties = new JsonObject();
					fieldProperties.addProperty("!type", returnType);
					fieldProperties.addProperty("!doc", escapedDoc + "\nsee method " + newMethodName + "\n");
					methodsAsJson.put(Introspector.decapitalize(StringUtils.substringAfter(newMethodName, "get")),
							fieldProperties);
				}

				methodsAsJson.put(newMethodName, methodProperties);

			} else {
				// System.out.println("Ignore method.\n\n");
			}
		}

		return methodsAsJson;
	}

	/**
	 * @param typeDeclaration
	 * @param definition
	 * @throws JSONException
	 */
	private static List<JSONObject> handleFields(TypeDeclaration typeDeclaration) throws JSONException {
		// System.out.println("------------------fields-----------");
		FieldDeclaration[] nodes = typeDeclaration.getFields();
		List<JSONObject> fields = new ArrayList<JSONObject>();

		for (FieldDeclaration node : nodes) {
			JSONObject field = new JSONObject();

			int modifiers = node.getModifiers();
			if (IGNORED_FIELDS_BY_MODIFIER.contains(modifiers)) {

				// System.out.println("Modifiers: " + modifiers);// 25 = public
				// static final
				// System.out.println("Fragments: " + node.fragments().get(0));

				Map<String, String> fieldProperties = new HashMap<String, String>();
				if (node.getType() instanceof ArrayType) {
					ArrayType type = (ArrayType) node.getType();
					// System.out.println("Type:" + type);
					fieldProperties.put("!type", "string");
				} else if (node.getType() instanceof SimpleType) {
					SimpleType type = (SimpleType) node.getType();
					String fullyQualifiedName = type.getName().getFullyQualifiedName();
					// System.out.println("Type:" + fullyQualifiedName);
					if (fullyQualifiedName.equals("java.lang.String")) {
						fieldProperties.put("!type", "string");
					} else {
						fieldProperties.put("!type", "" + type.getName().getFullyQualifiedName());
					}

				} else if (node.getType() instanceof PrimitiveType) {
					PrimitiveType type = (PrimitiveType) node.getType();
					Code primitiveTypeCode = type.getPrimitiveTypeCode();
					if (primitiveTypeCode.equals(PrimitiveType.BOOLEAN)) {
						fieldProperties.put("!type", "bool");
					} else if (primitiveTypeCode.equals(PrimitiveType.DOUBLE) || primitiveTypeCode.equals(PrimitiveType.INT)
							|| primitiveTypeCode.equals(PrimitiveType.FLOAT) || primitiveTypeCode.equals(PrimitiveType.SHORT)) {
						fieldProperties.put("!type", "number");
					}
					// System.out.println("primitive Type:" +
					// primitiveTypeCode);
				} else {
					System.err.println("Not recognized:" + node.getType());
				}

				String fieldValue = null;
				for (Object f : node.fragments()) {
					// System.out.println(f);

					String s = f.toString();
					if (s.contains("=")) {
						String[] arr = s.split("=");
						s = arr[0];
						fieldValue = arr[1];
						// System.out.println(s);
						// System.out.println(fieldValue);
					} else {
						fieldValue = s;
					}
				}

				field.put(fieldValue, fieldProperties);
				fields.add(field);
			}

		}
		return fields;
	}

	/**
	 * @param methodDeclaration
	 * @param typeDeclaration
	 * @param allTypes
	 * @param additionalTypesAsList
	 * @return
	 */
	private static List<String> getMethodParameters(MethodDeclaration methodDeclaration, TypeDeclaration typeDeclaration,
			Set<String> additionalTypesAsList, List<String> allTypes) {
		List<String> parameters = new ArrayList<String>();
		for (Object parameter : methodDeclaration.parameters()) {
			VariableDeclaration variableDeclaration = (VariableDeclaration) parameter;
			String paramType = null;
			Type parameterType = (Type) variableDeclaration.getStructuralProperty(SingleVariableDeclaration.TYPE_PROPERTY);

			if (parameterType != null) {

				if (parameterType instanceof ArrayType) {
					ArrayType type = (ArrayType) parameterType;
					// System.out.println("Type:" + type);
					Type elementType = type.getElementType();
					if (elementType instanceof SimpleType) {
						String simpleType = getSimpleType(elementType, methodDeclaration, typeDeclaration, false,
								additionalTypesAsList, allTypes);
						paramType = "[" + simpleType + "]";
					} else if (elementType instanceof PrimitiveType) {
						String primitiveType = getPrimitiveType(elementType);
						paramType = "[" + primitiveType + "]";
					} else {
						throw new RuntimeException("Cannot handle type " + type);
					}

				} else if (parameterType instanceof SimpleType) {
					paramType = getSimpleType(parameterType, methodDeclaration, typeDeclaration, false, additionalTypesAsList,
							allTypes);

				} else if (parameterType instanceof PrimitiveType) {
					paramType = getPrimitiveType(parameterType);
				}

			}

			parameters.add(variableDeclaration.getName().toString() + ": " + paramType);
		}
		return parameters;
	}

	/**
	 * @param paramType
	 * @param parameterType
	 * @return
	 */
	private static String getPrimitiveType(Type parameterType) {
		String paramType = null;
		PrimitiveType type = (PrimitiveType) parameterType;
		Code primitiveTypeCode = type.getPrimitiveTypeCode();
		if (primitiveTypeCode.equals(PrimitiveType.BOOLEAN)) {
			paramType = "bool";
		} else if (primitiveTypeCode.equals(PrimitiveType.DOUBLE) || primitiveTypeCode.equals(PrimitiveType.INT)
				|| primitiveTypeCode.equals(PrimitiveType.LONG) || primitiveTypeCode.equals(PrimitiveType.FLOAT)
				|| primitiveTypeCode.equals(PrimitiveType.SHORT)) {
			paramType = "number";
		}
		return paramType;
	}

	/**
	 * @param parameterType
	 * @param typeDeclaration
	 * @param methodDeclaration
	 * @param shouldReplace
	 * @param allTypes
	 * @param additionalTypesAsList
	 * @return
	 */
	private static String getSimpleType(Type parameterType, MethodDeclaration methodDeclaration, TypeDeclaration typeDeclaration,
			boolean shouldReplace, Set<String> additionalTypesAsList, List<String> allTypes) {
		String paramType = null;
		SimpleType type = (SimpleType) parameterType;
		String fullyQualifiedName = type.getName().getFullyQualifiedName();
		// System.out.println("Type:" + fullyQualifiedName);
		if (fullyQualifiedName.equals("Scriptable")) {
			if (shouldReplace) {
				Map<String, String> methodReturnValues = DEFINITEDRETURNPARAMS.get(typeDeclaration.getName().toString());
				if (methodReturnValues != null) {
					String returnValue = methodReturnValues.get(methodDeclaration.getName().toString());
					if (StringUtils.isNotBlank(returnValue)) {
						paramType = returnValue;
						String trackingType = paramType;
						if (trackingType.startsWith("[")) {
							trackingType = StringUtils.substring(trackingType, 2, trackingType.length());
						} else if (trackingType.startsWith("[")) {
							trackingType = StringUtils.substring(trackingType, 1, trackingType.length());
						}
						if (!allTypes.contains(trackingType)) {
							additionalTypesAsList.add(trackingType);
						}
					} else {
						paramType = "[ScriptNode]";
						if (!allTypes.contains("ScriptNode")) {
							additionalTypesAsList.add("ScriptNode");
						}
					}
				} else {
					paramType = "[ScriptNode]";
					if (!allTypes.contains("ScriptNode")) {
						additionalTypesAsList.add("ScriptNode");
					}
				}
			} else {
				paramType = "?";
				System.out.println("Scriptable:" + typeDeclaration.getName().toString() + "-"
						+ methodDeclaration.getName().toString());
				if (!allTypes.contains("Scriptable")) {
					additionalTypesAsList.add("Scriptable");
				}
			}

		} else if (fullyQualifiedName.equals("String")) {
			paramType = "string";
		} else if (fullyQualifiedName.equals("NativeObject")) {
			paramType = "?";
		} else if (fullyQualifiedName.equals("Date")) {
			paramType = "?";
		} else if (fullyQualifiedName.equals("Boolean")) {
			paramType = "bool";
		} else if (fullyQualifiedName.equals("Long")) {
			paramType = "number";
		} else if (fullyQualifiedName.equals("Object")) {
			paramType = "?";
		} else {
			if (shouldReplace) {
				Map<String, String> methodReturnValues = DEFINITEDRETURNPARAMS.get(typeDeclaration.getName().toString());
				if (methodReturnValues != null) {
					String returnValue = methodReturnValues.get(methodDeclaration.getName().toString());
					if (StringUtils.isNotBlank(returnValue)) {
						paramType = returnValue;
						String trackingType = paramType;
						if (trackingType.startsWith("[")) {
							trackingType = StringUtils.substring(trackingType, 2, trackingType.length());
						} else if (trackingType.startsWith("[")) {
							trackingType = StringUtils.substring(trackingType, 1, trackingType.length());
						}
						if (!allTypes.contains(trackingType)) {
							additionalTypesAsList.add(trackingType);
						}
					} else {
						paramType = "" + type.getName().getFullyQualifiedName();
					}

				} else {
					paramType = "" + type.getName().getFullyQualifiedName();
				}

			} else {
				paramType = "" + type.getName().getFullyQualifiedName();

			}

			if (!allTypes.contains(type.getName().getFullyQualifiedName())
					&& !methodDeclaration.getName().toString().equals(typeDeclaration.getName().toString())) {
				additionalTypesAsList.add(type.getName().getFullyQualifiedName());
			}
		}
		return paramType;
	}

	/**
	 * @param str
	 * @return
	 */
	private static ASTParser setupParser(String str) {
		ASTParser parser = ASTParser.newParser(AST.JLS4);
		parser.setSource(str.toCharArray());

		parser.setKind(ASTParser.K_COMPILATION_UNIT);

		// In order to parse 1.5 code, some compiler options need to be set to
		// 1.5
		Map options = JavaCore.getOptions();
		JavaCore.setComplianceOptions(JavaCore.VERSION_1_5, options);
		parser.setCompilerOptions(options);
		return parser;
	}

	public static PerfLog getPerfLogger() {
		return new PerfLog();
	}

	/**
	 * test reading file to String
	 *
	 * @param filePath
	 * @return
	 * @throws IOException
	 */
	public static String readFileToString(String filePath) throws IOException {
		StringBuilder fileData = new StringBuilder(1000);
		BufferedReader reader = new BufferedReader(new FileReader(filePath));

		char[] buf = new char[10];
		int numRead = 0;
		while ((numRead = reader.read(buf)) != -1) {
			// System.out.println(numRead);
			String readData = String.valueOf(buf, 0, numRead);
			fileData.append(readData);
			buf = new char[1024];
		}

		reader.close();

		return fileData.toString();
	}

	// loop directory to get file list
	public static void parseFilesInDir() throws IOException, JSONException {

		List<File> rootDirectories = new ArrayList<File>();
		rootDirectories.add(new File(REPO_SCRIPT));
		rootDirectories.add(new File(REMOTESCRIPT));
		rootDirectories.add(new File(UTIL_SCRIPT));
		rootDirectories.add(new File(SITE_SCRIPT));
		rootDirectories.add(new File(INVITE_SCRIPT));
		rootDirectories.add(new File(WORKFLOW_SCRIPT));
		rootDirectories.add(new File(SURF_SCRIPT));
		rootDirectories.add(new File(MODEL_SCRIPT));

		// File root = new
		// File("C:/DEV/alfresco/sdk/alfresco-enterprise-sdk-4.1.2/src/alfresco-repository-src/java/org/alfresco/repo/workflow/jscript");
		// //System.out.println(rootDir.listFiles());

		List<File> allFiles = new ArrayList<File>();
		for (File rootDir : rootDirectories) {
			@SuppressWarnings("unchecked")
			Collection<File> allFilesOfDir = FileUtils.listFiles(rootDir, null, true);
			allFiles.addAll(allFilesOfDir);

		}

		ParsingContext context = new ParsingContext();

		String filePath = null;
		for (File f : allFiles) {
			filePath = f.getAbsolutePath();
			if (f.isFile()) {
				parse(readFileToString(filePath), context);
			}
		}

		JsonObject definition = new JsonObject();
		definition.addProperty("!name", "alfresco");
		addRootObjects(definition);
		addInnerClasses(definition);

		Set<Entry<String, TypeDeclaration>> rootObjects = context.getRootTypes().entrySet();
		Set<String> additionalTypesAsList = Sets.newHashSet();
		List<String> allTypes = Lists.newArrayList();

		for (Entry<String, TypeDeclaration> rootObject : rootObjects) {
			generateDefinition(definition, rootObject.getKey(), rootObject.getValue(), additionalTypesAsList, context, allTypes);
		}

		List<String> unknownTypes = Lists.newArrayList();

		while (!additionalTypesAsList.isEmpty()) {
			Set<String> additionalTypesPerType = Sets.newHashSet();
			Set<String> toBeRemoved = Sets.newHashSet();
			for (String type : additionalTypesAsList) {
				TypeDeclaration typeDeclaration = context.getInterestingTypes().get(type);
				if (typeDeclaration != null) {
					generateDefinition(definition, type, typeDeclaration, additionalTypesPerType, context, allTypes);
					unknownTypes.remove(type);
					toBeRemoved.add(type);
				} else {
					toBeRemoved.add(type);
					unknownTypes.add(type);
				}
			}
			additionalTypesAsList.addAll(additionalTypesPerType);
			additionalTypesAsList.removeAll(toBeRemoved);
			additionalTypesAsList.removeAll(allTypes);
		}

		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(definition);
		json = json.replaceAll("\\\\n", "\\n");
		json = json.replaceAll("\\*", "");
		json = json.replaceAll("\"\\n", "\"");
		FileUtils.writeStringToFile(new File("c:/temp/alfresco.json"), json, "UTF-8");

		System.out.println("Unknown types- please check: " + unknownTypes);

	}

	private static void addInnerClasses(JsonObject definition) {

		JsonObject description = new JsonObject();
		description.addProperty("!doc", "Tag class returned from getCategoryUsage().");

		JsonObject methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "CategoryNode");
		description.add("categoryNode", methodDescription);

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "number");
		description.add("frequency", methodDescription);

		definition.add("Tag", description);

		description = new JsonObject();
		description.addProperty("!doc", "Contains the details of a tag within a specific tag scope.");

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "string");
		description.add("name", methodDescription);

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "number");
		description.add("count", methodDescription);

		definition.add("TagDetails", description);

		description = new JsonObject();
		description.addProperty("!doc", "Custom property helper class for Site object");

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "string");
		description.add("name", methodDescription);

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "string");
		description.add("type", methodDescription);

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "string");
		description.add("title", methodDescription);

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "?");
		description.add("value", methodDescription);

		definition.add("CustomProperty", description);

		description = new JsonObject();
		description.addProperty("!doc",
				"representation of java.util.Map which is returned often by alfresco jscript objects like ScriptNode");

		methodDescription = new JsonObject();
		methodDescription.addProperty("!type", "fn() -\u003e ?");
		description.add("get", methodDescription);

		definition.add("Map", description);

	}

	private static void generateDefinition(JsonObject definition, String typeName, TypeDeclaration rootObject,
			Set<String> additionalTypesAsList, ParsingContext context, List<String> allTypes) {

		if (!hiddenTypes.contains(typeName)) {

			String originalTypeName = typeName;
			if (ROOTOBJECTMAPPING.containsKey(typeName)) {
				typeName = ROOTOBJECTMAPPING.get(typeName);
			}

			JsonObject value = new JsonObject();
			definition.add(typeName, value);
			addTypeJavaDocs(rootObject, value, originalTypeName, context);

			Map<String, JsonElement> methods = handleMethods(rootObject, additionalTypesAsList, allTypes);
			Set<Entry<String, JsonElement>> entrySet = methods.entrySet();
			for (Entry<String, JsonElement> entry : entrySet) {
				value.add(entry.getKey(), entry.getValue());
			}
			allTypes.add(typeName);
		}

	}

	/**
	 * @param rootObject
	 * @param value
	 * @param typeName
	 * @param context
	 */
	private static void addTypeJavaDocs(TypeDeclaration rootObject, JsonObject value, String typeName, ParsingContext context) {
		String doc = null;
		if (rootObject.getJavadoc() != null) {
			@SuppressWarnings("unchecked")
			List<TagElement> tags = rootObject.getJavadoc().tags();
			String javadocComplete = StringUtils.join(tags, ",");
			doc = StringEscapeUtils.escapeJavaScript(javadocComplete);
		}
		String packageDeclaration = context.getPackage(typeName);
		if (packageDeclaration != null) {
			doc += StringEscapeUtils.escapeJavaScript("\nsee class " + packageDeclaration + "." + typeName);
		}
		if (StringUtils.isNotBlank(doc)) {
			value.addProperty("!doc", doc.trim());
		}

	}

	public static void main(String[] args) throws IOException, JSONException {
		parseFilesInDir();
		// String test ="\\\\n";
		// System.out.println(test);;
		// test = test.replaceAll("\\\\n", "\\n");
		// System.out.println(test);;

	}
}