(function() {
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionOpenInJavascriptConsole",
        fn: function JSC_onActionOpenInJavascriptConsole(file) {
        	window.location = Alfresco.constants.URL_PAGECONTEXT + 
        	    "console/admin-console/javascript-console?nodeRef=" + file.nodeRef + "&name=" + file.displayName;
        }
    });
})();