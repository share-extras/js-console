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
 * Admin Console Javascript Console
 * 
 * @namespace Alfresco
 * @class Fme.JavascriptConsole
 */
(function()
{
   /**
	 * YUI Library aliases
	 */
   var Dom = YAHOO.util.Dom,
       Event = YAHOO.util.Event,
       Element = YAHOO.util.Element;
   
   /**
	 * Alfresco Slingshot aliases
	 */
   var $html = Alfresco.util.encodeHTML,
       $hasEventInterest = Alfresco.util.hasEventInterest; 

   /**
	 * JavascriptConsole constructor.
	 * 
	 * @param {String}
	 *            htmlId The HTML id of the parent element
	 * @return {Fme.JavascriptConsole} The new JavascriptConsole instance
	 * @constructor
	 */
   Fme.JavascriptConsole = function(htmlId)
   {
      this.name = "Fme.JavascriptConsole";
      Fme.JavascriptConsole.superclass.constructor.call(this, htmlId);
      
      /* Register this component */
      Alfresco.util.ComponentManager.register(this);
      
      /* Load YUI Components */
      Alfresco.util.YUILoaderHelper.require(["button", "container", "datasource", "datatable",  "paginator", "json", "history", "tabview"], this.onComponentsLoaded, this);
      
      /* Define panel handlers */
      var parent = this;
      
      /* File List Panel Handler */
      ListPanelHandler = function ListPanelHandler_constructor()
      {
         ListPanelHandler.superclass.constructor.call(this, "main");
      };
      
      YAHOO.extend(ListPanelHandler, Alfresco.ConsolePanelHandler,
      {
         /**
			 * Called by the ConsolePanelHandler when this panel shall be loaded
			 * 
			 * @method onLoad
			 */
         onLoad: function onLoad()
         {
        	 parent.widgets.pathField = Dom.get(parent.id + "-pathField"); 
        	 parent.widgets.documentField = Dom.get(parent.id + "-documentField"); 
        	 parent.widgets.nodeField = Dom.get(parent.id + "-nodeRef");
        	 parent.widgets.scriptInput = Dom.get(parent.id + "-jsinput");
        	 parent.widgets.scriptOutput = Dom.get(parent.id + "-jsoutput");
        	 parent.widgets.templateInput = Dom.get(parent.id + "-templateinput");
        	 parent.widgets.templateOutputHtml = Dom.get(parent.id + "-templateoutputhtml");
        	 parent.widgets.templateOutputText = Dom.get(parent.id + "-templateoutputtext");
        	 parent.widgets.config = {
        			 runas : Dom.get(parent.id + "-runas"),
        			 transaction : Dom.get(parent.id + "-transactions"),
        			 urlargs : Dom.get(parent.id + "-urlarguments"),
        			 runlikecrazy : Dom.get(parent.id + "-runlikecrazy")
        	 };
        	 
             // Buttons
        	 parent.widgets.selectDestinationButton = Alfresco.util.createYUIButton(parent, "selectDestination-button", parent.onSelectDestinationClick);
             parent.widgets.executeButton = Alfresco.util.createYUIButton(parent, "execute-button", parent.onExecuteClick);
         }
      });
      new ListPanelHandler();
      
      return this;
   };
   
   YAHOO.extend(Fme.JavascriptConsole, Alfresco.ConsoleTool,
   {
	   clearOutput : function ACJC_clearOutput() {
	       this.widgets.scriptOutput.innerHTML = "";
	       this.widgets.templateOutputHtml.innerHTML = "";
	       this.widgets.templateOutputText.innerHTML = "";
	   },

	   appendLineArrayToOutput: function ACJC_appendLineArrayToOutput(lineArray) {
	       	 var newLines = "";
	         for (line in lineArray) {
	         	newLines = newLines + lineArray[line] + "\n";
	         }
	         this.setOutputText(newLines);
	   },

	   setOutputText : function(text) {
	       var outputfield = this.widgets.scriptOutput;
	       outputfield.innerHTML = "";
	       outputfield.appendChild(document.createTextNode(text));
	   },

	   browserSupportsHtml5Storage: function ACJC_browserSupportsHtml5Storage() {
		   try {
	            localStorage.setItem(mod, mod);
	            localStorage.removeItem(mod);
	            return true;
	        } catch(e) {
	            return false;
	        }
	   },
	   
	  createMenuButtons: function ACJC_createMenuButtons(listOfScripts) {

          var loadMenuItems = [{
        	  text : this.msg("button.load.create.new"),
        	  value : "NEW"
          }];
          loadMenuItems.push(listOfScripts);
		  
          var oLoadMenuButton = new YAHOO.widget.Button({ 
				id: "loadButton", 
				name: "loadButton",
				label: this.msg("button.load.script"),
				type: "menu",  
				menu: loadMenuItems,
				container: this.id + "-scriptload"
          });

          oLoadMenuButton.getMenu().subscribe("click", this.onLoadScriptClick, this);
          
          var saveMenuItems = [{
        	  text : this.msg("button.save.create.new"),
        	  value : "NEW"
          }];
          saveMenuItems.push(listOfScripts);
          
          var oSaveMenuButton = new YAHOO.widget.Button({ 
				id: "saveButton", 
				name: "saveButton",
				label: this.msg("button.save.script"),
				type: "menu",  
				menu: saveMenuItems,
				container: this.id + "-scriptsave"
          });

          oSaveMenuButton.getMenu().subscribe("click", this.onSaveScriptClick, this);
          
          var docsMenuItems = [
            [ { text : "Mozilla Javascript Reference", url : "https://developer.mozilla.org/en/JavaScript/Reference", target:"_blank"},
              { text : "W3Schools Javascript Reference", url : "http://www.w3schools.com/jsref/default.asp", target:"_blank"},
              { text : "Alfresco 3.4 Javascript API", url : "http://wiki.alfresco.com/wiki/3.4_JavaScript_API", target:"_blank" },
              { text : "Alfresco 3.4 Javascript Services API", url : "http://wiki.alfresco.com/wiki/3.4_JavaScript_Services_API", target:"_blank" },
              { text : "Alfresco 4.0 Javascript API", url : "http://docs.alfresco.com/4.0/topic/com.alfresco.enterprise.doc/references/API-JS-Scripting-API.html", target:"_blank" },
              { text : "Alfresco 4.0 Javascript Services API", url : "http://docs.alfresco.com/4.0/topic/com.alfresco.enterprise.doc/references/API-JS-Services.html", target:"_blank" },
              { text : "Alfresco Javascript Cookbook", url : "http://wiki.alfresco.com/wiki/JavaScript_API_Cookbook", target:"_blank" }
            ],
            [ 
              { text : "Alfresco Freemarker Template Guide", url : "http://wiki.alfresco.com/wiki/Template_Guide", target:"_blank"},
              { text : "Freemarker Manual", url : "http://freemarker.sourceforge.net/docs/index.html", target:"_blank"}
            ],
            [
              { text : "Lucene Search Reference", url : "http://wiki.alfresco.com/wiki/Search", target:"_blank" }
            ],
            [
              { text : "Webscripts Reference", url : "http://wiki.alfresco.com/wiki/Web_Scripts", target:"_blank" },
              { text : "Webscripts Examples", url : "http://wiki.alfresco.com/wiki/Web_Scripts_Examples", target:"_blank" }
            ]
          ];
          
          var oDocsMenuButton = new YAHOO.widget.Button({ 
				id: "docsButton", 
				name: "docsButton",
				label: this.msg("button.docs"),
				type: "menu",  
				menu: docsMenuItems,
				container: this.id + "-documentation"
          });
          
          oDocsMenuButton.getMenu().setItemGroupTitle("Javascript", 0);
          oDocsMenuButton.getMenu().setItemGroupTitle("Freemarker", 1);
          oDocsMenuButton.getMenu().setItemGroupTitle("Lucene", 2);
          oDocsMenuButton.getMenu().setItemGroupTitle("Webscripts", 3);		  
          
          this.widgets.exportResultsButton = Alfresco.util.createYUIButton(this, 
        		  "exportResults-button", this.exportResultTableAsCSV);
		  Dom.setStyle(this.widgets.exportResultsButton, "display", "none");
          
	  },
	   
	  onEditorKeyEvent : function ACJC_onEditorKeyEvent(i, e) {
 		 // Hook into ctrl-enter
          if (e.type=="keyup" && e.keyCode == 13 && (e.ctrlKey || e.metaKey) && !e.altKey) {
	               e.stop();
	               i.owner.onExecuteClick(i.owner, e);
	         }
         // Hook into ctrl-space
         if (e.keyCode == 32 && (e.ctrlKey || e.metaKey) && !e.altKey) {
            e.stop();
            i.owner.onAutoComplete(i.owner, e);
         }
         // Hook into ctrl-z for Undo
         if (e.keyCode == 122 && (e.ctrlKey || e.metaKey) && !e.altKey) {
            e.stop();
            i.owner.widgets.codeMirrorScript.undo(i.owner, e);
         }
         // Hook into ctrl-y for Redo
         if (e.keyCode == 123 && (e.ctrlKey || e.metaKey) && !e.altKey) {
            e.stop();
            i.owner.widgets.codeMirrorScript.redo(i.owner, e);
         }
         // Hook into ctrl+shift+7 for Comment/Uncomment
         if (e.keyCode == 191 && (e.ctrlKey || e.metaKey) && !e.altKey) {
            e.stop();
            //i.owner.widgets.codeMirrorScript.redo(i.owner, e);
            alert("to be implemented");
         }
	  },
	  
      /**
		 * Fired by YUI when parent element is available for scripting.
		 * Component initialisation, including instantiation of YUI widgets and
		 * event listener binding.
		 * 
		 * @method onReady
		 */
      onReady: function ACJC_onReady()
      {
         // Call super-class onReady() method
         Fme.JavascriptConsole.superclass.onReady.call(this);
         var self = this;

         // Attach the CodeMirror highlighting
         this.widgets.codeMirrorScript = CodeMirror.fromTextArea(this.widgets.scriptInput, {
        	 mode : "javascript",
        	 lineNumbers: true,
        	 matchBrackets: true,
        	 onKeyEvent: this.onEditorKeyEvent
         });
         
         this.widgets.codeMirrorTemplate = CodeMirror.fromTextArea(this.widgets.templateInput, {
        	 mode : "xml",
        	 lineNumbers: true,
        	 matchBrackets: true,
        	 onKeyEvent: this.onEditorKeyEvent,
        	 markParen: function(node, ok) { 
        	        node.style.backgroundColor = ok ? "#CCF" : "#FCC#";
        	        if(!ok) {
        	            node.style.color = "red";
        	        }
        	    },
        	    unmarkParen: function(node) { 
        	         node.style.backgroundColor = "";
        	         node.style.color = "";
        	    },
        	    indentUnit: 4        	 
         });
         
         // Store this for use in event
         this.widgets.codeMirrorScript.owner = this;
         this.widgets.codeMirrorTemplate.owner = this;

         this.setupResizableEditor();
         
         this.widgets.inputTabs = new YAHOO.widget.TabView(this.id + "-inputTabs");
         this.widgets.outputTabs = new YAHOO.widget.TabView(this.id + "-outputTabs");
         
         new YAHOO.widget.Tooltip("tooltip-urlargs", { 
        	    context: this.widgets.config.urlargs, 
        	    text: this.msg("tooltip.urlargs"),
        	    showDelay: 200
        	});

         new YAHOO.widget.Tooltip("tooltip-runas", { 
     	    context: this.widgets.config.runas, 
     	    text: this.msg("tooltip.runas"),
     	    showDelay: 200
     	});
         
         var tab0 = this.widgets.inputTabs.getTab(1); // 2nd tab
         tab0.addListener('click', function handleClick(e) { 
        	 self.widgets.codeMirrorTemplate.refresh();
         });         

         YAHOO.Bubbling.on("folderSelected", this.onDestinationSelected, this);
         
         // Store and Restore script content to and from local storage
    	 if (self.browserSupportsHtml5Storage()) {
             window.onbeforeunload = function(e) {
           		 self.widgets.codeMirrorScript.save();
           		 window.localStorage["javascript.console.script"] = self.widgets.scriptInput.value;
           		 self.widgets.codeMirrorTemplate.save();
           		 window.localStorage["javascript.console.template"] = self.widgets.templateInput.value;

           		 window.localStorage["javascript.console.config.runas"] = self.widgets.config.runas.value;
           		 window.localStorage["javascript.console.config.transactions"] = self.widgets.config.transactions.value;
           		 window.localStorage["javascript.console.config.urlarguments"] = self.widgets.config.urlarguments.value;
           		 window.localStorage["javascript.console.config.runlikecrazy"] = self.widgets.config.runlikecrazy.value;
             };

             if (window.localStorage["javascript.console.config.runas"]) {
            	 self.widgets.config.runas.value = window.localStorage["javascript.console.config.runas"];
             }
             
             if (window.localStorage["javascript.console.config.transactions"]) {
            	 self.widgets.config.transactions.value = window.localStorage["javascript.console.config.transactions"];
             }

             if (window.localStorage["javascript.console.config.urlarguments"]) {
            	 self.widgets.config.urlarguments.value = window.localStorage["javascript.console.config.urlarguments"];
             }

             if (window.localStorage["javascript.console.config.runlikecrazy"]) {
            	 self.widgets.config.runlikecrazy.value = window.localStorage["javascript.console.config.runlikecrazy"];
             }
             
             if (window.localStorage["javascript.console.script"]) {
            	 this.widgets.codeMirrorScript.setValue(window.localStorage["javascript.console.script"]);
             }
             else {
            	 this.loadDemoScript();
             }

             if (window.localStorage["javascript.console.template"]) {
            	 this.widgets.codeMirrorTemplate.setValue(window.localStorage["javascript.console.template"]);
             }
             else {
            	 this.loadDemoTemplate();
             }
    	 }
         
         // Load Scripts from Repository
         Alfresco.util.Ajax.request(
         {
            url: Alfresco.constants.PROXY_URI + "de/fme/jsconsole/listscripts.json",
            method: Alfresco.util.Ajax.GET,
            requestContentType: Alfresco.util.Ajax.JSON,
            successCallback: {
            	fn: function(res) {
            		var listOfScripts = res.json.scripts;
            		this.createMenuButtons(listOfScripts);
            	},
            	scope: this
            }
         });

         // Read Javascript API Commands for code completion
         Alfresco.util.Ajax.request(
         {
            url: Alfresco.constants.PROXY_URI + "de/fme/jsconsole/apicommands.json",
            method: Alfresco.util.Ajax.GET,
            requestContentType: Alfresco.util.Ajax.JSON,
            successCallback: {
            	fn: function(res) {
            		this.javascriptCommands = res.json;
            	},
            	scope: this
            }
         });            

         // Read the Alfresco Data Dictionary for code completion (types and aspects)
         Alfresco.util.Ajax.request(
         {
            url: Alfresco.constants.PROXY_URI + "api/classes",
            method: Alfresco.util.Ajax.GET,
            requestContentType: Alfresco.util.Ajax.JSON,
            successCallback: {
            	fn: function(res) {
            		this.dictionary = res.json;
            	},
            	scope: this
            }
         });            
         
     	  var getQueryVariable = function getQueryVariable(variable) {
	        var query = window.location.search.substring(1);
	        var vars = query.split("&");
	        for (var i = 0; i < vars.length; i++) {
	            var pair = vars[i].split("=");
	            if (pair[0] == variable) {
	                return unescape(pair[1]);
	            }
	        }
	        return "";
	     }
     	  
	     this.options.documentNodeRef = getQueryVariable("nodeRef");
	     this.options.documentName = getQueryVariable("name");
         if (this.options.documentNodeRef || this.options.documentName) {
 	         Dom.setStyle(Dom.get(this.id + "-documentDisplay"), "display", "inline");
        	 this.widgets.documentField.innerHTML = this.options.documentName + " (" + this.options.documentNodeRef +")";
         }
         
      },

      setupResizableEditor: function() {
    	  var me = this;
    	  
          var codeMirrorScript = this.widgets.codeMirrorScript;
          var codeMirrorTemplate = this.widgets.codeMirrorTemplate;

          var resize = new YAHOO.util.Resize(this.id + "-inputContentArea", { handles : ["b"] });
         
 	     //var resize = new YAHOO.util.Resize(this.id + "-editorResize", { handles : ["b"] });
 	     resize.on('resize', function(ev) {
 	    	 var h = ev.height; 
 	         Dom.setStyle(codeMirrorScript.getScrollerElement(), "height", ""+ h + "px");
 	         codeMirrorScript.refresh();

  	         Dom.setStyle(codeMirrorTemplate.getScrollerElement(), "height", ""+ h + "px");
 	         codeMirrorTemplate.refresh();
 	        
  	         Dom.setStyle(me.id + "-inputContentArea", "width", "inherit");
 	     }); 
 	     
 	     resize.on('endResize', function(ev) {
  	         Dom.setStyle(me.id + "-inputContentArea", "width", "inherit");
	     }); 
 	     
 	     // Recalculate the horizontal size on a browser window resize event
          YAHOO.util.Event.on(window, "resize", function(e)
          {
 	         // YAHOO.util.Resize sets an absolute width, reset to auto width
   	         Dom.setStyle(me.id + "-inputContentArea", "width", "inherit");
          }, this, true);
          
    	  
    	  
      },

      /**
		 * Returns the possible auto completions for a given context and a token.
		 * 
		 * @method getAutoCompletions
		 */      
      getAutoCompletions: function ACJC_getAutoCompletions(token, context)
      {
    	  var keywords = ("break case catch continue debugger default delete do else false finally for function " +
          "if in instanceof new null return switch throw true try typeof var void while with").split(" ");
    	  
    	  var found = [], start = token.string;
    	  
    	  var maybeAdd = function(str, info) {
    	      if (str.indexOf(start) == 0) {
    	    	var obj = { value : str };
    	    	if (info) obj.info = info;
    	    	found.push(obj);
    	      }
    	  }
    	  
    	  var forEach = function(arr, f) {
    	    for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
    	  }
    	  
    	  if (context) {
    		  var variableName = context[0].string;
    		  var commands = this.javascriptCommands["methods"][variableName];
    		  if (commands) {
          	      forEach(commands, maybeAdd);
    		  }
    		  else if (variableName.substr(-4).toLowerCase() === "node") {
    			  forEach(this.javascriptCommands["node"], maybeAdd);
    		  } 
    	    }
    	    else {
    	      if (token.className == "stringliteral") {
    	    	 var suggestions = {};
    	    	 for(var t in this.dictionary) {
    	    		 
    	    		 var info = { 
    	    				 type: (this.dictionary[t].isAspect ? "Aspect" : "Type"), 
    	    				 name : this.dictionary[t].name
    	    		 };
    	    		 suggestions[info.type + info.name] = info;

    	    		 for(var p in this.dictionary[t].properties) {
    	    			 info = { 
    	    				 type : "Property", 
    	    				 name : this.dictionary[t].properties[p].name 
    	    			 };
        	    		 suggestions[info.type + info.name] = info;
    	    		 }
    	    	 };
    	    	 for (var sg in suggestions) {
    	    		 maybeAdd(suggestions[sg].name, suggestions[sg].type);
    	    	 }
    	      }
    	      else {
        	      forEach(this.javascriptCommands.global, maybeAdd);
          	      forEach(keywords, maybeAdd);
    	      }
    	    }
    	    return found;    	  
      },
      
      /**
		 * Fired when the user clicks Ctrl+Space to trigger auto complete in the text editor.
		 * 
		 * @method onAutoComplete
		 */      
      onAutoComplete: function ACJC_onAutoComplete(e, p_obj)
      {
  	    	var editor = this.widgets.codeMirrorScript;

  	    	var removeQuotes = function(text) {
  	    		while (text[0]=='"') text = text.substr(1);
  	    		while (text[text.length-1]=='"') text = text.substr(0,text.length-1);
  	    		return text;
  	    	}
  	    	
  	    	// We want a single cursor position.
    	    if (editor.somethingSelected()) return;
    	    
    	    // Find the token at the cursor
    	    var cur = editor.getCursor(false), token = editor.getTokenAt(cur), tprop = token;
    	    
    	    // If it's not a 'word-style' token, ignore the token.
    	    if (!/^[\w$_]*$/.test(token.string)) {
    	    	if (token.string[0] == '"') {
    	    	  token.string = token.string.replace(/\s+$/, '');  // trim right
  	    	      token = tprop = {
  	    	    		  start: cur.ch - removeQuotes(token.string).length, 
  	    	    		  end: cur.ch, 
  	    	    		  string: removeQuotes(token.string), 
  	    	    		  state: token.state,
  	                      className: "stringliteral"
  	              };
    	    	}
    	    	else {
    	    	      token = tprop = {start: cur.ch, end: cur.ch, string: "", state: token.state,
   	                       className: token.string == "." ? "property" : null};
    	    	}
    	    }
    	    
    	    // If it is a property, find out what it is a property of.
    	    while (tprop.className == "property") {
    	      tprop = editor.getTokenAt({line: cur.line, ch: tprop.start});
    	      if (tprop.string != ".") return;
    	      tprop = editor.getTokenAt({line: cur.line, ch: tprop.start});
    	      if (!context) var context = [];
    	      context.push(tprop);
    	    }
    	    
    	    var completions = this.getAutoCompletions(token, context);
    	    if (!completions.length) return;
    	    
    	    function insert(str) {
    	      editor.replaceRange(str, {line: cur.line, ch: token.start}, {line: cur.line, ch: token.end});
    	    }
    	    
    	    // When there is only one completion, use it directly.
    	    if (completions.length == 1) {
    	    	insert(completions[0].value); 
    	    	return true;
    	    }

    	    // Build the select widget
    	    var complete = document.createElement("div");
    	    complete.className = "javascript-console-completions";
    	    var sel = complete.appendChild(document.createElement("select"));
    	    // Opera doesn't move the selection when pressing up/down in a
    	    // multi-select, but it does properly support the size property on
    	    // single-selects, so no multi-select is necessary.
    	    if (!window.opera) sel.multiple = true;
    	    for (var i = 0; i < completions.length; ++i) {
    	      var opt = sel.appendChild(document.createElement("option"));
    	      opt.value = completions[i].value;
    	      
    	      var optText = completions[i].value;
    	      if (completions[i].info) {
    	    	  optText += " (" + completions[i].info + ")";
    	      }
    	      opt.appendChild(document.createTextNode(optText));
    	    }
    	    sel.firstChild.selected = true;
    	    sel.size = Math.min(10, completions.length);
    	    var pos = editor.cursorCoords();
    	    complete.style.left = pos.x + "px";
    	    complete.style.top = pos.yBot + "px";
    	    document.body.appendChild(complete);
    	    // Hack to hide the scrollbar.
    	    if (completions.length <= 10)
    	      complete.style.width = (sel.clientWidth - 1) + "px";

    	    var done = false;
    	    
    	    var fnClose = function() {
    	      if (done) return;
    	      done = true;
    	      complete.parentNode.removeChild(complete);
    	    }
    	    
    	    var fnPick = function() {
    	      insert(sel.options[sel.selectedIndex].value);
    	      fnClose();
    	      setTimeout(function(){editor.focus();}, 50);
    	    }
    	    
    	    Event.addListener(sel, "blur", fnClose, this, true);
    	    Event.addListener(sel, "keydown", function(event) {
    	      var code = event.keyCode;
    	      // Enter and space
    	      if (code == 13 || code == 32) {
    	    	  Event.stopEvent(event); 
    	    	  fnPick();
    	      }
    	      // Escape
    	      else if (code == 27 || code == 8) {
    	    	  Event.stopEvent(event); 
    	    	  fnClose(); 
    	    	  editor.focus();
    	      }
    	      //else if (code != 38 && code != 40) {
    	    	//  fnClose();
    	    	 // editor.focus(); 
    	    	  // FM: WHY?? setTimeout(this.onAutoComplete, 50);
    	      //}
    	    }, this, true);
    	    Event.addListener(sel, "dblclick", fnPick, this, true);

    	    sel.focus();
    	    // Opera sometimes ignores focusing a freshly created node
    	    if (window.opera) {
    	    	setTimeout(function(){
	    			if (!done) sel.focus();
	    		}, 100);
    	    }
    	    return true;    	  
    	  
      },
      
      
      /**
		 * Fired when the user clicks on the execute button. Reads the script
		 * from the input textarea and calls the execute webscript in the
		 * repository to run the script.
		 * 
		 * @method onExecuteClick
		 */      
      showResultTable: function ACJC_showResultTable(resultData)
      {
    	  var allFields = {};
    	  
    	  for (var row in resultData) {
    		  for (var fieldname in resultData[row]) {
    			  allFields[fieldname] = 1;
    		  }
    	  }

    	  var myColumnDefs = [];
    	  var responseSchemaFields = [];
    	  
    	  for (var fieldname in allFields) {
			  responseSchemaFields.push(fieldname);
			  myColumnDefs.push({key:fieldname, sortable:true, resizeable:true});
		  }

    	  if (myColumnDefs.length > 0) {
	    	  
		      var myDataSource = new YAHOO.util.DataSource(resultData); 
		      myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY; 
		      myDataSource.responseSchema = { 
		          fields: responseSchemaFields
		      }; 
		 
    		  Dom.setStyle(this.id + "-datatable", "display", "block");
    		  this.widgets.resultTable = new YAHOO.widget.DataTable(this.id + "-datatable", 
		              myColumnDefs, myDataSource, {draggableColumns:true});
    		  Dom.setStyle(this.widgets.exportResultsButton, "display", "inline-block");
   	  }
    	  else {
    		  Dom.setStyle(this.id + "-datatable", "display", "none");
    		  this.widgets.resultTable = null;
    		  Dom.setStyle(this.widgets.exportResultsButton, "display", "none");
    	  }
      },
      
      /**
       * Exports the datatable as CSV in a separate browser window
       * taken from http://stackoverflow.com/questions/2472424/exporting-data-from-a-yui-datatable
       */
      exportResultTableAsCSV : function() {
    	    var myDataTable = this.widgets.resultTable;
    	  
    	    if (myDataTable) {
	    	    var i, j, oData, newWin = window.open(),
	    	        aRecs = myDataTable.getRecordSet().getRecords(),
	    	        aCols = myDataTable.getColumnSet().keys;
	
	    	    newWin.document.write("<pre>");

    	        for (j=0; j<aCols.length; j++) {
    	            newWin.document.write( aCols[j].key + "\t");
    	        }
    	        newWin.document.write("\n");
	    	    
	    	    for (i=0; i<aRecs.length; i++) {
	    	        oData = aRecs[i].getData();
	
	    	        for (j=0; j<aCols.length; j++) {
	    	            newWin.document.write( oData[aCols[j].key] + "\t");
	    	        }
	    	        newWin.document.write("\n");
	
	    	    }
	
	    	    newWin.document.write("</pre>\n");
	    	    newWin.document.close();
    	    }
       },      
      
      /**
		 * Fired when the user clicks on the execute button. Reads the script
		 * from the input textarea and calls the execute webscript in the
		 * repository to run the script.
		 * 
		 * @method onExecuteClick
		 */      
      onExecuteClick: function ACJC_onExecuteClick(e, p_obj)
      {
    	// Save any changes done in CodeMirror editor before submitting
    	this.widgets.codeMirrorScript.save();
    	this.widgets.codeMirrorTemplate.save();
    	
    	// If something is selected, only get the selected part of the script
    	var scriptCode = "";
    	if (this.widgets.codeMirrorScript.somethingSelected()) {
    		scriptCode = this.widgets.codeMirrorScript.getSelection();
    	}
    	else {
    		scriptCode = this.widgets.scriptInput.value;
    	}
    	
    	templateCode = this.widgets.templateInput.value;
    	
    	// Build JSON Object to send to the server
   	  	var input = { 
     	   "script" : scriptCode,
     	   "template" : templateCode	,
           "spaceNodeRef" : this.widgets.nodeField.value,
           "transaction" : this.widgets.config.transaction.value ? this.widgets.config.transaction.value : "readwrite",
           "runas" : this.widgets.config.runas.value ? this.widgets.config.runas.value : "admin",
           "urlargs" : this.widgets.config.urlargs.value ? this.widgets.config.urlargs.value : "",
           "documentNodeRef" : this.options.documentNodeRef
   	  	};

   	  	// Disable the result textarea
   	  	this.widgets.scriptOutput.disabled = true;
   	    this.widgets.executeButton.disabled = true;

   	    this.executeStartTime = new Date();
   	    this.showLoadingAjaxSpinner(true);
   	    
   	  	Alfresco.util.Ajax.request(
         {
            url: Alfresco.constants.PROXY_URI + "de/fme/jsconsole/execute",
            method: Alfresco.util.Ajax.POST,
            dataObj: input,
            requestContentType: Alfresco.util.Ajax.JSON,
            successCallback:
            {
               fn: function(res) {
            	 this.showLoadingAjaxSpinner(false);
            	 this.printExecutionStats();
            	 this.clearOutput();
            	 this.appendLineArrayToOutput(res.json.printOutput);
            	 this.widgets.templateOutputHtml.innerHTML = res.json.renderedTemplate;
            	 this.widgets.templateOutputText.innerHTML = $html(res.json.renderedTemplate);
            		 
                 if (res.json.spaceNodeRef) {
                	 this.widgets.nodeField.value = res.json.spaceNodeRef;
                     this.widgets.pathField.innerHTML = res.json.spacePath;
                 }                 
                 this.widgets.scriptOutput.disabled = false;
                 this.widgets.templateOutputHtml.disabled = false;
                 this.widgets.templateOutputText.disabled = false;
           	     this.widgets.executeButton.disabled = false;
           	     
                 this.showResultTable(res.json.result);
               	 YAHOO.util.Dom.removeClass(this.widgets.scriptOutput, 'jserror'); 
               	 
               	 this.runLikeCrazy();
               },
               scope: this
            },
            failureCallback:
            {
               fn: function(res) {
            	 this.showLoadingAjaxSpinner(false);  
            	 this.printExecutionStats();
                 var result = YAHOO.lang.JSON.parse(res.serverResponse.responseText);
                		 
                 this.clearOutput();
                 this.setOutputText(result.status.code + " " + 
                		 result.status.name + "\n" +
                		 result.status.description + "\n" + result.message + "\n");

                 this.widgets.scriptOutput.disabled = false;
           	     this.widgets.executeButton.disabled = false;
               	 Dom.addClass(this.widgets.scriptOutput, 'jserror');
               	 this.widgets.outputTabs.selectTab(0); // show console tab               	 
              	 
               	 this.runLikeCrazy();
               },
               scope: this
            }
         });
	  },

	  runLikeCrazy : function() {
		 var me = this;
		 if (this.widgets.config.runlikecrazy.value > 0) {
			 window.setTimeout(function() {
				 me.onExecuteClick();
			 }, this.widgets.config.runlikecrazy.value);
		 };
	  },
	  
	  showLoadingAjaxSpinner : function(showSpinner) {
		  var spinner = Dom.get(this.id + "-spinner");
		  Dom.setStyle(spinner, "display", showSpinner ? "inline" : "none");
	  },
	  
	  printExecutionStats : function() {
		  this.executeEndTime = new Date();
		  var stats = Dom.get(this.id + "-executionStats");
		  var text = this.msg("label.stats.executed.in") +" "+ (this.executeEndTime - this.executeStartTime) + "ms";
          stats.innerHTML = '';
		  stats.appendChild(document.createTextNode(text));
	  },
	  
	  loadDemoScript: function ACJC_loadDemoScript() {
		  this.widgets.codeMirrorScript.setValue(
			'var nodes = search.luceneSearch("@name:alfresco");\n'+
			'\n'+
			'for each(var node in nodes) {\n'+
	        '    logger.log(node.name + " (" + node.typeShort + "): " + node.nodeRef);\n'+
	        '}\n');
	  },

	  loadDemoTemplate: function ACJC_loadDemoTemplate() {
		  this.widgets.codeMirrorTemplate.setValue('no template');
	  },
	  
      /**
		 * Fired when the user selects a script from the load scripts drop down
		 * menu. Calls a repository webscript to retrieve the script contents.
		 * 
		 * @method onLoadScriptClick
		 */ 	  
      onLoadScriptClick : function ACJC_onLoadScriptClick(p_sType, p_aArgs, self) { 
			 
          var callback = {
              success : function(o) {
        	  	  // set the new editor content
            	  self.widgets.codeMirrorScript.setValue(o.responseText);
              },
              failure: function(o) {
            	  text: self.msg("error.script.load", filename)
              },
              scope: this
          }

          var nodeRef = p_aArgs[1].value;
          
    	  if (nodeRef == "NEW") {
    		  self.loadDemoScript.call(self);
    	  }
    	  else {
    		  var url = Alfresco.constants.PROXY_URI + "api/node/content/" + nodeRef.replace("://","/");
    		  YAHOO.util.Connect.asyncRequest('GET', url, callback);
    	  }
       }, 

       saveAsExistingScript : function ACJC_saveAsExistingScript(filename, nodeRef) {
           Alfresco.util.Ajax.request({
        	   url: Alfresco.constants.PROXY_URI + "api/node/content/" + nodeRef.replace("://","/"),
        	   method: Alfresco.util.Ajax.PUT,
        	   dataStr: this.widgets.scriptInput.value,
        	   requestContentType: "text/javascript",
        	   successMessage: this.msg("message.save.successful", filename),
        	   failureMessage: this.msg("error.script.save", filename)
           });
       },
       
       saveAsNewScript : function ACJC_saveAsNewScript(filename) {
           Alfresco.util.Ajax.request({
        	   url: Alfresco.constants.PROXY_URI + "de/fme/jsconsole/createscript.json?name="+encodeURIComponent(filename),
        	   method: Alfresco.util.Ajax.PUT,
        	   dataStr: this.widgets.scriptInput.value,
        	   requestContentType: "text/javascript",
        	   successMessage: this.msg("message.save.successful", filename),
        	   failureMessage: this.msg("error.script.save", filename)
           });
       },
       
       /**
		 * Fired when the user selects a script from the save scripts drop down
		 * menu. Calls a repository webscript to store the script contents.
		 * 
		 * @method onLoadScriptClick
		 */ 	  
       onSaveScriptClick : function ACJC_onSaveScriptClick(p_sType, p_aArgs, self) { 
    	  self.widgets.codeMirrorScript.save();
    	   
    	  var menuItem = p_aArgs[1];
    	  var filename = menuItem.cfg.getProperty("text");
    	  var nodeRef = menuItem.value;

    	  if (nodeRef == "NEW") {
              Alfresco.util.PopupManager.getUserInput(
              {
            	  title: self.msg("title.save.choose.filename"),
            	  text: self.msg("message.save.choose.filename"),
            	  input: "text",
            	  callback: {
            		  fn: self.saveAsNewScript,
            		  obj: [ ],
            		  scope: self
                  }
              });                          
    	  } else {
              Alfresco.util.PopupManager.displayPrompt
              ({
                 title: self.msg("title.confirm.save"),
                 text: self.msg("message.confirm.save", filename),
                 buttons: [
                 {
                	 text: self.msg("button.save"),
                	 handler: function ACJC_onSaveScriptClick_save() 
                     {
                		 this.destroy();
                		 self.saveAsExistingScript(filename, nodeRef);
                     }
                 },
                 {
                	 text: self.msg("button.cancel"),
                	 handler: function ACJC_onSaveScriptClick_cancel()
                     {
                		 this.destroy();
                     },
                     isDefault: true
                 }]
              });    	   
    	  }
       }, 
       
      /**
		 * Dialog select destination button event handler
		 * 
		 * @method onSelectDestinationClick
		 * @param e
		 *            {object} DomEvent
		 * @param p_obj
		 *            {object} Object passed back from addListener method
		 */
      onSelectDestinationClick: function ACJC_onSelectDestinationClick(e, p_obj)
      {
         // Set up select destination dialog
         if (!this.widgets.destinationDialog)
         {
            this.widgets.destinationDialog = new Alfresco.module.DoclibGlobalFolder(this.id + "-selectDestination");

            var allowedViewModes =
            [
               Alfresco.module.DoclibGlobalFolder.VIEW_MODE_REPOSITORY
               // Alfresco.module.DoclibGlobalFolder.VIEW_MODE_SITE,
               // Alfresco.module.DoclibGlobalFolder.VIEW_MODE_USERHOME
            ];

            this.widgets.destinationDialog.setOptions(
            {
               allowedViewModes: allowedViewModes,
               siteId: this.options.siteId,
               containerId: this.options.containerId,
               title: this.msg("title.destinationDialog"),
               nodeRef: "alfresco://company/home"
            });
         }

         // Make sure correct path is expanded
         var pathNodeRef = this.widgets.nodeField.value;
         this.widgets.destinationDialog.setOptions(
         {
            pathNodeRef: pathNodeRef ? new Alfresco.util.NodeRef(pathNodeRef) : null              
         });

         // Show dialog
         this.widgets.destinationDialog.showDialog();
      }, 
 
      /**
		 * Folder selected in destination dialog
		 * 
		 * @method onDestinationSelected
		 * @param layer
		 *            {object} Event fired
		 * @param args
		 *            {array} Event parameters (depends on event type)
		 */
      onDestinationSelected: function ACJC_onDestinationSelected(layer, args)
      {
         // Check the event is directed towards this instance
        if ($hasEventInterest(this.widgets.destinationDialog, args))
        {
            var obj = args[1];
            if (obj !== null)
            {
               this.widgets.nodeField.value = obj.selectedFolder.nodeRef;
               this.widgets.pathField.innerHTML = obj.selectedFolder.path;
            }
        }
      }      
      
   });
})();
      


         
         
         
         
         




