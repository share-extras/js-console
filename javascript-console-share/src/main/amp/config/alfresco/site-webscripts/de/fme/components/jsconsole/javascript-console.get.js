/**
 * Admin Console Javascript Console component
 */

function main()
{	
	var endpointId = "github-api",
		connector = remote.connect(endpointId);
   
   	model.endpointId = endpointId;
	model.clientId = connector != null ? connector.getDescriptor().getStringProperty("client-id") : "";
	model.authorizationUrl = "https://github.com/login/oauth/authorize";
}

main();