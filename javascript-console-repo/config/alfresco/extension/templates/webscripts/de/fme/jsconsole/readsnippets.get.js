var prepareOutput= function prepareOutput(folder) {
  var scriptlist = [];

  var children = folder.children;
  
  for (c in children) {
    var node = children[c];
    if(node.isDocument && node.mimetype='application/json'){
        scriptlist.push(node.content);        
    }
  }
  
  return scriptlist;
}

var findAvailableSnippets= function findAvailableScripts(){
    var snippetsFolder = search.xpathSearch("/app:company_home/app:dictionary/cm:jsconsole/cm:snippets")[0];
    if (snippetsFolder) {
    	model.scripts = jsonUtils.toJSONString(prepareOutput(snippetsFolder));
    }
    else {
    	model.scripts = "[]";
    }
}

findAvailableScripts();
