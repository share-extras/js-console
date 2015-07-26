<import resource="classpath:alfresco/templates/webscripts/de/fme/jsconsole/listscripts.get.js">

var isUpdate = args.isUpdate;

var saveScript = function saveScript(){
    var scriptFolder = search.selectNodes("/app:company_home/app:dictionary/app:scripts")[0];
    if (scriptFolder) {
        var scriptNode;
        if(isUpdate && isUpdate=="true"){
            scriptNode = scriptFolder.childByNamePath(args.name);
        }else{
            scriptNode = scriptFolder.createFile(args.name);
        }
    	scriptNode.content = json.get('jsScript');
    	scriptNode.properties["jsc:freemarkerScript"].content=json.get('fmScript');
    	scriptNode.save();
    }else{
        logger.warn('No script folder');
    }
}

saveScript();

// from listScripts.get.js
findAvailableScripts();
