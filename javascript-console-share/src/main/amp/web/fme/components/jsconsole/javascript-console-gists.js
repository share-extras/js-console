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
	   PROXY_URI_GITHUB : Alfresco.constants.PROXY_URI.replace("/alfresco", "/github-api"),
	   
	   		/**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
      options:
      {
         /**
          * Identifier used for storing the an OAuth 2.0 token in the repository personal credentials
          * store.
          * 
          * @property endpointId
          * @type string
          * @default ""
          */
         endpointId: "",
         
         /**
          * URI of the provider's authorization page. If an access token does not already exist then the
          * user will be sent here in order to obtain one.
          * 
          * @property authorizationUrl
          * @type string
          * @default ""
          */
         authorizationUrl: "",
         
         /**
          * Comma-separated list of scopes to be requested
          * 
          * @property scopes
          * @type string
          * @default "notifications"
          */
         scopes: "gist",
         
         /**
          * OAuth client (application) ID
          * 
          * Must be included as a URL parameters when the user is sent to the provider's authorization page
          * 
          * @property clientId
          * @type string
          * @default ""
          */
         clientId: "",
         
         /**
          * URL of the web script (minus the leading slash) to be used as the return landing page after
          * authorization has taken place. The script must exchange the temporary code for an access
          * token and persist it to the repository.
          * 
          * @property returnPage
          * @type string
          * @default "extras/oauth/auth2-return"
          */
         returnPage: "extras/oauth/auth2-return"
      },	   
   
      setOptions: function GistService_setOptions(obj)
      {
          this.options = YAHOO.lang.merge(this.options, obj);
          return this;
      },      
	   
	   getConnectUrl : function GistService_getConnectUrl() {
		   
		   var returnUrl = window.location.protocol + "//" + window.location.host + 
		   		Alfresco.constants.URL_PAGECONTEXT + this.options.returnPage + "/" + encodeURIComponent(this.options.endpointId),
           	pageUrl = window.location.pathname.replace(Alfresco.constants.URL_CONTEXT, ""),
           	state = "rp=" + encodeURIComponent(pageUrl),
           	authUri = this.options.authorizationUrl + "?response_type=code&client_id=" + 
             this.options.clientId + "&redirect_uri=" +
             encodeURIComponent(returnUrl) + "&state=" + 
             encodeURIComponent(state);
       
		   if (this.options.scopes)
		   {
			   authUri += "&scope=" + encodeURIComponent(this.options.scopes)
		   }
       
		   return authUri;
	   },
	   
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
			   },
			   failureCallback:
               {
                  fn: function(response) {
                	// TODO handle 401
                	  console.log(response);
                  },
                  scope: this
               }				   
			   
		   		
		   });

	   },
	   
	   loadStarredGists : function GistService_loadStarredGists(callback, scope) {
		   Alfresco.util.Ajax.jsonGet({
			   url : this.PROXY_URI_GITHUB + "gists/starred",
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
			   },
			   failureCallback:
               {
                  fn: function(response) {
                	// TODO handle 401
                	  console.log(response);
                  },
                  scope: this
               }				   
			   
		   		
		   });

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