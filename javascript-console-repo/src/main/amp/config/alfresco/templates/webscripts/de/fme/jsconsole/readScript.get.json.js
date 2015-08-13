
var nodeRef= args.nodeRef;

var readScript = function saveScript(){
    var scriptFolder = search.selectNodes("/app:company_home/app:dictionary/app:scripts")[0];
    if (scriptFolder) {
        var scriptNode;
        if(isUpdate){
            scriptNode = scriptFolder.childByNamePath(args.name);
        }else{
            scriptNode = scriptFolder.createFile(args.name);
        }
    	scriptNode.content = json.get('jsScript');
    	scriptNode.properties["jsc:freemarkerScript"] = json.get('fmScript');
    	scriptNode.save();
    }else{
        logger.warn('No script folder');
    }
}

saveScript();

// from listScripts.get.js
findAvailableScripts();
