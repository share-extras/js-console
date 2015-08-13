function getSearchCount(query){
    var count, paging = {
            skipCount : 0
    }, def =
    {
            query: query,
            store: 'workspace://SpacesStore',
            language: 'fts-alfresco',
            page: paging
    };
    
    if (search.queryResultSet !== undefined) {
        // Alfresco 5.0+ allows access to SOLR metadata without requiring to load any results (and mess up caches)
        paging.limit = 0;
        count = search.queryResultSet(def).meta.numberFound;
    } else {
        // note that this high limit may mess up caches due to loading so many nodes
        paging.limit = 1000000;
        count = search.query(def).length;
    }


    return count;

}

function getWorkflowCount(){
    var definitions = workflow.getAllDefinitions();
    var sum =0;
    for (var i = 0; i < definitions.length; i++) {
        var def = definitions[i];
        sum+=def.getActiveInstances().length;
    }
    return sum;
}

    function getCurrentRunningJobs(){
        var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
        var scheduler = ctx.getBean("schedulerFactory");
        var size = scheduler.getCurrentlyExecutingJobs().size();
        var jobs="";
        for (var i = 0; i < size; i++) {
             var job= scheduler.getCurrentlyExecutingJobs().get(i).getTrigger().fullName;
            jobs+=job+" ";
        }

        return size +" ("+jobs+")";
    }

function getLicenseRemainingDays(){
    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var license= ctx.getBean("licenseService");
    return license.getLicense().getRemainingDays();
}

function getRepoInfos(){
    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var repo= ctx.getBean("RepoServerMgmt");
    return repo.getLicense().getRemainingDays();
}


function getModules(){
    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var modules= ctx.getBean("ModuleService");
    var modulesList = modules.getAllModules();

    var modulesText="";
    for (var i = 0; i < modulesList.size(); i++) {
        var module= modulesList.get(i);
        modulesText+=module.id+" v"+module.version;
        if(i!=modulesList.size()-1){
            modulesText+=" - ";
        }
    }

    return modulesList.size() +" ("+modulesText+")";
}

function getRunningTransactions(){
    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var solr = ctx.getBean("solrDAO");
    return solr.getTransactions(0,0,java.lang.Long.MAX_VALUE,java.lang.Long.MAX_VALUE,java.lang.Integer.MAX_VALUE-1).size();
}

function getTransactionInfos(transactionId){
    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var solrIndex = ctx.getBean("search.solrIndexCheckService");
    var nodes = solrIndex.transactionNodesReport("alfresco", transactionId).getNodes();
    var transactionInfo=[];
    for (var i = 0; i < nodes.size(); i++) {
        var values = nodes.get(i).getValues();
        var nodeDbId = values["Node DBID"];
        var dbTxStatus = values["DB TX status"];
        transactionInfo.push(nodeDbId+"("+dbTxStatus+")");
    }

    return transactionInfo.join(",<br/>");
}


function getTenantSize(){

    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var tenantDao = ctx.getBean("tenantAdminDAO");
    return tenantDao.listTenants().size();
}


function getAppliedPatches(){

    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var patchService= ctx.getBean("PatchService");
    return patchService.getPatches(null,null).size();
}

function getScheduledActionsCount(){

    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var scheduledActions= ctx.getBean("scheduledPersistedActionService");
    return scheduledActions.listSchedules().size();
}

function getPolicyComponentCount(){

    var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
    var policyComponent= ctx.getBean("policyComponent");
    return policyComponent.getRegisteredPolicies().size();
}




function getJavaArgs(){
    var inputArgs = java.lang.management.ManagementFactory.getRuntimeMXBean().getInputArguments();
    var inputArgLists="";
    for (var i = 0; i < inputArgs.size(); i++) {
        var inputArg = inputArgs.get(i);
        inputArgLists+=inputArg+"\n";
    }
    return inputArgLists;
}

function getJavaUptime(){
    var dateFormat = new Packages.java.text.SimpleDateFormat("HH'h':mm'min':ss'sec'");
    dateFormat.setTimeZone(Packages.java.util.TimeZone.getTimeZone("GMT"));
    var uptime = Packages.java.lang.management.ManagementFactory.getRuntimeMXBean().getUptime();
    var formatted = Packages.org.apache.commons.lang.StringUtils.substringBefore((uptime / (3600 * 1000 * 24)),".") + "d:" + dateFormat.format(uptime);
    return formatted;
}


model.hostAddress = java.net.InetAddress.getLocalHost().getHostAddress();
model.hostName = java.net.InetAddress.getLocalHost().getHostName();

model.edition = server.edition;
model.schema = server.schema;
model.version = server.version;
//model.licenseDaysLeft = getLicenseRemainingDays();
//model.modules =getModules();

model.sitesCount = siteService.listSites("", "").length;
model.groupsCount = groups.getGroups("", utils.createPaging(100000, 0)).length;
model.groupId =search.selectNodes("/sys:system/sys:authorities")[0].nodeRef;
model.peopleCount = people.getPeople("", 100000).length;
model.peopleId =search.selectNodes("/sys:system/sys:people")[0].nodeRef;

try {
    model.tagsCount = taggingService.getTags("workspace://SpacesStore").length;
} catch(e) {
    // TaggingService is index-dependant via CategoryService, so it may fail without an active index
    model.tagsCount = -1;
}

model.workflowDefinitions = workflow.getLatestDefinitions().length;
model.workflowAllDefinitions = workflow.getAllDefinitions().length;
model.workflowCount = getWorkflowCount();
try {
    model.folderCount = getSearchCount("TYPE:folder");
    model.docsCount = getSearchCount("TYPE:content");
    model.checkedOutCount = getSearchCount("ASPECT:checkedOut");
} catch(e) {
    // the queries are simple enough to be executed via DB FTS, but that feature may not be available / enabled
    model.folderCount = -1;
    model.docsCount = -1;
    model.checkedOutCount = -1;
}

model.classifications= classification.allClassificationAspects.length;
model.runningActions = actionTrackingService.allExecutingActions.length;
//model.runningJobs = getCurrentRunningJobs();
model.runningJobs = "";

//model.scheduledActions = getScheduledActionsCount();
//model.registeredPolicies = getPolicyComponentCount();
model.scheduledActions = "";
model.registeredPolicies = "";


//model.transactionsCount = getRunningTransactions();
//model.transactionInfos = getTransactionInfos(8);
//model.tenantCount = getTenantSize();
//model.patchCount=getAppliedPatches();

model.transactionsCount = ""
model.transactionInfos = ""
model.tenantCount = ""
model.patchCount=""


model.threadCount = java.lang.management.ManagementFactory.getThreadMXBean().getThreadCount();

var deadlockThreadIds;
var deadlockThreads = java.lang.management.ManagementFactory.getThreadMXBean().findDeadlockedThreads();
if(deadlockThreads==null){
    deadlockThreadIds=0;
}else{
    deadlockThreadIds=deadlockThreads.length;
}

model.deadlockThreads=deadlockThreadIds;


model.osname=java.lang.management.ManagementFactory.getOperatingSystemMXBean().getName();
model.arch = java.lang.management.ManagementFactory.getOperatingSystemMXBean().getArch();
model.osversion = java.lang.management.ManagementFactory.getOperatingSystemMXBean().getVersion();
model.processorCount = java.lang.management.ManagementFactory.getOperatingSystemMXBean().getAvailableProcessors();
model.systemLoad = java.lang.management.ManagementFactory.getOperatingSystemMXBean().getSystemLoadAverage()==-1?"n/a":java.lang.management.ManagementFactory.getOperatingSystemMXBean().getSystemLoadAverage();

var operating =  Packages.java.lang.management.ManagementFactory.getOperatingSystemMXBean();
model.freeMemory = Packages.org.apache.commons.lang.StringUtils.substringBefore(operating.getFreePhysicalMemorySize()/1024/1024,".");
model.totalMemory = Packages.org.apache.commons.lang.StringUtils.substringBefore(operating.getTotalPhysicalMemorySize()/1024/1024,".");

model.java = java.lang.management.ManagementFactory.getRuntimeMXBean().getVmName()+" (version: "+java.lang.System.getProperty('java.version')+"- "+java.lang.management.ManagementFactory.getRuntimeMXBean().getVmVersion()+" ,"+java.lang.management.ManagementFactory.getRuntimeMXBean().getName()+", vendor:"+java.lang.management.ManagementFactory.getRuntimeMXBean().getVmVendor();
model.javaArgs = getJavaArgs();
model.javaUptime = getJavaUptime();

model.hostUserInfo=java.lang.System.getProperty('user.name')+' ('+java.lang.System.getProperty('user.home')+')';
