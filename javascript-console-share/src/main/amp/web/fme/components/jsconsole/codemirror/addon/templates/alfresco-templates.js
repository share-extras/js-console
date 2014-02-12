(function() {
  var templates = {
  	"name" : "alfresco",
  	"context" : "javascript",
    "templates" : [


        {
          "name" : "EX_WORKFLOW_LIST",
          "description" : "list the workflow instances for a given definition",
          "template" : "var name = '${cursor}';\nvar def = workflow.getDefinitionByName(name);\nvar instances = def.getActiveInstances();\nvar i, j, k, x;\n\nprint(instances.length + ' instances found.');\n\nfunction walkDown(tasks) {\n    for ( k = 0 ; k < tasks.length; k++ ) {\nvar pks = tasks[k].getPackageResources();\n        if ( pks.length > 0 ) {\n            print('found ' + pks.length + ' pk(s)');\n            for (x = 0; x < pks.length; x++ ) {\n                var p = pks[x];\n                print('name : ' + p.properties.name);\n                print('id   : ' + p.id);\n                print('p    : ' + p);\n            }\n        }\n    }\n}\n\n\nfunction main() {\n    for ( i = 0; i < instances.length; i++ ) {\n        var instance = instances[i];\n        var paths = instance.getPaths();\n        var msg = '';\n        msg += i + '. ';\n        msg += 'instance : ' + instance.id;\n        msg += ' start date ' + instance.getStartDate();\n        msg += ' desc ' + instance.getDescription(); \n        print(msg);\n        if ( paths.length > 0 ) {\n            print('found ' + paths.length + ' path(s)');\n            for ( j = 0; j < paths.length; j++ ) {\n                var tasks = paths[j].getTasks();\n                if ( tasks.length > 0 ) {\n                    print('found ' + tasks.length + ' task(s)');\n                    walkDown(tasks);\n                }\n            }\n        }\n    }\n}\n\nmain();"
        },
		{
          "name" : "EX_WORKFLOW_START_VIA_ACTION",
          "description" : "start the adhoc workflow via start-workflow action",
          "template" : "var startWorkflowAction = actions.create('start-workflow');\nstartWorkflowAction.parameters.workflowName = 'jbpm$wf:adhoc';\nstartWorkflowAction.parameters['bpm:assignee'] = assignee;\nstartWorkflowAction.parameters['bpm:workflowDescription'] = description;\nstartWorkflowAction.execute(document);"
        },
		{
          "name" : "EX_WORKFLOW_START_VIA_WFL_API",
          "description" : "start the workflow via javascript workflow rootobject",
          "template" : "// 2 days from now\nvar dueDate2d = new Date((new Date()).getTime() + 2*(24*60*60*1000));\n// Start workflow\nvar wfdef = workflow.getDefinitionByName('activiti$alfGroupReview');\nif (wfdef) {\n\tvar wfparams = new Array();\n\twfparams['bpm:workflowDescription'] = 'Please review';\nwfparams['bpm:groupAssignee'] = people.getGroup('GROUP_site_collaborators');\nwfparams['bpm:workflowDueDate'] = dueDate2d;\nwfparams['bpm:workflowPriority'] = 1;\nwfparams['wf:notifyMe'] = true;\nvar wfpackage = workflow.createPackage();\nfor each (var n in wfDocs){\n\twfpackage.addNode(n);\n}\nvar wfpath = wfdef.startWorkflow(wfpackage, wfparams);\nvar tasks = wfpath.getTasks();\nfor each (task in tasks){\n\ttask.endTask(null);\n}\n"
        },
		        {
            "name" : "EX_PREFERENCES_SET",
            "description" : "extract the metadata of a document via the metadata extract action",
            "template" : "var docDetailsTwisters = ['DocumentTags','DocumentLinks','DocumentMetadata','DocumentPermissions','DocumentWorkflows','DocumentVersions','DocumentPublishing'];\nvar nodes = search.luceneSearch('+TYPE:\"cm:person\"');\nlogger.log(nodes.length);\nfor each(var node in nodes) {\n\tvar userid = node.properties.userName;\n\tlogger.log(userid);\n\tvar twisterCollapPref = preferenceService.getPreferences(userid, \"org.alfresco.share.twisters.collapsed\");\n\tvar newTwisters;\n\tif (twisterCollapPref.org != null){\n\t\tvar twistersToAdd = [];\n\t\tvar twistersSet = twisterCollapPref.org.alfresco.share.twisters.collapsed;\n\t\tlogger.log('collapsed twisters: ' + twistersSet);\n\t\tfor each (var t in docDetailsTwisters){\n\t\t\tif (twistersSet.indexOf(t) == -1){\n\t\t\t\ttwistersToAdd.push(t);\n\t\t\t}\n\t\t}\n\t\tnewTwisters = twistersSet + (twistersToAdd.length &gt; 0 ? (',' + twistersToAdd.join(',')) : '');\n\t}\n\telse{\n\t\tnewTwisters = docDetailsTwisters.join(',');\n\t}\n\tpreferenceService.setPreferences(userid, {org :{alfresco : {share : {twisters : {collapsed : newTwisters}}}}});\n\tlogger.log('new collapsed twisters:' + newTwisters);\n}"
        },
        {
            "name" : "EX_NODE_DELETE_WITHOUT_PAPERBIN",
            "description" : "Aspect cm:temporary is sometimes very useful. If you want to delete a node immediately without moving the node to paper bin (archive store) adding cm:temporary aspect before deletion solves your prob. Nodes with cm:temporary attached will deleted without detour via paper bin:",
            "template" : "var mynode = search.findNode('');\nmynode.addAspect('sys:temporary');\nmynode.remove();"
        },
		{
            "name" : "EX_TAGSCOPE_REFRESH",
            "description" : "Alfresco uses a concept called tagscope caching to support performant tagging services in Alfresco Share. Each folder representing a site or a site container (doclib, wiki…)  has a d:content property cm:tagScopeCache thats acts as a tag cache. More detailed this property is a txt-file that contains a list of tags & their quantity, e.g.:\n\ntest|2\ntest2|1\n\nSometimes these tagScopeCache are out-of-sync (at least in Alfresco 3.1), so I wrote a simple Javascript snippet to refresh this caches:",
            "template" : "function refreshTagScope(folder){\n\tvar refresh = actions.create('refresh-tagscope');\n\trefresh.execute(folder);\n\tfor each(item in folder.children){\n\t\tif (item.isContainer){\n\t\t\t{refreshTagScope(item);}}}refreshTagScope(space);"
        },
		 {
            "name" : "EX_METADATAEXTRACTION",
            "description" : "extract the metadata of a document via the metadata extract action",
            "template" : "var action = actions.create('extract-metadata');\naction.execute(document);"
        },
        {
            "name" : "EX_TRANSFORM_RESIZE IMAGE",
            "description" : "resize a image and write it back to its content",
            "template" : "//create a temporary folder to store the resized image (same name as original document)\nvar transformedImagesFolder = space.createFolder('_temp_resize_folder_' + document.name);\n//create a new resized image\nvar transformedImage = document.transformImage('image/jpeg', '-resize 1024x768', transformedImagesFolder);\n//update the original image content with the resized image\ndocument.properties.content.write(transformedImage.properties.content);\n//delete the temporary resized image + folder\ntransformedImage.remove();\ntransformedImagesFolder.remove();"
        },
        {
            "name" : "EX_TEMPLATE_TEMPLATE_PROCESSING",
            "description" : "Executes a template from the repository against the current Document node",
            "template" : "var template = companyhome.childByNamePath('/Data Dictionary/Presentation Templates/doc_info.ftl');\nif (template != null)\n{\n   var result = document.processTemplate(template);\n   // output result to the console - could just as easily save the content into a new node...\n   print(result);\n}\n"
        },
        {
            "name" : "DEBUG_FORMPROCESSOR",
            "description" : "To debug all form relevant actions on the repo side",
            "template":"logger.setLevel('org.alfresco.repo.forms','DEBUG');\nlogger.setLevel('org.alfresco.web.config.forms','DEBUG');\nlogger.setLevel('org.alfresco.web.scripts.forms','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.forms','WARN');\n//logger.setLevel('org.alfresco.web.config.forms','WARN');\n//logger.setLevel('org.alfresco.web.scripts.forms','WARN');"
        },
        {
           "name" : "DEBUG_KERBEROS",
           "description" : "To debug all kerberos authentation actions",
           "template":"logger.setLevel('org.alfresco.web.app.servlet.KerberosAuthenticationFilter','DEBUG');\nlogger.setLevel('org.alfresco.repo.webdav.auth.KerberosAuthenticationFilter','DEBUG');\n\n//logger.setLevel('org.alfresco.web.app.servlet.KerberosAuthenticationFilter','WARN');\n//logger.setLevel('org.alfresco.repo.webdav.auth.KerberosAuthenticationFilter','WARN');"
        },
        {
           "name" : "DEBUG_AUDIT_GENERAL_DEBUG",
           "description" : "To debug all audit related actions",
           "template":"logger.setLevel('org.alfresco.repo.audit','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.audit','WARN');"
        },
        {
           "name" : "DEBUG_DICTIONARY",
           "description" : "To debug all dicitionary and model related actions",
           "template":"logger.setLevel('org.alfresco.repo.dictionary','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.dictionary','WARN');"
        },
        {
           "name" : "DEBUG_AUDIT_PROPERTY_AUDIT_FILTERS",
           "description" : "To debug all property audit filter actions",
           "template":"logger.setLevel('org.alfresco.repo.audit.PropertyAuditFilter','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.audit.PropertyAuditFilter','WARN');"
        },
        {
           "name" : "DEBUG_AUDIT_DATA_PRODUCERS",
           "description" : "To debug all data producers information",
           "template":"logger.setLevel('org.alfresco.repo.audit.inbound','DEBUG');\nlogger.setLevel('org.alfresco.repo.audit.AuditComponentImpl','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.audit.inbound','WARN');\n//logger.setLevel('org.alfresco.repo.audit.AuditComponentImpl','WARN');"
        },
        {
           "name" : "DEBUG_FTP",
           "description" : "To debug all ftp related actions",
           "template":"logger.setLevel('org.alfresco.ftp.server','DEBUG');\nlogger.setLevel('org.alfresco.ftp.protocol','DEBUG');\n\n//logger.setLevel('org.alfresco.ftp.server','WARN');\n//logger.setLevel('org.alfresco.ftp.protocol','WARN');"
        },
        {
           "name" : "DEBUG_SOLR",
           "description" : "To debug all solr tracking related actions",
           "template":"logger.setLevel('org.alfresco.solr.tracker.CoreTracker','DEBUG');\n\n//logger.setLevel('org.alfresco.solr.tracker.CoreTracker','WARN');"
        },
        {
           "name" : "DEBUG_OPENOFFICE",
           "description" : "To debug all jod converter related actions",
           "template":"logger.setLevel('org.alfresco.enterprise.repo.content','DEBUG');\nlogger.setLevel('org.artofsolving.jodconverter','DEBUG');\n\n//logger.setLevel('org.alfresco.enterprise.repo.content','WARN');\n//logger.setLevel('org.artofsolving.jodconverter','WARN');"
        },
        {
           "name" : "DEBUG_SMB/CIFS",
           "description" : "To debug SMB/CIFS protocol",
           "template":"logger.setLevel('org.alfresco.smb.protocol','DEBUG');\nlogger.setLevel('org.alfresco.acegi','DEBUG');\nlogger.setLevel('org.alfresco.fileserver','DEBUG');\n\n//logger.setLevel('org.alfresco.smb.protocol','WARN');\n//logger.setLevel('org.alfresco.fileserver','WARN');"
        },
        {
           "name" : "DEBUG_WORKFLOWS",
           "description" : "To debug alfresco workflows",
           "template":"logger.setLevel('org.alfresco.repo.workflow','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.workflow','INFO')"
        },
        {
           "name" : "DEBUG_SHAREPOINT",
           "description" : "To debug sharepoint vti related actions",
           "template":"logger.setLevel('org.alfresco.module.vti','DEBUG');\n\n//logger.setLevel('org.alfresco.module.vti','INFO')"
        },
        {
           "name" : "DEBUG_IMAP",
           "description" : "To debug imap related actions",
           "template":"logger.setLevel('org.alfresco.repo.imap','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.imap','INFO')"
        },
        {
           "name" : "DEBUG_POLICIES_BEHAVIOUR",
           "description" : "To debug policy behaviour related actions",
           "template":"logger.setLevel('org.alfresco.repo.policy','DEBUG');\n\n//logger.setLevel('org.alfresco.repo.policy','INFO')"
        },
        {
           "name" : "DEBUG_WEBDAV",
           "description" : "To debug webdav related actions",
           "template":"logger.setLevel('org.alfresco.webdav.protocol','DEBUG');\n\n//logger.setLevel('org.alfresco.webdav.protocol','ERROR')"
        },
        {
           "name" : "DEBUG_FILESYSTEM_DEBUG_REPO",
           "description" : "To debug filesystem related actions",
           "template":"logger.setLevel('org.alfresco.filesys.repo.ContentDiskDriver','DEBUG');\n\n//logger.setLevel('org.alfresco.filesys.repo.ContentDiskDriver','ERROR')"
        },
        {
           "name" : "DEBUG_TRANSFORMATIONS",
           "description" : "To debug transformations",
           "template":"//see http://http://wiki.alfresco.com/wiki/Content_Transformation_Debug\nlogger.setLevel('org.alfresco.repo.content.transform.TransformerDebug','DEBUG');\n//logger.setLevel('org.alfresco.repo.content.transform.TransformerDebug','WARN');\n\n//To debug conversions that call a shell programm (e.g. imagamagick convert) you can also set\nlogger.setLevel('org.alfresco.util.exec.RuntimeExec','DEBUG');\n//logger.setLevel('org.alfresco.util.exec.RuntimeExec','WARN');\n\n//More information is available if the TransformerDebug logging level is set to TRACE rather than DEBUG.\n//logger.setLevel('org.alfresco.repo.content.transform.TransformerDebug','TRACE');\n//logger.setLevel('org.alfresco.repo.content.transform.TransformerDebug','WARN');"
        },
        {
            "name" : "EX_CREATE_MODIFY_AND_CHECKIN_CHECKOUT_DOCUMENT",
            "description" : "Creates a document, makes it versionable, checks it out, modifies the content of the working copy, checks it in again and then repeats the process but checks in the document with a version history note and as a major version increment",
            "template" : "// create file, make it versionable\nvar doc = userhome.createFile('checkmeout.txt');\ndoc.addAspect('cm:versionable');\ndoc.content = 'original text';\n\n// check it out and update content on the working copy\nvar workingCopy = doc.checkout();\nworkingCopy.content = 'updated text 1';\n\n// check it in\ndoc = workingCopy.checkin();\n\n// check it out again\nworkingCopy = doc.checkout();\nworkingCopy.content = 'updated text 2';\n\n// check it in again, but with a version history note and as major version increment\ndoc = workingCopy.checkin('a history note', true);"
        },
        {
           "name" : "EX_JAVA_APP_CONTEXT",
           "description" : "Inject the spring context into rhino engine",
           "template" : "var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();\nvar ${service}= ctx.getBean('${service}');"
        },
       {
          "name" : "EX_ACTIONS_MAIL_ACTION",
          "description" : "creation and execution of a simple mail action",
          "template" : "var mail = actions.create('mail');\nmail.parameters.to = 'davidc@alfresco.com';\nmail.parameters.subject = 'Hello from JavaScript';\nmail.parameters.from = 'davidc@alfresco.com';\nmail.parameters.template = root.childByNamePath('Company Home/Data Dictionary/Email Templates/notify_user_email.ftl');\nmail.parameters.text = 'some text, in case template is not found';\n// execute action against a document\nmail.execute(doc);"
       },
       {
           "name" : "EX_SEARCHPATTERN_TYPES",
           "description" : "To find all nodes of type cm:content, including all subtypes of cm:content. Note that local names containing invalid XML attribute characters should be encoded according to ISO 9075.",
           "template" : 'TYPE:"{http://www.alfresco.org/model/content/1.0}content"\nTYPE:"cm:content"\nTYPE:"content"'
       },
       {
           "name" : "EX_SEARCHPATTERN_ASPECTS",
           "description" : "To find all nodes with the cm:titled aspect, including all derived aspects from cm:titled.",
           "template" : 'ASPECT:"{http://www.alfresco.org/model/content/1.0}titled"\nASPECT:"cm:titled"\nASPECT:"titled"'
       },
       {
           "name" : "EX_SEARCHPATTERN_CONTAINS",
           "description" : "To find all nodes with the cm:name property containing the word banana. Lucene requires the : to be escaped using the \ character.",
           "template" : '@cm\:name:"banana"'
       },
       {
           "name" : "EX_SEARCHPATTERN_STARTSWITH",
           "description" : "To find all nodes with the cm:name property containing words starting with 'ban'",
           "template" : '@cm\:name:ban*'
       },
       {
           "name" : "EX_SEARCHPATTERN_INTEGER_LONG_VALUES",
           "description" : "To find all nodes with the integer property test:int set to 12:",
           "template" : '@test\:int:12'
       },
       {
           "name" : "EX_SEARCHPATTERN_FLOAT_DOUBLEVALUES",
           "description" : "To find all nodes with the property test:float equal to 3.2:",
           "template" : '@test\:float:"3.2"'
       },
       {
           "name" : "EX_SEARCHPATTERN_BOOLEAN_VALUES",
           "description" : "To find all nodes with a boolean type property equal to TRUE. The value 'false' is the opposite of 'true'.",
           "template" : '@rma\:dispositionEventsEligible:true'
       },
       {
           "name" : "EX_SEARCHPATTERN_CONTENT",
           "description" : "Full text searches can be done in two ways. If the attribute cm:abstract is of type d:content, then its full text content will be indexed and searchable in exactly the same way as d:text attributes shown previously. You will be able to search against the text of the content, proving there is a translation to the mimetype text/plain.",
           "template" : '@rma\:dispositionEventsEligible:true'
       },
       {
           "name" : "EX_SEARCHPATTERN_CONTENT_MIMETYPE",
           "description" : "All content type properties have an extended property to allow search by mimetype. This will be extended to include the size of the content in the future.To find all cm:abstract content properties of mime type \"text/plain\":",
           "template" : '@\{http\://www.alfresco.org/model/content/1.0\}content.mimetype:text/plain'
       },
       {
           "name" : "EX_SEARCHPATTERN_DATE_TIME",
           "description" : "Each node is named within its parent. This name can be used as the basis of a search. To find all the nodes with QName \"user\" in the name space with the standard prefix \"usr\":",
           "template" : 'QNAME:"usr:user"'
       },
       {
           "name" : "EX_SEARCHPATTERN_QNAME",
           "description" : "All content type properties have an extended property to allow search by mimetype. This will be extended to include the size of the content in the future.To find all cm:abstract content properties of mime type \"text/plain\":",
           "template" : '@\{http\://www.alfresco.org/model/content/1.0\}content.mimetype:text/plain'
       },
       {
           "name" : "EX_SEARCHPATTERN_PATH_DIRECTLY_ROOTNODE",
           "description" : "To find all nodes directly beneath the root node:",
           "template" : 'PATH:"/*"'
       },
       {
           "name" : "EX_SEARCHPATTERN_PATH_NAMESPACE",
           "description" : "To find all nodes directly beneath the root node:",
           "template" : 'PATH:"/*"'
       },
       {
           "name" : "EX_SEARCHPATTERN_PATH_DIRECTLY_ROOTNODE",
           "description" : "To find all nodes directly beneath the root node in the \"sys\" namespace:",
           "template" : 'PATH:"/sys:*"'
       },
       {
           "name" : "EX_SEARCHPATTERN_RANGE_INCLUSIVE",
           "description" : "Range queries follow the Lucene default query parser standard, with support for date, integer, long, float, and double types. To search for integer values between 0 and 10 INCLUSIVE for the attribute \"test:integer\":",
           "template" : '@test\:integer:[0 TO 10]'
       },
       {
           "name" : "EX_SEARCHPATTERN_RANGE_FLOAG_DOUBLE",
           "description" : "Range queries follow the Lucene default query parser standard, with support for date, integer, long, float, and double types. The constants 0 and 10 are tokenized according to the property type. So you could also use the previous search for long, float, and double types.",
           "template" : ' @test\:integer:[0.3 TO 10.5]'
       },
       {
           "name" : "EX_SEARCHPATTERN_RANGE_EXCLUSIVE",
           "description" : "Range queries follow the Lucene default query parser standard, with support for date, integer, long, float, and double types. To search for integer values between 0 and 10 EXCLUSIVE for the attribute \"test:integer\":",
           "template" : '@test\:integer:{0 TO 10}'
       },
       {
           "name" : "EX_SEARCHPATTERN_RANGE_DATE",
           "description" : "Dates are specified in \"yyyy-MM-dd'T'HH:mm:ss.SSS\" format only. A subset of ISO8601. Date ranges accept truncated dates, but you can only truncate to the format to the day.",
           "template" : ' @test\:date:[2003\-12\-16T00:00:00 TO 2003\-12\-17T00:00:00]\n@test\:date:[2003\-12\-16T00:00:00 TO MAX]\n@cm\:created:[NOW TO MAX]\n@cm\:created:[MIN TO NOW]'
       },
       {
           "name" : "EX_SEARCHPATTERN_PATH_DIRECTLY_ROOTNODE",
           "description" : "To find all nodes directly beneath the root node:",
           "template" : 'PATH:"/*"'
       },
       {
           "name" : "EX_SEARCHPATTERN_PATH_DIRECTLY_ROOTNODE",
           "description" : "To find all nodes directly beneath the root node:",
           "template" : 'PATH:"/*"'
       },
       {
          "name" : "EX_SEARCH_SIMPLE_TEXT_SEARCH",
          "description" : "creation and execution of a simple text search against the repository",
          "template" : "var results = search.query({query: 'TEXT:${cursor}'});"

       },
       {
           "name" : "EX_SEARCH_ADVANCED_SEARCH",
           "description" : "creation and execution of a richly defined text search against the repository",
           "template" : "var sort1 = \n{  column: '@{http://www.alfresco.org/model/content/1.0}modified',\n  ascending: false\n};\n\nvar sort2 =\n{\n  column: '@{http://www.alfresco.org/model/content/1.0}created',\n  ascending: false\n};\n\nvar paging =\n{\n  maxItems: 100,\n  skipCount: 0\n};\n\nvar def =\n{\n  query: '${cursor}',\n  store: 'workspace://SpacesStore',\n  language: 'fts-alfresco',\n  sort: [sort1, sort2],\n  page: paging\n};\n\nvar results = search.query(def); "

       },
       {
           "name" : "EX_SEARCH_FIELDS_TEXT",
           "description" : "By default all properties of type d:content. This can be user-defined.",
           "template" : "TEXT:alfresco"

       },
       {
           "name" : "EX_SEARCH_FIELDS_ID",
           "description" : "Id, where id is the full id, e.g:",
           "template" : "ID:workspace\://SpacesStore/4ee34168-495a-46cd-bfd8-6f7590a4c0ce"

       },
       {
           "name" : "EX_SEARCH_FIELDS_TRANSACTION",
           "description" : "The transaction id",
           "template" : "TX"

       },
       {
           "name" : "EX_SEARCH_FIELDS_PARENT",
           "description" : "Parent id - all child associations",
           "template" : "var contentModel = Packages.org.alfresco.model.ContentModel;"

       },
       {
           "name" : "EX_SEARCH_FIELDS_PRIMARYPARENT",
           "description" : "Parent Id - just the primary child association",
           "template" : "var contentModel = Packages.org.alfresco.model.ContentModel;"

       },
       {
           "name" : "EX_SEARCH_FIELDS_PRIMARYPARENT",
           "description" : "Association QName",
           "template" : "var contentModel = Packages.org.alfresco.model.ContentModel;"

       },
       {
           "name" : "EX_JAVA_CONTENTMODEL",
           "description" : "inject the contentModel class",
           "template" : "var contentModel = Packages.org.alfresco.model.ContentModel;"

       },
       {
           "name" : "EX_JAVA_DICTIONARY_SERVICE",
           "description" : "inject the contentModel class",
           "template" : "var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();\nvar model = Packages.org.alfresco.model.ContentModel;\nvar dictionaryService = ctx.getBean('DictionaryService');\nvar types = dictionaryService.getSubTypes(model.TYPE_CONTENT, true).toArray();\nfor each(var type in types){\n\tprint(type);\n}"
       },
       {
           "name" : "EX_UPLOAD",
           "description" : "upload files",
           "template" : "var filename = null;\nvar content = null;\nvar mimetype = null;\n\nvar name = null;\nvar title = null;\nvar description = null;\nvar author = null;\n\nvar nodeid = null;\n\nvar storeid = null;\nvar path = null;\n\nvar thumbnailNames = null;\n\nvar type = 'cm:content';\n\n// locate file attributes\nfor ( var field in formdata.fields)\n{\n   switch (String(field.name).toLowerCase())\n   {\n      case 'title':\n         title = field.value;\n         break;\n      case 'desc':\n         description = field.value;\n         break;\n      case 'author':\n         author = field.value;\n         break;\n      case 'name':\n         // for having name propertie different than original filename\n         name = field.value;\n         break;\n      case 'file':\n         if (field.isFile)\n         {\n            filename = field.filename;\n            content = field.content;\n         }\n         break;\n      case 'mimetype': \n         mimetype = field.value;\n         break;\n      case 'nodeid':  \n         nodeid = field.value;\n         break;\n      case 'storeid':   \n         storeid = field.value;\n         break;\n      case 'path':  \n         path = field.value;\n         break;\n      case 'thumbnails':\n         thumbnailNames = field.value;\n      case 'type':\n         type = field.value;\n         break;         \n   }  \n}\n\nif ((nodeid != null) && (nodeid != ''))\n{\n   // get folder to upload into using doc mgt nodeid\n   model.folder = search.findNode('workspace://SpacesStore/' + nodeid);\n}\nelse if ((path != null) && (path != ''))\n{\n   // get folder to upload into with doc mgt path\n   model.folder = roothome.childByNamePath(path);\n}\n\n// ensure folder and mandatory file attributes have been located\nif (model.folder == null || filename == undefined || content == undefined)\n{\n   status.code = 400;\n   status.message = 'Uploaded file cannot be located in request';\n   status.redirect = true;\n}\nelse\n{\n   // create document in model.folder for uploaded file\n upload = model.folder.createNode('upload' + model.folder.children.length + '_' + filename, type);\n upload.properties.content.write(content);\n upload.properties.content.mimetype = mimetype;\n    upload.properties.content.encoding = 'UTF-8';\n  \n if (name != null){\n        upload.properties.name = name; \n   }else{\n        upload.properties.name = filename;\n    }\n\n   if (title != null){\n       upload.properties.title = title;\n  }\n\n   if (description != null){\n     upload.properties.description = description;\n  }\n   \n    if (author != null){\n      upload.properties.author = author;\n    }\n\n   upload.save();\n\n  if (thumbnailNames != null){\n   var thumbnails = thumbnailNames.split(',');\n   for (var i = 0; i < thumbnails.length; i++){\n     var thumbnailName = thumbnails[i];\n        if(thumbnailName != '' && thumbnailService.isThumbnailNameRegistered(thumbnailName)){\n        upload.createThumbnail(thumbnailName, true);\n       }\n  }\n    }   \n\n   // setup model for response template\n   model.upload = upload;\n}\n"
       },
       {
           "name" : "EX_TAG_CREATE",
           "description" : "upload files",
           "template" : "addTag('noderef', 'tag');\n\nfunction addTag(nodeRef, tagName)\n{\n   var resultString = 'Action failed';\n   var resultCode = false;\n   var node = null;\n   var newTag = null;\n   var newTagNodeRef = '';\n\n   if ((tagName != '') && (tagName != null))\n   {\n      tagName = tagName.toLowerCase();\n\n      // Make sure the tag is in the repo\n      newTag = createTag(tagName);\n      if (newTag != null)\n      {\n         resultString = 'Tag added';\n         resultCode = true;\n         newTagNodeRef = newTag.nodeRef.toString();\n      }\n      else\n      {\n         resultString = 'Tag '' + tagName + '' not indexed';\n      }\n\n      // Adding the tag to a node?\n      if ((nodeRef != '') && (nodeRef != null))\n      {\n         var node = search.findNode(nodeRef);\n   \n         if (node != null)\n         {\n            try\n            {\n               var tags;\n               \n               // Must have newTag node\n               if (newTag != null)\n               {\n                  resultString = 'Already tagged with '' + tagName + ''';\n                  tags = node.properties['cm:taggable'];\n                  if (tags == null)\n                  {\n                     tags = new Array();\n                  }\n                  // Check node doesn't already have this tag\n                  var hasTag = false;\n                  for each (tag in tags)\n                  {\n                     if (tag != null)\n                     {\n                        if (tag.name == tagName)\n                        {\n                           hasTag = true;\n                           break;\n                        }\n                     }\n                  }\n                  if (!hasTag)\n                  {\n                     // Add it to our node\n                     tags.push(newTag);\n                     tagsArray = new Array();\n                     tagsArray['cm:taggable'] = tags;\n                     node.addAspect('cm:taggable', tagsArray);\n\n                     resultString = 'Document tagged';\n                     resultCode = true;\n                  }\n               }\n            }\n            catch(e)\n            {\n               resultString = 'Action failed due to exception [' + e.toString() + ']';\n            }\n         }\n      }\n   }\n\n   var result =\n   {\n      'resultString': resultString,\n      'resultCode': resultCode,\n      'newTag': newTagNodeRef\n   };\n   return result;\n}\n\n/*\n * Create a new tag if the passed-in one doesn't exist\n */\nfunction createTag(tagName)\n{\n   var existingTags = classification.getRootCategories('cm:taggable');\n   for each (existingTag in existingTags)\n   {\n      if (existingTag.name == tagName)\n      {\n         return existingTag;\n      }\n   }\n\n   var tagNode = classification.createRootCategory('cm:taggable', tagName);\n   return tagNode;\n}\n"
       },


       {

           "name" : "EX_JAVA_QNAME",
           "description" : "inject the qname class",
           "template" : "var qname = Packages.org.alfresco.service.namespace.QName.createQName(${namespaceURI}, ${localName});"

       }


        ]
  };

  templates.templates.sort(function(a,b){
      var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
       return -1
      if (nameA > nameB)
       return 1
      return 0 //default return value (no sorting)
  });

  CodeMirror.templatesHint.addTemplates(templates);
})();




