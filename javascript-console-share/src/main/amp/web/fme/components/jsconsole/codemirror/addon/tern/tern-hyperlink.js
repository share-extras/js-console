(function() {
    "use strict";
    
    function jumpToDef(cm, open) {
	var server = CodeMirror.tern.getServer(cm);
	server.jumpToDef(cm);
    }
    
    CodeMirror.commands.ternHyperlinkProcessor = function(cm) {
	var open = cm.options.hyperlink.open;
	jumpToDef(cm, open);
    }

    CodeMirror.registerHelper("hyperlink", "javascript", function() {
	return {
	    hasHyperlink : function(cm, node, e) {
		if (node.className == 'cm-variable cm-def')
		    return true;
		if (node.className == 'cm-variable')
		    return true;
		return false;
	    },
	    processHyperlink : function(cm, node, e) {
		cm.execCommand("ternHyperlinkProcessor");
	    }
	}
	
    });
})();
