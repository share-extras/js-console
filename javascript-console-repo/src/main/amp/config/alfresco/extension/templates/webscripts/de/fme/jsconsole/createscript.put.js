
var scriptFolder = companyhome.childrenByXPath("app:dictionary/app:scripts")[0];
if (scriptFolder) {
	var scriptNode = scriptFolder.createFile(args.name);
	scriptNode.content = requestbody.content;
}
