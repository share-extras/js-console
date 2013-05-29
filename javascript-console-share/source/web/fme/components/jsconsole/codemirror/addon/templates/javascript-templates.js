(function() {
  var templates = {
    "context" : "javascript",
    "templates" : [
        {
          "name" : "for",
          "description" : "iterate over array",
          "template" : "for (var ${index} = 0; ${index} < ${array}.length; ${index}++) {\n${line_selection}${cursor}\n}"
        },
        {
          "name" : "for",
          "description" : "iterate over array with temporary variable",
          "template" : "for (var ${index} = 0; ${index} < ${array}.length; ${index}++) {\nvar ${array_element} = ${array}[${index}];\n${cursor}\n}"
        }, {
          "name" : "ifelse",
          "description" : "if else statement",
          "template" : "if (${condition}) {\n${cursor}\n} else {\n\n}"
        },
        {
            "name" : "ex app context",
            "description" : "Inject the spring context into rhino engine",
            "template" : "var ctx = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();\nvar ${service}= ctx.getBean('${service}');"
         },
        {
           "name" : "ex mail action",
           "description" : "creation and execution of a simple mail action",
           "template" : "var mail = actions.create('mail');\n mail.parameters.to = 'davidc@alfresco.com';\nmail.parameters.subject = 'Hello from JavaScript';\nmail.parameters.from = 'davidc@alfresco.com';\nmail.parameters.template = root.childByNamePath('Company Home/Data Dictionary/Email Templates/notify_user_email.ftl');\nmail.parameters.text = 'some text, in case template is not found';\n// execute action against a document\nmail.execute(doc);"
        },
        
        {
            "name" : "ex simple text search",
            "description" : "creation and execution of a simple text search against the repository",
            "template" : "var results = search.query({query: 'TEXT:${cursor}'});"
            
        },
        {
            "name" : "Packages.ContentModel",
            "description" : "inject the contentModel class",
            "template" : "var contentModel = Packages.org.alfresco.model.ContentModel;"
            
        },
        {
            "name" : "Packages.QName",
            "description" : "inject the qname class",
            "template" : "var qname = Packages.org.alfresco.service.namespace.QName.createQName(${namespaceURI}, ${localName});"
            
        }]
  };
  CodeMirror.templatesHint.addTemplates(templates);
})();