
var scriptFolder = search.luceneSearch('PATH:"/app:company_home/app:dictionary/app:scripts"')[0];

var scriptNode = scriptFolder.createFile(args.name);

scriptNode.content = requestbody.content;

