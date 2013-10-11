function getSearchCount(query){
    var paging =
    {
      maxItems: 1000000,
      skipCount: 0
    };

    var def =
    {
        query: query,
      store: 'workspace://SpacesStore',
      language: 'fts-alfresco',
      page: paging
    };

    return search.query(def).length;

}


model.hostAddress = java.net.InetAddress.getLocalHost().getHostAddress();
model.hostName = java.net.InetAddress.getLocalHost().getHostName();

model.edition = server.edition;
model.schema = server.schema;
model.version = server.version;
model.sitesCount = siteService.listSites("", "").length;
model.groupsCount = groups.getGroups("", utils.createPaging(100000, 0)).length;
model.peopleCount = people.getPeople("", 100000).length;
model.tagsCount = taggingService.getTags("workspace://SpacesStore").length;
model.workflowDefinitions = workflow.getLatestDefinitions().length;
model.folderCount = getSearchCount("TYPE:folder");
model.docsCount = getSearchCount("TYPE:content");
model.checkedOutCount = getSearchCount("ASPECT:checkedOut");