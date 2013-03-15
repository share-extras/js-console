
(function(global, model) {
	
	  var hiddenMethods = 
		    " setServiceRegistry getServiceRegistry serviceRegistry exec setPreferenceService setAuthenticationService" + 
		    " setTenantService setAuthorityService setPersonService setNodeDAO equals hashCode class"+
		    " getClass getExtensionName setExtensionName extensionName notify update wait setScope getScope scope "+
		    " setProcessor ";

	var isValidMethodName = function(name) {
	  return name != undefined && (name) && hiddenMethods.indexOf(name) == -1;
	}
	
	var isValidObjectName = function(name) {
		return true;
	}
	    
	var sort_unique = function (arr) {
	    arr = arr.sort(function (a, b) { return a*1 - b*1; });
	    var ret = [arr[0]];
	    for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
	        if (arr[i-1] !== arr[i]) {
	            ret.push(arr[i]);
	        }
	    }
	    return ret;
	}
	
	result = { "global":[], "methods":{}, "node":[] };
	
	for (var objectName in global) {
	
	  if (isValidObjectName(objectName)) {
	    result["global"].push(objectName);
	    result["methods"][objectName] = [];
	    
	    for (var methodName in global[objectName]) {
	      if(isValidMethodName(methodName)) {
	        result["methods"][objectName].push(methodName);
	      }
	    }
	    result["methods"][objectName].sort();
	  }
	  result["global"].sort();
	}
	
	
	// add global scriptNodes document and space modelled by the companyhome
	result["global"].push("document"); 
	result["global"].push("space"); 
	result["methods"]["document"] = result["methods"]["companyhome"];
	result["methods"]["space"] = result["methods"]["companyhome"];
	
	// copy commands for all scriptnodes to a specific "node" property
	result["node"] = result["methods"]["companyhome"];

	// Javascript Console specific commands
	result["global"].push("print");
	result["global"].push("recurse");
	result["methods"]["logger"].push("setLevel");
	
	model.json = jsonUtils.toJSONString(result);

})(this, model);
