/**
 * Fme root namespace.
 * 
 * @namespace Fme
 */
// Ensure Fme root object exists
if (typeof Fme == "undefined" || !Fme)
{
   var Fme = {};
   
} 

/**
 * Javascript Console Gist Support
 * 
 * @namespace Fme
 * @class Fme.GistService
 */
(function()
{
   Fme.GistService = function GistService_constructor()
   {
	  Fme.GistService.superclass.constructor.call(this);
      return this;
   };
   
   YAHOO.extend(Fme.GistService, Alfresco.service.BaseService,
   {
	   accessToken : "",
	   
	   PROXY_URI_GITHUB : Alfresco.constants.PROXY_URI.replace("/alfresco", "/github-api"),
	   
	   isConnected : function GistService_isConnected() {
		   return true;
	   },
	   
	   connect : function GistService_connect(connectedCallback, scope) {
		   Alfresco.util.Ajax.jsonGet({
			   url : Alfresco.constants.PROXY_URI + "oauth/token/x?name=credentials_github-oauth", 
			   successCallback : {
				   fn : function(result) {
					   this.accessToken = result.json.accessToken;
					   if (scope) {
						   connectedCallback.apply(scope);
					   } else {
						   if (connectedCallback) {
							   connectedCallback();
						   }
					   }
				   },
				   scope : this
			   }
		   });
	   },
	   
	   loadGists : function GistService_loadGists(callback, scope) {
		   if (this.isConnected()) {
			   Alfresco.util.Ajax.jsonGet({
				   url : this.PROXY_URI_GITHUB + "gists",
				   successCallback : {
					   fn : function(result) {
						   if (scope) {
							   // result.json is an array, so we need an additional [] for apply not to create n arguments 
							   callback.apply(scope, [result.json]); 
						   }
						   else {
							   callback.apply(this, [result.json]);
						   }
					   },
					   scope : this
				   }
			   	// TODO handle 401
			   });
			   
		   } else {  // not connected, i.e. no accessToken loaded yet
			   this.connect(function() {
				   this.loadGists(callback, scope);
			   }, this); 
		   }
	   },
	   
	   createNewGist : function GistService_createNewGist(newGist) {
		   if (this.isConnected()) {
			   Alfresco.util.Ajax.jsonPost({
				   url : this.PROXY_URI_GITHUB + "gists",
				   dataObj: newGist,
	               successCallback: {
	            	   fn : function(response) {
	            		   console.log(response);
	            		   //TODO assert response.status==201 created
	            	   },
	            	   scope : this
	               },
	               failureCallback: {
	            	   fn : function(response) {
	            		   console.log(response);
	            		   // TODO handle 401	            		   
	            	   },
	            	   scope : this
	               }
			   });
		   } else {  // not connected, i.e. no accessToken loaded yet
			   this.connect(function() {
				   this.createNewGist(newGist);
			   }, this); 
		   }			   
	   },
	   
	   updateGist : function GistService_updateGist(gistId, newData) {
		   if (this.isConnected()) {
			   YAHOO.util.Connect.asyncRequest ("PATCH", 
				this.PROXY_URI_GITHUB + "gists/" + gistId, {
				   success: function(result) {
					   // TODO add callback
					   console.log(result);
				   },
				   scope: this
			   }, JSON.stringify(newData));	
		   } else {  // not connected, i.e. no accessToken loaded yet
			   this.connect(function() {
				   this.updateGist(gistId, newData);
			   }, this); 
		   }	
		   
	   }
	   
	   
   
   });
})();