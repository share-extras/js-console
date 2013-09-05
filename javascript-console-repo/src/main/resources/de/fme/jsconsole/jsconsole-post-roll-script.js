jsconsole.setSpace(space);
function recurse(scriptNode, processorOrOptions) {

  var result = [];	
	
  var recurseInternal = function(scriptNode, options, path, level) {
	var index = 0;
	
	if (level < options.maxlevel) { 
		for (c in scriptNode.children) {
			var child = scriptNode.children[c];
			var childPath = path + "/"+ child.name;
		
			if (options.filter === undefined || options.filter(child, childPath, index, level)) {
				var procResult = options.process(child, childPath, index, level);
				if (procResult !== undefined) {
					result.push(procResult);
				};
		    };
		
			if (child.isContainer) {
				if (options.branch === undefined || options.branch(child, childPath, index, level) ) {
					recurseInternal(child, options, childPath, level+1);
				};
			};
			
			index++;
		};
	};
  };

  var options = {};
  if (processorOrOptions === undefined) {
	  options.process = function(node) { return node; };
  } else if (typeof processorOrOptions == "function") {
		options.process = processorOrOptions;
  }
  else {
	  options = processorOrOptions;
  };
	
	if (options.maxlevel === undefined) {
		options.maxlevel = 100;
	};
	
	recurseInternal(scriptNode, options, "", 0);
	
	return result;
};