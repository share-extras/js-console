<import resource="classpath:alfresco/extension/templates/webscripts/de/fme/jsconsole/listscripts.get.js">

var isUpdate = args.isUpdate;

var saveScript = function saveScript(){
    var scriptFolder = search.xpathSearch("/app:company_home/app:dictionary/app:scripts")[0];
    if (scriptFolder) {
        var scriptNode;
        if(isUpdate){
            scriptNode = scriptFolder.childByNamePath(args.name);
        }else{
            scriptNode = scriptFolder.createFile(args.name);
        }
    	scriptNode.content = json.get('jsScript');
//    	scriptNode.properties["jsc:freemarkerScript"] = json.get('fmScript');
    	logger.error("fmScript: "+json.get('fmScript'));
    	scriptNode.save();
    }else{
        logger.warn('No script folder');
    }
}

saveScript();

// from listScripts.get.js
findAvailableScripts();
