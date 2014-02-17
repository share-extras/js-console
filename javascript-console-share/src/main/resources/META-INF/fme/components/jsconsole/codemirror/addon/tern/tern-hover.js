CodeMirror.registerHelper("textHover", "javascript", function(cm, node, e) {
    if (node.className != 'cm-variable')
	return;

    var server = CodeMirror.tern.getServer(cm);
    
    function getSignature(prefix, f) {
	var label = f.name;
	if (prefix != null) {
	    label = prefix + ':' + label;
	}
	label += '(';
	var params = f.params;
	if (params) {
	    for ( var i = 0; i < params.length; i++) {
		if (i > 0)
		    label += ', ';
		var param = params[i];
		label += '$' + param.name;
		var as = param.as;
		if (as && as.length > 0)
		    label += ' as ' + as;
	    }
	}
	label += ')';
	var as = f.as;
	if (as && as.length > 0)
	    label += ' as ' + as;
	return label;
    }

    var s = node.innerText || node.textContent;
    var prefixIndex = s.lastIndexOf(':');
    if (prefixIndex != -1) {
	var lineCount = cm.lineCount();
	var token = cm.getTokenAt(CodeMirror.Pos(lineCount, cm
		.getLine(lineCount - 1).length));
	if (!token.state)
	    return;
	var importedModules = token.state.importedModules;
	var prefix = s.substring(0, prefixIndex);
	var funcName = s.substring(prefixIndex + 1, s.length);
	var module = CodeMirror.XQuery.findModuleByPrefix(prefix,
		importedModules);
	if (module) {
	    // loop for each function
	    var functions = module.functions;
	    for ( var i = 0; i < functions.length; i++) {
		var f = functions[i];
		var name = f.name;
		if (name == funcName) {
		    var result = document.createElement('div');
		    var html = '';
		    if (module.resource) {
			html += 'File: ' + module.resource;
		    }
		    if (html != '') {
			html += '<br/>';
			html += getSignature(prefix, f);
		    }
		    if (f.doc) {
			if (html != '') {
			    html += '<br/>';
			}
			html += f.doc;
		    }
		    /*
		     * var html = '<ul>'; html+='<li>'; html+='prefix: ';
		     * html+=prefix; html+='</li>'; html+='<li>';
		     * html+='namespace: '; html+=module.namespace; html+='</li>';
		     * html+='<li>'; html+='name: '; html+=funcName; html+='</li>';
		     * html+='</ul>'; html+='<li>'; html+='signature: ';
		     * html+=getSignature(prefix, f); html+='</li>'; html+='</ul>';
		     */
		    result.innerHTML = html;
		    return result;
		}
	    }
	}
    }
    return;
});