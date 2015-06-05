(function() {
    var def = {

                "!name": "alfresco",
                "companyhome": {
                  "!type": "ScriptNode",
                  "!doc": "The company home ScriptNode. See ScriptNode API for properties and methods."  },
                "document": {
                  "!type": "ScriptNode",
                  "!doc": "The current document ScriptNode (if any)"  },
                "person": {
                  "!type": "ScriptNode",
                  "!doc": "The ScriptNode representing the Person object of the currently authenticated user. See ScriptNode API for properties and methods."  },
                "roothome": {
                  "!type": "ScriptNode",
                  "!doc": "The store root ScriptNode. The repository root folder. See ScriptNode API for properties and methods."  },
                "script": {
                  "!type": "ScriptNode",
                  "!doc": "The ScriptNode representing the script object itself. This is only available if the script is loaded from the Java classpath."  },
                "space": {
                  "!type": "ScriptNode",
                  "!doc": "The current space ScriptNode (if any). For a script executing from a rule, the space object is the space in which the rule resides. If the rule is inherited, this may not be the expected space."  },
                "userhome": {
                  "!type": "ScriptNode",
                  "!doc": "The current user\u0027s Home Space ScriptNode. See ScriptNode API for properties and methods."  },
                "guest": {
                  "!type": "bool",
                  "!doc": "True if the user is logged in as a guest."  },
                "model": {
                  "!type": "?",
                  "!doc": "Used to pass a model from the control script to the view renderer (template). Web scripts only."  },
                "server": {
                  "!type": "?",
                  "!doc": "Server details"  },
                "args": {
                  "!type": "Map",
                  "!doc": "List of arguments passed to the script"  },
                "argsM": {
                  "!type": "Map",
                  "!doc": "a map of (array) arguments from Web Script Request (for scripting)"  },
                "Tag": {
                  "!doc": "Tag class returned from getCategoryUsage().",
                  "categoryNode": {
                    "!type": "CategoryNode"    },
                  "frequency": {
                    "!type": "number"    }
                },
                "TagDetails": {
                  "!doc": "Contains the details of a tag within a specific tag scope.",
                  "name": {
                    "!type": "string"    },
                  "count": {
                    "!type": "number"    }
                },
                "CustomProperty": {
                  "!doc": "Custom property helper class for Site object",
                  "name": {
                    "!type": "string"    },
                  "type": {
                    "!type": "string"    },
                  "title": {
                    "!type": "string"    },
                  "value": {
                    "!type": "?"    }
                },
                "Map": {
                  "!doc": "representation of java.util.Map which is returned often by alfresco jscript objects like ScriptNode",
                  "get": {
                    "!type": "fn() -\u003e ?"    }
                },
                "formService": {
                  "!doc": "\n  Script object representing the form service.,\n  @author Neil McErlean\nsee class org.alfresco.repo.forms.script.ScriptFormService",
                  "getForm2": {
                    "!original": "getForm",
                    "!type": "fn(itemKind: string, itemId: string, fields: [string], forcedFields: [string]) -\u003e ScriptForm",
                    "!doc": "\n  Returns a form representation of the given item consisting \n  only of the given fields.,\n  @param itemKind The kind of item to retrieve a form for,\n  @param itemId The identifier of the item to retrieve a form for,\n  @param fields String array of fields to include, null\n  indicates all possible fields for the item \n  should be included,\n  @param forcedFields List of field names from \\\u0027fields\\\u0027 list\n  that should be forcibly included, it is\n  up to the form processor implementation\n  to determine how to enforce this,\n  @return The form"    },
                  "saveForm": {
                    "!type": "fn(itemKind: string, itemId: string, postData: ?) -\u003e ?",
                    "!doc": "\n  Persists the given data object for the item provided,\n  @param itemKind The kind of item to retrieve a form for,\n  @param itemId The identifier of the item to retrieve a form for,\n  @param postData The post data, this can be a Map of name value\n  pairs, a webscript FormData object or a JSONObject,\n  @return The persisted object"    },
                  "getForm": {
                    "!type": "fn(itemKind: string, itemId: string) -\u003e ScriptForm",
                    "!doc": "\n  Returns a form representation of the given item,\n  all known fields for the item are included.,\n  @param itemKind The kind of item to retrieve a form for,\n  @param itemId The identifier of the item to retrieve a form for,\n  @return The form"    },
                  "getForm1": {
                    "!original": "getForm",
                    "!type": "fn(itemKind: string, itemId: string, fields: [string]) -\u003e ScriptForm",
                    "!doc": "\n  Returns a form representation of the given item consisting \n  only of the given fields.,\n  @param itemKind The kind of item to retrieve a form for,\n  @param itemId The identifier of the item to retrieve a form for,\n  @param fields String array of fields to include, null\n  indicates all possible fields for the item \n  should be included,\n  @return The form"    }
                },
                "search": {
                  "!doc": "\n  Search component for use by the ScriptService.\n  \u003cp\u003e\n  Provides access to Lucene search facilities including saved search objects. The results\n  from a search are returned as an array (collection) of scriptable Node wrapper objects.\n  \u003cp\u003e\n  The object is added to the root of the model to provide syntax such as:\n  \u003ccode\u003evar results \u003d search.luceneSearch(statement);\u003c\\/code\u003e\n  and\n  \u003ccode\u003evar results \u003d search.savedSearch(node);\u003c\\/code\u003e,\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.Search",
                  "tagSearch": {
                    "!type": "fn(store: string, tag: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Searchs the store for all nodes with the given tag applied.,\n  @param store             store ref string, default used if null provided,\n  @param tag               tag name,\n  @return ScriptNode[]     nodes with tag applied"    },
                  "ISO9075Encode": {
                    "!type": "fn(s: string) -\u003e string",
                    "!doc": "\n  Encode a string to ISO9075 - used to build valid paths for Lucene queries etc.,\n  @param s     Value to encode,\n  @return encoded value"    },
                  "xpathSearch1": {
                    "!original": "xpathSearch",
                    "!type": "fn(store: string, search: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a XPath search,\n  @param store         Store reference to search against i.e. workspace:\\/\\/SpacesStore,\n  @param search        XPath search string to execute,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "selectNodes": {
                    "!type": "fn(search: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a SelectNodes XPath search,\n  @param search        SelectNodes XPath search string to execute,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "query": {
                    "!type": "fn(search: ?) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a query based on the supplied search definition object.\n  Search object is defined in JavaScript thus:\n  \u003cpre\u003e\n  search\n  {\n  query: string,          mandatory, in appropriate format and encoded for the given language\n  store: string,          optional, defaults to \\\u0027workspace:\\/\\/SpacesStore\\\u0027\n  language: string,       optional, one of: lucene, xpath, jcr-xpath, fts-alfresco - defaults to \\\u0027lucene\\\u0027\n  templates: [],          optional, Array of query language template objects (see below) - if supported by the language \n  sort: [],               optional, Array of sort column objects (see below) - if supported by the language\n  page: object,           optional, paging information object (see below) - if supported by the language\n  namespace: string,      optional, the default namespace for properties\n  defaultField: string,   optional, the default field for query elements when not explicit in the query\n  onerror: string         optional, result on error - one of: exception, no-results - defaults to \\\u0027exception\\\u0027\n  }\n  sort\n  {\n  column: string,         mandatory, sort column in appropriate format for the language\n  ascending: boolean      optional, defaults to false\n  }\n  page\n  {\n  maxItems: int,          optional, max number of items to return in result set\n  skipCount: int          optional, number of items to skip over before returning results\n  }\n  template\n  {\n  field: string,          mandatory, custom field name for the template\n  template: string        mandatory, query template replacement for the template\n  }\n  Note that only some query languages support custom query templates, such as \\\u0027fts-alfresco\\\u0027. \n  See the following documentation for more details:{@link http:\\/\\/wiki.alfresco.com\\/wiki\\/Full_Text_Search_Query_Syntax#Templates}\u003c\\/pre\u003e,\n  @param search    Search definition object as above,\n  @return Array of ScriptNode results"    },
                  "luceneSearch": {
                    "!type": "fn(search: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a Lucene search,\n  @param search        Lucene search string to execute,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "ISO9075Decode": {
                    "!type": "fn(s: string) -\u003e string",
                    "!doc": "\n  Decode a string from ISO9075,\n  @param s     Value to decode,\n  @return decoded value"    },
                  "getSearchSubsystem": {
                    "!type": "fn() -\u003e string"    },
                  "xpathSearch": {
                    "!type": "fn(search: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a XPath search,\n  @param search        XPath search string to execute,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "isValidXpathQuery": {
                    "!type": "fn(query: string) -\u003e bool",
                    "!doc": "\n  Validation Xpath query,\n  @param query xpath query,\n  @return true if xpath query valid"    },
                  "searchSubsystem": {
                    "!type": "string",
                    "!doc": "nullnsee method getSearchSubsystemn"    },
                  "savedSearch1": {
                    "!original": "savedSearch",
                    "!type": "fn(searchRef: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a saved Lucene search,\n  @param searchRef    NodeRef string that points to the node containing saved search XML content,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "luceneSearch3": {
                    "!original": "luceneSearch",
                    "!type": "fn(search: string, sortColumn: string, asc: bool, max: number) -\u003e [ScriptNode]"    },
                  "luceneSearch2": {
                    "!original": "luceneSearch",
                    "!type": "fn(search: string, sortColumn: string, asc: bool) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a Lucene search (sorted),\n  @param search   Lucene search string to execute,\n  @param sortKey  property name to sort on,\n  @param asc      true \u003d\u003e ascending sort,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "luceneSearch5": {
                    "!original": "luceneSearch",
                    "!type": "fn(store: string, search: string, sortColumn: string, asc: bool, max: number) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a Lucene search (sorted),\n  @param store    Store reference to search against i.e. workspace:\\/\\/SpacesStore,\n  @param search   Lucene search string to execute,\n  @param sortKey  property name to sort on,\n  @param asc      true \u003d\u003e ascending sort,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "luceneSearch4": {
                    "!original": "luceneSearch",
                    "!type": "fn(store: string, search: string, sortColumn: string, asc: bool) -\u003e [ScriptNode]"    },
                  "findNode": {
                    "!type": "fn(ref: NodeRef) -\u003e ScriptNode",
                    "!doc": "\n  Find a single Node by the Node reference,\n  @param ref       The NodeRef of the Node to find,\n  @return the Node if found or null if failed to find"    },
                  "selectNodes1": {
                    "!original": "selectNodes",
                    "!type": "fn(store: string, search: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a SelectNodes XPath search,\n  @param store         Store reference to search against i.e. workspace:\\/\\/SpacesStore,\n  @param search        SelectNodes XPath search string to execute,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "savedSearch": {
                    "!type": "fn(savedSearch: ScriptNode) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a saved Lucene search,\n  @param savedSearch   Node that contains the saved search XML content,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "findNode1": {
                    "!original": "findNode",
                    "!type": "fn(ref: string) -\u003e ScriptNode",
                    "!doc": "\n  Find a single Node by the Node reference,\n  @param ref       The fully qualified NodeRef in String format,\n  @return the Node if found or null if failed to find"    },
                  "luceneSearch1": {
                    "!original": "luceneSearch",
                    "!type": "fn(store: string, search: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Execute a Lucene search,\n  @param store         Store reference to search against i.e. workspace:\\/\\/SpacesStore,\n  @param search        Lucene search string to execute,\n  @return JavaScript array of Node results from the search - can be empty but not null"    },
                  "findNode2": {
                    "!original": "findNode",
                    "!type": "fn(referenceType: string, reference: [string]) -\u003e ScriptNode",
                    "!doc": "\n  Helper to convert a Web Script Request URL to a Node Ref\n  1) Node - {store_type}\\/{store_id}\\/{node_id} \n  Resolve to node via its Node Reference.\n  2) Path - {store_type}\\/{store_id}\\/{path}\n  Resolve to node via its display path.\n  3) AVM Path - {store_id}\\/{path}\n  Resolve to AVM node via its display path,\n  @param referenceType    one of \\\"node\\\", \\\"path\\\", or \\\"avmpath\\\",\n  @param reference        array of reference segments (as described above for each reference type),\n  @return ScriptNode       the script node"    }
                },
                "crossRepoCopy": {
                  "!doc": "\n  Helper bean to access Cross Repository copy services from a script context.,\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.CrossRepositoryCopy",
                  "copy": {
                    "!type": "fn(src: ScriptNode, dest: ScriptNode, name: string) -\u003e ScriptNode",
                    "!doc": "\n  Perform a copy of a source node to the specified parent destination node. The name will\n  be applied to the destination node copy.\n  \u003cp\u003e\n  Inter-store copy operations between Workspace and AVM and visa-versa are supported.,\n  @param src       Source node instance,\n  @param dest      Destination parent node instance,\n  @param name      Name of the node copy,\n  @return node representing the copy if successful, null on unsupported store type.,\n  @throws org.alfresco.error.AlfrescoRuntimeException on copy error"    }
                },
                "taggingService": {
                  "!doc": "\n  Script object representing the tagging service.,\n  @author Roy Wetherall\nsee class org.alfresco.repo.tagging.script.ScriptTaggingService",
                  "getTag": {
                    "!type": "fn(store: string, tag: string) -\u003e ScriptNode",
                    "!doc": "\n  Get a tag by name if available in a store,\n  @param store     store reference,\n  @param tag       tag name,\n  @return ScriptNode   tag node, or null if not found"    },
                  "createTag": {
                    "!type": "fn(store: string, tag: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a tag in a given store,\n  @param store     store reference,\n  @param tag       tag name,\n  @return ScriptNode   newly created tag node, or null if unable to create"    },
                  "deleteTag": {
                    "!type": "fn(store: string, tag: string)",
                    "!doc": "\n  delete tag at the given store,\n  @param store     store reference,\n  @param tag       tag name"    },
                  "getTags": {
                    "!type": "fn(store: string) -\u003e [string]",
                    "!doc": "\n  Get all the tags available in a store,\n  @param store     store reference,\n  @return String[] tag names"    },
                  "getTags1": {
                    "!original": "getTags",
                    "!type": "fn(store: string, filter: string) -\u003e [string]",
                    "!doc": "\n  Get all the tags available in a store based on a text filter,\n  @param store     store reference,\n  @param filter    tag filter,\n  @return String[] tag names"    }
                },
                "presence": {
                  "!doc": "\n  Scripted Presence service for determining online status of People.,\n  @author Mike Hatfield\nsee class org.alfresco.repo.jscript.Presence",
                  "getDetails": {
                    "!type": "fn(person: ScriptNode) -\u003e string",
                    "!doc": "\n  Query current online status of given person,\n  @param person       the person to query,\n  @return string indicating online presence status"    },
                  "hasPresence": {
                    "!type": "fn(person: ScriptNode) -\u003e bool",
                    "!doc": "\n  Gets whether the Person has configured Presence parameters,\n  @param person       the person to query,\n  @return true if this person is configured for presence"    }
                },
                "commentService": {
                  "!doc": "\n  Temporary comment service API to start encapsulation of comment logic.\n  NOTE:  this has been added to resolve a specific issue and needs re-consideration ,\n  @author Roy Wetherall\nsee class org.alfresco.repo.web.scripts.comment.ScriptCommentService",
                  "createCommentsFolder": {
                    "!type": "fn(node: ScriptNode) -\u003e ScriptNode"    }
                },
                "paging": {
                  "!doc": "\n  Paging.  A utility for maintaining paged indexes for a collection of N items.\n  There are two types of cursor:\n  a) Paged\n  This type of cursor is driven from a page number and page size.  Random access within\n  the collection is possible by jumping straight to a page.  A simple scroll through\n  the collection is supported by iterating through each next page.  \n  b) Windowed\n  This type of cursor is driven from a skip row count and maximum number of rows.  Random\n  access is not supported.  The collection of items is simply scrolled through from\n  start to end by iterating through each next set of rows.\n  In either case, a paging cursor provides a start row and end row which may be used\n  to extract the items for the page from the collection of N items.\n  A zero (or less) page size or row maximum means \\\"unlimited\\\". \n  Zero or one based Page and Rows indexes are supported.  By default, Pages are 1 based and\n  Rows are 0 based.\n  At any time, -1 is returned to represent \\\"out of range\\\" i.e. for next, previous, last page.\n  Pseudo-code for traversing through a collection of N items (10 at a time):\n  Paging paging \u003d new Paging();\n  Cursor page \u003d paging.createCursor(N, paging.createPage(1, 10));\n  while (page.isInRange())\n  {\n  for (long i \u003d page.getStartRow(); i \u003c\u003d page.getEndRow(); i++)\n  {\n  ...collection[i]...\n  }\n  page \u003d paging.createCursor(N, paging.createPage(page.getNextPage(), page.getPageSize());\n  }\n  Cursor window \u003d paging.createCursor(N, paging.createWindow(0, 10));\n  while (window.isInRange())\n  {\n  for (long i \u003d window.getStartRow(); i \u003c\u003d window.getEndRow(); i++)\n  {\n  ...collection[i]...\n  }\n  window \u003d paging.createCursor(N, paging.createWindow(window.getNextPage(), window.getPageSize());   \n  },\n  @author davidc\nsee class org.alfresco.repo.web.util.paging.Paging",
                  "createPage": {
                    "!type": "fn(pageNumber: number, pageSize: number) -\u003e Page",
                    "!doc": "\n  Create a Page,\n  @param pageNumber  page number,\n  @param pageSize  page size,\n  @return  the page"    },
                  "createPageOrWindow": {
                    "!type": "fn(args: null) -\u003e Page",
                    "!doc": "\n  Create a Page or Window from standardised request arguments\n  For Paged based index (take precedence over window based index, if both are specified):\n  - request args\n  pageNo  \u003d\u003e page number index \n  pageSize  \u003d\u003e size of page\n  For Window based index (as defined by CMIS):\n  - request args  (take precedence over header values if both are specified)\n  skipCount  \u003d\u003e row number start index\n  maxItems  \u003d\u003e size of page,\n  @param args  request args,\n  @return  page (if pageNumber driven) or window (if skipCount driven)"    },
                  "createPagedResults": {
                    "!type": "fn(results: [?], cursor: Cursor) -\u003e PagedResults",
                    "!doc": "\n  Create a Paged Result Set,\n  @param results  the results for the page within the cursor,\n  @param cursor  the cursor,\n  @return  the paged result set"    },
                  "createCursor": {
                    "!type": "fn(totalRows: number, page: Page) -\u003e Cursor",
                    "!doc": "\n  Create a Cursor,\n  @param totalRows  total number of rows in cursor (\u003c 0 for don\\\u0027t know),\n  @param page  the page \\/ window within cursor,\n  @return  the cursor"    },
                  "createPageOrWindow1": {
                    "!original": "createPageOrWindow",
                    "!type": "fn(pageNumber: Integer, pageSize: Integer, skipCount: Integer, maxItems: Integer) -\u003e Page",
                    "!doc": "\n  Create a Page or Window,\n  @param pageNumber  page number (optional and paired with pageSize),\n  @param pageSize   page size (optional and paired with pageNumber),\n  @param skipCount  skipCount (optional and paired with maxItems),\n  @param maxItems  maxItems (optional and paired with skipCount),\n  @return  page (if pageNumber driven) or window (if skipCount driven)"    },
                  "createUnlimitedPage": {
                    "!type": "fn() -\u003e Page",
                    "!doc": "\n  Create an unlimited Page,\n  @return  page (single Page starting at first page of unlimited page size)"    },
                  "createWindow": {
                    "!type": "fn(skipRows: number, maxRows: number) -\u003e Page",
                    "!doc": "\n  Create a Window,\n  @param skipRows  number of rows to skip,\n  @param maxRows  maximum number of rows in window,\n  @return  the window"    },
                  "isZeroBasedRow": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is zero based row index?\n  Note: scoped to this paging cursor instance,\n  @return true \u003d\u003e 0 based, false \u003d\u003e 1 based"    },
                  "createPagedResult": {
                    "!type": "fn(result: ?, cursor: Cursor) -\u003e PagedResults",
                    "!doc": "\n  Create a Paged Result Set,\n  @param results  the results for the page within the cursor,\n  @param cursor  the cursor,\n  @return  the paged result set"    },
                  "isZeroBasedPage": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is zero based page index?\n  Note: scoped to this paging cursor instance,\n  @return true \u003d\u003e 0 based, false \u003d\u003e 1 based"    },
                  "setZeroBasedRow": {
                    "!type": "fn(zeroBasedRow: bool)",
                    "!doc": "\n  Sets zero based row index\n  Note: scoped to this paging cursor instance,\n  @param zeroBasedRow  true \u003d\u003e 0 based, false \u003d\u003e 1 based"    },
                  "setZeroBasedPage": {
                    "!type": "fn(zeroBasedPage: bool)",
                    "!doc": "\n  Sets zero based page index\n  Note: scoped to this paging cursor instance,\n  @param zeroBasedPage  true \u003d\u003e 0 based, false \u003d\u003e 1 based"    }
                },
                "classification": {
                  "!doc": "\n  Support for finding classifications and their root categories.,\n  @author Andy Hind\nsee class org.alfresco.repo.template.Classification",
                  "allClassificationAspects": {
                    "!type": "List",
                    "!doc": "\n  @return all the aspects that define a classification.nsee method getAllClassificationAspectsn"    },
                  "getAllCategoryNodes": {
                    "!type": "fn(aspect: string) -\u003e [CategoryNode]",
                    "!doc": "\n  Find all the category nodes in a given classification.,\n  @param aspect,\n  @return all the category nodes in a given classification."    },
                  "getAllCategoryNodes1": {
                    "!original": "getAllCategoryNodes",
                    "!type": "fn(aspect: QName) -\u003e [CategoryNode]",
                    "!doc": "\n  Find all the category nodes in a given classification.,\n  @param aspect,\n  @return all the category nodes in a given classification."    },
                  "getRootCategories": {
                    "!type": "fn(aspect: string) -\u003e [CategoryNode]",
                    "!doc": "\n  Get the root categories in a classification.,\n  @param aspect,\n  @return List of TemplateNode"    },
                  "getAllClassificationAspects": {
                    "!type": "fn() -\u003e List",
                    "!doc": "\n  @return all the aspects that define a classification."    }
                },
                "imap": {
                  "!doc": "null\nsee class org.alfresco.repo.jscript.Imap",
                  "getImapHomeRef": {
                    "!type": "fn(userName: string) -\u003e ScriptNode",
                    "!doc": "\n  Searches NodeRef to the IMAP home for specified user,\n  @param userName  the name of the user"    }
                },
                "format": {
                  "!doc": "\n  Format Model\n  This class is immutable.,\n  @author davidc\nsee class org.springframework.extensions.webscripts.FormatModel",
                  "getType": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the format mime\\/content type,\n  @return  mime\\/content type"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the format name,\n  @return  format name"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  Gets the format name,\n  @return  format namensee method getNamen"    },
                  "type": {
                    "!type": "string",
                    "!doc": "\n  Gets the format mime\\/content type,\n  @return  mime\\/content typensee method getTypen"    }
                },
                "session": {
                  "!doc": "\n  Support session information in free marker templates.,\n  @author Andy Hind\nsee class org.alfresco.repo.template.Session",
                  "ticket": {
                    "!type": "string",
                    "!doc": "\n  Get the current authentication ticket.,\n  @returnnsee method getTicketn"    },
                  "getTicket": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the current authentication ticket.,\n  @return"    }
                },
                "workflow": {
                  "!doc": "\n  The Workflow Manager serves as the main entry point for scripts \n  to create and interact with workflows.\n  It is made available in the root scripting scope,\n  @author glenj\nsee class org.alfresco.repo.workflow.jscript.WorkflowManager",
                  "latestDefinitions": {
                    "!type": "[JscriptWorkflowDefinition]",
                    "!doc": "\n  Gets the latest versions of the deployed, workflow definitions,\n  @return the latest versions of the deployed workflow definitionsnsee method getLatestDefinitionsn"    },
                  "getCompletedTasks": {
                    "!type": "fn() -\u003e [JscriptWorkflowTask]",
                    "!doc": "\n  Get completed tasks assigned to the current user.,\n  @return  the list of completed tasks"    },
                  "assignedTasks": {
                    "!type": "[JscriptWorkflowTask]",
                    "!doc": "\n  Get tasks assigned to the current user. Note that this will only return in-progress \n  tasks.,\n  @return  the list of assigned (in-progress) tasksnsee method getAssignedTasksn"    },
                  "allDefinitions": {
                    "!type": "[JscriptWorkflowDefinition]",
                    "!doc": "\n  Gets all versions of the deployed workflow definitions,\n  @return all versions of the deployed workflow definitionsnsee method getAllDefinitionsn"    },
                  "getTaskById": {
                    "!type": "fn(id: string) -\u003e JscriptWorkflowTask",
                    "!doc": "\n  Get task by id. Alternative method signature to \u003ccode\u003egetTask(String id)\u003c\\/code\u003e for \n  those used to the Template API,\n  @param id task id,\n  @return the task (null if not found)"    },
                  "createPackage": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Create a workflow package (a container of content to route through a workflow),\n  @return the created workflow package"    },
                  "getInstance": {
                    "!type": "fn(workflowInstanceID: string) -\u003e JscriptWorkflowInstance",
                    "!doc": "\n  Get Workflow Instance by ID,\n  @param workflowInstanceID ID of the workflow instance to retrieve,\n  @return the workflow instance for the given ID"    },
                  "getPooledTasks": {
                    "!type": "fn(authority: string) -\u003e [JscriptWorkflowTask]",
                    "!doc": "\n  Get pooled tasks,\n  @param authority  the authority,\n  @return  the list of assigned tasks"    },
                  "getDefinitionByName": {
                    "!type": "fn(name: string) -\u003e JscriptWorkflowDefinition",
                    "!doc": "\n  Get deployed workflow definition by Name,\n  @param name the workflow definition name,\n  @return the workflow definition matching the given name"    },
                  "getTask": {
                    "!type": "fn(id: string) -\u003e JscriptWorkflowTask",
                    "!doc": "\n  Get task by id,\n  @param id task id,\n  @return the task (null if not found)"    },
                  "getDefinition": {
                    "!type": "fn(id: string) -\u003e JscriptWorkflowDefinition",
                    "!doc": "\n  Get deployed workflow definition by ID,\n  @param id the workflow definition ID,\n  @return the workflow definition matching the given ID"    },
                  "getAllDefinitions": {
                    "!type": "fn() -\u003e [JscriptWorkflowDefinition]",
                    "!doc": "\n  Gets all versions of the deployed workflow definitions,\n  @return all versions of the deployed workflow definitions"    },
                  "getAssignedTasks": {
                    "!type": "fn() -\u003e [JscriptWorkflowTask]",
                    "!doc": "\n  Get tasks assigned to the current user. Note that this will only return in-progress \n  tasks.,\n  @return  the list of assigned (in-progress) tasks"    },
                  "completedTasks": {
                    "!type": "[JscriptWorkflowTask]",
                    "!doc": "\n  Get completed tasks assigned to the current user.,\n  @return  the list of completed tasksnsee method getCompletedTasksn"    },
                  "getLatestDefinitions": {
                    "!type": "fn() -\u003e [JscriptWorkflowDefinition]",
                    "!doc": "\n  Gets the latest versions of the deployed, workflow definitions,\n  @return the latest versions of the deployed workflow definitions"    }
                },
                "actions": {
                  "!doc": "\n  Scripted Action service for describing and executing actions against Nodes.,\n  @author davidc\nsee class org.alfresco.repo.jscript.Actions",
                  "getRegistered": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  Gets the list of registered action names,\n  @return the registered action names"    },
                  "registered": {
                    "!type": "[string]",
                    "!doc": "\n  Gets the list of registered action names,\n  @return the registered action namesnsee method getRegisteredn"    },
                  "create": {
                    "!type": "fn(actionName: string) -\u003e ScriptAction",
                    "!doc": "\n  Create an Action,\n  @param actionNamethe action name,\n  @return the action"    }
                },
                "logger": {
                  "!doc": "\n  NOTE: Copied from org.alfresco.repo.jscript ,\n  @author Kevin Roast,\n  @author davidc\nsee class org.springframework.extensions.webscripts.ScriptLogger",
                  "warn": {
                    "!type": "fn(str: string)"    },
                  "system": {
                    "!type": "SystemOut",
                    "!doc": "nullnsee method getSystemn"    },
                  "getSystem": {
                    "!type": "fn() -\u003e SystemOut"    },
                  "isWarnLoggingEnabled": {
                    "!type": "fn() -\u003e bool"    },
                  "isLoggingEnabled": {
                    "!type": "fn() -\u003e bool"    },
                  "log": {
                    "!type": "fn(str: string)"    }
                },
                "transfer": {
                  "!doc": "\n  Java Script Transfer Service.   Adapts the Java Transfer Service to\n  Java Script.,\n  @author Mark Rogers\nsee class org.alfresco.repo.transfer.script.ScriptTransferService",
                  "transfer": {
                    "!type": "fn(targetName: string, nodesToTransfer: ?) -\u003e ScriptNode",
                    "!doc": "\n  Transfer a set of nodes, with no callback\n  \u003cp\u003e\n  Nodes are not locked on the target.,\n  @param targetName the name of the target to transfer to,\n  @param nodes the nodes to transfer - Java Script Array of either ScriptNodes, NodeRef or String ,\n  @return node ref of transfer report."    },
                  "setExcludedAspects": {
                    "!type": "fn(excludedAspects: [string])"    },
                  "remove": {
                    "!type": "fn(targetName: string, nodesToRemove: ?) -\u003e ScriptNode",
                    "!doc": "\n  Remove a set of nodes, with no callback\n  \u003cp\u003e\n  Nodes are not locked on the target.,\n  @param targetName the name of the target to transfer to,\n  @param nodes the nodes to transfer - Java Script Array of either ScriptNodes, NodeRef or String ,\n  @return node ref of transfer report."    },
                  "allTransferTargets": {
                    "!type": "[ScriptTransferTarget]",
                    "!doc": "nullnsee method getAllTransferTargetsn"    },
                  "getTransferTargetsByGroup": {
                    "!type": "fn(groupName: string) -\u003e [ScriptTransferTarget]",
                    "!doc": "\n  Get the transfer targets for the specified group"    },
                  "transferReadOnly": {
                    "!type": "fn(targetName: string, nodesToTransfer: ?) -\u003e ScriptNode",
                    "!doc": "\n  Transfer a set of nodes, with no callback.\n  \u003cp\u003e\n  Nodes are to be locked read only on target.,\n  @param targetName the name of the target to transfer to,\n  @param nodes the nodes to transfer - Java Script Array of either ScriptNodes, NodeRef or String ,\n  @return node ref of transfer report."    },
                  "getAllTransferTargets": {
                    "!type": "fn() -\u003e [ScriptTransferTarget]"    },
                  "getTransferTarget": {
                    "!type": "fn(name: string) -\u003e ScriptTransferTarget"    }
                },
                "stringUtils": {
                  "!doc": "\n  Collection of script utility methods for working with strings etc.\n  This class is immutable.,\n  @author Kevin Roast\nsee class org.springframework.extensions.webscripts.ScriptableUtils",
                  "urlEncode": {
                    "!type": "fn(s: string) -\u003e string"    },
                  "urlDecode": {
                    "!type": "fn(s: string) -\u003e string"    },
                  "replaceLineBreaks": {
                    "!type": "fn(s: string) -\u003e string"    },
                  "urlEncodeComponent": {
                    "!type": "fn(s: string) -\u003e string"    },
                  "encodeHTML": {
                    "!type": "fn(s: string) -\u003e string"    },
                  "stripUnsafeHTML": {
                    "!type": "fn(s: string) -\u003e string"    },
                  "encodeJavaScript": {
                    "!type": "fn(s: string) -\u003e string"    },
                  "stripEncodeUnsafeHTML": {
                    "!type": "fn(s: string) -\u003e string"    }
                },
                "thumbnailService": {
                  "!doc": "\n  Script object representing the site service.,\n  @author Roy Wetherall\nsee class org.alfresco.repo.thumbnail.script.ScriptThumbnailService",
                  "isThumbnailNameRegistered": {
                    "!type": "fn(thumbnailName: string) -\u003e bool",
                    "!doc": "\n  Indicates whether a given thumbnail name has been registered.,\n  @param thumbnailName    thumbnail name,\n  @return boolean          true if the thumbnail name is registered, false otherwise"    },
                  "getMimeAwarePlaceHolderResourcePath": {
                    "!type": "fn(thumbnailName: string, mimetype: string) -\u003e string",
                    "!doc": "\n  Gets the resource path for the place holder thumbnail for the given named thumbnail and the given mime type.\n  If there is no icon available for the specified MIME type, a generic icon will be used instead.\n  The generic icon is that returned by {@link getPlaceHolderResourcePath(String)}If neither a MIME-specific icon nor a generic icon is available, \u003ccode\u003enull\u003c\\/code\u003e is returned.,\n  @param thumbnailName     the thumbnail name,\n  @param mimetype          the mimetype of the piece of content.,\n  @return String           the place holder thumbnail resource path,\n  @see #getPlaceHolderResourcePath(String)"    },
                  "getPlaceHolderResourcePath": {
                    "!type": "fn(thumbnailName: string) -\u003e string",
                    "!doc": "\n  Gets the resource path for the place holder thumbnail for the given named thumbnail.\n  Returns null if none set.,\n  @param thumbnailName     the thumbnail name,\n  @return String           the place holder thumbnail resource path, null if none set"    }
                },
                "siteService": {
                  "!doc": "\n  Script object representing the site service.,\n  @author Roy Wetherall\nsee class org.alfresco.repo.site.script.ScriptSiteService",
                  "makeSitesArray": {
                    "!type": "fn(siteInfos: null) -\u003e [Site]",
                    "!doc": "\n  Converts the given List of SiteInfo objects to a JavaScript friendly array\n  of Site objects.,\n  @param siteInfos,\n  @return Array of Site objects"    },
                  "findSites": {
                    "!type": "fn(filter: string, sitePresetFilter: string, size: number) -\u003e [Site]",
                    "!doc": "\n  Find (search) the sites available in the repository.  The returned list can optionally be filtered by name and site\n  preset.\n  \u003cp\\/\u003e\n  If no filters are specified then all the available sites are returned.,\n  @param filter            inclusion filter for returned sites. Only sites whose cm:name OR cm:title\n  OR cm:description CONTAIN the filter string will be returned.,\n  @param sitePresetFilter  site preset filter,\n  @param size              max results size crop if \u003e0,\n  @return Site[]           a list of the site filtered as appropriate,\n  @see SiteService#findSites(String,String,int) for a description of the limitations of this method.,\n  @since 4.0"    },
                  "createSite": {
                    "!type": "fn(sitePreset: string, shortName: string, title: string, description: string, isPublic: bool) -\u003e Site",
                    "!doc": "\n  @see {@link #createSite(String,String,String,String,String)},\n  @param sitePreset    site preset,\n  @param shortName     site short name,\n  @param title         site title,\n  @param description   site description,\n  @param isPublic      whether the site is public or not,\n  @return Site         the created site,\n  @deprecated          as of version 3.2, replaced by {@link #createSite(String,String,String,String,String)}"    },
                  "listSites": {
                    "!type": "fn(filter: string, sitePresetFilter: string) -\u003e [Site]",
                    "!doc": "\n  List the sites available in the repository.  The returned list can optionally be filtered by name and site\n  preset.\n  \u003cp\u003e\n  If no filters are specified then all the available sites are returned.,\n  @param filter            inclusion filter for returned sites. Only sites whose cm:name OR cm:title\n  OR cm:description start with the filter string will be returned.,\n  @param sitePresetFilter  site preset filter,\n  @return Site[]           a list of the site filtered as appropriate,\n  @see SiteService#listSites(String,String,int) for a description of the limitations of this method."    },
                  "getSites": {
                    "!type": "fn(filter: string, sitePresetFilter: string, size: number) -\u003e [Site]",
                    "!doc": "\n  Retrieves the sites available in the repository. The returned list can optionally be filtered by name and site\n  preset. If no filters are specified then all the available sites are returned.\n  NOTE: If the filter starts with a  a Lucene based search will be performed, this may discover a wider range\n  of results i.e. those sites that contain the search term as opposed to those that start with the search term,\n  but newly created sites may not be found until the underlying search indexes are updated.,\n  @param filter            inclusion filter for returned sites. Only sites whose cm:name OR cm:title\n  OR cm:description start with the filter string will be returned.,\n  @param sitePresetFilter  site preset filter,\n  @param size              max results size crop if \u003e0,\n  @return Site[]           a list of the site filtered as appropriate"    },
                  "listSites1": {
                    "!original": "listSites",
                    "!type": "fn(filter: string, sitePresetFilter: string, size: number) -\u003e [Site]",
                    "!doc": "\n  List the sites available in the repository.  The returned list can optionally be filtered by name and site\n  preset.\n  \u003cp\\/\u003e\n  If no filters are specified then all the available sites are returned.,\n  @param filter            inclusion filter for returned sites. Only sites whose cm:name OR cm:title\n  OR cm:description start with the filter string will be returned.,\n  @param sitePresetFilter  site preset filter,\n  @param size              max results size crop if \u003e0,\n  @return Site[]           a list of the site filtered as appropriate,\n  @see SiteService#listSites(String,String,int) for a description of the limitations of this method."    },
                  "cleanSitePermissions": {
                    "!type": "fn(targetNode: NodeRef)",
                    "!doc": "\n  It removes permissions which pertain to sites other than the node\\\u0027s current site.,\n  @param targetNode the root node which is to have its permissions cleaned.,\n  @see SiteService#cleanSitePermissions(NodeRef,SiteInfo)"    },
                  "listSiteRoles": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  Returns an array of all the roles that can be assigned to a member of a site.,\n  @return  String[]    roles available to assign to a member of a site"    },
                  "listUserSites1": {
                    "!original": "listUserSites",
                    "!type": "fn(userName: string) -\u003e [Site]",
                    "!doc": "\n  List all the sites that the specified user has an explicit membership to.,\n  @param userName      user name,\n  @return Site[]       a list of sites the user has an explicit membership to"    },
                  "createSite1": {
                    "!original": "createSite",
                    "!type": "fn(sitePreset: string, shortName: string, title: string, description: string, visibility: string) -\u003e Site",
                    "!doc": "\n  Create a new site.\n  \u003cp\u003e\n  The site short name will be used to uniquely identify the site so it must be unique.,\n  @param sitePreset    site preset,\n  @param shortName     site short name,\n  @param title         site title,\n  @param description   site description,\n  @param visibility    visibility of the site (public|moderated|private),\n  @return Site         the created site"    },
                  "createSite2": {
                    "!original": "createSite",
                    "!type": "fn(sitePreset: string, shortName: string, title: string, description: string, visibility: string, siteType: string) -\u003e Site",
                    "!doc": "\n  Create a new site.\n  \u003cp\u003e\n  The site short name will be used to uniquely identify the site so it must be unique.,\n  @param sitePreset    site preset,\n  @param shortName     site short name,\n  @param title         site title,\n  @param description   site description,\n  @param visibility    visibility of the site (public|moderated|private),\n  @param siteType      qname of site type to create,\n  @return Site         the created site"    },
                  "getSite": {
                    "!type": "fn(shortName: string) -\u003e Site",
                    "!doc": "\n  Get a site for a provided site short name.\n  \u003cp\u003e\n  Returns null if the site does not exist.,\n  @param shortName     short name of the site,\n  @return Site         the site, null if does not exist"    },
                  "isSiteManager": {
                    "!type": "fn(siteId: string) -\u003e bool",
                    "!doc": "\n  Determines if the current user is a manager of the given site.,\n  @param siteId The short name of the site to check,\n  @return true if the current user is a manager of the given site"    },
                  "hasCreateSitePermissions": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  This method checks if the currently authenticated user has permission to create sites.,\n  @return \u003ccode\u003etrue\u003c\\/code\u003e if the current user is a Contributor to \\\"Sites\\\" node, else \u003ccode\u003efalse\u003c\\/code\u003e.,\n  @since 3.4"    },
                  "cleanSitePermissions1": {
                    "!original": "cleanSitePermissions",
                    "!type": "fn(targetNode: ScriptNode)",
                    "!doc": "\n  This method cleans up the permissions on the specified node and all its primary children.\n  It removes permissions which pertain to sites other than the node\\\u0027s current site.,\n  @since 3.4.2,\n  @see SiteService#cleanSitePermissions(NodeRef,SiteInfo)"    },
                  "listUserSites": {
                    "!type": "fn(userName: string, size: number) -\u003e [Site]",
                    "!doc": "\n  List all the sites that the specified user has an explicit membership to.,\n  @param userName      user name,\n  @param size          maximum list size,\n  @return Site[]       a list of sites the user has an explicit membership to"    },
                  "listSiteRoles1": {
                    "!original": "listSiteRoles",
                    "!type": "fn(shortName: string) -\u003e [string]",
                    "!doc": "\n  Returns an array of all the roles that can be assigned to a member of a \n  specific site.,\n  @return  String[]    roles available to assign to a member of a site"    }
                },
                "avm": {
                  "!doc": "\n  Helper to access AVM nodes from a script context.,\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.AVM",
                  "getWebappsFolderPath": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the path to the webapps folder in a standard web store."    },
                  "assetUrl": {
                    "!type": "fn(storeId: string, assetPath: string) -\u003e string",
                    "!doc": "\n  @param store     Store ID of the asset,\n  @param assetPath Store relative path to the asset,\n  @return the preview URL to the specified store asset"    },
                  "websiteUserSandboxUrl": {
                    "!type": "fn(storeId: string, username: string) -\u003e string",
                    "!doc": "\n  @param storeId   Store ID to build preview URL for,\n  @param username  Username to build sandbox preview URL for,\n  @return the preview URL to the user sandbox for the specified store ID and username"    },
                  "stagingStore": {
                    "!type": "fn(storeId: string) -\u003e string",
                    "!doc": "\n  @param storeId   Store ID to build staging store name for,\n  @return the Staging Store name for the given store ID"    },
                  "lookupStoreRoot": {
                    "!type": "fn(store: string) -\u003e AVMNode",
                    "!doc": "\n  Return an AVM Node representing the public store root folder.,\n  @param store     Store name to lookup root folder for,\n  @return AVM Node representing the public store root folder, or null if not found."    },
                  "lookupStore": {
                    "!type": "fn(store: string) -\u003e AVMScriptStore",
                    "!doc": "\n  Return an AVM store object for the specified store name,\n  @param store         Store name to lookup,\n  @return the AVM store object for the specified store or null if not found"    },
                  "getModifiedItems": {
                    "!type": "fn(storeId: string, username: string, webapp: string) -\u003e List",
                    "!doc": "\n  Return the list of modified items for the specified user sandbox against staging store id\n  for a specific webapp.,\n  @param storeId      Root Store ID,\n  @param username     Username to get modified items for,\n  @param webapp       Webapp name to filter by,\n  @return List of AVMNode objects representing the modified items"    },
                  "lookupNode": {
                    "!type": "fn(path: string) -\u003e AVMNode",
                    "!doc": "\n  Return an AVM Node for the fully qualified path.,\n  @param path   Fully qualified path to node to lookup,\n  @return AVM Node for the fully qualified path, or null if not found."    },
                  "getStores": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  @return a array of all AVM stores in the system"    },
                  "assetUrl1": {
                    "!original": "assetUrl",
                    "!type": "fn(avmPath: string) -\u003e string",
                    "!doc": "\n  @param avmPath   Fully qualified AVM path of the asset,\n  @return the preview URL to the specified asset"    },
                  "webappsFolderPath": {
                    "!type": "string",
                    "!doc": "\n  @return the path to the webapps folder in a standard web store.nsee method getWebappsFolderPathn"    },
                  "userSandboxStore": {
                    "!type": "fn(storeId: string, username: string) -\u003e string",
                    "!doc": "\n  @param storeId   Store ID to build sandbox store name for,\n  @param username  Username of the sandbox user,\n  @return the Sandbox Store name for the given store ID and username"    },
                  "stores": {
                    "!type": "[ScriptNode]",
                    "!doc": "\n  @return a array of all AVM stores in the systemnsee method getStoresn"    },
                  "websiteStagingUrl": {
                    "!type": "fn(storeId: string) -\u003e string",
                    "!doc": "\n  @param storeId   Store ID to build preview URL for,\n  @return the preview URL to the staging store for the specified store ID"    }
                },
                "appUtils": {
                  "!doc": "\n  Utility functions specifically for external application use.,\n  @author Mike Hatfield\nsee class org.alfresco.repo.jscript.ApplicationScriptUtils",
                  "toJSON": {
                    "!type": "fn(node: ScriptNode) -\u003e string",
                    "!doc": "\n  Returns the JSON representation of a node. Long-form QNames are used in the\n  result.,\n  @param node the node to convert to JSON representation.,\n  @return The JSON representation of this node"    },
                  "toJSON1": {
                    "!original": "toJSON",
                    "!type": "fn(node: ScriptNode, useShortQNames: bool) -\u003e string",
                    "!doc": "\n  Returns the JSON representation of this node.,\n  @param node the node to convert to JSON representation.,\n  @param useShortQNames if true short-form qnames will be returned, else long-form.,\n  @return The JSON representation of this node"    },
                  "getDownloadAPIUrl": {
                    "!type": "fn(node: ScriptNode) -\u003e string",
                    "!doc": "\n  @param node the node to construct the download URL for,\n  @return For a content document, this method returns the URL to the \\/api\\/node\\/content\n  API for the default content property\n  \u003cp\u003e\n  For a container node, this method returns an empty string\n  \u003c\\/p\u003e"    }
                },
                "msg": {
                  "!doc": "\n  Helper to resolve an I18N message for JS scripts.,\n  @author Kevin Roast\nsee class org.springframework.extensions.webscripts.ScriptMessage",
                  "get": {
                    "!type": "fn(id: string) -\u003e string",
                    "!doc": "\n  Get an I18N message,\n  @param id    Message Id,\n  @return resolved message"    },
                  "get1": {
                    "!original": "get",
                    "!type": "fn(id: string, args: ?) -\u003e string",
                    "!doc": "\n  Get an I18N message with the given message args,\n  @param id    Message Id,\n  @param args  Message args,\n  @return resolved message"    }
                },
                "cache": {
                  "!doc": "\n  Web Script Cache\n  Records the desired cache requirements for the Web Script,\n  @author davidc\nsee class org.springframework.extensions.webscripts.Cache",
                  "mustRevalidate": {
                    "!type": "bool",
                    "!doc": "nullnsee method getMustRevalidaten"    },
                  "setNeverCache": {
                    "!type": "fn(neverCache: bool)",
                    "!doc": "\n  @param neverCache"    },
                  "ETag": {
                    "!type": "string",
                    "!doc": "\n  @return  ETagnsee method getETagn"    },
                  "lastModified": {
                    "!type": "?",
                    "!doc": "\n  @return last modifiednsee method getLastModifiedn"    },
                  "getETag": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return  ETag"    },
                  "getMustRevalidate": {
                    "!type": "fn() -\u003e bool"    },
                  "isPublic": {
                    "!type": "bool",
                    "!doc": "nullnsee method getIsPublicn"    },
                  "getMaxAge": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  @return  Max Age (seconds)"    },
                  "maxAge": {
                    "!type": "number",
                    "!doc": "\n  @return  Max Age (seconds)nsee method getMaxAgen"    },
                  "getNeverCache": {
                    "!type": "fn() -\u003e bool"    },
                  "setIsPublic": {
                    "!type": "fn(isPublic: bool)",
                    "!doc": "\n  @param isPublic"    },
                  "setMustRevalidate": {
                    "!type": "fn(mustRevalidate: bool)",
                    "!doc": "\n  @param mustRevalidate"    },
                  "setMaxAge": {
                    "!type": "fn(maxAge: number)",
                    "!doc": "\n  @param maxAge  Max Age (seconds)"    },
                  "getIsPublic": {
                    "!type": "fn() -\u003e bool"    },
                  "setETag": {
                    "!type": "fn(tag: string)",
                    "!doc": "\n  @param tag  ETag"    },
                  "neverCache": {
                    "!type": "bool",
                    "!doc": "nullnsee method getNeverCachen"    },
                  "getLastModified": {
                    "!type": "fn() -\u003e ?",
                    "!doc": "\n  @return last modified"    },
                  "setLastModified": {
                    "!type": "fn(lastModified: ?)",
                    "!doc": "\n  @param lastModified"    }
                },
                "replicationService": {
                  "!doc": "\n  Script object representing the replication service.,\n  @author Nick Burch\nsee class org.alfresco.repo.replication.script.ScriptReplicationService",
                  "saveReplicationDefinition": {
                    "!type": "fn(definition: ScriptReplicationDefinition)"    },
                  "createReplicationDefinition": {
                    "!type": "fn(replicationName: string, description: string) -\u003e ScriptReplicationDefinition",
                    "!doc": "\n  Creates a new {@link ScriptReplicationDefinition} and sets the replication name and\n  the description to the specified values.,\n  @param replicationName A unique identifier used to specify the created{@link ScriptReplicationDefinition}.,\n  @param description A description of the replication,\n  @return the created {@link ScriptReplicationDefinition}.,\n  @see org.alfresco.service.cmr.replication.ReplicationService#createReplicationDefinition(String,String)"    },
                  "loadReplicationDefinition": {
                    "!type": "fn(replicationName: string) -\u003e ScriptReplicationDefinition"    },
                  "loadReplicationDefinitions": {
                    "!type": "fn() -\u003e [ScriptReplicationDefinition]"    },
                  "loadReplicationDefinitions1": {
                    "!original": "loadReplicationDefinitions",
                    "!type": "fn(targetName: string) -\u003e [ScriptReplicationDefinition]"    },
                  "replicate": {
                    "!type": "fn(definition: ScriptReplicationDefinition)"    }
                },
                "cmisServer": {
                  "!doc": "\n  CMIS Javascript API.,\n  @author davidc,\n  @author dward\nsee class org.alfresco.repo.cmis.rest.CMISScript",
                  "queryType": {
                    "!type": "fn(typeId: string) -\u003e CMISTypeDefinition",
                    "!doc": "\n  Query for a Type Definition given a CMIS Type Id.,\n  @param typeIdthe type id,\n  @return CMIS Type Definition"    },
                  "specTitle": {
                    "!type": "string",
                    "!doc": "\n  Gets the supported CMIS Specification Title,\n  @return  CMIS Specification Titlensee method getSpecTitlen"    },
                  "queryCheckedOut": {
                    "!type": "fn(username: string, folder: ScriptNode, includeDescendants: bool, page: Page) -\u003e PagedResults",
                    "!doc": "\n  Query for items checked-out to user within folder (and possibly descendants),\n  @param username  user,\n  @param folder  folder,\n  @param includeDescendants  true \u003d include descendants  ,\n  @param page,\n  @return  paged result set of checked-out items"    },
                  "getLastChangeLogToken": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the last change log token.,\n  @return the last change log token"    },
                  "createRepoReferenceFromUrl": {
                    "!type": "fn(args: null, templateArgs: null) -\u003e CMISRepositoryReference",
                    "!doc": "\n  Create CMIS Repository Reference from URL segments,\n  @param args  url arguments,\n  @param templateArgs  url template arguments,\n  @return  Repository Reference  (or null, in case of bad url)"    },
                  "getDefaultRootFolderPath": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the default root folder path,\n  @return  default root folder path"    },
                  "getPermissionMappings": {
                    "!type": "fn() -\u003e List",
                    "!doc": "\n  Get the list of permission mappings.,\n  @return get the permission mapping as defined by the CMIS specification."    },
                  "deleteTree": {
                    "!type": "fn(source: ScriptNode, status: Status, continueOnFailure: bool, unfile: bool, deleteAllVersions: bool)",
                    "!doc": "\n  Attempts to delete a folder and all of its children, recording the status in the given status object.,\n  @param sourcethe folder node,\n  @param statusthe status,\n  @param continueOnFailureshould we continue if an error occurs with one of the children?,\n  @param unfileshould we remove non-primary associations to nodes rather than delete them?,\n  @param deleteAllVersionsshould we delete all the versions of the nodes we delete?"    },
                  "queryProperty": {
                    "!type": "fn(propertyName: string) -\u003e CMISPropertyDefinition",
                    "!doc": "\n  Query the Property Definition for the given Property.,\n  @param propertyNamethe property name,\n  @return the CMIS property definition"    },
                  "aclPropagation": {
                    "!type": "CMISAclPropagationEnum",
                    "!doc": "\n  Gets the ACL propagation.,\n  @return the ACL propagationnsee method getAclPropagationn"    },
                  "getDefaultRootFolder": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Gets the default root folder,\n  @return  default root folder"    },
                  "changesIncomplete": {
                    "!type": "bool",
                    "!doc": "\n  Determines whether the repository\\\u0027s change log can return all changes ever made to any object in the repository\n  or only changes made after a particular point in time.,\n  @return \u003ccode\u003efalse\u003c\\/code\u003e if the change log can return all changes ever made to every object.\u003ccode\u003etrue\u003c\\/code\u003e\n  if the change log includes all changes made since a particular point in time, but not all changes ever\n  made.nsee method getChangesIncompleten"    },
                  "getAllVersions": {
                    "!type": "fn(source: ScriptNode) -\u003e [ScriptNode]",
                    "!doc": "\n  Gets all the versions of a node.,\n  @param sourcethe node,\n  @return a Javascript array of all the versions"    },
                  "getSpecTitle": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the supported CMIS Specification Title,\n  @return  CMIS Specification Title"    },
                  "defaultRootFolderPath": {
                    "!type": "string",
                    "!doc": "\n  Gets the default root folder path,\n  @return  default root folder pathnsee method getDefaultRootFolderPathn"    },
                  "getJoinSupport": {
                    "!type": "fn() -\u003e CMISJoinEnum",
                    "!doc": "\n  Get the join support level in queries.,\n  @return the join support level"    },
                  "joinSupport": {
                    "!type": "CMISJoinEnum",
                    "!doc": "\n  Get the join support level in queries.,\n  @return the join support levelnsee method getJoinSupportn"    },
                  "queryChildren": {
                    "!type": "fn(parent: ScriptNode, typesFilter: string, orderBy: string, page: Page) -\u003e PagedResults",
                    "!doc": "\n  Query for node children,\n  @param parentnode to query children for,\n  @param typesFiltertypes filter,\n  @param orderBycomma-separated list of query names and the ascending modifier \\\"ASC\\\" or the descending modifier \\\"DESC\\\"\n  for each query name,\n  @param pagepage to query for,\n  @return paged result set of children"    },
                  "createObjectIdReference": {
                    "!type": "fn(objectId: string) -\u003e CMISObjectReference",
                    "!doc": "\n  Create Object Reference,\n  @param repo  repository reference,\n  @param object id  object id (NodeRef.toString() format),\n  @return  object id reference"    },
                  "getPrincipalAnyone": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the name of the principal who is used to indicate any authenticated user. This principal can then be passed\n  to the ACL services to specify what permissions any authenticated user should have.,\n  @return name of the principal who is used to indicate any authenticated user"    },
                  "createObjectReferenceFromUrl": {
                    "!type": "fn(args: null, templateArgs: null) -\u003e CMISObjectReference",
                    "!doc": "\n  Create CMIS Object Reference from URL segments,\n  @param args  url arguments,\n  @param templateArgs  url template arguments,\n  @return  Repository Reference  (or null, in case of bad url)"    },
                  "getAllVersionsSearchable": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Can you query non-latest versions of a document.\n  The current latest version is always searchable according to  the type definition.,\n  @return"    },
                  "getRepositoryPermissions": {
                    "!type": "fn() -\u003e List",
                    "!doc": "\n  Get all the permissions defined by the repository.,\n  @return a list of permissions"    },
                  "getNode": {
                    "!type": "fn(ref: CMISObjectReference) -\u003e ScriptNode",
                    "!doc": "\n  Get Node from Object Reference,\n  @param ref  object reference,\n  @return  node"    },
                  "checkIn": {
                    "!type": "fn(source: ScriptNode, checkinComment: string, isMajor: bool) -\u003e ScriptNode",
                    "!doc": "\n  Checks in a given private working copy node.,\n  @param sourcethe node,\n  @param checkinCommentthe checkin comment,\n  @param isMajoris this a major version?,\n  @return the checked-in node"    },
                  "moveObject": {
                    "!type": "fn(child: ScriptNode, targetFolder: ScriptNode, sourceFolderId: string)",
                    "!doc": "\n  Moves an object from a source folder to a target folder.,\n  @param childthe object to move,\n  @param targetFolderthe target folder,\n  @param sourceFolderIdthe source folder object ID"    },
                  "deleteObject": {
                    "!type": "fn(source: ScriptNode, allVersions: bool)",
                    "!doc": "\n  Deletes a node.,\n  @param sourcethe node,\n  @param allVersionsshould we delete all the versions of the node?"    },
                  "getAppliedPolicies": {
                    "!type": "fn(source: ScriptNode, filter: string, page: Page) -\u003e PagedResults",
                    "!doc": "\n  Gets the list of policy objects currently applied to a target object.,\n  @param sourcesource node,\n  @param filterproperty filter,\n  @throws WebScriptException on error"    },
                  "addObjectToFolder": {
                    "!type": "fn(child: ScriptNode, parent: ScriptNode)",
                    "!doc": "\n  Adds an object to a folder.,\n  @param childthe object to add,\n  @param parentthe folder"    },
                  "getAclCapability": {
                    "!type": "fn() -\u003e CMISAclCapabilityEnum",
                    "!doc": "\n  Gets the ACL capability.,\n  @return the ACL capability"    },
                  "changeLogCapability": {
                    "!type": "CMISCapabilityChanges",
                    "!doc": "\n  Gets the change log capability.,\n  @return the change log capabilitynsee method getChangeLogCapabilityn"    },
                  "isValidTypesFilter": {
                    "!type": "fn(typesFilter: string) -\u003e bool",
                    "!doc": "\n  Is specified Types filter valid?,\n  @param typesFilter  types filter,\n  @return  true \u003d\u003e valid"    },
                  "getChangeLog": {
                    "!type": "fn(changeLogToken: string, maxItems: Integer) -\u003e [ScriptNode]",
                    "!doc": "\n  Gets the change log attributes.,\n  @param changeLogTokenthe change log token,\n  @param maxItemsthe maximum number of events to include to return or \u003ccode\u003enull\u003c\\/code\u003e,\n  @return the change log attributes"    },
                  "applyPolicy": {
                    "!type": "fn(policyId: string, target: ScriptNode)",
                    "!doc": "\n  Applies a policy object to a target object.,\n  @param policyIdpolicy Id,\n  @param targettarget node,\n  @throws WebScriptException on error"    },
                  "getChangesOnType": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  Gets the list of base types for which changes are available.,\n  @return the list of base types for which changes are available"    },
                  "allVersionsSearchable": {
                    "!type": "bool",
                    "!doc": "\n  Can you query non-latest versions of a document.\n  The current latest version is always searchable according to  the type definition.,\n  @returnnsee method getAllVersionsSearchablen"    },
                  "getAssociation": {
                    "!type": "fn(ref: CMISRelationshipReference) -\u003e Association",
                    "!doc": "\n  Get Association from Relationship Reference,\n  @param ref  relationship reference,\n  @return  association"    },
                  "deleteContentStream": {
                    "!type": "fn(source: ScriptNode)",
                    "!doc": "\n  Deletes a node\\\u0027s content stream.,\n  @param sourcethe node"    },
                  "query": {
                    "!type": "fn(statement: string, page: Page) -\u003e PagedResults",
                    "!doc": "\n  Issue query.,\n  @param statementquery statement,\n  @param pagethe page,\n  @return paged result set"    },
                  "principalAnonymous": {
                    "!type": "string",
                    "!doc": "\n  Gets the name of the principal who is used for anonymous access. This principal can then be passed to the ACL\n  services to specify what permissions anonymous users should have.,\n  @return name of the principal who is used for anonymous accessnsee method getPrincipalAnonymousn"    },
                  "defaultRootFolder": {
                    "!type": "ScriptNode",
                    "!doc": "\n  Gets the default root folder,\n  @return  default root foldernsee method getDefaultRootFoldern"    },
                  "getChangeLogCapability": {
                    "!type": "fn() -\u003e CMISCapabilityChanges",
                    "!doc": "\n  Gets the change log capability.,\n  @return the change log capability"    },
                  "version": {
                    "!type": "string",
                    "!doc": "\n  Gets the supported CMIS Version,\n  @return  CMIS versionnsee method getVersionn"    },
                  "getPrincipalAnonymous": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the name of the principal who is used for anonymous access. This principal can then be passed to the ACL\n  services to specify what permissions anonymous users should have.,\n  @return name of the principal who is used for anonymous access"    },
                  "queryRelationships": {
                    "!type": "fn(node: ScriptNode, relDef: CMISTypeDefinition, includeSubTypes: bool, direction: CMISRelationshipDirectionEnum, page: Page) -\u003e PagedResults",
                    "!doc": "\n  Query for node relationships,\n  @param node,\n  @param relDef,\n  @param includeSubTypes,\n  @param direction,\n  @param page,\n  @return"    },
                  "pwcSearchable": {
                    "!type": "bool",
                    "!doc": "\n  Can you query the private working copy of a document.,\n  @return is the PWC searchable?nsee method getPwcSearchablen"    },
                  "getVersion": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the supported CMIS Version,\n  @return  CMIS version"    },
                  "getAclSupportedPermissions": {
                    "!type": "fn() -\u003e CMISAclSupportedPermissionEnum",
                    "!doc": "\n  Gets the supported permission types.,\n  @return the supported permission types"    },
                  "getQuerySupport": {
                    "!type": "fn() -\u003e CMISQueryEnum",
                    "!doc": "\n  Get the query support level.,\n  @return the query support level"    },
                  "applyACL": {
                    "!type": "fn(node: ScriptNode, principalIds: Serializable, permissions: Serializable)",
                    "!doc": "\n  Applies an ACL to a node.,\n  @param nodethe node,\n  @param principalIdsthe principal IDs,\n  @param permissionsthe permissions for each principal ID"    },
                  "changesOnType": {
                    "!type": "[string]",
                    "!doc": "\n  Gets the list of base types for which changes are available.,\n  @return the list of base types for which changes are availablensee method getChangesOnTypen"    },
                  "removePolicy": {
                    "!type": "fn(policyId: string, objectId: string)",
                    "!doc": "\n  Removes a previously applied policy from a target object. The policy object is not deleted, and may still be\n  applied to other objects.,\n  @param policyIdpolicy Id,\n  @param objectIdtarget object Id.,\n  @throws WebScriptExceptionon error"    },
                  "createPolicy": {
                    "!type": "fn(typeId: string, parent: ScriptNode) -\u003e ScriptNode",
                    "!doc": "\n  Creates a policy object of the specified type, and optionally adds the policy to a folder. Currently no policy\n  types can be created in Alfresco.,\n  @param typeIdthe policy type,\n  @param parentparent folder for this new policy,\n  @return the created policy object,\n  @throws WebScriptException on error"    },
                  "cancelCheckOut": {
                    "!type": "fn(source: ScriptNode)",
                    "!doc": "\n  Cancels a check out.,\n  @param sourcethe private working copy"    },
                  "getPwcSearchable": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Can you query the private working copy of a document.,\n  @return is the PWC searchable?"    },
                  "repositoryPermissions": {
                    "!type": "List",
                    "!doc": "\n  Get all the permissions defined by the repository.,\n  @return a list of permissionsnsee method getRepositoryPermissionsn"    },
                  "lastChangeLogToken": {
                    "!type": "string",
                    "!doc": "\n  Gets the last change log token.,\n  @return the last change log tokennsee method getLastChangeLogTokenn"    },
                  "aclSupportedPermissions": {
                    "!type": "CMISAclSupportedPermissionEnum",
                    "!doc": "\n  Gets the supported permission types.,\n  @return the supported permission typesnsee method getAclSupportedPermissionsn"    },
                  "applyVersioningState": {
                    "!type": "fn(source: ScriptNode, versioningState: string) -\u003e ScriptNode",
                    "!doc": "\n  Applies a versioning state to a new node, potentially resulting in a new node.,\n  @param sourcethe source,\n  @param versioningStatethe versioning state,\n  @return the node to write changes to,\n  @throws CMISConstraintException"    },
                  "defaultTypesFilter": {
                    "!type": "string",
                    "!doc": "\n  Gets the default Types filter,\n  @return  default types filternsee method getDefaultTypesFiltern"    },
                  "setAspects": {
                    "!type": "fn(node: ScriptNode, aspectsToRemove: null, aspectsToAdd: null)",
                    "!doc": "\n  Sets the aspects on a node (Alfresco extension).,\n  @param nodethe node,\n  @param aspectsToRemovethe aspects to remove,\n  @param aspectsToAddthe aspects to add,\n  @throws WebScriptExceptionif an argument is invalid"    },
                  "aclCapability": {
                    "!type": "CMISAclCapabilityEnum",
                    "!doc": "\n  Gets the ACL capability.,\n  @return the ACL capabilitynsee method getAclCapabilityn"    },
                  "checkOut": {
                    "!type": "fn(objectId: string) -\u003e ScriptNode",
                    "!doc": "\n  Checks out an object by ID.,\n  @param objectIdthe object id,\n  @return the private working copy node"    },
                  "createRelationshipReferenceFromUrl": {
                    "!type": "fn(args: null, templateArgs: null) -\u003e CMISRelationshipReference",
                    "!doc": "\n  Create CMIS Relationship Reference from URL segments,\n  @param args  url arguments,\n  @param templateArgs  url template arguments,\n  @return  Repository Reference  (or null, in case of bad url)"    },
                  "deleteObject1": {
                    "!original": "deleteObject",
                    "!type": "fn(assoc: Association)",
                    "!doc": "\n  Deletes an association.,\n  @param assocthe association"    },
                  "getReturnVersion": {
                    "!type": "fn(source: ScriptNode, returnVersion: string) -\u003e ScriptNode",
                    "!doc": "\n  Gets the required version of a node,\n  @param sourcethe node,\n  @param returnVersionvalue indicating version required,\n  @return the version"    },
                  "getChangesIncomplete": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Determines whether the repository\\\u0027s change log can return all changes ever made to any object in the repository\n  or only changes made after a particular point in time.,\n  @return \u003ccode\u003efalse\u003c\\/code\u003e if the change log can return all changes ever made to every object.\u003ccode\u003etrue\u003c\\/code\u003e\n  if the change log includes all changes made since a particular point in time, but not all changes ever\n  made."    },
                  "permissionMappings": {
                    "!type": "List",
                    "!doc": "\n  Get the list of permission mappings.,\n  @return get the permission mapping as defined by the CMIS specification.nsee method getPermissionMappingsn"    },
                  "queryTypeChildren": {
                    "!type": "fn(typeDef: CMISTypeDefinition, page: Page) -\u003e PagedResults",
                    "!doc": "\n  Query for child types (of a given type), or the base types (if no type given).,\n  @param typeDefthe type def,\n  @param pagethe page,\n  @return the paged results"    },
                  "getDefaultTypesFilter": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the default Types filter,\n  @return  default types filter"    },
                  "getAclPropagation": {
                    "!type": "fn() -\u003e CMISAclPropagationEnum",
                    "!doc": "\n  Gets the ACL propagation.,\n  @return the ACL propagation"    },
                  "principalAnyone": {
                    "!type": "string",
                    "!doc": "\n  Gets the name of the principal who is used to indicate any authenticated user. This principal can then be passed\n  to the ACL services to specify what permissions any authenticated user should have.,\n  @return name of the principal who is used to indicate any authenticated usernsee method getPrincipalAnyonen"    },
                  "queryType1": {
                    "!original": "queryType",
                    "!type": "fn(node: ScriptNode) -\u003e CMISTypeDefinition",
                    "!doc": "\n  Query the Type Definition for the given Node.,\n  @param nodethe node,\n  @return CMIS Type Definition"    },
                  "querySupport": {
                    "!type": "CMISQueryEnum",
                    "!doc": "\n  Get the query support level.,\n  @return the query support levelnsee method getQuerySupportn"    }
                },
                "JscriptWorkflowTask": {
                  "!doc": "\n  This class represents a workflow task (an instance of a workflow task definition),\n  @author glenj,\n  @author Nick Smith\nsee class org.alfresco.repo.workflow.jscript.JscriptWorkflowTask",
                  "setPooled": {
                    "!type": "fn(pooled: bool)",
                    "!doc": "\n  @deprecated pooled state cannot be altered."    },
                  "isComplete": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Returns whether the task is complete \\\u0027true\\\u0027:complete, \\\u0027false\\\u0027:in-progress,\n  @return the complete"    },
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003edescription\u003c\\/code\u003e property,\n  @return the description"    },
                  "properties": {
                    "!type": "Properties.prototype",
                    "!doc": "\n  Gets the value of the \u003ccode\u003eproperties\u003c\\/code\u003e property,\n  @return the propertiesnsee method getPropertiesn"    },
                  "getProperties": {
                    "!type": "fn() -\u003e Properties.prototype",
                    "!doc": "\n  Gets the value of the \u003ccode\u003eproperties\u003c\\/code\u003e property,\n  @return the properties"    },
                  "getTransitions": {
                    "!type": "fn() -\u003e ScriptableHashMap",
                    "!doc": "\n  Get the available transition ids.,\n  @return"    },
                  "id": {
                    "!type": "string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the idnsee method getIdn"    },
                  "title": {
                    "!type": "string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003etitle\u003c\\/code\u003e property,\n  @return the titlensee method getTitlen"    },
                  "getPackageResources": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  Get the packe resources (array of noderefs),\n  @return"    },
                  "packageResources": {
                    "!type": "[ScriptNode]",
                    "!doc": "\n  Get the packe resources (array of noderefs),\n  @returnnsee method getPackageResourcesn"    },
                  "transitions": {
                    "!type": "ScriptableHashMap",
                    "!doc": "\n  Get the available transition ids.,\n  @returnnsee method getTransitionsn"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003edescription\u003c\\/code\u003e property,\n  @return the descriptionnsee method getDescriptionn"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003ename\u003c\\/code\u003e property,\n  @return the namensee method getNamen"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003ename\u003c\\/code\u003e property,\n  @return the name"    },
                  "setProperties": {
                    "!type": "fn(properties: null)",
                    "!doc": "\n  Sets the properties on the underlying {@link WorkflowTask}.,\n  @param propertiesthe properties to set"    },
                  "getTitle": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003etitle\u003c\\/code\u003e property,\n  @return the title"    },
                  "endTask": {
                    "!type": "fn(transitionId: string)",
                    "!doc": "\n  End the task,\n  @param transitiontransition to end the task for"    },
                  "isPooled": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Returns whether this task is pooled or not,\n  @return \\\u0027true\\\u0027: task is pooled, \\\u0027false\\\u0027: task is not pooled"    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the id"    }
                },
                "ratingService": {
                  "!doc": "\n  Script object representing the rating service.,\n  @author Neil McErlean,\n  @since 3.4\nsee class org.alfresco.repo.rating.script.ScriptRatingService",
                  "getAverageRating": {
                    "!type": "fn(node: ScriptNode, ratingSchemeName: string) -\u003e number",
                    "!doc": "\n  Gets the average (mean) rating by all users on the specified node in the specified scheme.,\n  @param node,\n  @param ratingSchemeName,\n  @return"    },
                  "getRatingsCount": {
                    "!type": "fn(node: ScriptNode, ratingSchemeName: string) -\u003e number",
                    "!doc": "\n  Gets the number of ratings applied to the specified node by all users in the specified\n  scheme.,\n  @param node,\n  @param ratingSchemeName,\n  @return"    },
                  "ratingSchemeNames": {
                    "!type": "[string]",
                    "!doc": "\n  Gets the names for rating schemes currently in the system.,\n  @returnnsee method getRatingSchemeNamesn"    },
                  "applyRating": {
                    "!type": "fn(node: ScriptNode, rating: number, ratingSchemeName: string)",
                    "!doc": "\n  Applies the given rating to the specified node using the specified ratingScheme.\n  It is the responsibility of the caller to ensure that the rating scheme exists\n  and that the rating is within the limits defined for that scheme.\n  \u003cp\\/\u003eFurthermore, only one rating scheme per user per target node is supported. Any attempt\n  by one user to apply a second rating in a different scheme will result in a {@link RatingServiceException}.,\n  @param node,\n  @param rating,\n  @param ratingSchemeName,\n  @throws RatingServiceException,\n  @see ScriptRatingService#getMin(String),\n  @see ScriptRatingService#getMax(String)"    },
                  "getMin": {
                    "!type": "fn(ratingSchemeName: string) -\u003e number",
                    "!doc": "\n  Gets the minimum allowed rating for the specified rating scheme.,\n  @param ratingSchemeName,\n  @return"    },
                  "getMax": {
                    "!type": "fn(ratingSchemeName: string) -\u003e number",
                    "!doc": "\n  Gets the maximum allowed rating for the specified rating scheme.,\n  @param ratingSchemeName,\n  @return"    },
                  "getTotalRating": {
                    "!type": "fn(node: ScriptNode, ratingSchemeName: string) -\u003e number",
                    "!doc": "\n  Gets the total (sum) rating by all users on the specified node in the specified scheme.,\n  @param node,\n  @param ratingSchemeName,\n  @return"    },
                  "removeRating": {
                    "!type": "fn(node: ScriptNode, ratingSchemeName: string)",
                    "!doc": "\n  Removes any rating by the current user in the specified scheme from the specified\n  noderef.,\n  @param node,\n  @param ratingSchemeName"    },
                  "getRatingAppliedAt": {
                    "!type": "fn(node: ScriptNode, ratingSchemeName: string) -\u003e ?",
                    "!doc": "\n  Gets the rating applied date for the specified node in the specified scheme by\n  the currently authenticated user.,\n  @param node,\n  @param ratingSchemeName,\n  @return rating applied date if there is one, else \u003ccode\u003enull\u003c\\/code\u003e"    },
                  "isSelfRatingAllowed": {
                    "!type": "fn(ratingSchemeName: string) -\u003e bool",
                    "!doc": "\n  This method checks whether self-rating is allowed for the specified rating scheme.\n  If self-rating is allowed in the specified scheme, then the cm:creator of a node can apply a rating,\n  otherwise they cannot.,\n  @param ratingSchemeName the rating scheme bean name.,\n  @return \u003ccode\u003etrue\u003c\\/code\u003e if users can rate their own content, else \u003ccode\u003efalse\u003c\\/code\u003e."    },
                  "getRating": {
                    "!type": "fn(node: ScriptNode, ratingSchemeName: string) -\u003e number",
                    "!doc": "\n  Gets the rating applied to the specified node in the specified scheme by\n  the currently authenticated user.,\n  @param node,\n  @param ratingSchemeName,\n  @return rating if there is one, else -1.\n  TODO -1 could be a valid rating."    },
                  "getRatingSchemeNames": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  Gets the names for rating schemes currently in the system.,\n  @return"    }
                },
                "invitations": {
                  "!doc": "\n  Script object representing the invitation service.\n  Provides access to invitations from outside the context of a web project or a web site,\n  @author Mark Rogers\nsee class org.alfresco.repo.invitation.script.ScriptInvitationService",
                  "listInvitations": {
                    "!type": "fn(props: ?) -\u003e ScriptInvitation\u003c?\u003e[]",
                    "!doc": "\n  List the open invitations.\n  props specifies optional properties to constrain the search.,\n  @param props inviteeUserName,\n  @param props resourceName,\n  @param props resourceType,\n  @param props invitationType,\n  @return the invitations"    }
                },
                "jsonUtils": {
                  "!doc": "\n  Collection of JSON Utility methods.\n  This class is immutable.,\n  @author Roy Wetherall,\n  @author Kevin Roast\nsee class org.springframework.extensions.webscripts.json.JSONUtils",
                  "toObject": {
                    "!type": "fn(jsonString: string) -\u003e ?",
                    "!doc": "\n  Takes a JSON string and converts it to a native java script object,\n  @param jsonString       a valid json string,\n  @return NativeObject     the created native JS object that represents the JSON object"    },
                  "toJSONObject": {
                    "!type": "fn(object: ?) -\u003e JSONObject",
                    "!doc": "\n  Converts the given JavaScript native object to a org.json.simple.JSONObject Java Object.\n  This is a specialized method only used by routines that will later expect a JSONObject.,\n  @param object JavaScript native object,\n  @return JSONObject,\n  @throws IOException"    },
                  "encodeJSONString": {
                    "!type": "fn(value: ?) -\u003e ?",
                    "!doc": "\n  Encodes a JSON string value,\n  @param value     value to encode,\n  @return String   encoded value"    },
                  "toObject1": {
                    "!original": "toObject",
                    "!type": "fn(jsonObject: JSONObject) -\u003e ?",
                    "!doc": "\n  Takes a JSON object and converts it to a native JS object.,\n  @param jsonObject        the json object,\n  @return NativeObject     the created native object"    },
                  "toJSONString": {
                    "!type": "fn(object: ?) -\u003e string",
                    "!doc": "\n  Converts a given JavaScript native object and converts it to the relevant JSON string.,\n  @param object            JavaScript object,\n  @return String           JSON      ,\n  @throws IOException"    }
                },
                "activities": {
                  "!doc": "\n  @author Brian,\n  @since 4.0\nsee class org.alfresco.repo.publishing.linkedin.springsocial.api.Activity",
                  "setLocale": {
                    "!type": "fn(value: string)"    },
                  "getLocale": {
                    "!type": "fn() -\u003e string"    },
                  "body": {
                    "!type": "string",
                    "!doc": "nullnsee method getBodyn"    },
                  "getContentType": {
                    "!type": "fn() -\u003e string"    },
                  "getBody": {
                    "!type": "fn() -\u003e string"    },
                  "locale": {
                    "!type": "string",
                    "!doc": "nullnsee method getLocalen"    },
                  "setContentType": {
                    "!type": "fn(value: string)"    },
                  "contentType": {
                    "!type": "string",
                    "!doc": "nullnsee method getContentTypen"    },
                  "setBody": {
                    "!type": "fn(value: string)"    }
                },
                "actionTrackingService": {
                  "!doc": "\n  Script object representing the action tracking service.,\n  @author Nick Burch\nsee class org.alfresco.repo.action.script.ScriptActionTrackingService",
                  "getAllExecutingActions": {
                    "!type": "fn() -\u003e [ScriptExecutionDetails]",
                    "!doc": "\n  Retrieve summary details of all the actions\n  currently executing."    },
                  "allExecutingActions": {
                    "!type": "[ScriptExecutionDetails]",
                    "!doc": "\n  Retrieve summary details of all the actions\n  currently executing.nsee method getAllExecutingActionsn"    },
                  "getExecutingActions": {
                    "!type": "fn(type: string) -\u003e [ScriptExecutionDetails]",
                    "!doc": "\n  Retrieve summary details of all the actions\n  of the given type that are currently executing."    },
                  "requestActionCancellation": {
                    "!type": "fn(action: ScriptExecutionDetails)",
                    "!doc": "\n  Requests that the specified Action cancel itself\n  and aborts execution, as soon as possible."    }
                },
                "groups": {
                  "!doc": "\n  Script object representing the authority service.\n  Provides Script access to groups and may in future be extended for roles and people.,\n  @author Mark Rogers\nsee class org.alfresco.repo.security.authority.script.ScriptAuthorityService",
                  "searchGroupsInZone": {
                    "!type": "fn(shortNameFilter: string, zone: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search for groups in a specific zone,\n  @param shortNameFilter partial match on shortName ( and ?) work.  If empty then matches everything.,\n  @param zone zone to search in.,\n  @return the groups matching the query"    },
                  "searchRootGroups1": {
                    "!original": "searchRootGroups",
                    "!type": "fn(displayNamePattern: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName),\n  @return The root groups (empty if there are no root groups)"    },
                  "searchRootGroupsInZone": {
                    "!type": "fn(displayNamePattern: string, zone: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.,\n  @return The root groups (empty if there are no root groups)"    },
                  "searchGroups1": {
                    "!original": "searchGroups",
                    "!type": "fn(shortNameFilter: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search for groups in all zones.,\n  @param shortNameFilter partial match on shortName ( and ?) work.  If empty then matches everything.,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName),\n  @return the groups matching the query"    },
                  "getAllRootGroupsInZone1": {
                    "!original": "getAllRootGroupsInZone",
                    "!type": "fn(zone: string, maxItems: number, skipCount: number) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get the root groups, those without a parent group.,\n  @param zone zone to search in.,\n  @param maxItems Maximum number of items returned.,\n  @param skipCount number of items to skip.,\n  @return The root groups (empty if there are no root groups)"    },
                  "searchRootGroups": {
                    "!type": "fn(displayNamePattern: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.,\n  @return The root groups (empty if there are no root groups)"    },
                  "getGroup": {
                    "!type": "fn(shortName: string) -\u003e ScriptGroup",
                    "!doc": "\n  Get a group given its short name,\n  @param shortName, the shortName of the group,\n  @return the authority or null if it can\\\u0027t be found"    },
                  "searchGroups": {
                    "!type": "fn(shortNameFilter: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search for groups in all zones.,\n  @param shortNameFilter partial match on shortName ( and ?) work.  If empty then matches everything.,\n  @return the groups matching the query"    },
                  "getAllRootGroupsInZone2": {
                    "!original": "getAllRootGroupsInZone",
                    "!type": "fn(zone: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get the root groups, those without a parent group.,\n  @param zone zone to search in.,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName),\n  @return The root groups (empty if there are no root groups)"    },
                  "getUser": {
                    "!type": "fn(username: string) -\u003e ScriptUser",
                    "!doc": "\n  Get a user given their username,\n  @param username, the username of the user,\n  @return the user or null if they can\\\u0027t be found"    },
                  "getGroups": {
                    "!type": "fn(filter: string, paging: ScriptPagingDetails) -\u003e [ScriptGroup]",
                    "!doc": "\n  Retreives groups matching the given filter from all zones.\n  NOTE: If the filter is null, an empty string or  all groups found will be returned.\n  If the filter starts with  or contains a ? character results returned could be inconsistent.,\n  @param filter Pattern to filter groups by,\n  @param paging Paging details,\n  @return Array of mathcing groups,\n  @since 4.0"    },
                  "searchRootGroupsInZone1": {
                    "!original": "searchRootGroupsInZone",
                    "!type": "fn(displayNamePattern: string, zone: string, maxItems: number, skipCount: number) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.,\n  @param maxItems Maximum number of items returned.,\n  @param skipCount number of items to skip.,\n  @return The root groups (empty if there are no root groups)"    },
                  "searchRootGroupsInZone2": {
                    "!original": "searchRootGroupsInZone",
                    "!type": "fn(displayNamePattern: string, zone: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName),\n  @return The root groups (empty if there are no root groups)"    },
                  "createRootGroup": {
                    "!type": "fn(shortName: string, displayName: string) -\u003e ScriptGroup",
                    "!doc": "\n  Create a new root group in the default application zones,\n  @return the new root group."    },
                  "searchUsers": {
                    "!type": "fn(nameFilter: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptUser]",
                    "!doc": "\n  Search for users\n  Includes paging parameters to limit size of results returned.,\n  @param nameFilter partial match of the name (username, first name, last name). If empty then matches everyone.,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (firstName, lastName or userName),\n  @return the users matching the query"    },
                  "getAllRootGroupsInZone": {
                    "!type": "fn(zone: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get the root groups, those without a parent group.,\n  @param zone zone to search in.,\n  @return The root groups (empty if there are no root groups)"    },
                  "getGroups1": {
                    "!original": "getGroups",
                    "!type": "fn(filter: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Retreives groups matching the given filter from all zones.\n  NOTE: If the filter is null, an empty string or  all groups found will be returned.\n  If the filter starts with  or contains a ? character results returned could be inconsistent.,\n  @param filter Pattern to filter groups by,\n  @param paging Paging details,\n  @param sortBy Field to sort by, can be \u003ccode\u003eshortName\u003c\\/code\u003e or \u003ccode\u003edisplayName\u003c\\/code\u003e otherwise \n  the results are ordered by the authorityName,\n  @return Array of mathcing groups,\n  @since 4.0"    },
                  "getAllRootGroups": {
                    "!type": "fn() -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.   Searches in all zones.,\n  @return The root groups (empty if there are no root groups)"    },
                  "allRootGroups": {
                    "!type": "[ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.   Searches in all zones.,\n  @return The root groups (empty if there are no root groups)nsee method getAllRootGroupsn"    },
                  "searchGroupsInZone2": {
                    "!original": "searchGroupsInZone",
                    "!type": "fn(shortNameFilter: string, zone: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search for groups in a specific zone\n  Includes paging parameters to limit size of results returned.,\n  @param shortNameFilter partial match on shortName ( and ?) work.  If empty then matches everything.,\n  @param zone zone to search in.,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName),\n  @return the groups matching the query"    },
                  "searchGroupsInZone1": {
                    "!original": "searchGroupsInZone",
                    "!type": "fn(shortNameFilter: string, zone: string, maxItems: number, skipCount: number) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search for groups in a specific zone\n  Includes paging parameters to limit size of results returned.,\n  @param shortNameFilter partial match on shortName ( and ?) work.  If empty then matches everything.,\n  @param zone zone to search in.,\n  @param maxItems Maximum number of items returned.,\n  @param skipCount number of items to skip.,\n  @return the groups matching the query"    },
                  "getAllRootGroups2": {
                    "!original": "getAllRootGroups",
                    "!type": "fn(paging: ScriptPagingDetails) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.   Searches in all zones.,\n  @return The root groups (empty if there are no root groups)"    },
                  "getAllRootGroups1": {
                    "!original": "getAllRootGroups",
                    "!type": "fn(maxItems: number, skipCount: number) -\u003e [ScriptGroup]",
                    "!doc": "\n  Search the root groups, those without a parent group.   Searches in all zones.,\n  @return The root groups (empty if there are no root groups)"    },
                  "getGroupsInZone": {
                    "!type": "fn(filter: string, zone: string, paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Retreives groups matching the given filter from the given zone.\n  NOTE: If the filter is null, an empty string or  all groups found will be returned.\n  If the filter starts with  or contains a ? character results returned could be inconsistent.,\n  @param filter Pattern to filter groups by,\n  @param zone The zone in which to search for groups,\n  @param paging Paging details,\n  @param sortBy Field to sort by, can be \u003ccode\u003eshortName\u003c\\/code\u003e, \u003ccode\u003edisplayName\u003c\\/code\u003e or\n  \u003ccode\u003eauthorityName\u003c\\/code\u003e, the default is displayName,\n  @return Array of mathcing groups,\n  @since 4.0"    },
                  "getGroupForFullAuthorityName": {
                    "!type": "fn(fullAuthorityName: string) -\u003e ScriptGroup",
                    "!doc": "\n  Get a group given it full authority name (Which must begin with \\\u0027GROUP_\\\u0027,\n  @param fullAuthorityName, the shortName of the group,\n  @return the authority or null if it can\\\u0027t be found"    }
                },
                "renditionService": {
                  "!doc": "\n  Script object representing the rendition service.,\n  @author Neil McErlean\nsee class org.alfresco.repo.rendition.script.ScriptRenditionService",
                  "createRenditionDefinition": {
                    "!type": "fn(renditionName: string, renderingEngineName: string) -\u003e ScriptRenditionDefinition",
                    "!doc": "\n  Creates a new {@link ScriptRenditionDefinition} and sets the rendition name and\n  the rendering engine name to the specified values.,\n  @param renditionName A unique identifier used to specify the created{@link ScriptRenditionDefinition}.,\n  @param renderingEngineName The name of the rendering engine associated\n  with this {@link ScriptRenditionDefinition}.,\n  @return the created {@link ScriptRenditionDefinition}.,\n  @see org.alfresco.service.cmr.rendition.RenditionService#createRenditionDefinition(QName,String)"    },
                  "getRenditions": {
                    "!type": "fn(node: ScriptNode) -\u003e [ScriptNode]",
                    "!doc": "\n  This method gets all the renditions of the specified node.,\n  @param node the source node,\n  @return an array of the renditions.,\n  @see org.alfresco.service.cmr.rendition.RenditionService#getRenditions(org.alfresco.service.cmr.repository.NodeRef)"    },
                  "render1": {
                    "!original": "render",
                    "!type": "fn(sourceNode: ScriptNode, scriptRenditionDef: ScriptRenditionDefinition) -\u003e ScriptNode"    },
                  "getRenditionByName": {
                    "!type": "fn(node: ScriptNode, renditionName: string) -\u003e ScriptNode",
                    "!doc": "\n  This method gets the rendition of the specified node identified by\n  the provided rendition name.,\n  @param node the source node for the renditions,\n  @param renditionName the renditionName used to identify a rendition. e.g. cm:doclib or\n  \\\"{http:\\/\\/www.alfresco.org\\/model\\/content\\/1.0}imgpreview\\\",\n  @return the parent association for the rendition or \u003ccode\u003enull\u003c\\/code\u003e if there is no such rendition.,\n  @see org.alfresco.service.cmr.rendition.RenditionService#getRenditionByName(org.alfresco.service.cmr.repository.NodeRef,QName)"    },
                  "getRenditions1": {
                    "!original": "getRenditions",
                    "!type": "fn(node: ScriptNode, mimeTypePrefix: string) -\u003e [ScriptNode]",
                    "!doc": "\n  This method gets all the renditions of the specified node filtered by\n  MIME-type prefix. Renditions whose MIME-type string startsWith the prefix\n  will be returned.,\n  @param node the source node for the renditions,\n  @param mimeTypePrefix a prefix to check against the rendition MIME-types.\n  This must not be null and must not be an empty String,\n  @return an array of the filtered renditions.,\n  @see org.alfresco.service.cmr.rendition.RenditionService#getRenditions(org.alfresco.service.cmr.repository.NodeRef)"    },
                  "render": {
                    "!type": "fn(sourceNode: ScriptNode, renditionDefQName: string) -\u003e ScriptNode",
                    "!doc": "\n  This method renders the specified source node using the specified saved\n  rendition definition.,\n  @param sourceNode the source node to be rendered.,\n  @param renditionDefQName the rendition definition to be used e.g. \\\"cm:doclib\\\" or\n  \\\"{http:\\/\\/www.alfresco.org\\/model\\/content\\/1.0}imgpreview\\\",\n  @return the rendition scriptnode.,\n  @see org.alfresco.service.cmr.rendition.RenditionService#render(org.alfresco.service.cmr.repository.NodeRef,RenditionDefinition)"    }
                },
                "test": {
                  "!doc": "\n  @author Roy Wetherall\nsee class org.alfresco.repo.jscript.ScriptTestUtils",
                  "assertTrue": {
                    "!type": "fn(value: bool)"    },
                  "assertNotNull": {
                    "!type": "fn(value: ?)"    },
                  "assertNull1": {
                    "!original": "assertNull",
                    "!type": "fn(value: ?, message: string)"    },
                  "assertFalse1": {
                    "!original": "assertFalse",
                    "!type": "fn(value: bool, message: string)"    },
                  "assertNotNull1": {
                    "!original": "assertNotNull",
                    "!type": "fn(value: ?, message: string)"    },
                  "assertEquals1": {
                    "!original": "assertEquals",
                    "!type": "fn(expected: ?, value: ?, message: string)"    },
                  "fail": {
                    "!type": "fn(message: string)"    },
                  "assertEquals": {
                    "!type": "fn(expected: ?, value: ?)"    },
                  "assertFalse": {
                    "!type": "fn(value: bool)"    },
                  "assertTrue1": {
                    "!original": "assertTrue",
                    "!type": "fn(value: bool, message: string)"    },
                  "assertNotEquals": {
                    "!type": "fn(expected: ?, value: ?)"    },
                  "assertNotEquals1": {
                    "!original": "assertNotEquals",
                    "!type": "fn(expected: ?, value: ?, message: string)"    },
                  "assertNull": {
                    "!type": "fn(value: ?)"    }
                },
                "slingshotDocLib": {
                  "!doc": "\n  Populates DocLib webscript response with custom metadata output,\n  @author: mikeh\nsee class org.alfresco.repo.jscript.SlingshotDocLibCustomResponse",
                  "getJSONObj": {
                    "!type": "fn() -\u003e ?",
                    "!doc": "\n  Returns a JSON object to be added to the DocLib webscript response.,\n  @return The JSON object"    },
                  "JSON": {
                    "!type": "string",
                    "!doc": "\n  Returns a JSON string to be added to the DocLib webscript response.,\n  @return The JSON stringnsee method getJSONn"    },
                  "setCustomResponses": {
                    "!type": "fn(customResponses: null)",
                    "!doc": "\n  Set the custom response beans,\n  @param customResponses"    },
                  "JSONObj": {
                    "!type": "?",
                    "!doc": "\n  Returns a JSON object to be added to the DocLib webscript response.,\n  @return The JSON objectnsee method getJSONObjn"    },
                  "getJSON": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns a JSON string to be added to the DocLib webscript response.,\n  @return The JSON string"    }
                },
                "people": {
                  "!doc": "\n  Scripted People service for describing and executing actions against People \u0026 Groups.,\n  @author davidc,\n  @author kevinr\nsee class org.alfresco.repo.jscript.People",
                  "getPeople1": {
                    "!original": "getPeople",
                    "!type": "fn(filter: string, maxResults: number) -\u003e [NodeRef]",
                    "!doc": "\n  Get the collection of people stored in the repository.\n  An optional filter query may be provided by which to filter the people collection.\n  Space separate the query terms i.e. \\\"john bob\\\" will find all users who\\\u0027s first or\n  second names contain the strings \\\"john\\\" or \\\"bob\\\".,\n  @param filter filter query string by which to filter the collection of people.\n  If \u003cpre\u003enull\u003c\\/pre\u003e then all people stored in the repository are returned,\n  @param maxResults maximum results to return or all if \u003c\u003d 0,\n  @return people collection as a JavaScript array"    },
                  "getPerson": {
                    "!type": "fn(username: string) -\u003e ScriptNode",
                    "!doc": "\n  Gets the Person given the username,\n  @param username  the username of the person to get,\n  @return the person node (type cm:person) or null if no such person exists"    },
                  "createGroup": {
                    "!type": "fn(groupName: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new root level group with the specified unique name,\n  @param groupName     The unique group name to create - NOTE: do not prefix with \\\"GROUP_\\\",\n  @return the group reference if successful or null if failed"    },
                  "getPeople": {
                    "!type": "fn(filter: string) -\u003e [NodeRef]",
                    "!doc": "\n  Get the collection of people stored in the repository.\n  An optional filter query may be provided by which to filter the people collection.\n  Space separate the query terms i.e. \\\"john bob\\\" will find all users who\\\u0027s first or\n  second names contain the strings \\\"john\\\" or \\\"bob\\\".,\n  @param filter filter query string by which to filter the collection of people.\n  If \u003cpre\u003enull\u003c\\/pre\u003e then all people stored in the repository are returned,\n  @deprecate see getPeople(filter, maxResults),\n  @return people collection as a JavaScript array"    },
                  "removeAuthority": {
                    "!type": "fn(parentGroup: ScriptNode, authority: ScriptNode)",
                    "!doc": "\n  Remove an authority (a user or group) from a group,\n  @param parentGroup   The parent container group,\n  @param authority     The authority (user or group) to remove"    },
                  "isAccountEnabled": {
                    "!type": "fn(userName: string) -\u003e bool",
                    "!doc": "\n  Return true if the specified user account is enabled.,\n  @param userName      user name to test account,\n  @return true if account enabled, false if disabled"    },
                  "getGroup": {
                    "!type": "fn(groupName: string) -\u003e ScriptNode",
                    "!doc": "\n  Gets the Group given the group name,\n  @param groupName  name of group to get,\n  @return  the group node (type usr:authorityContainer) or null if no such group exists"    },
                  "deleteGroup": {
                    "!type": "fn(group: ScriptNode)",
                    "!doc": "\n  Deletes a group from the system.,\n  @param group     The group to delete"    },
                  "createPerson": {
                    "!type": "fn(userName: string, firstName: string, lastName: string, emailAddress: string, password: string, setAccountEnabled: bool) -\u003e ScriptNode",
                    "!doc": "\n  Create a Person with an optionally generated user name. \n  This version doesn\\\u0027t notify them.,\n  @param userName userName or null for a generated user name,\n  @param firstName firstName,\n  @param lastName lastName,\n  @param emailAddress emailAddress,\n  @param password if not null creates a new authenticator with the given password.,\n  @param setAccountEnabledset to \\\u0027true\\\u0027 to create enabled user account, or \\\u0027false\\\u0027 to\n  create disabled user account for created person.,\n  @return the person node (type cm:person) created or null if the person\n  could not be created"    },
                  "createPerson2": {
                    "!original": "createPerson",
                    "!type": "fn(userName: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a Person with the given user name,\n  @param userName the user name of the person to create,\n  @return the person node (type cm:person) created or null if the user name already exists"    },
                  "enableAccount": {
                    "!type": "fn(userName: string)",
                    "!doc": "\n  Enable user account. Can only be called by an Admin authority.,\n  @param userName      user name for which to enable user account"    },
                  "setQuota": {
                    "!type": "fn(person: ScriptNode, quota: string)",
                    "!doc": "\n  Set the content quota in bytes for a person.\n  Only the admin authority can set this value.,\n  @param person    Person to set quota against.,\n  @param quota     As a string, in bytes, a value of \\\"-1\\\" means no quota is set"    },
                  "setPassword": {
                    "!type": "fn(userName: string, password: string)",
                    "!doc": "\n  Set a password for the given user. Note that only an administrator\n  can perform this action, otherwise it will be ignored.,\n  @param userName          Username to change password for,\n  @param password          Password to set"    },
                  "createPerson1": {
                    "!original": "createPerson",
                    "!type": "fn(userName: string, firstName: string, lastName: string, emailAddress: string, password: string, setAccountEnabled: bool, notifyByEmail: bool) -\u003e ScriptNode",
                    "!doc": "\n  Create a Person with an optionally generated user name,\n  @param userName userName or null for a generated user name,\n  @param firstName firstName,\n  @param lastName lastName,\n  @param emailAddress emailAddress,\n  @param password if not null creates a new authenticator with the given password.,\n  @param setAccountEnabledset to \\\u0027true\\\u0027 to create enabled user account, or \\\u0027false\\\u0027 to\n  create disabled user account for created person.,\n  @param notifyByEmailset to \\\u0027true\\\u0027 to have the new user emailed to let them know\n  their account details. Only applies if a username and \n  password were supplied.,\n  @return the person node (type cm:person) created or null if the person\n  could not be created"    },
                  "getImmutableProperties": {
                    "!type": "fn(username: string) -\u003e ScriptableHashMap",
                    "!doc": "\n  Return a map of the Person properties that are marked as immutable for the given user.\n  This enables a script to interogate which properties are dealt with by an external\n  system such as LDAP and should not be mutable in any client UI.,\n  @param username,\n  @return ScriptableHashMap"    },
                  "createPerson3": {
                    "!original": "createPerson",
                    "!type": "fn(userName: string, firstName: string, lastName: string, emailAddress: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a Person with the given user name, firstName, lastName and emailAddress,\n  @param userName the user name of the person to create,\n  @return the person node (type cm:person) created or null if the user name already exists"    },
                  "deletePerson": {
                    "!type": "fn(username: string)",
                    "!doc": "\n  Delete a Person with the given username,\n  @param username the username of the person to delete"    },
                  "createGroup1": {
                    "!original": "createGroup",
                    "!type": "fn(parentGroup: ScriptNode, groupName: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new group with the specified unique name,\n  @param parentGroup   The parent group node - can be null for a root level group,\n  @param groupName     The unique group name to create - NOTE: do not prefix with \\\"GROUP_\\\",\n  @return the group reference if successful or null if failed"    },
                  "getContainerGroups": {
                    "!type": "fn(person: ScriptNode) -\u003e [ScriptNode]",
                    "!doc": "\n  Gets the groups that contain the specified authority,\n  @param person       the user (cm:person) to get the containing groups for,\n  @return the containing groups as a JavaScript array"    },
                  "setDefaultListMaxResults": {
                    "!type": "fn(defaultListMaxResults: number)"    },
                  "getMembers": {
                    "!type": "fn(group: ScriptNode) -\u003e [ScriptNode]",
                    "!doc": "\n  Gets the members (people) of a group (including all sub-groups),\n  @param group        the group to retrieve members for,\n  @param recurse      recurse into sub-groups,\n  @return members of the group as a JavaScript array"    },
                  "isGuest": {
                    "!type": "fn(person: ScriptNode) -\u003e bool",
                    "!doc": "\n  Return true if the specified user is an guest authority.,\n  @param person to test,\n  @return true if an admin, false otherwise"    },
                  "getCapabilities": {
                    "!type": "fn(person: ScriptNode) -\u003e Map",
                    "!doc": "\n  Gets a map of capabilities (boolean assertions) for the given person.,\n  @param personthe person,\n  @return the capability map"    },
                  "addAuthority": {
                    "!type": "fn(parentGroup: ScriptNode, authority: ScriptNode)",
                    "!doc": "\n  Add an authority (a user or group) to a group container as a new child,\n  @param parentGroup   The parent container group,\n  @param authority     The authority (user or group) to add"    },
                  "disableAccount": {
                    "!type": "fn(userName: string)",
                    "!doc": "\n  Disable user account. Can only be called by an Admin authority.,\n  @param userName      user name for which to disable user account"    },
                  "isAdmin": {
                    "!type": "fn(person: ScriptNode) -\u003e bool",
                    "!doc": "\n  Return true if the specified user is an Administrator authority.,\n  @param person to test,\n  @return true if an admin, false otherwise"    },
                  "changePassword": {
                    "!type": "fn(oldPassword: string, newPassword: string)",
                    "!doc": "\n  Change the password for the currently logged in user.\n  Old password must be supplied.,\n  @param oldPassword       Old user password,\n  @param newPassword       New user password"    },
                  "getMembers1": {
                    "!original": "getMembers",
                    "!type": "fn(group: ScriptNode, recurse: bool) -\u003e [ScriptNode]",
                    "!doc": "\n  Gets the members (people) of a group,\n  @param group        the group to retrieve members for,\n  @param recurse      recurse into sub-groups,\n  @return the members of the group as a JavaScript array"    }
                },
                "utils": {
                  "!doc": "\n  Place for general and miscellaneous utility functions not already found in generic JavaScript. ,\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.ScriptUtils",
                  "toISO8601": {
                    "!type": "fn(timeInMillis: number) -\u003e string",
                    "!doc": "\n  Format timeInMillis to ISO 8601 formatted string,\n  @param timeInMillis,\n  @return"    },
                  "setLocale": {
                    "!type": "fn(localeStr: string)",
                    "!doc": "\n  Sets current Locale from string"    },
                  "pad": {
                    "!type": "fn(s: string, len: number) -\u003e string",
                    "!doc": "\n  Function to pad a string with zero \\\u00270\\\u0027 characters to the required length,\n  @param s     String to pad with leading zero \\\u00270\\\u0027 characters,\n  @param len   Length to pad to,\n  @return padded string or the original if already at \u003e\u003dlen characters"    },
                  "locale": {
                    "!type": "string",
                    "!doc": "\n  Returns current thread\\\u0027s localensee method getLocalen"    },
                  "longQName": {
                    "!type": "fn(s: string) -\u003e string",
                    "!doc": "\n  Given a short-form QName string, this method returns the fully qualified QName string.,\n  @param s   Short form QName string, e.g. \\\"cm:content\\\",\n  @return Fully qualified QName string"    },
                  "getNodeFromString": {
                    "!type": "fn(nodeRefString: string) -\u003e ScriptNode",
                    "!doc": "\n  Gets a JS node object from a string noderef,\n  @param nodeRefString     string reference to a node,\n  @return                  a JS node object"    },
                  "toBoolean": {
                    "!type": "fn(booleanString: string) -\u003e bool",
                    "!doc": "\n  Gets a boolean value from a string,\n  @see Boolean#parseBoolean(String),\n  @param booleanString  boolean string ,\n  @return boolean      the boolean value"    },
                  "createPaging": {
                    "!type": "fn(maxItems: number, skipCount: number) -\u003e ScriptPagingDetails",
                    "!doc": "\n  Builds a paging object, from the supplied\n  Max Items and Skip Count"    },
                  "createPaging2": {
                    "!original": "createPaging",
                    "!type": "fn(args: null) -\u003e ScriptPagingDetails",
                    "!doc": "\n  Builds a paging object, from the supplied Args object.\n  Requires that the parameters have their standard names,\n  i.e. \\\"maxItems\\\" and \\\"skipCount\\\""    },
                  "createPaging1": {
                    "!original": "createPaging",
                    "!type": "fn(maxItems: number, skipCount: number, queryExecutionId: string) -\u003e ScriptPagingDetails",
                    "!doc": "\n  Builds a paging object, from the supplied\n  Max Items, Skip Count and Query Execution ID"    },
                  "enableRules": {
                    "!type": "fn()",
                    "!doc": "\n  Enable rule execution for this thread"    },
                  "getLocale": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns current thread\\\u0027s locale"    },
                  "disableRules": {
                    "!type": "fn()",
                    "!doc": "\n  Disable rule execution for this thread"    },
                  "toISO86011": {
                    "!original": "toISO8601",
                    "!type": "fn(date: ?) -\u003e string",
                    "!doc": "\n  Format date to ISO 8601 formatted string,\n  @param date,\n  @return"    },
                  "moduleInstalled": {
                    "!type": "fn(moduleName: string) -\u003e bool",
                    "!doc": "\n  Function to check if a module is installed,\n  @param moduleName\\tmodule name (e.g. \\\"org.alfresco.module.foo\\\"),\n  @return boolean      true if the module is currently installed"    },
                  "shortQName": {
                    "!type": "fn(s: string) -\u003e string",
                    "!doc": "\n  Given a long-form QName string, this method uses the namespace service to create a\n  short-form QName string.,\n  @param s   Fully qualified QName string,\n  @return the short form of the QName string, e.g. \\\"cm:content\\\""    },
                  "fromISO8601": {
                    "!type": "fn(isoDateString: string) -\u003e ?",
                    "!doc": "\n  Parse date from ISO formatted string,\n  @param isoDateString,\n  @return"    }
                },
                "preferenceService": {
                  "!doc": "\n  @author Roy Wetherall\nsee class org.alfresco.repo.preference.script.ScriptPreferenceService",
                  "clearPreferences1": {
                    "!original": "clearPreferences",
                    "!type": "fn(userName: string, preferenceFilter: string)",
                    "!doc": "\n  Clear the preference values,\n  @param userName,\n  @param preferenceFilter"    },
                  "setPreferences": {
                    "!type": "fn(userName: string, preferences: ?)"    },
                  "getPreferences": {
                    "!type": "fn(userName: string) -\u003e ?"    },
                  "clearPreferences": {
                    "!type": "fn(userName: string)"    },
                  "getPreferences1": {
                    "!original": "getPreferences",
                    "!type": "fn(userName: string, preferenceFilter: string) -\u003e ?"    }
                },
                "ScriptUser": {
                  "!doc": "\n  The Script user is a USER authority exposed to the scripting API,\n  @author mrogers\nsee class org.alfresco.repo.security.authority.script.ScriptUser",
                  "personNodeRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  Return the NodeRef of the person,\n  @since 4.0nsee method getPersonNodeRefn"    },
                  "person": {
                    "!type": "ScriptNode",
                    "!doc": "\n  Return a ScriptNode wrapping the person,\n  @since 4.0nsee method getPersonn"    },
                  "getFullName": {
                    "!type": "fn() -\u003e string"    },
                  "getDisplayName": {
                    "!type": "fn() -\u003e string"    },
                  "getShortName": {
                    "!type": "fn() -\u003e string"    },
                  "userName": {
                    "!type": "string",
                    "!doc": "\n  Return the User Name, also known as the Authority Full Namensee method getUserNamen"    },
                  "getPersonNodeRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  Return the NodeRef of the person,\n  @since 4.0"    },
                  "fullName": {
                    "!type": "string",
                    "!doc": "nullnsee method getFullNamen"    },
                  "displayName": {
                    "!type": "string",
                    "!doc": "nullnsee method getDisplayNamen"    },
                  "shortName": {
                    "!type": "string",
                    "!doc": "nullnsee method getShortNamen"    },
                  "getPerson": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Return a ScriptNode wrapping the person,\n  @since 4.0"    },
                  "getUserName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Return the User Name, also known as the Authority Full Name"    }
                },
                "NodeRef": {
                  "!doc": "\n  Reference to a node,\n  @author Derek Hulley\nsee class org.alfresco.service.cmr.repository.NodeRef",
                  "id": {
                    "!type": "string",
                    "!doc": "\n  @return The Node Id part of this referencensee method getIdn"    },
                  "getStoreRef": {
                    "!type": "fn() -\u003e StoreRef",
                    "!doc": "\n  @return The StoreRef part of this reference"    },
                  "equals": {
                    "!type": "fn(obj: ?) -\u003e bool",
                    "!doc": "\n  Override equals for this ref type,\n  @see java.lang.Object#equals(java.lang.Object)"    },
                  "storeRef": {
                    "!type": "StoreRef",
                    "!doc": "\n  @return The StoreRef part of this referencensee method getStoreRefn"    },
                  "isNodeRef": {
                    "!type": "fn(nodeRef: string) -\u003e bool",
                    "!doc": "\n  Determine if passed string conforms to the pattern of a node reference,\n  @param nodeRef  the node reference as a string,\n  @return  true \u003d\u003e it matches the pattern of a node reference"    },
                  "hashCode": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Hashes on ID alone.  As the number of copies of a particular node will be minimal, this is acceptable"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "getNodeRefs": {
                    "!type": "fn(values: string) -\u003e List",
                    "!doc": "\n  Converts a {@link String} containing a comma-separated list of {@link NodeRef} Ids into NodeRefs.,\n  @param values the {@link String} of {@link NodeRef} ids.,\n  @return A {@link List} of {@link NodeRef NodeRefs}."    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return The Node Id part of this reference"    }
                },
                "JscriptWorkflowInstance": {
                  "!doc": "\n  Class representing an active or in-flight workflow,\n  @author glenj\nsee class org.alfresco.repo.workflow.jscript.JscriptWorkflowInstance",
                  "startDate": {
                    "!type": "Date.prototype",
                    "!doc": "\n  Getter for \u003ccode\u003estartDate\u003c\\/code\u003e property,\n  @return the startDatensee method getStartDaten"    },
                  "remove": {
                    "!type": "fn()",
                    "!doc": "\n  Deletes workflow instance.,\n  @since 3.4.9"    },
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Getter for \u003ccode\u003edescription\u003c\\/code\u003e property,\n  @return the description"    },
                  "getPaths": {
                    "!type": "fn() -\u003e [JscriptWorkflowPath]",
                    "!doc": "\n  Get all paths for the specified workflow instance"    },
                  "endDate": {
                    "!type": "Date.prototype",
                    "!doc": "\n  Getter for \u003ccode\u003eendDate\u003c\\/code\u003e property,\n  @return the endDatensee method getEndDaten"    },
                  "cancel": {
                    "!type": "fn()",
                    "!doc": "\n  Cancel workflow instance"    },
                  "id": {
                    "!type": "string",
                    "!doc": "\n  Getter for \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the idnsee method getIdn"    },
                  "isActive": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Get state for \u003ccode\u003eactive\u003c\\/code\u003e property,\n  @return the active"    },
                  "getEndDate": {
                    "!type": "fn() -\u003e Date.prototype",
                    "!doc": "\n  Getter for \u003ccode\u003eendDate\u003c\\/code\u003e property,\n  @return the endDate"    },
                  "paths": {
                    "!type": "[JscriptWorkflowPath]",
                    "!doc": "\n  Get all paths for the specified workflow instancensee method getPathsn"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  Getter for \u003ccode\u003edescription\u003c\\/code\u003e property,\n  @return the descriptionnsee method getDescriptionn"    },
                  "getStartDate": {
                    "!type": "fn() -\u003e Date.prototype",
                    "!doc": "\n  Getter for \u003ccode\u003estartDate\u003c\\/code\u003e property,\n  @return the startDate"    },
                  "delete": {
                    "!type": "fn()",
                    "!doc": "\n  Delete workflow instance,\n  @deprecated as \\\u0027delete\\\u0027 is a JavaScript reserved word and so is unusable. Use {@link #remove()} instead."    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Getter for \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the id"    }
                },
                "ScriptableHashMap": {
                  "!doc": "\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.ScriptableHashMap",
                  "has1": {
                    "!original": "has",
                    "!type": "fn(index: number, start: ?) -\u003e bool",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#has(int,org.mozilla.javascript.Scriptable)"    },
                  "getIds": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getIds()"    },
                  "delete1": {
                    "!original": "delete",
                    "!type": "fn(index: number)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#delete(int)"    },
                  "put": {
                    "!type": "fn(name: string, start: ?, value: ?)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#put(java.lang.String,org.mozilla.javascript.Scriptable,java.lang.Object)"    },
                  "get": {
                    "!type": "fn(name: string, start: ?) -\u003e ?",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#get(java.lang.String,org.mozilla.javascript.Scriptable)"    },
                  "get1": {
                    "!original": "get",
                    "!type": "fn(index: number, start: ?) -\u003e ?",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#get(int,org.mozilla.javascript.Scriptable)"    },
                  "ids": {
                    "!type": "[ScriptNode]",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getIds()nsee method getIdsn"    },
                  "put1": {
                    "!original": "put",
                    "!type": "fn(index: number, start: ?, value: ?)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#put(int,org.mozilla.javascript.Scriptable,java.lang.Object)"    },
                  "delete": {
                    "!type": "fn(name: string)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#delete(java.lang.String)"    },
                  "getClassName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getClassName()"    },
                  "className": {
                    "!type": "string",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getClassName()nsee method getClassNamen"    },
                  "has": {
                    "!type": "fn(name: string, start: ?) -\u003e bool",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#has(java.lang.String,org.mozilla.javascript.Scriptable)"    }
                },
                "Page": {
                  "!doc": "\n  A Page within a Cursor.,\n  @author davidc\nsee class org.alfresco.repo.web.util.paging.Page",
                  "getType": {
                    "!type": "fn() -\u003e Paging.PageType",
                    "!doc": "\n  Gets the Page Type,\n  @return  page type"    },
                  "getNumber": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the page number,\n  @return  page number"    },
                  "number": {
                    "!type": "number",
                    "!doc": "\n  Gets the page number,\n  @return  page numbernsee method getNumbern"    },
                  "isZeroBasedIdx": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is zero based page index,\n  @return  true \u003d\u003e page number starts from zero"    },
                  "type": {
                    "!type": "Paging.PageType",
                    "!doc": "\n  Gets the Page Type,\n  @return  page typensee method getTypen"    },
                  "getSize": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the page size,\n  @return  page size"    },
                  "size": {
                    "!type": "number",
                    "!doc": "\n  Gets the page size,\n  @return  page sizensee method getSizen"    }
                },
                "ScriptGroup": {
                  "!doc": "\n  The Script group is a GROUP authority exposed to the scripting API.\n  It provides access to the properties of the group including the children of the group which may be groups or users.,\n  @author mrogers\nsee class org.alfresco.repo.security.authority.script.ScriptGroup",
                  "getChildUsers1": {
                    "!original": "getChildUsers",
                    "!type": "fn(paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptUser]",
                    "!doc": "\n  Get child users of this group,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName)"    },
                  "getChildGroups": {
                    "!type": "fn() -\u003e [ScriptGroup]"    },
                  "parentGroups": {
                    "!type": "[ScriptGroup]",
                    "!doc": "\n  Get the immediate parents of this group,\n  @return the immediate parents of this groupnsee method getParentGroupsn"    },
                  "setShortName": {
                    "!type": "fn(shortName: string)"    },
                  "getParentGroups": {
                    "!type": "fn() -\u003e [ScriptGroup]",
                    "!doc": "\n  Get the immediate parents of this group,\n  @return the immediate parents of this group"    },
                  "getChildGroups1": {
                    "!original": "getChildGroups",
                    "!type": "fn(maxItems: number, skipCount: number) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get child groups of this group,\n  @param maxItems Maximum number of groups to return.,\n  @param skipCount number of groups to skip before returning the first result."    },
                  "getGroupCount": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Get the number of child groups contained within this group.,\n  @return the number of child groups contained within this group."    },
                  "groupCount": {
                    "!type": "number",
                    "!doc": "\n  Get the number of child groups contained within this group.,\n  @return the number of child groups contained within this group.nsee method getGroupCountn"    },
                  "createGroup": {
                    "!type": "fn(newShortName: string, newDisplayName: string) -\u003e ScriptGroup",
                    "!doc": "\n  Create a new group as a child of this group.,\n  @return the new group"    },
                  "getChildAuthorities1": {
                    "!original": "getChildAuthorities",
                    "!type": "fn(paging: ScriptPagingDetails, sortBy: string) -\u003e [Authority]",
                    "!doc": "\n  Get all the children of this group, regardless of type,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName)"    },
                  "childAuthorities": {
                    "!type": "[Authority]",
                    "!doc": "\n  Get all the children of this group, regardless of typensee method getChildAuthoritiesn"    },
                  "removeAuthority": {
                    "!type": "fn(fullAuthorityName: string)",
                    "!doc": "\n  Remove child Authority from this group,\n  @param fullAuthorityName the full name of the authority to remove from this group."    },
                  "removeUser": {
                    "!type": "fn(newShortName: string)",
                    "!doc": "\n  Remove child user from this group,\n  @param newShortName the shortName of the user to remove from this group."    },
                  "setFullName": {
                    "!type": "fn(fullName: string)"    },
                  "deleteGroup": {
                    "!type": "fn()",
                    "!doc": "\n  Delete this group"    },
                  "getGroupNodeRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  Return the NodeRef of the group,\n  @since 4.0"    },
                  "getChildAuthorities": {
                    "!type": "fn() -\u003e [Authority]",
                    "!doc": "\n  Get all the children of this group, regardless of type"    },
                  "groupNode": {
                    "!type": "ScriptNode",
                    "!doc": "\n  Return a ScriptNode wrapping the group,\n  @since 4.0nsee method getGroupNoden"    },
                  "childGroups": {
                    "!type": "[ScriptGroup]",
                    "!doc": "nullnsee method getChildGroupsn"    },
                  "getChildGroups2": {
                    "!original": "getChildGroups",
                    "!type": "fn(paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get child groups of this group,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName)"    },
                  "userCount": {
                    "!type": "number",
                    "!doc": "\n  Get the number of users contained within this group.,\n  @return the number of users contained within this group.nsee method getUserCountn"    },
                  "getFullName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the full internal name, also known\n  as the Authority Name"    },
                  "getParentGroups2": {
                    "!original": "getParentGroups",
                    "!type": "fn(paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get the immediate parents of this group,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName),\n  @return the immediate parents of this group"    },
                  "getParentGroups1": {
                    "!original": "getParentGroups",
                    "!type": "fn(maxItems: number, skipCount: number) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get the immediate parents of this group,\n  @param maxItems Maximum number of groups to return.,\n  @param skipCount number of groups to skip before returning the first result.,\n  @return the immediate parents of this group"    },
                  "allGroups": {
                    "!type": "[ScriptGroup]",
                    "!doc": "\n  Get all sub groups (all decendants),\n  @return the descenants of this groupnsee method getAllGroupsn"    },
                  "removeGroup": {
                    "!type": "fn(newShortName: string)",
                    "!doc": "\n  remove sub group from this group,\n  @param newShortName the shortName of the sub group to remove from this group."    },
                  "getAllParentGroups1": {
                    "!original": "getAllParentGroups",
                    "!type": "fn(maxItems: number, skipCount: number) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get all the parents of this this group,\n  @param maxItems Maximum number of groups to return.,\n  @param skipCount number of groups to skip before returning the first result.,\n  @return all the parents of this group"    },
                  "getShortName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the short name"    },
                  "groupNodeRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  Return the NodeRef of the group,\n  @since 4.0nsee method getGroupNodeRefn"    },
                  "getAllParentGroups2": {
                    "!original": "getAllParentGroups",
                    "!type": "fn(paging: ScriptPagingDetails, sortBy: string) -\u003e [ScriptGroup]",
                    "!doc": "\n  Get all the parents of this this group,\n  @param paging Paging object with max number to return, and items to skip,\n  @param sortBy What to sort on (authorityName, shortName or displayName),\n  @return all the parents of this group"    },
                  "getAllUsers": {
                    "!type": "fn() -\u003e [ScriptUser]",
                    "!doc": "\n  Get all users contained in this group,\n  @return"    },
                  "getAllParentGroups": {
                    "!type": "fn() -\u003e [ScriptGroup]",
                    "!doc": "\n  Get all the parents of this this group,\n  @return all the parents of this group"    },
                  "getGroupNode": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Return a ScriptNode wrapping the group,\n  @since 4.0"    },
                  "allParentGroups": {
                    "!type": "[ScriptGroup]",
                    "!doc": "\n  Get all the parents of this this group,\n  @return all the parents of this groupnsee method getAllParentGroupsn"    },
                  "getAllGroups": {
                    "!type": "fn() -\u003e [ScriptGroup]",
                    "!doc": "\n  Get all sub groups (all decendants),\n  @return the descenants of this group"    },
                  "addAuthority": {
                    "!type": "fn(fullAuthorityName: string)",
                    "!doc": "\n  AddAuthority as a child of this group,\n  @param fullAuthorityName the full name of the authority to add to this group."    },
                  "allUsers": {
                    "!type": "[ScriptUser]",
                    "!doc": "\n  Get all users contained in this group,\n  @returnnsee method getAllUsersn"    },
                  "getDisplayName": {
                    "!type": "fn() -\u003e string"    },
                  "getUserCount": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Get the number of users contained within this group.,\n  @return the number of users contained within this group."    },
                  "setDisplayName": {
                    "!type": "fn(displayName: string)",
                    "!doc": "\n  Change the display name for this group.    Need administrator permission to call this method to change a display name.,\n  @param displayName"    },
                  "getChildUsers": {
                    "!type": "fn() -\u003e [ScriptUser]",
                    "!doc": "\n  Get child users of this group"    },
                  "fullName": {
                    "!type": "string",
                    "!doc": "\n  Get the full internal name, also known\n  as the Authority Namensee method getFullNamen"    },
                  "displayName": {
                    "!type": "string",
                    "!doc": "nullnsee method getDisplayNamen"    },
                  "shortName": {
                    "!type": "string",
                    "!doc": "\n  Get the short namensee method getShortNamen"    },
                  "childUsers": {
                    "!type": "[ScriptUser]",
                    "!doc": "\n  Get child users of this groupnsee method getChildUsersn"    }
                },
                "ScriptTransferTarget": {
                  "!doc": "\n  Java Script wrapper for TransferTarget,\n  @author Mark Rogers\nsee class org.alfresco.repo.transfer.script.ScriptTransferTarget",
                  "endpointProtocol": {
                    "!type": "string",
                    "!doc": "nullnsee method getEndpointProtocoln"    },
                  "endpointPort": {
                    "!type": "number",
                    "!doc": "nullnsee method getEndpointPortn"    },
                  "getDescription": {
                    "!type": "fn() -\u003e string"    },
                  "description": {
                    "!type": "string",
                    "!doc": "nullnsee method getDescriptionn"    },
                  "getEndpointPort": {
                    "!type": "fn() -\u003e number"    },
                  "getName": {
                    "!type": "fn() -\u003e string"    },
                  "name": {
                    "!type": "string",
                    "!doc": "nullnsee method getNamen"    },
                  "getEndpointHost": {
                    "!type": "fn() -\u003e string"    },
                  "getEndpointProtocol": {
                    "!type": "fn() -\u003e string"    },
                  "endpointHost": {
                    "!type": "string",
                    "!doc": "nullnsee method getEndpointHostn"    }
                },
                "AVMScriptStore": {
                  "!doc": "\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.AVMScriptStore",
                  "id": {
                    "!type": "string",
                    "!doc": "\n  @return Store namensee method getIdn"    },
                  "luceneSearch": {
                    "!type": "fn(query: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Perform a lucene query against this store.,\n  @param query     Lucene,\n  @return array of AVM node object results - empty array if no results found"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Store name"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  @return Store namensee method getNamen"    },
                  "lookupNode": {
                    "!type": "fn(path: string) -\u003e AVMNode",
                    "!doc": "\n  Lookup a node in the store, the path is assumed to be related to the webapps folder root.\n  Therefore a valid path would be \\\"\\/ROOT\\/WEB-INF\\/lib\\/web.xml\\\".,\n  @param path      Relative to the webapps folder root path for this store.,\n  @return node if found, null otherwise."    },
                  "getCreator": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return User who created the store"    },
                  "lookupRoot": {
                    "!type": "fn() -\u003e AVMNode",
                    "!doc": "\n  @return the root node of all webapps in the store"    },
                  "createdDate": {
                    "!type": "Date.prototype",
                    "!doc": "\n  @return Creation date of the storensee method getCreatedDaten"    },
                  "getCreatedDate": {
                    "!type": "fn() -\u003e Date.prototype",
                    "!doc": "\n  @return Creation date of the store"    },
                  "creator": {
                    "!type": "string",
                    "!doc": "\n  @return User who created the storensee method getCreatorn"    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Store name"    }
                },
                "Site": {
                  "!doc": "\n  Site JavaScript object,\n  @author Roy Wetherall\nsee class org.alfresco.repo.site.script.Site",
                  "save": {
                    "!type": "fn()",
                    "!doc": "\n  Saves any outstanding updates to the site details.  \n  \u003cp\u003e\n  If properties of the site are changed and save is not called, those changes will be lost."    },
                  "visibility": {
                    "!type": "string",
                    "!doc": "\n  Get the site visibility,\n  @return  String  site visibilitynsee method getVisibilityn"    },
                  "getSitePermissionGroups": {
                    "!type": "fn() -\u003e ScriptableHashMap",
                    "!doc": "\n  Gets a map of role name mapping to associated group name.,\n  @return  ScriptableMap\u003cString, String\u003e   map of role to group name"    },
                  "listInvitations": {
                    "!type": "fn() -\u003e ScriptInvitation\u003c?\u003e[]",
                    "!doc": "\n  list the outstanding invitations for this site\n  Map of name \\/ invitation"    },
                  "deleteSite": {
                    "!type": "fn()",
                    "!doc": "\n  Deletes the site"    },
                  "setIsPublic": {
                    "!type": "fn(isPublic: bool)",
                    "!doc": "\n  Set whether the site is public or not,\n  @param isPublic  true the site is public false otherwise,\n  @deprecated      since version 3.2, replaced by {@link #setVisibility(String)}"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  Get the description,\n  @return  String  the descriptionnsee method getDescriptionn"    },
                  "inviteNominated": {
                    "!type": "fn(inviteeFirstName: string, inviteeLastName: string, inviteeEmail: string, inviteeRole: string, acceptUrl: string, rejectUrl: string) -\u003e ScriptInvitation",
                    "!doc": "\n  Create new nominated invitation to this web site,\n  @return the new invitation"    },
                  "getTitle": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the title,\n  @return  String  the site title"    },
                  "getContainer": {
                    "!type": "fn(componentId: string) -\u003e ScriptNode",
                    "!doc": "\n  Gets (or creates) the \\\"container\\\" folder for the specified component id,\n  @param componentId,\n  @return node representing the \\\"container\\\" folder (or null, if for some reason \n  the container can not be created - probably due to permissions)"    },
                  "listInvitations1": {
                    "!original": "listInvitations",
                    "!type": "fn(props: ?) -\u003e ScriptInvitation\u003c?\u003e[]",
                    "!doc": "\n  List the open invitations for this web site.\n  props specifies optional properties to be searched.,\n  @param props inviteeUserName,\n  @return the invitations"    },
                  "inviteModerated": {
                    "!type": "fn(inviteeComments: string, inviteeUserName: string, inviteeRole: string) -\u003e ScriptInvitation",
                    "!doc": "\n  Create new moderated invitation to this web site,\n  @return the new invitation"    },
                  "getShortName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Set the short name,\n  @return  String  the short name"    },
                  "customProperties": {
                    "!type": "ScriptableQNameMap",
                    "!doc": "\n  Get a map of the sites custom properties,\n  @return ScriptableQNameMap\u003cString, Serializable\u003e     map of names and valuesnsee method getCustomPropertiesn"    },
                  "getNode": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Get the site node, null if none,\n  @return  ScriptNode  site node"    },
                  "node": {
                    "!type": "ScriptNode",
                    "!doc": "\n  Get the site node, null if none,\n  @return  ScriptNode  site nodensee method getNoden"    },
                  "setTitle": {
                    "!type": "fn(title: string)",
                    "!doc": "\n  Set the title,\n  @param title     the title"    },
                  "setPermissions": {
                    "!type": "fn(node: ScriptNode, permissions: ?)",
                    "!doc": "\n  Apply a set of permissions to the node.,\n  @param nodeRef   node reference"    },
                  "sitePreset": {
                    "!type": "string",
                    "!doc": "\n  Get the site preset,\n  @return  String  the site presetnsee method getSitePresetn"    },
                  "setMembership": {
                    "!type": "fn(authorityName: string, role: string)",
                    "!doc": "\n  Sets the membership details for a user.\n  \u003cp\u003e\n  If the user is not already a member of the site then they are added with the role\n  given.  If the user is already a member of the site then their role is updated to the new role.\n  \u003cp\u003e\n  Only a site manager can modify memberships and there must be at least one site manager at\n  all times.,\n  @param authorityName  authority name,\n  @param role      site role"    },
                  "hasContainer": {
                    "!type": "fn(componentId: string) -\u003e bool",
                    "!doc": "\n  Determine if the \\\"container\\\" folder for the specified component exists,\n  @param componentId,\n  @return  true \u003d\u003e \\\"container\\\" folder exists"    },
                  "getIsPublic": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Gets whether the site is public or not,\n  @return      true is public false otherwise,\n  @deprecated  since version 3.2, replaced by {@link #getVisibility()}"    },
                  "isMember": {
                    "!type": "fn(authorityName: string) -\u003e bool",
                    "!doc": "\n  Indicates whether a user is a member of the site.,\n  @param authorityName  user name,\n  @return boolean  true if the user is a member of the site, false otherwise"    },
                  "getSiteGroup": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the site group name,\n  @return  String  site group name"    },
                  "createContainer": {
                    "!type": "fn(componentId: string) -\u003e ScriptNode",
                    "!doc": "\n  Creates a new site container ,\n  @param componentId   component id,\n  @return ScriptNode   the created container"    },
                  "getVisibility": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the site visibility,\n  @return  String  site visibility"    },
                  "sitePermissionGroups": {
                    "!type": "ScriptableHashMap",
                    "!doc": "\n  Gets a map of role name mapping to associated group name.,\n  @return  ScriptableMap\u003cString, String\u003e   map of role to group namensee method getSitePermissionGroupsn"    },
                  "listMembers": {
                    "!type": "fn(nameFilter: string, roleFilter: string) -\u003e ScriptableHashMap",
                    "!doc": "\n  Gets a map of members of the site with their role within the site.  This list can\n  be filtered by name and\\/or role.\n  \u003cp\u003e\n  If no name or role filter is specified all members of the site are listed.\n  \u003cp\u003e\n  This list includes both users and groups.,\n  @param nameFilter               user name filter,\n  @param roleFilter               user role filter,\n  @return ScriptableHashMap\u003cString, String\u003e    list of members of site with their roles,\n  @deprecated Use {@link #listMembers(String,String,int,boolean)} instead"    },
                  "removeMembership": {
                    "!type": "fn(authorityName: string)",
                    "!doc": "\n  Removes a user or group membership from a site.\n  \u003cp\u003e\n  Only a site manager can remove a user\\\u0027s membership and the last site manager can not be removed.,\n  @param authorityName  authority name"    },
                  "title": {
                    "!type": "string",
                    "!doc": "\n  Get the title,\n  @return  String  the site titlensee method getTitlen"    },
                  "siteGroup": {
                    "!type": "string",
                    "!doc": "\n  Get the site group name,\n  @return  String  site group namensee method getSiteGroupn"    },
                  "createContainer2": {
                    "!original": "createContainer",
                    "!type": "fn(componentId: string, folderType: string, permissions: ?) -\u003e ScriptNode",
                    "!doc": "\n  Creates a new site container,\n  @param componentId   component id,\n  @param folderType    folder type to create,\n  @return ScriptNode   the created container"    },
                  "createAndSaveContainer": {
                    "!type": "fn(containerId: string, containerType: string, description: string) -\u003e ScriptNode",
                    "!doc": "\n  This method creates a container of the specified id and type, sets the cm:description\n  on that container node to the specified value and saves the container node updates to the repository.\n  All of this is run as system.,\n  @param containerId an id for the container node.,\n  @param containerType the type for the container node.,\n  @param description a value for the cm:description property on the container node.,\n  @return the newly created and saved container {@link ScriptNode}.,\n  @since 3.4"    },
                  "createContainer1": {
                    "!original": "createContainer",
                    "!type": "fn(componentId: string, folderType: string) -\u003e ScriptNode",
                    "!doc": "\n  Creates a new site container,\n  @param componentId   component id,\n  @param folderType    folder type to create,\n  @return ScriptNode   the created container"    },
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the description,\n  @return  String  the description"    },
                  "isPublic": {
                    "!type": "bool",
                    "!doc": "\n  Gets whether the site is public or not,\n  @return      true is public false otherwise,\n  @deprecated  since version 3.2, replaced by {@link #getVisibility()}nsee method getIsPublicn"    },
                  "getMembersRole": {
                    "!type": "fn(authorityName: string) -\u003e string",
                    "!doc": "\n  Gets a user\\\u0027s role in this site.\n  \u003cp\u003e\n  If the user is not a member of the site then null is returned.,\n  @param authorityName  authority name,\n  @return String   user\\\u0027s role or null if not a member"    },
                  "getMembersRoleInfo": {
                    "!type": "fn(authorityName: string) -\u003e SiteMemberInfo",
                    "!doc": "\n  Gets extended information on the user\\\u0027s role in this site.\n  \u003cp\u003e\n  If the user is not a member of the site then null is returned.,\n  @param authorityName  authority name,\n  @return SiteMemberInfo   user\\\u0027s role information or null if not a member"    },
                  "inviteNominated1": {
                    "!original": "inviteNominated",
                    "!type": "fn(inviteeUserName: string, inviteeRole: string, acceptUrl: string, rejectUrl: string) -\u003e ScriptInvitation",
                    "!doc": "\n  Create new nominated invitation to this web site,\n  @return the new invitation"    },
                  "getInvitation": {
                    "!type": "fn(invitationId: string) -\u003e ScriptInvitation",
                    "!doc": "\n  Get an invitation to this web site,\n  @return the invitation or null if it does not exist"    },
                  "getSitePreset": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the site preset,\n  @return  String  the site preset"    },
                  "setDescription": {
                    "!type": "fn(description: string)",
                    "!doc": "\n  Set the description,\n  @param description   the description"    },
                  "getCustomProperty": {
                    "!type": "fn(name: string) -\u003e CustomProperty",
                    "!doc": "\n  Get the value of a custom property, null if the custom property has not been set or doesn\\\u0027t exist.,\n  @param name             qname of the property ,\n  @return Serializable     value of the property, null if not set"    },
                  "getCustomProperties": {
                    "!type": "fn() -\u003e ScriptableQNameMap",
                    "!doc": "\n  Get a map of the sites custom properties,\n  @return ScriptableQNameMap\u003cString, Serializable\u003e     map of names and values"    },
                  "setVisibility": {
                    "!type": "fn(visibility: string)",
                    "!doc": "\n  Set the site visibility,\n  @param visibility    site visibility (public|moderated|private)"    },
                  "resetAllPermissions": {
                    "!type": "fn(node: ScriptNode)",
                    "!doc": "\n  Reset any permissions that have been set on the node.  \n  \u003cp\u003e\n  All permissions will be deleted and the node set to inherit permissions.,\n  @param nodeRef   node reference"    },
                  "shortName": {
                    "!type": "string",
                    "!doc": "\n  Set the short name,\n  @return  String  the short namensee method getShortNamen"    },
                  "listMembers1": {
                    "!original": "listMembers",
                    "!type": "fn(nameFilter: string, roleFilter: string, size: number) -\u003e ScriptableHashMap",
                    "!doc": "\n  Gets a map of members of the site with their role within the site.  This list can\n  be filtered by name and\\/or role.\n  \u003cp\u003e\n  If no name or role filter is specified all members of the site are listed.\n  \u003cp\u003e\n  This list includes both users and groups.,\n  @param nameFilter               user name filter,\n  @param roleFilter               user role filter,\n  @param size                     max results size crop if \u003e0,\n  @return ScriptableHashMap\u003cString, String\u003e    list of members of site with their roles,\n  @deprecated Use {@link #listMembers(String,String,int,boolean)} instead"    },
                  "listMembers2": {
                    "!original": "listMembers",
                    "!type": "fn(nameFilter: string, roleFilter: string, size: number, collapseGroups: bool) -\u003e ScriptableHashMap",
                    "!doc": "\n  Gets a map of members of the site with their role within the site.  This list can\n  be filtered by name and\\/or role.\n  \u003cp\u003e\n  If no name or role filter is specified all members of the site are listed.\n  \u003cp\u003e\n  This list includes both users and groups if collapseGroups is set to false, otherwise all\n  groups that are members are collapsed into their component users and listed.,\n  @param nameFilter               user name filter,\n  @param roleFilter               user role filter,\n  @param size                     max results size crop if \u003e0,\n  @param collapseGroups           true if collapse member groups into user list, false otherwise,\n  @return ScriptableHashMap\u003cString, String\u003e    list of members of site with their roles"    }
                },
                "ScriptForm": {
                  "!doc": "\n  Form JavaScript Object.,\n  @author Neil Mc Erlean\nsee class org.alfresco.repo.forms.script.ScriptForm",
                  "itemType": {
                    "!type": "string",
                    "!doc": "nullnsee method getItemTypen"    },
                  "fieldDefinitions": {
                    "!type": "[FieldDefinition]",
                    "!doc": "nullnsee method getFieldDefinitionsn"    },
                  "getItemUrl": {
                    "!type": "fn() -\u003e string"    },
                  "itemId": {
                    "!type": "string",
                    "!doc": "nullnsee method getItemIdn"    },
                  "getFieldDefinitions": {
                    "!type": "fn() -\u003e [FieldDefinition]"    },
                  "getItemId": {
                    "!type": "fn() -\u003e string"    },
                  "getFormData": {
                    "!type": "fn() -\u003e ScriptFormData"    },
                  "formData": {
                    "!type": "ScriptFormData",
                    "!doc": "nullnsee method getFormDatan"    },
                  "submissionUrl": {
                    "!type": "string",
                    "!doc": "nullnsee method getSubmissionUrln"    },
                  "itemKind": {
                    "!type": "string",
                    "!doc": "nullnsee method getItemKindn"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "getItemType": {
                    "!type": "fn() -\u003e string"    },
                  "getItemKind": {
                    "!type": "fn() -\u003e string"    },
                  "getSubmissionUrl": {
                    "!type": "fn() -\u003e string"    },
                  "itemUrl": {
                    "!type": "string",
                    "!doc": "nullnsee method getItemUrln"    }
                },
                "Association": {
                  "!doc": "\n  Object representing an association,\n  @author Roy Wetherall\nsee class org.alfresco.repo.jscript.Association",
                  "getType": {
                    "!type": "fn() -\u003e string"    },
                  "source": {
                    "!type": "ScriptNode",
                    "!doc": "nullnsee method getSourcen"    },
                  "associationRef": {
                    "!type": "AssociationRef",
                    "!doc": "nullnsee method getAssociationRefn"    },
                  "getTarget": {
                    "!type": "fn() -\u003e ScriptNode"    },
                  "typeQName": {
                    "!type": "QName",
                    "!doc": "nullnsee method getTypeQNamen"    },
                  "type": {
                    "!type": "string",
                    "!doc": "nullnsee method getTypen"    },
                  "getAssociationRef": {
                    "!type": "fn() -\u003e AssociationRef"    },
                  "getSource": {
                    "!type": "fn() -\u003e ScriptNode"    },
                  "getTypeQName": {
                    "!type": "fn() -\u003e QName"    }
                },
                "QName": {
                  "!doc": "\n  \u003ccode\u003eQName\u003c\\/code\u003e represents the qualified name of a Repository item. Each\n  QName consists of a local name qualified by a namespace.\n  \u003cp\u003e\n  The {@link org.alfresco.service.namespace.QNamePattern QNamePattern} is implemented\n  to allow instances of this class to be used for direct pattern matching where\n  required on interfaces.,\n  @author David Caruana\nsee class org.alfresco.service.namespace.QName",
                  "splitPrefixedQName": {
                    "!type": "fn(qname: string) -\u003e [string]",
                    "!doc": "\n  Create a QName,\n  @param qname  qualified name of the following format \u003ccode\u003eprefix:localName\u003c\\/code\u003e,\n  @return  string array where index 0 \u003d\u003e prefix and index 1 \u003d\u003e local name"    },
                  "clone": {
                    "!type": "fn() -\u003e ?"    },
                  "localName": {
                    "!type": "string",
                    "!doc": "\n  Gets the name,\n  @return the namensee method getLocalNamen"    },
                  "isMatch": {
                    "!type": "fn(qname: QName) -\u003e bool",
                    "!doc": "\n  Performs a direct comparison between qnames.,\n  @see #equals(Object)"    },
                  "equals": {
                    "!type": "fn(object: ?) -\u003e bool",
                    "!doc": "\n  Two QNames are equal only when both their name and namespace match.\n  Note: The prefix is ignored during the comparison."    },
                  "createValidLocalName": {
                    "!type": "fn(name: string) -\u003e string",
                    "!doc": "\n  Create a valid local name from the specified name,\n  @param name  name to create valid local name from,\n  @return valid local name"    },
                  "hashCode": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Calculate hashCode. Follows pattern used by String where hashCode is\n  cached (QName is immutable)."    },
                  "compareTo": {
                    "!type": "fn(qname: QName) -\u003e number",
                    "!doc": "\n  Uses the {@link #getNamespaceURI() namespace URI} and then the {@link #getLocalName() localname}to do the comparison i.e. the comparison is alphabetical."    },
                  "getLocalName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the name,\n  @return the name"    },
                  "namespaceURI": {
                    "!type": "string",
                    "!doc": "\n  Gets the namespace,\n  @return the namespace (empty string when not specified, but never null)nsee method getNamespaceURIn"    },
                  "createQName": {
                    "!type": "fn(namespaceURI: string, localName: string) -\u003e QName",
                    "!doc": "\n  Create a QName\n  (With no prefix),\n  @param namespaceURI  the qualifying namespace (maybe null or empty string),\n  @param localName  the local name,\n  @return the QName"    },
                  "getPrefixString": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Getter version of toPrefixString(),\n  @return  the string representation of QName"    },
                  "toPrefixString": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Render string representation of QName using format:\n  \u003ccode\u003eprefix:name\u003c\\/code\u003e,\n  @return the string representation"    },
                  "getNamespaceURI": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the namespace,\n  @return the namespace (empty string when not specified, but never null)"    },
                  "toString": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Render string representation of QName using format:\n  \u003ccode\u003e{namespace}name\u003c\\/code\u003e,\n  @return the string representation"    },
                  "prefixString": {
                    "!type": "string",
                    "!doc": "\n  Getter version of toPrefixString(),\n  @return  the string representation of QNamensee method getPrefixStringn"    },
                  "createQNameWithValidLocalName": {
                    "!type": "fn(namespaceURI: string, localName: string) -\u003e QName",
                    "!doc": "\n  Create a QName, optionally truncating the localname to {@link QName#MAX_LENGTH}.,\n  @param namespaceURI  the qualifying namespace (maybe null or empty string),\n  @param localName     the local name, which will be truncated, if necessary,\n  @return              the QName with potentially-truncated localname"    }
                },
                "JscriptWorkflowDefinition": {
                  "!doc": "null\nsee class org.alfresco.repo.workflow.jscript.JscriptWorkflowDefinition",
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get value of \u003ccode\u003edescription\u003c\\/code\u003e property,\n  @return the description"    },
                  "startWorkflow1": {
                    "!original": "startWorkflow",
                    "!type": "fn(workflowPackage: ScriptNode, properties: Properties) -\u003e JscriptWorkflowPath",
                    "!doc": "\n  Start workflow instance from workflow definition,\n  @param workflowPackage workflow package node to \\\u0027attach\\\u0027 to the new workflow\n  instance,\n  @param properties Associative array of properties used to populate the \n  start task properties,\n  @return the initial workflow path"    },
                  "startWorkflow": {
                    "!type": "fn(properties: Properties.prototype) -\u003e JscriptWorkflowPath",
                    "!doc": "\n  Start workflow instance from workflow definition without\n  attaching any package node to the workflow,\n  @param properties Associative array of properties used to populate the \n  start task properties,\n  @return the initial workflow path"    },
                  "version": {
                    "!type": "string",
                    "!doc": "\n  Get value of \u003ccode\u003eversion\u003c\\/code\u003e property,\n  @return the versionnsee method getVersionn"    },
                  "id": {
                    "!type": "string",
                    "!doc": "\n  Get value of \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the idnsee method getIdn"    },
                  "getVersion": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get value of \u003ccode\u003eversion\u003c\\/code\u003e property,\n  @return the version"    },
                  "title": {
                    "!type": "string",
                    "!doc": "\n  Get value of \u003ccode\u003etitle\u003c\\/code\u003e property,\n  @return the titlensee method getTitlen"    },
                  "activeInstances": {
                    "!type": "[JscriptWorkflowInstance]",
                    "!doc": "\n  Get active workflow instances of this workflow definition,\n  @return the active workflow instances spawned from this workflow definitionnsee method getActiveInstancesn"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  Get value of \u003ccode\u003edescription\u003c\\/code\u003e property,\n  @return the descriptionnsee method getDescriptionn"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  Get value of \u003ccode\u003ename\u003c\\/code\u003e property,\n  @return the namensee method getNamen"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get value of \u003ccode\u003ename\u003c\\/code\u003e property,\n  @return the name"    },
                  "getActiveInstances": {
                    "!type": "fn() -\u003e [JscriptWorkflowInstance]",
                    "!doc": "\n  Get active workflow instances of this workflow definition,\n  @return the active workflow instances spawned from this workflow definition"    },
                  "getTitle": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get value of \u003ccode\u003etitle\u003c\\/code\u003e property,\n  @return the title"    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get value of \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the id"    }
                },
                "ScriptRenditionDefinition": {
                  "!doc": "\n  RenditionDefinition JavaScript Object. This class is a JavaScript-friendly wrapper for\n  the {@link RenditionDefinition renditionDefinition} class.,\n  @author Neil McErlean,\n  @see org.alfresco.service.cmr.rendition.RenditionDefinition\nsee class org.alfresco.repo.rendition.script.ScriptRenditionDefinition",
                  "renderingEngineName": {
                    "!type": "string",
                    "!doc": "\n  Returns the name of the Rendering Engine used by this definition.,\n  @returnnsee method getRenderingEngineNamen"    },
                  "getRenderingEngineName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the name of the Rendering Engine used by this definition.,\n  @return"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "executeImpl": {
                    "!type": "fn(node: ScriptNode)"    },
                  "getRenditionName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the name of this rendition definition in prefix:localName format.,\n  @return the name which uniquely identifies this rendition definition."    },
                  "renditionName": {
                    "!type": "string",
                    "!doc": "\n  Returns the name of this rendition definition in prefix:localName format.,\n  @return the name which uniquely identifies this rendition definition.nsee method getRenditionNamen"    }
                },
                "Cursor": {
                  "!doc": "\n  Cursor - Allows for scrolling through a row set.,\n  @author davidc\nsee class org.alfresco.repo.web.util.paging.Cursor",
                  "hasFirstPage": {
                    "!type": "bool",
                    "!doc": "\n  Is there a known first page?,\n  @return  true \u003d\u003e getFirstPage() will succeednsee method getHasFirstPagen"    },
                  "totalRows": {
                    "!type": "number",
                    "!doc": "\n  Gets total rows,\n  @return  total rowsnsee method getTotalRowsn"    },
                  "rowCount": {
                    "!type": "number",
                    "!doc": "\n  Gets the count of rows within result set for this page,\n  @return  row countnsee method getRowCountn"    },
                  "getLastPage": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the last page number,\n  @return  last page number"    },
                  "hasPrevPage": {
                    "!type": "bool",
                    "!doc": "\n  Is there a known prev page?,\n  @return  true \u003d\u003e getPrevPage() will succeednsee method getHasPrevPagen"    },
                  "isInRange": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is the page within range of the result set,\n  @return  true \u003d\u003e page is within range"    },
                  "getFirstPage": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the first page number,\n  @return  first page number"    },
                  "getPageType": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the page type,\n  @return  page type"    },
                  "getHasLastPage": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is there a known last page?,\n  @return  true \u003d\u003e getLastPage() will succeed"    },
                  "getHasPrevPage": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is there a known prev page?,\n  @return  true \u003d\u003e getPrevPage() will succeed"    },
                  "getEndRow": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the end row within result set for this page,\n  @return  end row index"    },
                  "getHasFirstPage": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is there a known first page?,\n  @return  true \u003d\u003e getFirstPage() will succeed"    },
                  "getNextPage": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the next page number,\n  @return  next page number (-1 if no more pages)"    },
                  "hasLastPage": {
                    "!type": "bool",
                    "!doc": "\n  Is there a known last page?,\n  @return  true \u003d\u003e getLastPage() will succeednsee method getHasLastPagen"    },
                  "lastPage": {
                    "!type": "number",
                    "!doc": "\n  Gets the last page number,\n  @return  last page numbernsee method getLastPagen"    },
                  "nextPage": {
                    "!type": "number",
                    "!doc": "\n  Gets the next page number,\n  @return  next page number (-1 if no more pages)nsee method getNextPagen"    },
                  "hasNextPage": {
                    "!type": "bool",
                    "!doc": "\n  Is there a known next page?,\n  @return  true \u003d\u003e getNextPage() will succeednsee method getHasNextPagen"    },
                  "pageSize": {
                    "!type": "number",
                    "!doc": "\n  Gets the page size,\n  @return  page sizensee method getPageSizen"    },
                  "getHasNextPage": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Is there a known next page?,\n  @return  true \u003d\u003e getNextPage() will succeed"    },
                  "endRow": {
                    "!type": "number",
                    "!doc": "\n  Gets the end row within result set for this page,\n  @return  end row indexnsee method getEndRown"    },
                  "pageType": {
                    "!type": "string",
                    "!doc": "\n  Gets the page type,\n  @return  page typensee method getPageTypen"    },
                  "getPrevPage": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the previous page number,\n  @return  previous page number (-1 if no previous pages)"    },
                  "prevPage": {
                    "!type": "number",
                    "!doc": "\n  Gets the previous page number,\n  @return  previous page number (-1 if no previous pages)nsee method getPrevPagen"    },
                  "startRow": {
                    "!type": "number",
                    "!doc": "\n  Gets the start row within result set for this page,\n  @return  start row indexnsee method getStartRown"    },
                  "getRowCount": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the count of rows within result set for this page,\n  @return  row count"    },
                  "getCurrentPage": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the current page number,\n  @return  current page number"    },
                  "getPageSize": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the page size,\n  @return  page size"    },
                  "firstPage": {
                    "!type": "number",
                    "!doc": "\n  Gets the first page number,\n  @return  first page numbernsee method getFirstPagen"    },
                  "currentPage": {
                    "!type": "number",
                    "!doc": "\n  Gets the current page number,\n  @return  current page numbernsee method getCurrentPagen"    },
                  "getTotalRows": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets total rows,\n  @return  total rows"    },
                  "getTotalPages": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets total number of pages,\n  @return  total number of pages"    },
                  "totalPages": {
                    "!type": "number",
                    "!doc": "\n  Gets total number of pages,\n  @return  total number of pagesnsee method getTotalPagesn"    },
                  "getStartRow": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the start row within result set for this page,\n  @return  start row index"    }
                },
                "ScriptReplicationDefinition": {
                  "!doc": "\n  ReplicationDefinition JavaScript Object. This class is a JavaScript-friendly wrapper for\n  the {@link ReplicationDefinition replicationDefinition} class.,\n  @author Nick Burch,\n  @see org.alfresco.service.cmr.replication.ReplicationDefinition\nsee class org.alfresco.repo.replication.script.ScriptReplicationDefinition",
                  "getDescription": {
                    "!type": "fn() -\u003e string"    },
                  "getReplicationName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the name of this replication definition,\n  @return the name which uniquely identifies this replication definition."    },
                  "getTargetName": {
                    "!type": "fn() -\u003e string"    },
                  "payload": {
                    "!type": "[ScriptNode]",
                    "!doc": "nullnsee method getPayloadn"    },
                  "targetName": {
                    "!type": "string",
                    "!doc": "nullnsee method getTargetNamen"    },
                  "replicate": {
                    "!type": "fn()",
                    "!doc": "\n  Triggers the execution of the replication."    },
                  "getPayload": {
                    "!type": "fn() -\u003e [ScriptNode]"    },
                  "setPayload": {
                    "!type": "fn(payloadNodes: [ScriptNode])"    },
                  "description": {
                    "!type": "string",
                    "!doc": "nullnsee method getDescriptionn"    },
                  "replicationName": {
                    "!type": "string",
                    "!doc": "\n  Returns the name of this replication definition,\n  @return the name which uniquely identifies this replication definition.nsee method getReplicationNamen"    },
                  "setTargetName": {
                    "!type": "fn(target: string)"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "executeImpl": {
                    "!type": "fn(node: ScriptNode)"    }
                },
                "ScriptNode": {
                  "!doc": "\n  Script Node class implementation, specific for use by ScriptService as part of the object model.\n  \u003cp\u003e\n  The class exposes Node properties, children and assocs as dynamically populated maps and lists. The various collection classes are mirrored as JavaScript properties. So can be\n  accessed using standard JavaScript property syntax, such as \u003ccode\u003enode.children[0].properties.name\u003c\\/code\u003e.\n  \u003cp\u003e\n  Various helper methods are provided to access common and useful node variables such as the content url and type information.,\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.ScriptNode",
                  "getOwner": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the owner of the node.,\n  @return"    },
                  "getSourceAssocs": {
                    "!type": "fn() -\u003e Map",
                    "!doc": "\n  Return the source associations to this Node. As a Map of assoc name to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means source associations to this node can be access thus:\n  \u003ccode\u003enode.sourceAssocs[\\\"translations\\\"][0]\u003c\\/code\u003e,\n  @return source associations as a Map of assoc name to a JavaScript array of Nodes."    },
                  "getShortQName": {
                    "!type": "fn(longQName: QName) -\u003e string",
                    "!doc": "\n  Given a long-form QName, this method uses the namespace service to create a\n  short-form QName string.,\n  @param longQName,\n  @return the short form of the QName string, e.g. \\\"cm:content\\\""    },
                  "getFullPermissions": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  @return Array of all permissions applied to this Node, including inherited.\n  Strings returned are of the format [ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION;[INHERITED|DIRECT]\n  for example: ALLOWED;kevinr;Consumer;DIRECT so can be easily tokenized on the \\\u0027;\\\u0027 character."    },
                  "hashCode": {
                    "!type": "fn() -\u003e number"    },
                  "downloadUrl": {
                    "!type": "string",
                    "!doc": "\n  @return For a content document, this method returns the download URL to the content for\n  the default content property (@see ContentModel.PROP_CONTENT)\n  \u003cp\u003e\n  For a container node, this method returns an empty stringnsee method getDownloadUrln"    },
                  "qnamePath": {
                    "!type": "string",
                    "!doc": "\n  @return QName path to this node. This can be used for Lucene PATH: style queriesnsee method getQnamePathn"    },
                  "createFolder": {
                    "!type": "fn(name: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new folder (cm:folder) node as a child of this node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param name Name of the folder to create,\n  @return Newly created Node or null if failed to create."    },
                  "createThumbnail1": {
                    "!original": "createThumbnail",
                    "!type": "fn(thumbnailName: string, async: bool) -\u003e ScriptThumbnail",
                    "!doc": "\n  Creates a thumbnail for the content property of the node.\n  The thumbnail name correspionds to pre-set thumbnail details stored in the \n  repository.\n  If the thumbnail is created asynchronously then the result will be null and creation\n  of the thumbnail will occure at some point in the background.,\n  @param thumbnailName    the name of the thumbnail,\n  @param async            indicates whether the thumbnail is create asynchronously or not,\n  @return ScriptThumbnail  the newly create thumbnail node or null if async creation occures"    },
                  "getDownloadUrl": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return For a content document, this method returns the download URL to the content for\n  the default content property (@see ContentModel.PROP_CONTENT)\n  \u003cp\u003e\n  For a container node, this method returns an empty string"    },
                  "settablePermissions": {
                    "!type": "[string]",
                    "!doc": "\n  @return Array of settable permissions for this Nodensee method getSettablePermissionsn"    },
                  "typeShort": {
                    "!type": "string",
                    "!doc": "\n  @return Returns the type in short format.nsee method getTypeShortn"    },
                  "retrieveAllSetPermissions": {
                    "!type": "fn(direct: bool, full: bool) -\u003e [ScriptNode]",
                    "!doc": "\n  Helper to construct the response object for the various getPermissions() calls.,\n  @param direct    True to only retrieve direct permissions, false to get inherited also,\n  @param full      True to retrieve full data string with [INHERITED|DIRECT] element\n  This exists to maintain backward compatibility with existing permission APIs.,\n  @return Object[] of packed permission strings."    },
                  "isSubType": {
                    "!type": "fn(type: string) -\u003e bool",
                    "!doc": "\n  @param type  The qname type to test this object against (fully qualified or short-name form),\n  @return true if this Node is a sub-type of the specified class (or itself of that class)"    },
                  "checkout1": {
                    "!original": "checkout",
                    "!type": "fn(destination: ScriptNode) -\u003e ScriptNode",
                    "!doc": "\n  Perform a check-out of this document into the specified destination space.,\n  @param destinationDestination for the checked out document working copy Node.,\n  @return the working copy Node for the checked out document"    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return The GUID for the node"    },
                  "copy": {
                    "!type": "fn(destination: ScriptNode) -\u003e ScriptNode",
                    "!doc": "\n  Copy this Node to a new parent destination. Note that children of the source Node are not copied.,\n  @param destination   Node,\n  @return The newly copied Node instance or null if failed to copy."    },
                  "checkin2": {
                    "!original": "checkin",
                    "!type": "fn(history: string, majorVersion: bool) -\u003e ScriptNode",
                    "!doc": "\n  Check-in a working copy document. The current state of the working copy is copied to the original node,\n  this will include any content updated in the working node. Note that this method can only be called on a\n  working copy Node.,\n  @param history       Version history note,\n  @param majorVersion  True to save as a major version increment, false for minor version.,\n  @return the original Node that was checked out."    },
                  "checkin1": {
                    "!original": "checkin",
                    "!type": "fn(history: string) -\u003e ScriptNode",
                    "!doc": "\n  Check-in a working copy document. The current state of the working copy is copied to the original node,\n  this will include any content updated in the working node. Note that this method can only be called on a\n  working copy Node.,\n  @param history    Version history note,\n  @return the original Node that was checked out."    },
                  "parent": {
                    "!type": "ScriptNode",
                    "!doc": "\n  @return the primary parent nodensee method getParentn"    },
                  "getChildAssocsByType": {
                    "!type": "fn(type: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Return an Array of the associations from this Node that match a specific object type.\n  \u003ccode\u003enode.getChildAssocsByType(\\\"cm:folder\\\")[0]\u003c\\/code\u003e,\n  @return Array of child associations from this Node that match a specific object type."    },
                  "content": {
                    "!type": "string",
                    "!doc": "\n  @return the content String for this node from the default content property (@see ContentModel.PROP_CONTENT)nsee method getContentn"    },
                  "checkin": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Check-in a working copy document. The current state of the working copy is copied to the original node,\n  this will include any content updated in the working node. Note that this method can only be called on a\n  working copy Node.,\n  @return the original Node that was checked out."    },
                  "getVersionHistory": {
                    "!type": "fn() -\u003e [ScriptVersion]",
                    "!doc": "\n  Gets the version history,\n  @return  version history"    },
                  "addTag": {
                    "!type": "fn(tag: string)",
                    "!doc": "\n  Adds a tag to the node,\n  @param tag   tag name"    },
                  "checkoutForUpload": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Performs a check-out of this document for the purposes of an upload,\n  @return"    },
                  "fullPermissions": {
                    "!type": "[string]",
                    "!doc": "\n  @return Array of all permissions applied to this Node, including inherited.\n  Strings returned are of the format [ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION;[INHERITED|DIRECT]\n  for example: ALLOWED;kevinr;Consumer;DIRECT so can be easily tokenized on the \\\u0027;\\\u0027 character.nsee method getFullPermissionsn"    },
                  "getTypePropertyNames1": {
                    "!original": "getTypePropertyNames",
                    "!type": "fn(useShortQNames: bool) -\u003e [string]",
                    "!doc": "\n  Return all the property names defined for this node\\\u0027s type as an array.,\n  @param useShortQNames if true short-form qnames will be returned, else long-form.,\n  @return Array of property names for this node\\\u0027s type."    },
                  "sort": {
                    "!type": "fn(nodes: [?])",
                    "!doc": "\n  Performs a locale-sensitive sort by name of a node array,\n  @param nodes the node array"    },
                  "getIcon32": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the large icon image for this node"    },
                  "removeTag": {
                    "!type": "fn(tag: string)",
                    "!doc": "\n  Removes a tag from the node,\n  @param tag   tag name"    },
                  "getDirectPermissions": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  @return Array of permissions applied directly to this Node (does not include inherited).\n  Strings returned are of the format [ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION for example\n  ALLOWED;kevinr;Consumer so can be easily tokenized on the \\\u0027;\\\u0027 character."    },
                  "childAssocs": {
                    "!type": "Map",
                    "!doc": "\n  Return the child associations from this Node. As a Map of assoc name to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means associations of this node can be access thus:\n  \u003ccode\u003enode.childAssocs[\\\"contains\\\"][0]\u003c\\/code\u003e,\n  @return child associations as a Map of assoc name to a JavaScript array of Nodes.nsee method getChildAssocsn"    },
                  "childByNamePath": {
                    "!type": "fn(path: string) -\u003e ScriptNode",
                    "!doc": "\n  childByNamePath returns the Node at the specified \\\u0027cm:name\\\u0027 based Path walking the children of this Node.\n  So a valid call might be:\n  \u003ccode\u003emynode.childByNamePath(\\\"\\/QA\\/Testing\\/Docs\\\");\u003c\\/code\u003e,\n  @return The ScriptNode or null if the node is not found."    },
                  "revert1": {
                    "!original": "revert",
                    "!type": "fn(history: string, majorVersion: bool, versionLabel: string, deep: bool) -\u003e ScriptNode",
                    "!doc": "\n  Revert this Node to the specified version and potentially all child nodes.\n  This node must have the cm:versionable aspect. It will be checked out if required\n  but will be checked in after the call.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param history       Version history note,\n  @param majorVersion  True to save as a major version increment, false for minor version.,\n  @param versionLabel to revert from,\n  @param deep          {@code true} for a deep revert, {@code false} otherwise.,\n  @return the original Node that was checked out if reverted, {@code null} otherwise\n  (if the version does not exist)."    },
                  "getVersion": {
                    "!type": "fn(versionLabel: string) -\u003e ScriptVersion",
                    "!doc": "\n  Gets the version of this node specified by version label,\n  @param versionLabel  version label,\n  @return  version of node, or null if node is not versioned, or label does not exist"    },
                  "getSettablePermissions": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  @return Array of settable permissions for this Node"    },
                  "getAspects": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  @return The array of aspects applied to this node"    },
                  "assocs": {
                    "!type": "Map",
                    "!doc": "\n  Return the target associations from this Node. As a Map of assoc type to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means associations of this node can be access thus:\n  \u003ccode\u003enode.assocs[\\\"translations\\\"][0]\u003c\\/code\u003e,\n  @return target associations as a Map of assoc name to a JavaScript array of Nodes.nsee method getAssocsn"    },
                  "tags": {
                    "!type": "[string]",
                    "!doc": "\n  Get all the tags applied to this node,\n  @return String[]     array containing all the tag applied to this nodensee method getTagsn"    },
                  "primaryParentAssoc": {
                    "!type": "ChildAssociationRef",
                    "!doc": "\n  @return the primary parent association so we can get at the association QName and the association type QName.nsee method getPrimaryParentAssocn"    },
                  "getTypePropertyNames": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  Return all the property names defined for this node\\\u0027s type as an array of short QNames.,\n  @return Array of property names for this node\\\u0027s type."    },
                  "getParentAssociations": {
                    "!type": "fn() -\u003e Map"    },
                  "getActiveWorkflows": {
                    "!type": "fn() -\u003e [JscriptWorkflowInstance]",
                    "!doc": "\n  Get active workflow instances this node belongs to,\n  @return the active workflow instances this node belongs to"    },
                  "isLocked": {
                    "!type": "bool",
                    "!doc": "\n  @return true if the node is currently lockednsee method getIsLockedn"    },
                  "versionHistory": {
                    "!type": "[ScriptVersion]",
                    "!doc": "\n  Gets the version history,\n  @return  version historynsee method getVersionHistoryn"    },
                  "exists": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Checks whether the {@link ScriptNode} exists in the repository.,\n  @return"    },
                  "addTags": {
                    "!type": "fn(tags: [string])",
                    "!doc": "\n  Adds all the tags to the node,\n  @param tags  array of tag names"    },
                  "activeWorkflows": {
                    "!type": "[JscriptWorkflowInstance]",
                    "!doc": "\n  Get active workflow instances this node belongs to,\n  @return the active workflow instances this node belongs tonsee method getActiveWorkflowsn"    },
                  "getChildAssociations": {
                    "!type": "fn() -\u003e Map"    },
                  "createThumbnail": {
                    "!type": "fn(thumbnailName: string) -\u003e ScriptThumbnail",
                    "!doc": "\n  Creates a thumbnail for the content property of the node.\n  The thumbnail name correspionds to pre-set thumbnail details stored in the \n  repository.,\n  @param thumbnailName    the name of the thumbnail,\n  @return ScriptThumbnail  the newly create thumbnail node"    },
                  "isDocument": {
                    "!type": "bool",
                    "!doc": "\n  @return true if this Node is a Document (i.e. with content)nsee method getIsDocumentn"    },
                  "getQNameType": {
                    "!type": "fn() -\u003e QName",
                    "!doc": "\n  @return Returns the QName type."    },
                  "getNodeRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  @return Returns the NodeRef this Node object represents"    },
                  "removeTags": {
                    "!type": "fn(tags: [string])",
                    "!doc": "\n  Removes all the tags from the node,\n  @param tags  array of tag names"    },
                  "processTemplate2": {
                    "!original": "processTemplate",
                    "!type": "fn(template: string) -\u003e string",
                    "!doc": "\n  Process a FreeMarker Template against the current node.,\n  @param template   The template to execute,\n  @return output of the template execution"    },
                  "processTemplate1": {
                    "!original": "processTemplate",
                    "!type": "fn(template: ScriptNode, args: ?) -\u003e string",
                    "!doc": "\n  Process a FreeMarker Template against the current node.,\n  @param template   Node of the template to execute,\n  @param args       Scriptable object (generally an associative array) containing the name\\/value pairs of\n  arguments to be passed to the template,\n  @return output of the template execution"    },
                  "processTemplate3": {
                    "!original": "processTemplate",
                    "!type": "fn(template: string, args: ?) -\u003e string",
                    "!doc": "\n  Process a FreeMarker Template against the current node.,\n  @param template   The template to execute,\n  @param args       Scriptable object (generally an associative array) containing the name\\/value pairs of\n  arguments to be passed to the template,\n  @return output of the template execution"    },
                  "getIcon16": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the small icon image for this node"    },
                  "permissions": {
                    "!type": "[string]",
                    "!doc": "\n  @return Array of permissions applied to this Node, including inherited.\n  Strings returned are of the format [ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION for example\n  ALLOWED;kevinr;Consumer so can be easily tokenized on the \\\u0027;\\\u0027 character.nsee method getPermissionsn"    },
                  "isContainer": {
                    "!type": "bool",
                    "!doc": "\n  @return true if this Node is a container (i.e. a folder)nsee method getIsContainern"    },
                  "getContent": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the content String for this node from the default content property (@see ContentModel.PROP_CONTENT)"    },
                  "childFileFolders2": {
                    "!original": "childFileFolders",
                    "!type": "fn(files: bool, folders: bool, ignoreTypes: ?) -\u003e [ScriptNode]",
                    "!doc": "\n  @param files         Return files extending from cm:content,\n  @param folders       Return folders extending from cm:folder - ignoring sub-types of cm:systemfolder,\n  @param ignoreTypes   Also optionally removes additional type qnames. The additional type can be\n  specified in short or long qname string form as a single string or an Array e.g. \\\"fm:forum\\\".,\n  @return Returns a JavaScript array of child file\\/folder nodes for this nodes.\n  Automatically retrieves all sub-types of cm:content and cm:folder, also removes\n  system folder types from the results.\n  This is equivalent to @see FileFolderService.listFiles() and @see FileFolderService.listFolders()"    },
                  "childFileFolders1": {
                    "!original": "childFileFolders",
                    "!type": "fn(files: bool, folders: bool) -\u003e [ScriptNode]",
                    "!doc": "\n  @param files     Return files extending from cm:content,\n  @param folders   Return folders extending from cm:folder - ignoring sub-types of cm:systemfolder,\n  @return Returns a JavaScript array of child file\\/folder nodes for this nodes.\n  Automatically retrieves all sub-types of cm:content and cm:folder, also removes\n  system folder types from the results.\n  This is equivalent to @see FileFolderService.listFiles() and @see FileFolderService.listFolders()"    },
                  "setOwner": {
                    "!type": "fn(userId: string)",
                    "!doc": "\n  Set the owner of the node"    },
                  "getIsVersioned": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Determines if this node is versioned,\n  @return  true \u003d\u003e is versioned"    },
                  "childFileFolders4": {
                    "!original": "childFileFolders",
                    "!type": "fn(files: bool, folders: bool, ignoreTypes: ?, skipOffset: number, maxItems: number, requestTotalCountMax: number, sortProp: string, sortAsc: bool, queryExecutionId: string) -\u003e ScriptPagingNodes"    },
                  "childFileFolders3": {
                    "!original": "childFileFolders",
                    "!type": "fn(files: bool, folders: bool, ignoreTypes: ?, maxItems: number) -\u003e ScriptPagingNodes",
                    "!doc": "\n  @param files         Return files extending from cm:content,\n  @param folders       Return folders extending from cm:folder - ignoring sub-types of cm:systemfolder,\n  @param ignoreTypes   Also optionally removes additional type qnames. The additional type can be\n  specified in short or long qname string form as a single string or an Array e.g. \\\"fm:forum\\\".,\n  @param maxItems      Max number of items,\n  @return Returns ScriptPagingNodes which includes a JavaScript array of child file\\/folder nodes for this nodes.\n  Automatically retrieves all sub-types of cm:content and cm:folder, also removes\n  system folder types from the results.\n  This is equivalent to @see FileFolderService.listFiles() and @see FileFolderService.listFolders(),\n  @deprecated API for review (subject to change prior to release),\n  @author janv,\n  @since 4.0"    },
                  "typePropertyNames": {
                    "!type": "[string]",
                    "!doc": "\n  Return all the property names defined for this node\\\u0027s type as an array of short QNames.,\n  @return Array of property names for this node\\\u0027s type.nsee method getTypePropertyNamesn"    },
                  "url": {
                    "!type": "string",
                    "!doc": "\n  @return For a content document, this method returns the URL to the content stream for the default content\n  property (@see ContentModel.PROP_CONTENT)\n  \u003cp\u003e\n  For a container node, this method return the URL to browse to the folder in the web-clientnsee method getUrln"    },
                  "size": {
                    "!type": "number",
                    "!doc": "\n  @return The size in bytes of the content attached to the node from the default content property\n  (@see ContentModel.PROP_CONTENT)nsee method getSizen"    },
                  "QNameType": {
                    "!type": "QName",
                    "!doc": "\n  @return Returns the QName type.nsee method getQNameTypen"    },
                  "setInheritsPermissions": {
                    "!type": "fn(inherit: bool)",
                    "!doc": "\n  Set whether this node should inherit permissions from the parent node.,\n  @param inherit True to inherit parent permissions, false otherwise."    },
                  "parentAssocs": {
                    "!type": "Map",
                    "!doc": "\n  Return the parent associations to this Node. As a Map of assoc name to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means associations of this node can be access thus:\n  \u003ccode\u003enode.parentAssocs[\\\"contains\\\"][0]\u003c\\/code\u003e,\n  @return parent associations as a Map of assoc name to a JavaScript array of Nodes.nsee method getParentAssocsn"    },
                  "aspectsSet": {
                    "!type": "Set",
                    "!doc": "\n  @return The list of aspects applied to this nodensee method getAspectsSetn"    },
                  "setName": {
                    "!type": "fn(name: string)",
                    "!doc": "\n  Helper to set the \\\u0027name\\\u0027 property for the node.,\n  @param name Name to set"    },
                  "isLinkToDocument": {
                    "!type": "bool",
                    "!doc": "\n  @return true if this Node is a Link to a Document (i.e. a filelink)nsee method getIsLinkToDocumentn"    },
                  "storeId": {
                    "!type": "string",
                    "!doc": "\n  @return the store id for the nodensee method getStoreIdn"    },
                  "move1": {
                    "!original": "move",
                    "!type": "fn(source: ScriptNode, destination: ScriptNode) -\u003e bool",
                    "!doc": "\n  Move this Node from specified parent to a new parent destination.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param source Node,\n  @param destination Node,\n  @return true on successful move, false on failure to move."    },
                  "jsGet_downloadUrl": {
                    "!type": "fn() -\u003e string"    },
                  "thumbnailDefinitions": {
                    "!type": "[string]",
                    "!doc": "\n  Returns the names of the thumbnail defintions that can be applied to the content property of\n  this node.\n  \u003cp\u003e\n  Thumbanil defintions only appear in this list if they can produce a thumbnail for the content\n  found in the content property.  This will be determined by looking at the mimetype of the content\n  and the destinatino mimetype of the thumbnail.,\n  @return  String[]    array of thumbnail names that are valid for the current content typensee method getThumbnailDefinitionsn"    },
                  "thumbnailDefintions": {
                    "!type": "[string]",
                    "!doc": "\n  This version of the method name spelling is retained (for now) for backwards compatibility,\n  @see #getThumbnailDefinitions()nsee method getThumbnailDefintionsn"    },
                  "children": {
                    "!type": "[ScriptNode]",
                    "!doc": "\n  @return The children of this Node as JavaScript array of Node object wrappersnsee method getChildrenn"    },
                  "getDisplayPath": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Display path to this node"    },
                  "getType": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Returns the type."    },
                  "isTagScope": {
                    "!type": "bool",
                    "!doc": "\n  Gets whether this node is a tag scope,\n  @return  boolean     true if this node is a tag scope, false otherwisensee method getIsTagScopen"    },
                  "transformImage": {
                    "!type": "fn(mimetype: string) -\u003e ScriptNode",
                    "!doc": "\n  Transform an image to a new image format. A copy of the image document is made and the extension changed to\n  match the new mimetype, then the transformation is applied.,\n  @param mimetype   Mimetype destination for the transformation,\n  @return Node representing the newly transformed image."    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  @return Helper to return the \\\u0027name\\\u0027 property for the nodensee method getNamen"    },
                  "transformImage1": {
                    "!original": "transformImage",
                    "!type": "fn(mimetype: string, options: string) -\u003e ScriptNode",
                    "!doc": "\n  Transform an image to a new image format. A copy of the image document is made and the extension changed to\n  match the new mimetype, then the transformation is applied.,\n  @param mimetype   Mimetype destination for the transformation,\n  @param options    Image convert command options,\n  @return Node representing the newly transformed image."    },
                  "transformImage2": {
                    "!original": "transformImage",
                    "!type": "fn(mimetype: string, destination: ScriptNode) -\u003e ScriptNode",
                    "!doc": "\n  Transform an image to a new image mimetype format. A copy of the image document is made in the specified\n  destination folder and the extension changed to match the newmimetype, then then transformation is applied.,\n  @param mimetype      Mimetype destination for the transformation,\n  @param destination   Destination folder location,\n  @return Node representing the newly transformed image."    },
                  "cancelCheckout": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Cancel the check-out of a working copy document. The working copy will be deleted and any changes made to it\n  are lost. Note that this method can only be called on a working copy Node. The reference to this working copy\n  Node should be discarded.,\n  @return the original Node that was checked out."    },
                  "removeAspect": {
                    "!type": "fn(type: string) -\u003e bool",
                    "!doc": "\n  Remove aspect from the node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param type  the aspect type,\n  @return      true if successful, false otherwise"    },
                  "transformImage3": {
                    "!original": "transformImage",
                    "!type": "fn(mimetype: string, options: string, destination: ScriptNode) -\u003e ScriptNode",
                    "!doc": "\n  Transform an image to a new image mimetype format. A copy of the image document is made in the specified\n  destination folder and the extension changed to match the new\n  mimetype, then then transformation is applied.,\n  @param mimetype      Mimetype destination for the transformation,\n  @param options       Image convert command options,\n  @param destination   Destination folder location,\n  @return Node representing the newly transformed image."    },
                  "removeAssociation": {
                    "!type": "fn(target: ScriptNode, assocType: string)",
                    "!doc": "\n  Remove an association between this node and the specified target node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param target        Destination node on the end of the association,\n  @param assocType     Association type qname (short form or fully qualified)"    },
                  "setContent": {
                    "!type": "fn(content: string)",
                    "!doc": "\n  Set the content for this node,\n  @param content    Content string to set"    },
                  "childrenByXPath": {
                    "!type": "fn(xpath: string) -\u003e [ScriptNode]",
                    "!doc": "\n  @return Returns a JavaScript array of Nodes at the specified XPath starting at this Node.\n  So a valid call might be \u003ccode\u003emynode.childrenByXPath(\\\"[@cm:name\u003d\\\u0027Testing\\\u0027]\\/\\\");\u003c\\/code\u003e"    },
                  "getStoreType": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the store type for the node"    },
                  "directPermissions": {
                    "!type": "[string]",
                    "!doc": "\n  @return Array of permissions applied directly to this Node (does not include inherited).\n  Strings returned are of the format [ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION for example\n  ALLOWED;kevinr;Consumer so can be easily tokenized on the \\\u0027;\\\u0027 character.nsee method getDirectPermissionsn"    },
                  "transformDocument1": {
                    "!original": "transformDocument",
                    "!type": "fn(mimetype: string, destination: ScriptNode) -\u003e ScriptNode",
                    "!doc": "\n  Transform a document to a new document mimetype format. A copy of the document is made in the specified\n  destination folder and the extension changed to match the new mimetype, then then transformation is applied.,\n  @param mimetype      Mimetype destination for the transformation,\n  @param destination   Destination folder location,\n  @return Node representing the newly transformed document."    },
                  "getIsLinkToContainer": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if this Node is a Link to a Container (i.e. a folderlink)"    },
                  "toJSON": {
                    "!type": "fn(useShortQNames: bool) -\u003e string",
                    "!doc": "\n  Returns the JSON representation of this node.,\n  @param useShortQNames if true short-form qnames will be returned, else long-form.,\n  @return The JSON representation of this node"    },
                  "addAspect": {
                    "!type": "fn(type: string) -\u003e bool",
                    "!doc": "\n  Add an aspect to the Node. As no properties are provided in this call, it can only be used to add aspects that do not require any mandatory properties.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param type    Type name of the aspect to add,\n  @return true if the aspect was added successfully, false if an error occured."    },
                  "setIsTagScope": {
                    "!type": "fn(value: bool)",
                    "!doc": "\n  Sets whether this node is a tag scope or not,\n  @param value     true if this node is a tag scope, false otherwise"    },
                  "getPermissions": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  @return Array of permissions applied to this Node, including inherited.\n  Strings returned are of the format [ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION for example\n  ALLOWED;kevinr;Consumer so can be easily tokenized on the \\\u0027;\\\u0027 character."    },
                  "getParentAssocs": {
                    "!type": "fn() -\u003e Map",
                    "!doc": "\n  Return the parent associations to this Node. As a Map of assoc name to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means associations of this node can be access thus:\n  \u003ccode\u003enode.parentAssocs[\\\"contains\\\"][0]\u003c\\/code\u003e,\n  @return parent associations as a Map of assoc name to a JavaScript array of Nodes."    },
                  "getSourceAssociations": {
                    "!type": "fn() -\u003e Map"    },
                  "reset": {
                    "!type": "fn()",
                    "!doc": "\n  Reset the Node cached state"    },
                  "createNode1": {
                    "!original": "createNode",
                    "!type": "fn(name: string, type: string, assocType: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new Node of the specified type as a child of this node.,\n  @param name Name of the node to create (can be null for a node without a \\\u0027cm:name\\\u0027 property),\n  @param type QName type (fully qualified or short form such as \\\u0027cm:content\\\u0027),\n  @param assocType QName of the child association type (fully qualified or short form e.g. \\\u0027cm:contains\\\u0027),\n  @return Newly created Node or null if failed to create."    },
                  "createNode4": {
                    "!original": "createNode",
                    "!type": "fn(name: string, type: string, properties: ?, assocType: string, assocName: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new Node of the specified type as a child of this node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param name Name of the node to create (can be null for a node without a \\\u0027cm:name\\\u0027 property),\n  @param type QName type (fully qualified or short form such as \\\u0027cm:content\\\u0027),\n  @param properties Associative array of the default properties for the node.,\n  @param assocType QName of the child association type (fully qualified or short form e.g. \\\u0027cm:contains\\\u0027),\n  @param assocName QName of the child association name (fully qualified or short form e.g. \\\u0027fm:discussion\\\u0027),\n  @return Newly created Node or null if failed to create."    },
                  "createNode2": {
                    "!original": "createNode",
                    "!type": "fn(name: string, type: string, properties: ?) -\u003e ScriptNode",
                    "!doc": "\n  Create a new Node of the specified type as a child of this node.,\n  @param name Name of the node to create (can be null for a node without a \\\u0027cm:name\\\u0027 property),\n  @param type QName type (fully qualified or short form such as \\\u0027cm:content\\\u0027),\n  @param properties Associative array of the default properties for the node.,\n  @return Newly created Node or null if failed to create."    },
                  "move": {
                    "!type": "fn(destination: ScriptNode) -\u003e bool",
                    "!doc": "\n  Move this Node to a new parent destination.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param destination   Node,\n  @return true on successful move, false on failure to move."    },
                  "setMimetype": {
                    "!type": "fn(mimetype: string)",
                    "!doc": "\n  Set the mimetype encoding for the content attached to the node from the default content property\n  (@see ContentModel.PROP_CONTENT),\n  @param mimetype   Mimetype to set"    },
                  "createNode3": {
                    "!original": "createNode",
                    "!type": "fn(name: string, type: string, properties: ?, assocType: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new Node of the specified type as a child of this node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param name Name of the node to create (can be null for a node without a \\\u0027cm:name\\\u0027 property),\n  @param type QName type (fully qualified or short form such as \\\u0027cm:content\\\u0027),\n  @param properties Associative array of the default properties for the node.,\n  @param assocType QName of the child association type (fully qualified or short form e.g. \\\u0027cm:contains\\\u0027),\n  @return Newly created Node or null if failed to create."    },
                  "unlock": {
                    "!type": "fn()",
                    "!doc": "\n  Removes the lock on a node."    },
                  "isVersioned": {
                    "!type": "bool",
                    "!doc": "\n  Determines if this node is versioned,\n  @return  true \u003d\u003e is versionednsee method getIsVersionedn"    },
                  "getParent": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  @return the primary parent node"    },
                  "equals": {
                    "!type": "fn(obj: ?) -\u003e bool"    },
                  "getStoreId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the store id for the node"    },
                  "toJSON1": {
                    "!original": "toJSON",
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the JSON representation of this node. Long-form QNames are used in the\n  result.,\n  @return The JSON representation of this node"    },
                  "sourceAssociations": {
                    "!type": "Map",
                    "!doc": "nullnsee method getSourceAssociationsn"    },
                  "getProperties": {
                    "!type": "fn() -\u003e Properties.prototype",
                    "!doc": "\n  Return all the properties known about this node. The Map returned implements the Scriptable interface to\n  allow access to the properties via JavaScript associative array access. This means properties of a node can\n  be access thus: \u003ccode\u003enode.properties[\\\"name\\\"]\u003c\\/code\u003e,\n  @return Map of properties for this Node."    },
                  "getTypeShort": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Returns the type in short format."    },
                  "createFile1": {
                    "!original": "createFile",
                    "!type": "fn(name: string, type: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new File (cm:content) node as a child of this node.\n  \u003cp\u003e\n  Once created the file should have content set using the \u003ccode\u003econtent\u003c\\/code\u003e property.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param name Name of the file to create,\n  @param type Type of the file to create (if null, defaults to ContentModel.TYPE_CONTENT) ,\n  @return Newly created Node or null if failed to create."    },
                  "getThumbnailDefinitions": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  Returns the names of the thumbnail defintions that can be applied to the content property of\n  this node.\n  \u003cp\u003e\n  Thumbanil defintions only appear in this list if they can produce a thumbnail for the content\n  found in the content property.  This will be determined by looking at the mimetype of the content\n  and the destinatino mimetype of the thumbnail.,\n  @return  String[]    array of thumbnail names that are valid for the current content type"    },
                  "addNode": {
                    "!type": "fn(node: ScriptNode)",
                    "!doc": "\n  Creates a new secondary association between the current node and the specified child node.   \n  The association is given the same name as the child node\\\u0027s primary association.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param node  node to add as a child of this node"    },
                  "associations": {
                    "!type": "Map",
                    "!doc": "nullnsee method getAssociationsn"    },
                  "storeType": {
                    "!type": "string",
                    "!doc": "\n  @return the store type for the nodensee method getStoreTypen"    },
                  "remove": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Remove this node. Any references to this Node or its NodeRef should be discarded!\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first."    },
                  "getSiteShortName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the short name of the site this node is located within. If the \n  node is not located within a site null is returned.,\n  @return The short name of the site this node is located within, null\n  if the node is not located within a site."    },
                  "inheritsPermissions": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if the node inherits permissions from the parent node, false otherwise"    },
                  "aspects": {
                    "!type": "[string]",
                    "!doc": "\n  @return The array of aspects applied to this nodensee method getAspectsn"    },
                  "clearTags": {
                    "!type": "fn()",
                    "!doc": "\n  Clear the node\\\u0027s tags"    },
                  "ensureVersioningEnabled": {
                    "!type": "fn(autoVersion: bool, autoVersionProps: bool)",
                    "!doc": "\n  Ensures that this document has the cm:versionable aspect applied to it,\n  and that it has the initial version in the version store.\n  Calling this on a versioned node with a version store entry will have \n  no effect.\n  Calling this on a newly uploaded share node will have versioning enabled\n  for it (Share currently does lazy versioning to improve performance of\n  documents that are uploaded but never edited, and multi upload performance).,\n  @param autoVersion If the cm:versionable aspect is applied, should auto versioning be requested?,\n  @param autoVersionProps If the cm:versionable aspect is applied, should auto versioning of properties be requested?"    },
                  "getParents": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  @return all parent nodes"    },
                  "createFolder1": {
                    "!original": "createFolder",
                    "!type": "fn(name: string, type: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new folder (cm:folder) node as a child of this node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param name Name of the folder to create,\n  @param type Type of the folder to create (if null, defaults to ContentModel.TYPE_FOLDER),\n  @return Newly created Node or null if failed to create."    },
                  "revert": {
                    "!type": "fn(history: string, majorVersion: bool, versionLabel: string) -\u003e ScriptNode",
                    "!doc": "\n  Revert this Node to the specified version. Note this is not a deep revert of\n  associations.\n  This node must have the cm:versionable aspect. It will be checked out if required\n  but will be checked in after the call.,\n  @param versionLabel to revert from,\n  @return the original Node that was checked out if reverted, {@code null} otherwise\n  (if the version does not exist)."    },
                  "setPermission": {
                    "!type": "fn(permission: string)",
                    "!doc": "\n  Apply a permission for ALL users to the node.,\n  @param permission Permission to apply,\n  @see org.alfresco.service.cmr.security.PermissionService"    },
                  "hasAspect": {
                    "!type": "fn(aspect: string) -\u003e bool",
                    "!doc": "\n  @param aspect  The aspect name to test for (fully qualified or short-name form),\n  @return true if the node has the aspect false otherwise"    },
                  "getPropertyNames": {
                    "!type": "fn(useShortQNames: bool) -\u003e [string]",
                    "!doc": "\n  Return all the property names defined for this node as an array.,\n  @param useShortQNames if true short-form qnames will be returned, else long-form.,\n  @return Array of property names for this node type and optionally parent properties."    },
                  "getMimetype": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return The mimetype encoding for content attached to the node from the default content property\n  (@see ContentModel.PROP_CONTENT)"    },
                  "createAssociation": {
                    "!type": "fn(target: ScriptNode, assocType: string) -\u003e Association",
                    "!doc": "\n  Create an association between this node and the specified target node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param target        Destination node for the association,\n  @param assocType     Association type qname (short form or fully qualified)"    },
                  "isCategory": {
                    "!type": "bool",
                    "!doc": "\n  @return true if the Node is a Categorynsee method getIsCategoryn"    },
                  "sourceAssocs": {
                    "!type": "Map",
                    "!doc": "\n  Return the source associations to this Node. As a Map of assoc name to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means source associations to this node can be access thus:\n  \u003ccode\u003enode.sourceAssocs[\\\"translations\\\"][0]\u003c\\/code\u003e,\n  @return source associations as a Map of assoc name to a JavaScript array of Nodes.nsee method getSourceAssocsn"    },
                  "transformDocument": {
                    "!type": "fn(mimetype: string) -\u003e ScriptNode",
                    "!doc": "\n  Transform a document to a new document mimetype format. A copy of the document is made and the extension\n  changed to match the new mimetype, then the transformation isapplied.,\n  @param mimetype   Mimetype destination for the transformation,\n  @return Node representing the newly transformed document."    },
                  "getAssocs": {
                    "!type": "fn() -\u003e Map",
                    "!doc": "\n  Return the target associations from this Node. As a Map of assoc type to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means associations of this node can be access thus:\n  \u003ccode\u003enode.assocs[\\\"translations\\\"][0]\u003c\\/code\u003e,\n  @return target associations as a Map of assoc name to a JavaScript array of Nodes."    },
                  "icon16": {
                    "!type": "string",
                    "!doc": "\n  @return the small icon image for this nodensee method getIcon16n"    },
                  "processTemplate": {
                    "!type": "fn(template: ScriptNode) -\u003e string",
                    "!doc": "\n  Process a FreeMarker Template against the current node.,\n  @param template      Node of the template to execute,\n  @return output of the template execution"    },
                  "getAspectsSet": {
                    "!type": "fn() -\u003e Set",
                    "!doc": "\n  @return The list of aspects applied to this node"    },
                  "getHasChildren": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if the Node has children"    },
                  "parentAssociations": {
                    "!type": "Map",
                    "!doc": "nullnsee method getParentAssociationsn"    },
                  "removePermission1": {
                    "!original": "removePermission",
                    "!type": "fn(permission: string, authority: string)",
                    "!doc": "\n  Remove a permission for the specified authority (e.g. username or group) from the node.,\n  @param permission Permission to remove @see org.alfresco.service.cmr.security.PermissionService,\n  @param authority  Authority (generally a username or group name) to apply the permission for"    },
                  "isScriptContent": {
                    "!type": "fn(o: ?) -\u003e bool",
                    "!doc": "\n  Helper to return true if the supplied property value is a ScriptContentData object,\n  @param o     Object to test,\n  @return true if instanceof ScriptContentData, false otherwise"    },
                  "getIsCategory": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if the Node is a Category"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Helper to return the \\\u0027name\\\u0027 property for the node"    },
                  "specializeType": {
                    "!type": "fn(type: string) -\u003e bool",
                    "!doc": "\n  Re-sets the type of the node. Can be called in order specialise a node to a sub-type. This should be used\n  with caution since calling it changes the type of the node and thus implies a different set of aspects,\n  properties and associations. It is the responsibility of the caller to ensure that the node is in a\n  approriate state after changing the type.,\n  @param type Type to specialize the node,\n  @return true if successful, false otherwise"    },
                  "hasPermission": {
                    "!type": "fn(permission: string) -\u003e bool",
                    "!doc": "\n  Return true if the user has the specified permission on the node.\n  \u003cp\u003e\n  The default permissions are found in \u003ccode\u003eorg.alfresco.service.cmr.security.PermissionService\u003c\\/code\u003e.\n  Most commonly used are \\\"Write\\\", \\\"Delete\\\" and \\\"AddChildren\\\".,\n  @param permission as found in \u003ccode\u003eorg.alfresco.service.cmr.security.PermissionService\u003c\\/code\u003e,\n  @return true if the user has the specified permission on the node."    },
                  "save": {
                    "!type": "fn()",
                    "!doc": "\n  Persist the modified properties of this Node."    },
                  "getWebdavUrl": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return The WebDav cm:name based path to the content for the default content property\n  (@see ContentModel.PROP_CONTENT)"    },
                  "getChildren": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  @return The children of this Node as JavaScript array of Node object wrappers"    },
                  "isLinkToContainer": {
                    "!type": "bool",
                    "!doc": "\n  @return true if this Node is a Link to a Container (i.e. a folderlink)nsee method getIsLinkToContainern"    },
                  "type": {
                    "!type": "string",
                    "!doc": "\n  @return Returns the type.nsee method getTypen"    },
                  "createFile": {
                    "!type": "fn(name: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new File (cm:content) node as a child of this node.\n  \u003cp\u003e\n  Once created the file should have content set using the \u003ccode\u003econtent\u003c\\/code\u003e property.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param name Name of the file to create,\n  @return Newly created Node or null if failed to create."    },
                  "getTags": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  Get all the tags applied to this node,\n  @return String[]     array containing all the tag applied to this node"    },
                  "mimetype": {
                    "!type": "string",
                    "!doc": "\n  @return The mimetype encoding for content attached to the node from the default content property\n  (@see ContentModel.PROP_CONTENT)nsee method getMimetypen"    },
                  "getIsTagScope": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Gets whether this node is a tag scope,\n  @return  boolean     true if this node is a tag scope, false otherwise"    },
                  "getSize": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  @return The size in bytes of the content attached to the node from the default content property\n  (@see ContentModel.PROP_CONTENT)"    },
                  "displayPath": {
                    "!type": "string",
                    "!doc": "\n  @return Display path to this nodensee method getDisplayPathn"    },
                  "properties": {
                    "!type": "Properties.prototype",
                    "!doc": "\n  Return all the properties known about this node. The Map returned implements the Scriptable interface to\n  allow access to the properties via JavaScript associative array access. This means properties of a node can\n  be access thus: \u003ccode\u003enode.properties[\\\"name\\\"]\u003c\\/code\u003e,\n  @return Map of properties for this Node.nsee method getPropertiesn"    },
                  "icon32": {
                    "!type": "string",
                    "!doc": "\n  @return the large icon image for this nodensee method getIcon32n"    },
                  "getQnamePath": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return QName path to this node. This can be used for Lucene PATH: style queries"    },
                  "takeOwnership": {
                    "!type": "fn()",
                    "!doc": "\n  Take ownership of the node."    },
                  "owner": {
                    "!type": "string",
                    "!doc": "\n  Get the owner of the node.,\n  @returnnsee method getOwnern"    },
                  "toString": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Override Object.toString() to provide useful debug output"    },
                  "webdavUrl": {
                    "!type": "string",
                    "!doc": "\n  @return The WebDav cm:name based path to the content for the default content property\n  (@see ContentModel.PROP_CONTENT)nsee method getWebdavUrln"    },
                  "getIsDocument": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if this Node is a Document (i.e. with content)"    },
                  "getChildAssocs": {
                    "!type": "fn() -\u003e Map",
                    "!doc": "\n  Return the child associations from this Node. As a Map of assoc name to a JavaScript array of Nodes.\n  The Map returned implements the Scriptable interface to allow access to the assoc arrays via JavaScript\n  associative array access. This means associations of this node can be access thus:\n  \u003ccode\u003enode.childAssocs[\\\"contains\\\"][0]\u003c\\/code\u003e,\n  @return child associations as a Map of assoc name to a JavaScript array of Nodes."    },
                  "checkout": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Perform a check-out of this document into the current parent space.,\n  @return the working copy Node for the checked out document"    },
                  "childFileFolders": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  @return Returns a JavaScript array of child file\\/folder nodes for this nodes.\n  Automatically retrieves all sub-types of cm:content and cm:folder, also removes\n  system folder types from the results.\n  This is equivalent to @see FileFolderService.list()"    },
                  "siteShortName": {
                    "!type": "string",
                    "!doc": "\n  Returns the short name of the site this node is located within. If the \n  node is not located within a site null is returned.,\n  @return The short name of the site this node is located within, null\n  if the node is not located within a site.nsee method getSiteShortNamen"    },
                  "getTagScope": {
                    "!type": "fn() -\u003e TagScope",
                    "!doc": "\n  Gets the \\\u0027nearest\\\u0027 tag scope to this node by travesing up the parent hierarchy untill one is found.\n  \u003cp\u003e\n  If none is found, null is returned.,\n  @return  TagScope    the \\\u0027nearest\\\u0027 tag scope"    },
                  "parents": {
                    "!type": "[ScriptNode]",
                    "!doc": "\n  @return all parent nodesnsee method getParentsn"    },
                  "hasChildren": {
                    "!type": "bool",
                    "!doc": "\n  @return true if the Node has childrennsee method getHasChildrenn"    },
                  "getPrimaryParentAssoc": {
                    "!type": "fn() -\u003e ChildAssociationRef",
                    "!doc": "\n  @return the primary parent association so we can get at the association QName and the association type QName."    },
                  "getAssociations": {
                    "!type": "fn() -\u003e Map"    },
                  "getThumbnails": {
                    "!type": "fn() -\u003e [ScriptThumbnail]",
                    "!doc": "\n  Get the all the thumbnails for a given node\\\u0027s content property.,\n  @return  Scriptable     list of thumbnails, empty if none available"    },
                  "getIsLinkToDocument": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if this Node is a Link to a Document (i.e. a filelink)"    },
                  "id": {
                    "!type": "string",
                    "!doc": "\n  @return The GUID for the nodensee method getIdn"    },
                  "removePermission": {
                    "!type": "fn(permission: string)",
                    "!doc": "\n  Remove a permission for ALL user from the node.,\n  @param permission Permission to remove @see org.alfresco.service.cmr.security.PermissionService"    },
                  "addAspect1": {
                    "!original": "addAspect",
                    "!type": "fn(type: string, props: ?) -\u003e bool",
                    "!doc": "\n  Add an aspect to the Node.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param type    Type name of the aspect to add,\n  @param props   ScriptableObject (generally an assocative array) providing the named properties for the aspect\n  - any mandatory properties for the aspect must be provided!,\n  @return true if the aspect was added successfully, false if an error occured."    },
                  "removeNode": {
                    "!type": "fn(node: ScriptNode)",
                    "!doc": "\n  Remove an existing child node of this node.\n  Severs all parent-child relationships between two nodes.\n  \u003cp\u003e\n  The child node will be cascade deleted if one of the associations was the\n  primary association, i.e. the one with which the child node was created.\n  Beware: Any unsaved property changes will be lost when this is called.  To preserve property changes call {@link save()} first.,\n  @param node  child node to remove"    },
                  "createVersion": {
                    "!type": "fn(history: string, majorVersion: bool) -\u003e ScriptVersion",
                    "!doc": "\n  Create a version of this document.  Note: this will add the cm:versionable aspect.,\n  @param history       Version history note,\n  @param majorVersion  True to save as a major version increment, false for minor version.,\n  @return ScriptVersion object representing the newly added version node"    },
                  "nodeRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  @return Returns the NodeRef this Node object representsnsee method getNodeRefn"    },
                  "setTags": {
                    "!type": "fn(tags: [string])",
                    "!doc": "\n  Set the tags applied to this node.  This overwirtes the list of tags currently applied to the \n  node.,\n  @param tags  array of tags"    },
                  "childAssociations": {
                    "!type": "Map",
                    "!doc": "nullnsee method getChildAssociationsn"    },
                  "copy1": {
                    "!original": "copy",
                    "!type": "fn(destination: ScriptNode, deepCopy: bool) -\u003e ScriptNode",
                    "!doc": "\n  Copy this Node and potentially all child nodes to a new parent destination.,\n  @param destination   Node,\n  @param deepCopy      True for a deep copy, false otherwise.,\n  @return The newly copied Node instance or null if failed to copy."    },
                  "getIsContainer": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if this Node is a container (i.e. a folder)"    },
                  "thumbnails": {
                    "!type": "[ScriptThumbnail]",
                    "!doc": "\n  Get the all the thumbnails for a given node\\\u0027s content property.,\n  @return  Scriptable     list of thumbnails, empty if none availablensee method getThumbnailsn"    },
                  "getThumbnailDefintions": {
                    "!type": "fn() -\u003e [string]",
                    "!doc": "\n  This version of the method name spelling is retained (for now) for backwards compatibility,\n  @see #getThumbnailDefinitions()"    },
                  "getThumbnail": {
                    "!type": "fn(thumbnailName: string) -\u003e ScriptThumbnail",
                    "!doc": "\n  Get the given thumbnail for the content property,\n  @param thumbnailName     the thumbnail name,\n  @return ScriptThumbnail  the thumbnail"    },
                  "tagScope": {
                    "!type": "TagScope",
                    "!doc": "\n  Gets the \\\u0027nearest\\\u0027 tag scope to this node by travesing up the parent hierarchy untill one is found.\n  \u003cp\u003e\n  If none is found, null is returned.,\n  @return  TagScope    the \\\u0027nearest\\\u0027 tag scopensee method getTagScopen"    },
                  "setPermission1": {
                    "!original": "setPermission",
                    "!type": "fn(permission: string, authority: string)",
                    "!doc": "\n  Apply a permission for the specified authority (e.g. username or group) to the node.,\n  @param permission Permission to apply @see org.alfresco.service.cmr.security.PermissionService,\n  @param authority Authority (generally a username or group name) to apply the permission for"    },
                  "getUrl": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return For a content document, this method returns the URL to the content stream for the default content\n  property (@see ContentModel.PROP_CONTENT)\n  \u003cp\u003e\n  For a container node, this method return the URL to browse to the folder in the web-client"    },
                  "createNode": {
                    "!type": "fn(name: string, type: string) -\u003e ScriptNode",
                    "!doc": "\n  Create a new Node of the specified type as a child of this node.,\n  @param name Name of the node to create (can be null for a node without a \\\u0027cm:name\\\u0027 property),\n  @param type QName type (fully qualified or short form such as \\\u0027cm:content\\\u0027),\n  @return Newly created Node or null if failed to create."    },
                  "createQName": {
                    "!type": "fn(s: string) -\u003e QName",
                    "!doc": "\n  Helper to create a QName from either a fully qualified or short-name QName string,\n  @param s    Fully qualified or short-name QName string,\n  @return QName"    },
                  "getIsLocked": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if the node is currently locked"    },
                  "childrenByTags": {
                    "!type": "fn(tag: string) -\u003e [ScriptNode]",
                    "!doc": "\n  Gets all (deep) children of this node that have the tag specified.,\n  @param tag               tag name,\n  @return ScriptNode[]     nodes that are deep children of the node with the tag"    }
                },
                "ScriptExecutionDetails": {
                  "!doc": "\n  ExecutionDetails JavaScript Object. This class is a JavaScript-friendly wrapper for\n  the {@link ExecutionDetails} (and embeded {@link ExecutionSummary}) class.,\n  @author Nick Burch,\n  @see org.alfresco.service.cmr.action.ExecutionDetails\nsee class org.alfresco.repo.action.script.ScriptExecutionDetails",
                  "getRunningOn": {
                    "!type": "fn() -\u003e string"    },
                  "persistedActionRef": {
                    "!type": "ScriptNode",
                    "!doc": "nullnsee method getPersistedActionRefn"    },
                  "getPersistedActionRef": {
                    "!type": "fn() -\u003e ScriptNode"    },
                  "isCancelRequested": {
                    "!type": "fn() -\u003e bool"    },
                  "startedAt": {
                    "!type": "?",
                    "!doc": "nullnsee method getStartedAtn"    },
                  "getExecutionInstance": {
                    "!type": "fn() -\u003e number"    },
                  "actionType": {
                    "!type": "string",
                    "!doc": "nullnsee method getActionTypen"    },
                  "runningOn": {
                    "!type": "string",
                    "!doc": "nullnsee method getRunningOnn"    },
                  "executionInstance": {
                    "!type": "number",
                    "!doc": "nullnsee method getExecutionInstancen"    },
                  "getActionId": {
                    "!type": "fn() -\u003e string"    },
                  "getStartedAt": {
                    "!type": "fn() -\u003e ?"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "getActionType": {
                    "!type": "fn() -\u003e string"    },
                  "actionId": {
                    "!type": "string",
                    "!doc": "nullnsee method getActionIdn"    }
                },
                "ScriptPagingDetails": {
                  "!doc": "\n  A simple paging details wrapper, to hold things like the \n  skip count, max items and total items. This is typically\n  used with Scripts and WebScripts, and feeds into the\n  Repository level paging support.\n  This class is typically used with {@link ModelUtil}.\n  Note that {@link org.alfresco.repo.web.paging.Paging}provides an alternate solution for other paging\n  use cases.\n  TODO Set a value for {@link #setRequestTotalCountMax(int)}\nsee class org.alfresco.util.ScriptPagingDetails",
                  "setQueryExecutionId": {
                    "!type": "fn(queryExecutionId: string)"    },
                  "getTotalItems": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Get the total number of items. See {@link #getConfidence()} for an idea \n  of the accuracy\\/confidence on this value."    },
                  "setMaxItems": {
                    "!type": "fn(maxItems: number)"    },
                  "setTotalItems": {
                    "!type": "fn(totalItems: number)",
                    "!doc": "\n  Records the total number of items that were found. If the value is -1,\n  then the confidence is set to {@link ItemsSizeConfidence#UNKNOWN}, otherwise\n  the confidence is {@link ItemsSizeConfidence#EXACT},\n  @param totalItems The total number of items the search found"    },
                  "totalItems": {
                    "!type": "number",
                    "!doc": "\n  Get the total number of items. See {@link #getConfidence()} for an idea \n  of the accuracy\\/confidence on this value.nsee method getTotalItemsn"    },
                  "setSkipCount": {
                    "!type": "fn(skipCount: number)"    },
                  "totalItemsRangeMax": {
                    "!type": "number",
                    "!doc": "\n  Where the confidence is {@link ItemsSizeConfidence#RANGE}, returns\n  the upper bound of the range.nsee method getTotalItemsRangeMaxn"    },
                  "setTotalItems1": {
                    "!original": "setTotalItems",
                    "!type": "fn(results: null)",
                    "!doc": "\n  Records the total number of results found, and the confidence\n  in this, from the Paging Results ,\n  @param results The PagingResults to extract the information from"    },
                  "getTotalItemsRangeMax": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Where the confidence is {@link ItemsSizeConfidence#RANGE}, returns\n  the upper bound of the range."    }
                },
                "AVMNode": {
                  "!doc": "\n  Represents a AVM specific node in the Script context. Provides specific implementations\n  of AVM specific methods such as copy, move, rename etc. ,\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.AVMNode",
                  "move1": {
                    "!original": "move",
                    "!type": "fn(destination: string) -\u003e bool",
                    "!doc": "\n  Move this Node to a new parent destination path.,\n  @param destination   Path,\n  @return true on successful move, false on failure to move."    },
                  "rename": {
                    "!type": "fn(name: string) -\u003e bool",
                    "!doc": "\n  Rename this node to the specified name,\n  @param name      New name for the node,\n  @return true on success, false otherwise"    },
                  "copy1": {
                    "!original": "copy",
                    "!type": "fn(destination: string) -\u003e ScriptNode",
                    "!doc": "\n  Copy this Node into a new parent destination.,\n  @param destination     Parent path for the copy,\n  @return the copy of this node"    },
                  "isLockOwner": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if this node is locked and the current user is the lock owner"    },
                  "getAspectsSet": {
                    "!type": "fn() -\u003e Set",
                    "!doc": "\n  @return The list of aspects applied to this node"    },
                  "type": {
                    "!type": "string",
                    "!doc": "\n  @return QName type of this nodensee method getTypen"    },
                  "getParentPath": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return AVM path to the parent node"    },
                  "version": {
                    "!type": "number",
                    "!doc": "nullnsee method getVersionn"    },
                  "isLocked": {
                    "!type": "bool",
                    "!doc": "\n  @return true if the node is currently lockednsee method getIsLockedn"    },
                  "getVersion": {
                    "!type": "fn() -\u003e number"    },
                  "getType": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return QName type of this node"    },
                  "getIsLocked": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if the node is currently locked"    },
                  "isDirectory": {
                    "!type": "fn() -\u003e bool"    },
                  "isFile": {
                    "!type": "fn() -\u003e bool"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  @return Helper to return the \\\u0027name\\\u0027 property for the nodensee method getNamen"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Helper to return the \\\u0027name\\\u0027 property for the node"    },
                  "path": {
                    "!type": "string",
                    "!doc": "\n  @return the full AVM Path to this nodensee method getPathn"    },
                  "getPath": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the full AVM Path to this node"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "aspectsSet": {
                    "!type": "Set",
                    "!doc": "\n  @return The list of aspects applied to this nodensee method getAspectsSetn"    },
                  "hasLockAccess": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return true if this user can perform operations on the node when locked.\n  This is true if the item is either unlocked, or locked and the current user is the lock owner,\n  or locked and the current user has Content Manager role in the associated web project."    },
                  "parentPath": {
                    "!type": "string",
                    "!doc": "\n  @return AVM path to the parent nodensee method getParentPathn"    },
                  "move": {
                    "!type": "fn(destination: ScriptNode) -\u003e bool",
                    "!doc": "\n  Move this Node to a new parent destination node.,\n  @param destination   Node,\n  @return true on successful move, false on failure to move."    },
                  "copy": {
                    "!type": "fn(destination: ScriptNode) -\u003e ScriptNode",
                    "!doc": "\n  Copy this Node into a new parent destination.,\n  @param destination     Parent node for the copy,\n  @return the copy of this node"    }
                },
                "Status": {
                  "!doc": "\n  Web Script Status\n  Records the outcome of a Web Script.,\n  @author davidc\nsee class org.springframework.extensions.webscripts.Status",
                  "setMessage": {
                    "!type": "fn(message: string)",
                    "!doc": "\n  @param message"    },
                  "getMessage": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return  message"    },
                  "location": {
                    "!type": "string",
                    "!doc": "\n  @return  locationnsee method getLocationn"    },
                  "getRedirect": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return redirect to status code response"    },
                  "exception": {
                    "!type": "Throwable",
                    "!doc": "\n  @return  exceptionnsee method getExceptionn"    },
                  "getCodeName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the short name of the status code,\n  @return  status code name"    },
                  "setException": {
                    "!type": "fn(exception: Throwable)",
                    "!doc": "\n  @param exception"    },
                  "getCode": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  @return  status code"    },
                  "code": {
                    "!type": "number",
                    "!doc": "\n  @return  status codensee method getCoden"    },
                  "getCodeDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the description of the status code,\n  @return  status code description"    },
                  "setRedirect": {
                    "!type": "fn(redirect: bool)",
                    "!doc": "\n  @param redirect  redirect to status code response"    },
                  "getLocation": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return  location"    },
                  "setLocation": {
                    "!type": "fn(location: string)",
                    "!doc": "\n  @see javax.servlet.http.HTTPServletResponse,\n  @param location  location response-header"    },
                  "message": {
                    "!type": "string",
                    "!doc": "\n  @return  messagensee method getMessagen"    },
                  "codeName": {
                    "!type": "string",
                    "!doc": "\n  Gets the short name of the status code,\n  @return  status code namensee method getCodeNamen"    },
                  "setCode": {
                    "!type": "fn(code: number, message: string)",
                    "!doc": "\n  Helper method to set the code and message.  \n  \u003cp\u003e\n  Redirect is set to true.,\n  @param code      code,\n  @param message   message"    },
                  "codeDescription": {
                    "!type": "string",
                    "!doc": "\n  Gets the description of the status code,\n  @return  status code descriptionnsee method getCodeDescriptionn"    },
                  "setCode1": {
                    "!original": "setCode",
                    "!type": "fn(code: number)",
                    "!doc": "\n  @see javax.servlet.http.HTTPServletResponse,\n  @param code  status code"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "redirect": {
                    "!type": "bool",
                    "!doc": "\n  @return redirect to status code responsensee method getRedirectn"    },
                  "getException": {
                    "!type": "fn() -\u003e Throwable",
                    "!doc": "\n  @return  exception"    }
                },
                "PagedResults": {
                  "!doc": "\n  A Paged Result Set,\n  @author davidc\nsee class org.alfresco.repo.web.util.paging.PagedResults",
                  "result": {
                    "!type": "?",
                    "!doc": "\n  Get Result,\n  @return  resultnsee method getResultn"    },
                  "getCursor": {
                    "!type": "fn() -\u003e Cursor",
                    "!doc": "\n  Get Cursor,\n  @return  cursor"    },
                  "cursor": {
                    "!type": "Cursor",
                    "!doc": "\n  Get Cursor,\n  @return  cursornsee method getCursorn"    },
                  "results": {
                    "!type": "[ScriptNode]",
                    "!doc": "\n  Get Results,\n  @return  resultsnsee method getResultsn"    },
                  "getResults": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  Get Results,\n  @return  results"    },
                  "getResult": {
                    "!type": "fn() -\u003e ?",
                    "!doc": "\n  Get Result,\n  @return  result"    }
                },
                "ScriptAction": {
                  "!doc": "\n  Scriptable Action,\n  @author davidc\nsee class org.alfresco.repo.jscript.ScriptAction",
                  "getParameters": {
                    "!type": "fn() -\u003e actionParameters.prototype",
                    "!doc": "\n  Return all the properties known about this node. The Map returned implements the Scriptable interface to allow access to the properties via JavaScript associative array\n  access. This means properties of a node can be access thus: \u003ccode\u003enode.properties[\\\"name\\\"]\u003c\\/code\u003e,\n  @return Map of properties for this Node."    },
                  "executeAsynchronouslyImpl": {
                    "!type": "fn(node: ScriptNode)"    },
                  "execute": {
                    "!type": "fn(node: ScriptNode)",
                    "!doc": "\n  Execute action.  The existing transaction will be joined.,\n  @param nodethe node to execute action upon"    },
                  "executeAsynchronously": {
                    "!type": "fn(node: ScriptNode)",
                    "!doc": "\n  Execute action.  The existing transaction will be joined.,\n  @param nodethe node to execute action upon"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the action name,\n  @return action name"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  Returns the action name,\n  @return action namensee method getNamen"    },
                  "executeImpl": {
                    "!type": "fn(node: ScriptNode)"    },
                  "parameters": {
                    "!type": "actionParameters.prototype",
                    "!doc": "\n  Return all the properties known about this node. The Map returned implements the Scriptable interface to allow access to the properties via JavaScript associative array\n  access. This means properties of a node can be access thus: \u003ccode\u003enode.properties[\\\"name\\\"]\u003c\\/code\u003e,\n  @return Map of properties for this Node.nsee method getParametersn"    },
                  "performParamConversionForRepo": {
                    "!type": "fn()"    },
                  "execute3": {
                    "!original": "execute",
                    "!type": "fn(nodeRef: NodeRef, readOnly: bool, newTxn: bool)",
                    "!doc": "\n  Execute action, optionally starting a new, potentially read-only transaction.,\n  @param nodeRefthe node to execute action upon,\n  @param newTxn\u003ctt\u003etrue\u003c\\/tt\u003e to start a new, isolated transaction,\n  @see RetryingTransactionHelper#doInTransaction(RetryingTransactionCallback,boolean,boolean)"    },
                  "execute2": {
                    "!original": "execute",
                    "!type": "fn(nodeRef: NodeRef)",
                    "!doc": "\n  Execute action.  The existing transaction will be joined.,\n  @param nodeRefthe node to execute action upon"    },
                  "execute1": {
                    "!original": "execute",
                    "!type": "fn(node: ScriptNode, readOnly: bool, newTxn: bool)",
                    "!doc": "\n  Execute action, optionally starting a new, potentially read-only transaction.,\n  @param nodethe node to execute action upon,\n  @param newTxn\u003ctt\u003etrue\u003c\\/tt\u003e to start a new, isolated transaction,\n  @see RetryingTransactionHelper#doInTransaction(RetryingTransactionCallback,boolean,boolean)"    }
                },
                "SiteMemberInfo": {
                  "!doc": "\n  Site member\\\u0027s information. The member can either be an individual or a group.,\n  @author Jamal Kaabi-Mofrad,\n  @since odin\nsee class org.alfresco.service.cmr.site.SiteMemberInfo",
                  "isMemberOfGroup": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Indicates whether a member belongs to a group with access rights to the\n  site or not,\n  @return \u003ctt\u003etrue\u003c\\/tt\u003e if the member belongs to a group with access\n  rights, otherwise \u003ctt\u003efalse\u003c\\/tt\u003e"    },
                  "memberRole": {
                    "!type": "string",
                    "!doc": "\n  Get the member\\\u0027s role,\n  @return String member\\\u0027s rolensee method getMemberRolen"    },
                  "getMemberName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the member\\\u0027s name. The name can either be the name of an individual\n  or a group,\n  @return String member\\\u0027s name"    },
                  "getMemberRole": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Get the member\\\u0027s role,\n  @return String member\\\u0027s role"    },
                  "memberName": {
                    "!type": "string",
                    "!doc": "\n  Get the member\\\u0027s name. The name can either be the name of an individual\n  or a group,\n  @return String member\\\u0027s namensee method getMemberNamen"    }
                },
                "ScriptPagingNodes": {
                  "!doc": "\n  Response for page of ScriptNode results,\n  @author janv,\n  @version 4.0\nsee class org.alfresco.repo.jscript.ScriptPagingNodes",
                  "getTotalResultCountLower": {
                    "!type": "fn() -\u003e number"    },
                  "getPage": {
                    "!type": "fn() -\u003e [ScriptNode]"    },
                  "hasMoreItems": {
                    "!type": "fn() -\u003e bool"    },
                  "page": {
                    "!type": "[ScriptNode]",
                    "!doc": "nullnsee method getPagen"    },
                  "totalResultCountUpper": {
                    "!type": "number",
                    "!doc": "nullnsee method getTotalResultCountUppern"    },
                  "totalResultCountLower": {
                    "!type": "number",
                    "!doc": "nullnsee method getTotalResultCountLowern"    },
                  "getTotalResultCountUpper": {
                    "!type": "fn() -\u003e number"    }
                },
                "ScriptInvitation": {
                  "!doc": "\n  Java script invitation for the Java Script API,\n  @author mrogers\nsee class org.alfresco.repo.invitation.script.ScriptInvitation",
                  "getRoleName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Which role to be added with,\n  @return the roleName"    },
                  "getInviteeEmail": {
                    "!type": "fn() -\u003e string"    },
                  "reject": {
                    "!type": "fn(reason: string)"    },
                  "inviteeLastName": {
                    "!type": "string",
                    "!doc": "nullnsee method getInviteeLastNamen"    },
                  "getInviteeFirstName": {
                    "!type": "fn() -\u003e string"    },
                  "invitationType": {
                    "!type": "string",
                    "!doc": "nullnsee method getInvitationTypen"    },
                  "getInvitationType": {
                    "!type": "fn() -\u003e string"    },
                  "invitationService": {
                    "!type": "InvitationService",
                    "!doc": "nullnsee method getInvitationServicen"    },
                  "getResourceType": {
                    "!type": "fn() -\u003e string"    },
                  "roleName": {
                    "!type": "string",
                    "!doc": "\n  Which role to be added with,\n  @return the roleNamensee method getRoleNamen"    },
                  "cancel": {
                    "!type": "fn()"    },
                  "inviteeEmail": {
                    "!type": "string",
                    "!doc": "nullnsee method getInviteeEmailn"    },
                  "resourceType": {
                    "!type": "string",
                    "!doc": "nullnsee method getResourceTypen"    },
                  "getInviteeUserName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  The inviteeUserName,\n  @return the invitee user name"    },
                  "getInvitation": {
                    "!type": "fn() -\u003e T"    },
                  "inviteeUserName": {
                    "!type": "string",
                    "!doc": "\n  The inviteeUserName,\n  @return the invitee user namensee method getInviteeUserNamen"    },
                  "inviteId": {
                    "!type": "string",
                    "!doc": "nullnsee method getInviteIdn"    },
                  "inviteeFirstName": {
                    "!type": "string",
                    "!doc": "nullnsee method getInviteeFirstNamen"    },
                  "getInviteeLastName": {
                    "!type": "fn() -\u003e string"    },
                  "getInvitationService": {
                    "!type": "fn() -\u003e InvitationService"    },
                  "getResourceName": {
                    "!type": "fn() -\u003e string"    },
                  "invitation": {
                    "!type": "T",
                    "!doc": "nullnsee method getInvitationn"    },
                  "resourceName": {
                    "!type": "string",
                    "!doc": "nullnsee method getResourceNamen"    },
                  "getInviteId": {
                    "!type": "fn() -\u003e string"    }
                },
                "ScriptFormData": {
                  "!doc": "\n  FormData JavaScript Object.,\n  @author Neil McErlean\nsee class org.alfresco.repo.forms.script.ScriptFormData",
                  "getData": {
                    "!type": "fn() -\u003e ScriptableHashMap"    },
                  "data": {
                    "!type": "ScriptableHashMap",
                    "!doc": "nullnsee method getDatan"    }
                },
                "StoreRef": {
                  "!doc": "\n  Reference to a node store,\n  @author Derek Hulley\nsee class org.alfresco.service.cmr.repository.StoreRef",
                  "protocol": {
                    "!type": "string",
                    "!doc": "nullnsee method getProtocoln"    },
                  "getProtocol": {
                    "!type": "fn() -\u003e string"    },
                  "equals": {
                    "!type": "fn(obj: ?) -\u003e bool"    },
                  "getIdentifier": {
                    "!type": "fn() -\u003e string"    },
                  "hashCode": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Creates a hashcode from both the {@link #getProtocol()} and {@link #getIdentifier()}"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "identifier": {
                    "!type": "string",
                    "!doc": "nullnsee method getIdentifiern"    }
                },
                "TagScope": {
                  "!doc": "\n  Script object representing a tag scope.,\n  @author Roy Wetherall\nsee class org.alfresco.repo.tagging.script.TagScope",
                  "tags": {
                    "!type": "[TagDetails]",
                    "!doc": "\n  Gets all the tags, ordered by count, for the tag scope,\n  @return  TagDetails[]    tags ordered by countnsee method getTagsn"    },
                  "getTopTags": {
                    "!type": "fn(topN: number) -\u003e [TagDetails]",
                    "!doc": "\n  Gets the top N tags ordered by count,\n  @param topN              the number of top tags to return,\n  @return TagDetails[]     the top N tags ordered by count"    },
                  "refresh": {
                    "!type": "fn()",
                    "!doc": "\n  Refresh the tag scope"    },
                  "getTags": {
                    "!type": "fn() -\u003e [TagDetails]",
                    "!doc": "\n  Gets all the tags, ordered by count, for the tag scope,\n  @return  TagDetails[]    tags ordered by count"    },
                  "getCount": {
                    "!type": "fn(tag: string) -\u003e number",
                    "!doc": "\n  Get the count of a tag, 0 if not present,\n  @param tag   tag name,\n  @return int  tag count"    }
                },
                "AssociationRef": {
                  "!doc": "\n  This class represents a regular, named node relationship between two nodes.\n  \u003cp\u003e\n  Note that the ID of the association might not be populated.,\n  @author Derek Hulley\nsee class org.alfresco.service.cmr.repository.AssociationRef",
                  "id": {
                    "!type": "number",
                    "!doc": "\n  Gets the unique identifier for this association.,\n  @return  the unique identifier for this association, or \u003ctt\u003enull\u003c\\/tt\u003e if the ID was not\n  given at the time of constructionnsee method getIdn"    },
                  "getSourceRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  @return Returns the parent node reference, which may be null if this\n  represents the imaginary reference to the root node"    },
                  "equals": {
                    "!type": "fn(o: ?) -\u003e bool",
                    "!doc": "\n  Compares:\n  \u003cul\u003e\n  \u003cli\u003e{@link #sourceRef}\u003c\\/li\u003e\n  \u003cli\u003e{@link #targetRef}\u003c\\/li\u003e\n  \u003cli\u003e{@link #assocTypeQName}\u003c\\/li\u003e\n  \u003c\\/ul\u003e"    },
                  "typeQName": {
                    "!type": "QName",
                    "!doc": "\n  Get the qualified name of the source-target association,\n  @return Returns the qualified name of the source-target association.nsee method getTypeQNamen"    },
                  "getTargetRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  @return Returns the child node reference - never null"    },
                  "hashCode": {
                    "!type": "fn() -\u003e number"    },
                  "targetRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  @return Returns the child node reference - never nullnsee method getTargetRefn"    },
                  "toString": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Returns a string of the form \u003cb\u003esourceNodeRef|targetNodeRef|assocTypeQName|assocQName\u003c\\/b\u003e"    },
                  "sourceRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  @return Returns the parent node reference, which may be null if this\n  represents the imaginary reference to the root nodensee method getSourceRefn"    },
                  "getTypeQName": {
                    "!type": "fn() -\u003e QName",
                    "!doc": "\n  Get the qualified name of the source-target association,\n  @return Returns the qualified name of the source-target association."    },
                  "getId": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  Gets the unique identifier for this association.,\n  @return  the unique identifier for this association, or \u003ctt\u003enull\u003c\\/tt\u003e if the ID was not\n  given at the time of construction"    }
                },
                "JscriptWorkflowPath": {
                  "!doc": "\n  Class that represents a path of execution through a workflow.\n  A simple workflow consists of only one root path of execution.\n  That path may branch at some subsequent transition, so that execution\n  follows multiple paths through the workflow.,\n  @author glenj\nsee class org.alfresco.repo.workflow.jscript.JscriptWorkflowPath",
                  "isActive": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Gets the value of the \u003ccode\u003eactive\u003c\\/code\u003e property,\n  @return the active"    },
                  "id": {
                    "!type": "string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the idnsee method getIdn"    },
                  "node": {
                    "!type": "WorkflowNode",
                    "!doc": "\n  Gets the value of the \u003ccode\u003enode\u003c\\/code\u003e property,\n  @return the nodensee method getNoden"    },
                  "getTasks": {
                    "!type": "fn() -\u003e [JscriptWorkflowTask]",
                    "!doc": "\n  Get all tasks associated with this workflow path,\n  @return all the tasks associated with this workflow path instance"    },
                  "signal": {
                    "!type": "fn(transitionId: string) -\u003e JscriptWorkflowPath",
                    "!doc": "\n  Signal a transition to another node in the workflow,\n  @param transitionId  ID of the transition to follow (or null, for the default transition),\n  @return  the updated workflow path"    },
                  "tasks": {
                    "!type": "[JscriptWorkflowTask]",
                    "!doc": "\n  Get all tasks associated with this workflow path,\n  @return all the tasks associated with this workflow path instancensee method getTasksn"    },
                  "getInstance": {
                    "!type": "fn() -\u003e JscriptWorkflowInstance",
                    "!doc": "\n  Gets the value of the \u003ccode\u003einstance\u003c\\/code\u003e property,\n  @return the instance"    },
                  "instance": {
                    "!type": "JscriptWorkflowInstance",
                    "!doc": "\n  Gets the value of the \u003ccode\u003einstance\u003c\\/code\u003e property,\n  @return the instancensee method getInstancen"    },
                  "getNode": {
                    "!type": "fn() -\u003e WorkflowNode",
                    "!doc": "\n  Gets the value of the \u003ccode\u003enode\u003c\\/code\u003e property,\n  @return the node"    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the value of the \u003ccode\u003eid\u003c\\/code\u003e property,\n  @return the id"    }
                },
                "ChildAssociationRef": {
                  "!doc": "\n  This class represents a child relationship between two nodes. This\n  relationship is named.\n  \u003cp\u003e\n  So it requires the parent node ref, the child node ref and the name of the\n  child within the particular parent.\n  \u003cp\u003e\n  This combination is not a unique identifier for the relationship with regard\n  to structure. In use this does not matter as we have no concept of order,\n  particularly in the index.,\n  @author andyh\nsee class org.alfresco.service.cmr.repository.ChildAssociationRef",
                  "parentRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  @return Returns the parent node reference, which may be null if this\n  represents the imaginary reference to the root nodensee method getParentRefn"    },
                  "setNthSibling": {
                    "!type": "fn(nthSibling: number)",
                    "!doc": "\n  Allows post-creation setting of the ordering index.  This is a helper\n  so that sorted sets and lists can be easily sorted.\n  \u003cp\u003e\n  This index is \u003cb\u003ein no way absolute\u003c\\/b\u003e and should change depending on\n  the results that appear around this instance.  Therefore, the sibling\n  number cannot be used to construct, say, sibling number 5.  Sibling\n  number 5 will exist only in results where there are siblings 1 - 4.,\n  @param nthSibling the sibling index"    },
                  "isPrimary": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return Returns true if this represents a primary association"    },
                  "equals": {
                    "!type": "fn(o: ?) -\u003e bool",
                    "!doc": "\n  Compares:\n  \u003cul\u003e\n  \u003cli\u003e{@link #assocTypeQName}\u003c\\/li\u003e\n  \u003cli\u003e{@link #parentRef}\u003c\\/li\u003e\n  \u003cli\u003e{@link #childRef}\u003c\\/li\u003e\n  \u003cli\u003e{@link #childQName}\u003c\\/li\u003e\n  \u003c\\/ul\u003e"    },
                  "QName": {
                    "!type": "QName",
                    "!doc": "\n  Get the qualified name of the parent-child association,\n  @return Returns the qualified name of the parent-child association. It\n  may be null if this is the imaginary association to a root node.nsee method getQNamen"    },
                  "getChildRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  @return Returns the child node reference - never null"    },
                  "hashCode": {
                    "!type": "fn() -\u003e number"    },
                  "getNthSibling": {
                    "!type": "fn() -\u003e number",
                    "!doc": "\n  @return Returns the nth sibling required"    },
                  "compareTo": {
                    "!type": "fn(another: ChildAssociationRef) -\u003e number",
                    "!doc": "\n  @see #setNthSibling(int)"    },
                  "childRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  @return Returns the child node reference - never nullnsee method getChildRefn"    },
                  "getTypeQName": {
                    "!type": "fn() -\u003e QName",
                    "!doc": "\n  Get the qualified name of the association type,\n  @return Returns the qualified name of the parent-child association type\n  as defined in the data dictionary.  It may be null if this is the\n  imaginary association to the root node."    },
                  "nthSibling": {
                    "!type": "number",
                    "!doc": "\n  @return Returns the nth sibling requirednsee method getNthSiblingn"    },
                  "getParentRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  @return Returns the parent node reference, which may be null if this\n  represents the imaginary reference to the root node"    },
                  "typeQName": {
                    "!type": "QName",
                    "!doc": "\n  Get the qualified name of the association type,\n  @return Returns the qualified name of the parent-child association type\n  as defined in the data dictionary.  It may be null if this is the\n  imaginary association to the root node.nsee method getTypeQNamen"    },
                  "toString": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return Returns a string of the form \u003cb\u003eparentNodeRef|childNodeRef|assocTypeQName|assocQName|isPrimary|nthSibling\u003c\\/b\u003e"    },
                  "getQName": {
                    "!type": "fn() -\u003e QName",
                    "!doc": "\n  Get the qualified name of the parent-child association,\n  @return Returns the qualified name of the parent-child association. It\n  may be null if this is the imaginary association to a root node."    }
                },
                "ScriptVersion": {
                  "!doc": "\n  Scriptable Version,\n  @author davidc\nsee class org.alfresco.repo.jscript.ScriptVersion",
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the version description (or checkin comment),\n  @return the version description"    },
                  "getNodeRef": {
                    "!type": "fn() -\u003e NodeRef",
                    "!doc": "\n  Gets the node ref represented by this version,\n  @return  node ref"    },
                  "label": {
                    "!type": "string",
                    "!doc": "\n  Gets the version label,\n  @return  the version labelnsee method getLabeln"    },
                  "type": {
                    "!type": "string",
                    "!doc": "\n  Gets the version type,\n  @return  \\\"MAJOR\\\", \\\"MINOR\\\"nsee method getTypen"    },
                  "getNode": {
                    "!type": "fn() -\u003e ScriptNode",
                    "!doc": "\n  Gets the node represented by this version,\n  @return  node"    },
                  "getCreatedDate": {
                    "!type": "fn() -\u003e ?",
                    "!doc": "\n  Gets the date the version was created,\n  @return  the date the version was created"    },
                  "getLabel": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the version label,\n  @return  the version label"    },
                  "creator": {
                    "!type": "string",
                    "!doc": "\n  Gets the creator of the version,\n  @return  the creator of the versionnsee method getCreatorn"    },
                  "getType": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the version type,\n  @return  \\\"MAJOR\\\", \\\"MINOR\\\""    },
                  "node": {
                    "!type": "ScriptNode",
                    "!doc": "\n  Gets the node represented by this version,\n  @return  nodensee method getNoden"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  Gets the version description (or checkin comment),\n  @return the version descriptionnsee method getDescriptionn"    },
                  "getCreator": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Gets the creator of the version,\n  @return  the creator of the version"    },
                  "nodeRef": {
                    "!type": "NodeRef",
                    "!doc": "\n  Gets the node ref represented by this version,\n  @return  node refnsee method getNodeRefn"    },
                  "createdDate": {
                    "!type": "?",
                    "!doc": "\n  Gets the date the version was created,\n  @return  the date the version was creatednsee method getCreatedDaten"    }
                },
                "FieldDefinition": {
                  "!doc": "\n  Abstract representation of a field defintion.,\n  @author Gavin Cornwell\nsee class org.alfresco.repo.forms.FieldDefinition",
                  "setBinding": {
                    "!type": "fn(binding: string)",
                    "!doc": "\n  Sets the binding to use for the field, this is used by some\n  FormModelProcessor implementations to generate an \n  alternative representation of the data,\n  @param binding The field\\\u0027s binding"    },
                  "dataKeyName": {
                    "!type": "string",
                    "!doc": "\n  Returns the name of the key being used to hold the data for the field,\n  @return Name of the key being used to hold the data for the fieldnsee method getDataKeyNamen"    },
                  "setDefaultValue": {
                    "!type": "fn(defaultValue: string)",
                    "!doc": "\n  Sets the default value for the field,\n  @param defaultValue The field\\\u0027s default value"    },
                  "setProtectedField": {
                    "!type": "fn(protectedField: bool)",
                    "!doc": "\n  Sets whether the field is protected i.e. it should be rendered\n  as read-only in any client displaying the field,\n  @param protectedField true if the field is protected"    },
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the description of the field,\n  @return The field\\\u0027s description"    },
                  "setDataKeyName": {
                    "!type": "fn(dataKeyName: string)",
                    "!doc": "\n  Sets the name of the key to be used to hold the data for the field,\n  @param dataKeyName The name of the key to be used to hold the data for the field"    },
                  "getDataKeyName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the name of the key being used to hold the data for the field,\n  @return Name of the key being used to hold the data for the field"    },
                  "label": {
                    "!type": "string",
                    "!doc": "\n  Returns the display label for the field,\n  @return The field\\\u0027s display labelnsee method getLabeln"    },
                  "setLabel": {
                    "!type": "fn(label: string)",
                    "!doc": "\n  Sets the display label for the field,\n  @param label The field\\\u0027s display label"    },
                  "getLabel": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the display label for the field,\n  @return The field\\\u0027s display label"    },
                  "setGroup": {
                    "!type": "fn(group: FieldGroup)",
                    "!doc": "\n  Sets the group the field is part of,\n  @param group The group the field belongs to"    },
                  "getDefaultValue": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns any default value the field may have,\n  @return The field\\\u0027s default value or null if there isn\\\u0027t one"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  Returns the description of the field,\n  @return The field\\\u0027s descriptionnsee method getDescriptionn"    },
                  "setDescription": {
                    "!type": "fn(description: string)",
                    "!doc": "\n  Sets the description of the field,\n  @param description The field\\\u0027s description"    },
                  "isProtectedField": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Determines whether the field is protected i.e. it should be rendered\n  as read-only in any client displaying the field,\n  @return true if the field is protected"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  Returns the name of the field,\n  @return The field\\\u0027s namensee method getNamen"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the name of the field,\n  @return The field\\\u0027s name"    },
                  "getBinding": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the binding for the field, this is used by some\n  FormModelProcessor implementations to generate an \n  alternative representation of the data,\n  @return The field\\\u0027s binding"    },
                  "getGroup": {
                    "!type": "fn() -\u003e FieldGroup",
                    "!doc": "\n  Returns the group the field may be a part of,\n  @return The field\\\u0027s group or null if it does not belong to a group"    },
                  "binding": {
                    "!type": "string",
                    "!doc": "\n  Returns the binding for the field, this is used by some\n  FormModelProcessor implementations to generate an \n  alternative representation of the data,\n  @return The field\\\u0027s bindingnsee method getBindingn"    },
                  "group": {
                    "!type": "FieldGroup",
                    "!doc": "\n  Returns the group the field may be a part of,\n  @return The field\\\u0027s group or null if it does not belong to a groupnsee method getGroupn"    },
                  "defaultValue": {
                    "!type": "string",
                    "!doc": "\n  Returns any default value the field may have,\n  @return The field\\\u0027s default value or null if there isn\\\u0027t onensee method getDefaultValuen"    }
                },
                "Authority": {
                  "!doc": "null\nsee class org.alfresco.repo.security.authority.script.Authority",
                  "getFullName": {
                    "!type": "fn() -\u003e string"    },
                  "getDisplayName": {
                    "!type": "fn() -\u003e string"    },
                  "getShortName": {
                    "!type": "fn() -\u003e string"    },
                  "fullName": {
                    "!type": "string",
                    "!doc": "nullnsee method getFullNamen"    },
                  "displayName": {
                    "!type": "string",
                    "!doc": "nullnsee method getDisplayNamen"    },
                  "shortName": {
                    "!type": "string",
                    "!doc": "nullnsee method getShortNamen"    }
                },
                "ScriptableQNameMap": {
                  "!doc": "\n  @author Kevin Roast\nsee class org.alfresco.repo.jscript.ScriptableQNameMap",
                  "has1": {
                    "!original": "has",
                    "!type": "fn(index: number, start: ?) -\u003e bool",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#has(int,org.mozilla.javascript.Scriptable)"    },
                  "put": {
                    "!type": "fn(name: string, start: ?, value: ?)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#put(java.lang.String,org.mozilla.javascript.Scriptable,java.lang.Object)"    },
                  "get": {
                    "!type": "fn(name: string, start: ?) -\u003e ?",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#get(java.lang.String,org.mozilla.javascript.Scriptable)"    },
                  "get1": {
                    "!original": "get",
                    "!type": "fn(index: number, start: ?) -\u003e ?",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#get(int,org.mozilla.javascript.Scriptable)"    },
                  "ids": {
                    "!type": "[ScriptNode]",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getIds()nsee method getIdsn"    },
                  "getClassName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getClassName()"    },
                  "has": {
                    "!type": "fn(name: string, start: ?) -\u003e bool",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#has(java.lang.String,org.mozilla.javascript.Scriptable)"    },
                  "getDefaultValue": {
                    "!type": "fn(hint: Class) -\u003e ?",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getDefaultValue(java.lang.Class)"    },
                  "delete1": {
                    "!original": "delete",
                    "!type": "fn(index: number)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#delete(int)"    },
                  "getIds": {
                    "!type": "fn() -\u003e [ScriptNode]",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getIds()"    },
                  "put1": {
                    "!original": "put",
                    "!type": "fn(index: number, start: ?, value: ?)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#put(int,org.mozilla.javascript.Scriptable,java.lang.Object)"    },
                  "delete": {
                    "!type": "fn(name: string)",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#delete(java.lang.String)"    },
                  "className": {
                    "!type": "string",
                    "!doc": "\n  @see org.mozilla.javascript.Scriptable#getClassName()nsee method getClassNamen"    }
                },
                "ScriptThumbnail": {
                  "!doc": "\n  @author Roy Wetherall,\n  @author Neil McErlean\nsee class org.alfresco.repo.thumbnail.script.ScriptThumbnail",
                  "update": {
                    "!type": "fn()",
                    "!doc": "\n  Updates the thumbnails content"    }
                },
                "WorkflowNode": {
                  "!doc": "\n  Workflow Node Data Object\n  Represents a Node within the Workflow Definition.,\n  @author davidc\nsee class org.alfresco.service.cmr.workflow.WorkflowNode",
                  "getType": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the type"    },
                  "title": {
                    "!type": "string",
                    "!doc": "\n  @return the titlensee method getTitlen"    },
                  "isTaskNode": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return the isTaskNode"    },
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the description"    },
                  "transitions": {
                    "!type": "[WorkflowTransition]",
                    "!doc": "\n  @return the transitionsnsee method getTransitionsn"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  @return the descriptionnsee method getDescriptionn"    },
                  "getName": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the name"    },
                  "name": {
                    "!type": "string",
                    "!doc": "\n  @return the namensee method getNamen"    },
                  "toString": {
                    "!type": "fn() -\u003e string"    },
                  "getTitle": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the title"    },
                  "type": {
                    "!type": "string",
                    "!doc": "\n  @return the typensee method getTypen"    },
                  "getTransitions": {
                    "!type": "fn() -\u003e [WorkflowTransition]",
                    "!doc": "\n  @return the transitions"    }
                },
                "FieldGroup": {
                  "!doc": "\n  Represents a field group,\n  @author Gavin Cornwell\nsee class org.alfresco.repo.forms.FieldGroup",
                  "id": {
                    "!type": "string",
                    "!doc": "\n  Returns the id of the group ,\n  @return The id of the groupnsee method getIdn"    },
                  "getParent": {
                    "!type": "fn() -\u003e FieldGroup",
                    "!doc": "\n  Returns the parent group,\n  @return The parent group or null if there isn\\\u0027t a parent"    },
                  "isMandatory": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Determines if the group is mandatory,\n  @return true if the group is mandatory"    },
                  "isRepeating": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  Determines whether the fields inside this group can \n  repeat multiple times,\n  @return true if the group repeats"    },
                  "parent": {
                    "!type": "FieldGroup",
                    "!doc": "\n  Returns the parent group,\n  @return The parent group or null if there isn\\\u0027t a parentnsee method getParentn"    },
                  "label": {
                    "!type": "string",
                    "!doc": "\n  Returns the display label of the group,\n  @return The display label of the groupnsee method getLabeln"    },
                  "getLabel": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the display label of the group,\n  @return The display label of the group"    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  Returns the id of the group ,\n  @return The id of the group"    }
                },
                "WorkflowTransition": {
                  "!doc": "\n  Workflow Transition.,\n  @author davidc\nsee class org.alfresco.service.cmr.workflow.WorkflowTransition",
                  "id": {
                    "!type": "string",
                    "!doc": "\n  @return the idnsee method getIdn"    },
                  "title": {
                    "!type": "string",
                    "!doc": "\n  @return the titlensee method getTitlen"    },
                  "getDescription": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the description"    },
                  "isDefault": {
                    "!type": "fn() -\u003e bool",
                    "!doc": "\n  @return the isDefault"    },
                  "description": {
                    "!type": "string",
                    "!doc": "\n  @return the descriptionnsee method getDescriptionn"    },
                  "toString": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  {@inheritDoc}"    },
                  "getTitle": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the title"    },
                  "getId": {
                    "!type": "fn() -\u003e string",
                    "!doc": "\n  @return the id"    }
                }
              }

    CodeMirror.tern.addDef(def);
})();
