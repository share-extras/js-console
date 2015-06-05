(function() {
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionOpenInJavascriptConsole",
        fn: function JSC_onActionOpenInJavascriptConsole(file) {
        	window.location = Alfresco.constants.URL_PAGECONTEXT +
        	    "console/admin-console/javascript-console?nodeRef=" + file.nodeRef + "&name=" + file.displayName;
        }
    });
    
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionDumpInJavascriptConsole",
        fn: function JSC_onActionDumpInJavascriptConsole(file) {
        	window.location = Alfresco.constants.URL_PAGECONTEXT +
        	    "console/admin-console/javascript-console?nodeRef=" + file.nodeRef + "&name=" + file.displayName+"&dump=true";
        }
    });
})();
