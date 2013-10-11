(function() {
    var def = {
        "formdata" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nA host object providing access to multipart/form-data requests allowing file upload from a web script. \nNote: You must use enctype=\"multipart/form-data\" in your form tag or the formdata variable will not be populated with fields.",
            "hasField" : {
                "!type" : "bool",
                "!doc" : "indicating the existence of a named form field in the multipart request"
            },
            "fields" : {
                "!type" : "[Formfield]",
                "!doc" : "an array of formfield where each entry represents a field within the multipart request"
            }
        },
        "Formfield" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nA host object providing access to a form field within a multipart/form-data request.",
            "name" : {
                "!type" : "string",
                "!doc" : "the name of the form field (Note that form fields may not be uniquely named) "
            },
            "isFile" : {
                "!type" : "bool",
                "!doc" : "indicating whether this field represents a file (content) "
            },
            "value" : {
                "!type" : "string",
                "!doc" : "string representing the field value (in the case of isFile is true, the filename will be returned, use content instead)"
            },
            "content" : {
                "!type" : "bool",
                "!doc" : "a ScriptContent representing the content of the field "
            },
            "mimetype" : {
                "!type" : "string",
                "!doc" : "the mimetype of the content (or null, if isFile is false) "
            },
            "filename" : {
                "!type" : "bool",
                "!doc" : "the filename of the source file used to provide the content (or null, if isFile is false, or a filename was not provided"
            }
        },
        "url" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nA host object providing access to the URL (or parts of the URL) that triggered the web script. \n For example, imagine a web script URL template of \n/user/{userid}\n\n and a web script request URL of\n/alfresco/service/user/fred?profile=full&format=html\n\nThe url root object will respond as follows: \n\turl.context => /alfresco \n\turl.serviceContext => /alfresco/service \n\turl.service => /alfresco/service/user/fred \n\turl.full => /alfresco/service/user/fred?profile=full&format=html \n\turl.args => profile=full&format=html \n\turl.templateArgs['userid'] => fred \n\turl.match => /user/ \n\turl.extension => fred",
            "context" : {
                "!type" : "string",
                "!doc" : "Alfresco context path, for example /alfresco "
            },
            "serviceContext" : {
                "!type" : "string",
                "!doc" : "Alfresco service context path, for example /alfresco/service "
            },
            "service" : {
                "!type" : "string",
                "!doc" : "Web script path, for example /alfresco/service/blog/search"
            },
            "full" : {
                "!type" : "string",
                "!doc" : "Web script URL, for example /alfresco/service/blog/search?q=tutorial "
            },
            "templateArgs" : {
                "!type" : "string",
                "!doc" : "a map of substituted token values (within the URI path) indexed by token name"
            },
            "args" : {
                "!type" : "string",
                "!doc" : "Web script URL arguments, for example q=tutorial"
            },
            "match" : {
                "!type" : "string",
                "!doc" : "The part of the web script URL that matched the web script URL template "
            },
            "extension" : {
                "!type" : "string",
                "!doc" : "The part of the web script URL that extends beyond the match path (if there is no extension, an empty string is returned)"
            }
        },
        "status" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nAn associative array of response status properties that allow control over the status and content of the Web Script response",
            "code" : {
                "!type" : "string",
                "!doc" : "(read/write) status code (primarily a HTTP status code, but can be any number)"
            },
            "codeName" : {
                "!type" : "string",
                "!doc" : "(read) human readable status code name"
            },
            "codeDescription" : {
                "!type" : "string",
                "!doc" : "(read) human readable status code description"
            },
            "message" : {
                "!type" : "string",
                "!doc" : "(read/write) status message "
            },
            "redirect" : {
                "!type" : "string",
                "!doc" : "(read/write) a boolean indicating whether to redirect to a status specific response template "
            },
            "exception" : {
                "!type" : "string",
                "!doc" : "(read/write) the exception (if any) which has caused this status "
            },
            "location" : {
                "!type" : "string",
                "!doc" : "(read/write) the absolute URI to which the client should resubmit a request - often used with 3xx redirect status codes."
            }

        },
        "cache" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nAn associative array of cache control properties that allow control over how the Web Script response is cached.",
            "neverCache" : {
                "!type" : "bool",
                "!doc" : "(read/write) control whether Web Script response should be cached at all; true means never cache. If not set, the default value is specified by the cache control section of the Web Script definition"
            },
            "isPublic" : {
                "!type" : "bool",
                "!doc" : "(read/write) control whether web script response should be cached by public caches. If not set, the default value is specified by the cache control section of the web script definition."
            },
            "mustRevalidate" : {
                "!type" : "bool",
                "!doc" : "(read/write) control whether cache must re-validate its version of the web script response to ensure freshness. If not set, the default value is specified by the cache control section of the web script definition"
            },
            "maxAge" : {
                "!type" : "number",
                "!doc" : "(read/write long) specifies the maximum amount of time (in seconds, relative to the time of request) that the response will be considered fresh. If not set, the default value is null"
            },
            "lastModified" : {
                "!type" : "Date",
                "!doc" : "(read/write) specifies the time that the content of the response last changed. If not set, the default value is null. "
            },
            "ETag" : {
                "!type" : "string",
                "!doc" : "read/write string) specifies a unique identifier that changes each time the content of the response changes. If not set, the default value is null. "
            }
        },
        "format" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nThe format of the response.",
            "name" : {
                "!type" : "string",
                "!doc" : "(read only) format name"
            },
            "mimetype" : {
                "!type" : "string",
                "!doc" : "(read only) mimetype associated with format "
            }
        },
        "webscript" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nAn associative array of meta-data properties describing the web script.",
            "id" : {
                "!type" : "string",
                "!doc" : "The web script Id"
            },
            "shortName" : {
                "!type" : "string",
                "!doc" : "The web script short name"
            },
            "description" : {
                "!type" : "string",
                "!doc" : "The web script description "
            },
            "defaultFormat" : {
                "!type" : "string",
                "!doc" : "The default response format if none explicitly specified in web script URL "
            },
            "formatStyle" : {
                "!type" : "string",
                "!doc" : "The accepted ways of specifying the format in the web script URL "
            },
            "URIs" : {
                "!type" : "[string]",
                "!doc" : "A (string) array of URL templates "
            },
            "method" : {
                "!type" : "string",
                "!doc" : "HTTP Method"
            },
            "requiredAuthentication" : {
                "!type" : "string",
                "!doc" : "required level of authentication"
            },
            "requiredTransaction" : {
                "!type" : "string",
                "!doc" : "required level of transaction "
            },
            "storePath" : {
                "!type" : "string",
                "!doc" : "the path of the persistent store where the web script is stored"
            },
            "scriptPath" : {
                "!type" : "string",
                "!doc" : "the path (within storePath) of web script implementation files"
            },
            "descPath" : {
                "!type" : "string",
                "!doc" : "the path (within storePath) of the web script description document"
            }
        },
        "server" : {
            "!doc" : "ONLY FOR WEBSCRIPTS \n\nAn associative array of meta-data properties that describe the hosting Alfresco server.",
            "versionMajor" : {
                "!type" : "string",
                "!doc" : "server major version number, for example 1.2.3"
            },
            "versionMinor" : {
                "!type" : "string",
                "!doc" : "server minor version number, for example 1.2.3"
            },
            "versionRevision" : {
                "!type" : "string",
                "!doc" : "server revision number, for example 1.2.3"
            },
            "versionLabel" : {
                "!type" : "string",
                "!doc" : "server version label, for example Dev"
            },
            "versionBuild" : {
                "!type" : "string",
                "!doc" : "server build number, for example build-1"
            },
            "version" : {
                "!type" : "string",
                "!doc" : "server version, for example major.minor.revision (label)"
            },
            "edition" : {
                "!type" : "string",
                "!doc" : "server edition, for example Enterprise"
            },
            "schema" : {
                "!type" : "string",
                "!doc" : "server schema, for example 10"
            }
        },

        "ScriptInputStream" : {
            "!doc:" : "the scriptcontent inputstream."
        },

        "requestBody" : {
            "!doc:" : "the scriptcontent inputstream.",
        },

        "ScriptContent" : {
            "!doc" : "The ScriptContentData API provides several methods and properties related to node properties of type d:content (for example, document.properties.content).",
            "mimetype" : {
                "!type" : "string",
                "!doc" : "A read/write string value that represents the mimetype of the content. "
            },
            "guessMimetype" : {
                "!type" : "fn(filename: string) -> string",
                "!doc" : "Guess and apply the mimetype to the content based on the given filename."
            },
            "guessEncoding" : {
                "!type" : "fn() -> string",
                "!doc" : "Guess and apply the encoding to the content based on the current content. Uses the ContentCharsetFinder service. "
            },
            "getInputStream" : {
                "!type" : "fn() -> string",
                "!doc" : "Guess and apply the encoding to the content based on the current content. Uses the ContentCharsetFinder service. "
            },
            "encoding" : {
                "!type" : "string",
                "!doc" : "A read/write string value that represents the encoding of the content. "
            },
            "size" : {
                "!type" : "nubmer",
                "!doc" : "A readonly long value that represents the size in bytes of the content. "
            },
            "url" : {
                "!type" : "string",
                "!doc" : "A readonly string representing the download url for the content."
            },
            "downloadUrl" : {
                "!type" : "string",
                "!doc" : "A readonly string representing the download (as attachment) url for the content. "
            },
            "delete" : {
                "!type" : "fn()",
                "!doc" : "Delete the content stream."
            },
            "write" : {
                "!type" : "fn(content: ScriptContent)",
                "!doc" : "copies the content from the specified ScriptContent."
            },
            "write1" : {
                "!type" : "fn(content: ScriptContent, applyMimetype: bool, guessEncoding: bool)",
                "!doc" : "parameter:\n\tcontent - the source ScriptContetnData object \tapplyMimetype - if set to true, the mimetype will be set from the mimetype of the source ScriptContentData object. If false, the mimetype of the target is unchanged.\tguessEncoding - if true the method will attempt to determine the encoding from the source content stream. If false, the encoding as set in the source content object will be used."
            },
            "write2" : {
                "!type" : "fn(input: ScriptInputStream)",
                "!doc" : "the input stream for the underlying ScriptContentData object."
            },
            "content" : {
                "!type" : "string",
                "!doc" : "A read/write value that represents the content as a string"
            }
        }
    }
    var alfrescoDef = CodeMirror.tern.getDef()[1];

    for ( var type in def) {
        alfrescoDef[type] = def[type];
    }
})();