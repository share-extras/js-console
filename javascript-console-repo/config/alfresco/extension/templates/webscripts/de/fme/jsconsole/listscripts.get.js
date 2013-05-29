var prepareOutput= function prepareOutput(folder) {
  var scriptlist = [];

  var children = folder.children;
  children.sort(function(a,b) {
	 return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0); 
  });

  for (c in children) {
    var node = children[c];
    
    if (node.isContainer) {
       scriptlist.push({text : node.name, submenu : {
            id: node.properties["sys:node-uuid"], itemdata : prepareOutput(node) 
       }});
    }
    else {
       scriptlist.push({text : node.name, value : node.nodeRef});
    }
  }
  
  return scriptlist;
}

var findAvailableScripts = function findAvailableScripts(){
    var scriptFolder = search.xpathSearch("/app:company_home/app:dictionary/app:scripts")[0];
    if (scriptFolder) {
    	model.scripts = jsonUtils.toJSONString(prepareOutput(scriptFolder));
    }
    else {
    	model.scripts = "[]";
    }
}

findAvailableScripts();
