<import resource="classpath:alfresco/templates/webscripts/de/fme/jsconsole/listscripts.get.js">

var isUpdate = args.isUpdate;

var createFile = function createFile(parent, path) {
    var name = path.shift();
    if (path.length > 0) {
        return createFile(parent.childByNamePath(name) || parent.createFolder(name), path);
    }
    return parent.createFile(name);
};

var saveScript = function saveScript() {
    var scriptFolder = search.selectNodes("/app:company_home/app:dictionary/app:scripts")[0];
    if (scriptFolder) {
        var scriptNode;
        if (isUpdate && isUpdate=="true") {
            if (args.name.indexOf("workspace://") == 0) {
                scriptNode = search.findNode(args.name);
            }else{
                scriptNode = scriptFolder.childByNamePath(args.name);
            }
        }else{
            scriptNode = createFile(scriptFolder, ('' + args.name).split(/\//));
            //scriptNode = scriptFolder.createFile(args.name);
        }
    	scriptNode.content = json.get('jsScript');
    	scriptNode.properties["jsc:freemarkerScript"].content=json.get('fmScript');
    	scriptNode.save();
    }else{
        logger.warn('No script folder');
    }
};

saveScript();

// from listScripts.get.js
findAvailableScripts();
