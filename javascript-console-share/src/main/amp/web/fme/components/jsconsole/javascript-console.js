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
 * Array extension for indexOf if the browser does not support it.
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
      if (fromIndex == null) {
          fromIndex = 0;
      } else if (fromIndex < 0) {
          fromIndex = Math.max(0, this.length + fromIndex);
      }
      for (var i = fromIndex, j = this.length; i < j; i++) {
          if (this[i] === obj)
              return i;
      }
      return -1;
    };
 }


if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str){
      return this.indexOf(str) == 0;
    };
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
        	 parent.widgets.jsonOutput= Dom.get(parent.id + "-jsonOutput");
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

	   template: '<div class="display-element"><span class="display-label">{name}</span><span class="display-field">{value}</span></div>',

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
               var testString = "LSTEST12345";
               localStorage.setItem(testString, testString );
               localStorage.removeItem(testString);
	            return true;
	        } catch(e) {
	            return false;
	        }
	   },

	  createMenuButtons: function ACJC_createMenuButtons(listOfScripts) {

	      this.createThemeMenu();
	      this.createScriptsLoadMenu(listOfScripts);
	      this.createScriptsSaveMenu(listOfScripts);
	      this.createDocsMenu();

          this.widgets.exportResultsButton = Alfresco.util.createYUIButton(this,
        		  "exportResults-button", this.exportResultTableAsCSV);
		  Dom.setStyle(this.widgets.exportResultsButton, "display", "none");

	  },

	  createDocsMenu: function ACJC_createDocsMenu(){
	      if(!this.widgets.docsMenuButton){
    	      var docsMenuItems = [
               [ { text : "Mozilla Javascript Reference", url : "https://developer.mozilla.org/en/JavaScript/Reference", target:"_blank"},
                 { text : "W3Schools Javascript Reference", url : "http://www.w3schools.com/jsref/default.asp", target:"_blank"},
                 { text : "Alfresco 3.4 Javascript API", url : "http://wiki.alfresco.com/wiki/3.4_JavaScript_API", target:"_blank" },
                 { text : "Alfresco 3.4 Javascript Services API", url : "http://wiki.alfresco.com/wiki/3.4_JavaScript_Services_API", target:"_blank" },
                 { text : "Alfresco 4.0 Javascript API", url : "http://docs.alfresco.com/4.0/topic/com.alfresco.enterprise.doc/references/API-JS-Scripting-API.html", target:"_blank" },
                 { text : "Alfresco 4.0 Javascript Services API", url : "http://docs.alfresco.com/4.0/topic/com.alfresco.enterprise.doc/references/API-JS-Services.html", target:"_blank" },
                 { text : "Alfresco 4.1 Javascript API", url : "http://docs.alfresco.com/4.1/topic/com.alfresco.enterprise.doc/references/API-JS-Scripting-API.html", target:"_blank" },
                 { text : "Alfresco 4.1 Javascript Services API", url : "http://docs.alfresco.com/4.1/topic/com.alfresco.enterprise.doc/references/API-JS-Services.html", target:"_blank" },
                 { text : "Alfresco 4.2 Javascript API", url : "http://docs.alfresco.com/4.2/topic/com.alfresco.enterprise.doc/references/API-JS-Scripting-API.html", target:"_blank" },
                 { text : "Alfresco 4.2 Javascript Services API", url : "http://docs.alfresco.com/4.2/topic/com.alfresco.enterprise.doc/references/API-JS-Services.html", target:"_blank" },
                 { text : "Alfresco Javascript Cookbook", url : "http://wiki.alfresco.com/wiki/JavaScript_API_Cookbook", target:"_blank" }
               ],
               [
                 { text : "Alfresco Freemarker Template Guide", url : "http://wiki.alfresco.com/wiki/Template_Guide", target:"_blank"},
                 { text : "Alfresco Freemarker Template Cookbook", url : "http://wiki.alfresco.com/wiki/FreeMarker_Template_Cookbook", target:"_blank"},
                 { text : "Alfresco 4.0 API Reference", url : "http://docs.alfresco.com/4.0/index.jsp?topic=%2Fcom.alfresco.enterprise.doc%2Freferences%2FAPI-FreeMarker-intro.html", target:"_blank"},
                 { text : "Alfresco 4.1 API Reference", url : "http://docs.alfresco.com/4.1/index.jsp?topic=%2Fcom.alfresco.enterprise.doc%2Freferences%2FAPI-FreeMarker-intro.html", target:"_blank"},
                 { text : "Alfresco 4.2 API Reference", url : "http://docs.alfresco.com/4.2/index.jsp?topic=%2Fcom.alfresco.enterprise.doc%2Freferences%2FAPI-FreeMarker-intro.html", target:"_blank"},
                 { text : "Freemarker Manual", url : "http://freemarker.sourceforge.net/docs/index.html", target:"_blank"}
               ],
               [
                 { text : "Lucene Search Reference", url : "http://wiki.alfresco.com/wiki/Search", target:"_blank" },
                 { text : "Alfresco XPath Search", url : "http://wiki.alfresco.com/wiki/Search_Documentation", target:"_blank" }
               ],
               [
                 { text : "Webscripts Reference", url : "http://wiki.alfresco.com/wiki/Web_Scripts", target:"_blank" },
                 { text : "Webscripts Examples", url : "http://wiki.alfresco.com/wiki/Web_Scripts_Examples", target:"_blank" }
               ]

             ];

             this.widgets.docsMenuButton = new YAHOO.widget.Button({
                   id: "docsButton",
                   name: "docsButton",
                   label: this.msg("button.docs"),
                   type: "menu",
                   menu: docsMenuItems,
                   container: this.id + "-documentation"
             });

             this.widgets.docsMenuButton.getMenu().setItemGroupTitle("Javascript", 0);
             this.widgets.docsMenuButton.getMenu().setItemGroupTitle("Freemarker", 1);
             this.widgets.docsMenuButton.getMenu().setItemGroupTitle("Lucene", 2);
             this.widgets.docsMenuButton.getMenu().setItemGroupTitle("Webscripts", 3);
	      }
	  },

	  createScriptsSaveMenu: function(listOfScripts){
          var saveMenuItems = [{
              text : this.msg("button.save.create.new"),
              value : "NEW"
          }];

          saveMenuItems.push(listOfScripts);

          if(this.widgets.saveMenuButton){
              this.widgets.saveMenuButton.getMenu().clearContent();
              this.widgets.saveMenuButton.getMenu().addItems(saveMenuItems);
              this.widgets.saveMenuButton.getMenu().render(this.id + "-scriptsave");
          }else{
              this.widgets.saveMenuButton  = new YAHOO.widget.Button({
                  id: "saveButton",
                  name: "saveButton",
                  label: this.msg("button.save.script"),
                  type: "menu",
                  menu: saveMenuItems,
                  container: this.id + "-scriptsave"
              });
              this.widgets.saveMenuButton.getMenu().subscribe("click", this.onSaveScriptClick, this);
          }


	  },

	  createScriptsLoadMenu: function(listOfScripts){
	      var loadMenuItems = [{
              text : this.msg("button.load.create.new"),
              value : "NEW"
          }];

          loadMenuItems.push(listOfScripts);

          if(this.widgets.loadMenuButton){
              this.widgets.loadMenuButton.getMenu().clearContent();
              this.widgets.loadMenuButton.getMenu().addItems(loadMenuItems);
              this.widgets.loadMenuButton.getMenu().render(this.id + "-scriptload");
          }else{
              this.widgets.loadMenuButton = new YAHOO.widget.Button({
                  id: "loadButton",
                  name: "loadButton",
                  label: this.msg("button.load.script"),
                  type: "menu",
                  menu: loadMenuItems,
                  container: this.id + "-scriptload"
            });

            this.widgets.loadMenuButton.getMenu().subscribe("click", this.onLoadScriptClick, this);
          }
	  },

	  createThemeMenu: function ACJC_createThemeMenu(){
	       if(!this.widgets.themeMenuButton){
	            var themeMenuItems =   [ { text : "default",           value : "default"},
	                                     { text : "ambiance-mobile",   value : "ambiance-mobile"},
	                                     { text : "ambiance",          value : "ambiance"},
	                                     { text : "blackboard",        value : "blackboard"},
	                                     { text : "cobalt",            value : "cobalt"},
	                                     { text : "eclipse",           value : "eclipse"},
	                                     { text : "erlang-dark",       value : "erlang-dark"},
	                                     { text : "lesser-dark",       value : "lesser-dark"},
	                                     { text : "monokai",           value : "monokai"},
	                                     { text : "neat",              value : "neat"},
	                                     { text : "rubyblue",          value : "rubyblue"},
	                                     { text : "solarized",         value : "solarized"},
	                                     { text : "twilight",          value : "twilight"},
	                                     { text : "vibrant-ink",       value : "vibrant-ink"},
	                                     { text : "xq-dark",           value : "xq-dark"}
	                                     ];
	            this.widgets.themeMenuButton = new YAHOO.widget.Button({
	                  id: "themeButton",
	                  name: "themeButton",
	                  label: this.msg("button.codemirror.theme"),
	                  type: "menu",
	                  menu: themeMenuItems,
	                  container: this.id + "-theme"
	            });

	            if(this.browserSupportsHtml5Storage()){
	                // preselect item
	                var theme = window.localStorage["javascript.console.codemirror.theme"];
	                if(theme){
	                    var menuItems = this.widgets.themeMenuButton.getMenu().getItems();
	                    for ( var i = 0; i < menuItems.length; i++) {
	                        var menuItem = menuItems[i];
	                        if(theme==menuItem.cfg.getProperty('text')){
	                            menuItem.cfg.setProperty("checked", true);
	                        }
	                    }

	                }
	            }

	            this.widgets.themeMenuButton.getMenu().subscribe("click", this.onThemeSelection, this);
	        }
	  },

	  onEditorKeyEvent : function ACJC_onEditorKeyEvent(i, e) {
 		 // Hook into ctrl-enter
          if (e.type=="keyup" && e.keyCode == 13 && (e.ctrlKey || e.metaKey) && !e.altKey) {
	               e.stop();
	               i.owner.onExecuteClick(i.owner, e);
	         }

          // Hook into ctrl-z for Undo
          if (e.keyCode == 76 && (e.ctrlKey || e.metaKey) && !e.altKey) {
             e.stop();
             i.owner.widgets.codeMirrorScript.undo(i.owner, e);
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
         // Hook into ctrl+/ for Comment/Uncomment
         if (e.type=="keydown" && e.keyCode == 55 && (e.ctrlKey || e.metaKey) && !e.altKey) {
            e.stop();
            var editor = i.owner.widgets.codeMirrorScript;
            var code = editor.getSelection();
            if (code.substr(0,2) == "//") {
            	code = code.replace(/^\/\//gm, ""); // add a // before each line
            }
            else {
            	code = code.replace(/^/gm, "//"); // remove // comment before
                                                    // each line
            }
            editor.replaceSelection(code);
         }
         // Hook into ctrl+shift+F for js code format
         if (e.type=="keydown" && e.keyCode == 70 && (e.ctrlKey || e.metaKey) && !e.altKey) {
             e.stop();
             var editor = i.owner.widgets.codeMirrorScript;
             editor.setValue(js_beautify(editor.getValue()));
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
         this.javascriptCommands = new Object();

         function passAndHint(cm) {
             setTimeout(function() {cm.execCommand("autocomplete");}, 100);
             return CodeMirror.Pass;
           }
         function myHint(cm) {
             return CodeMirror.showHint(cm, CodeMirror.ternHint, {async: true});
           }

         CodeMirror.commands.autocomplete = function(cm) {
             CodeMirror.showHint(cm, myHint);
           }

         // Attach the CodeMirror highlighting
         var uiMirrorScript = new CodeMirrorUI(this.widgets.scriptInput, {imagePath:Alfresco.constants.URL_RESCONTEXT+'fme/components/jsconsole/codemirror-ui/images', searchMode:'no'} ,{
        	 mode : "javascript",
        	 styleActiveLine: true,
        	 showCursorWhenSelecting :true,
        	 gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
       	     lintWith: function(text){
       	         return CodeMirror.lint.javascript(text, self.javascriptCommands.globalMap);
       	     },
        	 lineNumbers: true,
             lineWrapping: true,
        	 matchBrackets: true,
        	 tabSize: 4,
             indentUnit: 4,
             indentWithTabs: true,
        	 autofocus :true,
        	 onKeyEvent: this.onEditorKeyEvent,
        	 extraKeys: {
        	     "'.'": passAndHint,
        	     "Ctrl-I": function(cm) { CodeMirror.tern.showType(cm); },
        	     "Ctrl-Space": "autocomplete"
        	 }
         });

         this.widgets.codeMirrorScript = uiMirrorScript.getMirrorInstance();
         this.widgets.codeMirrorScript.on("cursorActivity", function(cm){
             var currentLine = cm.getCursor().line+1;
             var column = cm.getCursor().ch;
             var results = CodeMirror.lint.javascript(cm.getDoc().getValue(), self.javascriptCommands.globalMap);
             var info = "Line "+currentLine +" \t - Column "+column+" \t - Errors/Warnings " +results.length;
             var text = YAHOO.util.Selector.query('.scriptStatusLine', null, true);
             text.innerHTML=info;
// CodeMirror.tern.updateArgHints(cm);
         });

         this.widgets.codeMirrorScript.getInputField().blur();

         var uiMirrorTemplate = new CodeMirrorUI(this.widgets.templateInput, {imagePath:Alfresco.constants.URL_RESCONTEXT+'fme/components/jsconsole/codemirror-ui/images', searchMode:'no'} , {
        	 lineNumbers: true,
             lineWrapping: true,
        	 mode:"freemarker",
        	 styleActiveLine: true,
             highlightSelectionMatches : true,
             showCursorWhenSelecting :true,
        	 matchBrackets: true,
        	 showTrailingSpace: true,
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
         this.widgets.codeMirrorTemplate = uiMirrorTemplate.getMirrorInstance();

         function showStatusInfo(cm, statusLineClass){
             var currentLine = cm.getCursor().line+1;
             var column = cm.getCursor().ch;
             var info = "Line "+currentLine +" \t - Column "+column;
             var text = YAHOO.util.Selector.query(statusLineClass, null, true);
             text.innerHTML=info;
         }

         this.widgets.codeMirrorTemplate.on("cursorActivity", function(cm){
             showStatusInfo(cm, '.templateStatusLine');
         });

         this.widgets.codeMirrorTemplate.getInputField().blur();


      // Attach the CodeMirror highlighting
         var uiMirrorJSON = new CodeMirrorUI(this.widgets.jsonOutput, {searchMode:'no', imagePath:Alfresco.constants.URL_RESCONTEXT+'fme/components/jsconsole/codemirror-ui/images'} , {
             mode : "application/json",
             styleActiveLine: true,
             readOnly: true,
             showCursorWhenSelecting :true,
             highlightSelectionMatches : true,
             gutters: ["CodeMirror-lint-markers"],
             lintWith: CodeMirror.jsonValidator,
             lineNumbers: true,
             lineWrapping: true,
             matchBrackets: true,
             onKeyEvent: this.onEditorKeyEvent
         });

         this.widgets.codeMirrorJSON = uiMirrorJSON.getMirrorInstance();
         this.widgets.codeMirrorJSON.on("cursorActivity", function(cm){
             showStatusInfo(cm, '.jsonStatusLine');
         });


         // Store this for use in event
         this.widgets.codeMirrorScript.owner = this;
         this.widgets.codeMirrorTemplate.owner = this;

         this.setupResizableEditor();

         this.widgets.inputTabs = new YAHOO.widget.TabView(this.id + "-inputTabs");
         this.widgets.outputTabs = new YAHOO.widget.TabView(this.id + "-outputTabs");

         // enable correct initialisation when navigating to the json editor
            // -> refresh when the tab changes to active.
         var jsonView = this.widgets.codeMirrorJSON;
         this.widgets.outputTabs.getTab(3).addListener("activeChange", function(event){
             if(event.newValue){
                 YAHOO.lang.later(50, undefined, function(){
                     jsonView.refresh();
                 });
             };
         });


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

         this.widgets.statsModule = new YAHOO.widget.Module("perfPanel", {visible:true, draggable:false, close:false } );

         var noExecEl = YAHOO.lang.substitute(this.template, {
            name:this.msg("label.stats.no.execution"),
            value:''
         });

         this.widgets.statsModule.setBody(noExecEl);
         this.widgets.statsModule.render(this.id + "-executionStats");

         var stats = Dom.get(this.id + "-executionStatsSimple");
         myTooltip = new YAHOO.widget.Tooltip("statsTooltip", {
             context: stats,
             text: "Please click for more details.",
             showDelay: 500
         });





         YAHOO.Bubbling.on("folderSelected", this.onDestinationSelected, this);

         // Store and Restore script content to and from local storage
    	 if (self.browserSupportsHtml5Storage()) {
             window.onbeforeunload = function(e) {
           		 self.widgets.codeMirrorScript.save();
           		 window.localStorage["javascript.console.script"] = self.widgets.scriptInput.value;
           		 self.widgets.codeMirrorTemplate.save();
           		 window.localStorage["javascript.console.template"] = self.widgets.templateInput.value;
           		 if(self.widgets.config.runas){
           		     window.localStorage["javascript.console.config.runas"] = self.widgets.config.runas.value;
           		 }
           		 if( self.widgets.config.transactions){
           		     window.localStorage["javascript.console.config.transactions"] = self.widgets.config.transactions.value;
           		 }

           		 if( self.widgets.config.urlarguments){
           		     window.localStorage["javascript.console.config.urlarguments"] = self.widgets.config.urlarguments.value;
           		 }
                 if( self.widgets.config.runlikecrazy){
                     window.localStorage["javascript.console.config.runlikecrazy"] = self.widgets.config.runlikecrazy.value;
                 }

           		 window.localStorage["javascript.console.codemirror.theme"]    = self.widgets.codeMirrorScript.options.theme;
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
                 var javascriptText = window.localStorage["javascript.console.script"];
            	 this.widgets.codeMirrorScript.setValue(javascriptText);
             }

             if (window.localStorage["javascript.console.template"]) {
            	 this.widgets.codeMirrorTemplate.setValue(window.localStorage["javascript.console.template"]);
             }

             if (window.localStorage["javascript.console.codemirror.theme"]) {
                 var theme = window.localStorage["javascript.console.codemirror.theme"];
                 this.widgets.codeMirrorScript.setOption('theme',theme);
                 this.widgets.codeMirrorTemplate.setOption('theme',theme);
             }


    	 }

    	 this.loadRepoScriptList();

         // Read Javascript API Commands for code completion
         Alfresco.util.Ajax.request(
         {
            url: Alfresco.constants.PROXY_URI + "de/fme/jsconsole/apicommands.json",
            method: Alfresco.util.Ajax.GET,
            requestContentType: Alfresco.util.Ajax.JSON,
            successCallback: {
            	fn: function(res) {
            		this.javascriptCommands = res.json;
                    this.javascriptCommands.globalMap={};
                    for ( var i = 0; i < this.javascriptCommands.global.length; i++) {
                        this.javascriptCommands.globalMap[this.javascriptCommands.global[i]]=false;
                    }
            	},
            	scope: this
            }
         });

         // Read Javascript API Commands for code completion
         Alfresco.util.Ajax.request(
         {
            url: Alfresco.constants.PROXY_URI + "/de/fme/jsconsole/serverInfo",
            method: Alfresco.util.Ajax.GET,
            requestContentType: Alfresco.util.Ajax.JSON,
            successCallback: {
                fn: function(res) {
                    var serverInfoAsJson = res.json;
                    Dom.addClass(this.widgets.scriptOutput, 'jsgreen');
                    this.widgets.scriptOutput.innerHTML="host:\t\t\t"+serverInfoAsJson.hostName+" ("+serverInfoAsJson.hostAddress+")\nversion:\t\t"+serverInfoAsJson.serverEdition+" "+serverInfoAsJson.serverVersion +" ("+serverInfoAsJson.serverSchema+")"
                    +"\ndocuments:\t\t"+serverInfoAsJson.docsCount+"(checked out:"+serverInfoAsJson.checkedOutCount+")\nfolder:\t\t\t"+serverInfoAsJson.folderCount+"\ngroups:\t\t\t"+serverInfoAsJson.groupsCount+"\nusers:\t\t\t"+serverInfoAsJson.peopleCount+"\nsites:\t\t\t"+serverInfoAsJson.sitesCount+"\ntags:\t\t\t"+serverInfoAsJson.tagsCount+"\nworkflowDefinitions:\t"+serverInfoAsJson.wflDefinitionCount;
                },
                scope: this
            }
         });



        /**
         * maps the alfresco specific type to a tern compatible type
         */
         function getTernType(propertyDataType, isMultiValued){
             if(propertyDataType==="d:text"){
                 if(isMultiValued){
                     type="[string]";
                 }else{
                     type="string";
                 }
             }else if(propertyDataType ==="d:noderef"){
                 if(isMultiValued){
                     type ="[ScriptNode]";
                 }else{
                     type ="ScriptNode";
                 }
             }else if(propertyDataType ==="d:category"){
                 if(isMultiValued){
                     type ="[CategoryNode]";
                 }else{
                     type ="CategoryNode";
                 }
             }else if (propertyDataType === "d:boolean"){
                 if(isMultiValued){
                     type ="[bool]";
                 }else{
                     type ="bool";
                 }
             }else if (propertyDataType === "d:date"||propertyDataType === "d:datetime"){
                 if(isMultiValued){
                     type ="[Date.prototype]";
                 }else{
                     type ="Date.prototype";
                 }
             }else if (propertyDataType === "d:int"||propertyDataType === "d:float"||propertyDataType === "d:double"||propertyDataType === "d:long"){
                 if(isMultiValued){
                     type ="[number]";
                 }else{
                     type ="number";
                 }
             }else if (propertyDataType === "d:content"){
                 if(isMultiValued){
                     type ="[ScriptContent]";
                 }else{
                     type ="ScriptContent";
                 }
             }else{
                 if(isMultiValued){
                     type="[?]";
                 }else{
                     type="?";
                 }
             }
             return type;
         }

         // Read the Alfresco Data Dictionary for code completion (types and
            // aspects)
         Alfresco.util.Ajax.request(
         {
            url: Alfresco.constants.PROXY_URI + "api/classes",
            method: Alfresco.util.Ajax.GET,
            requestContentType: Alfresco.util.Ajax.JSON,
            successCallback: {
            	fn: function(res) {
            		this.dictionary = res.json;
            		var templates= generateTemplates(this.dictionary);
                    var templateDefinitions = {
                            "name" : "alfresco_datatypes",
                            "context" : "javascript",
                            "templates" : templates
                    };
                    CodeMirror.templatesHint.addTemplates(templateDefinitions);
            	},
            	scope: this
            }
         });

         /**
             * generates the templates for properties, types and aspects. They
             * are available for autocompletion in the codemirror editor.
             */
         var generateTemplates = function generateTemplates(dictionary){

             var templates = new Array();
             var propertyNames = new Array();
             var assocNames = new Array();
             var ternProperties = new Object();

             for(var t in dictionary) {

                 var type= dictionary[t].isAspect ? "ASPECT" : "TYPE";
                 var name = dictionary[t].name;
                 var template =name.replace(/:/g,'_');

                 var templDescription ;

                 var title= dictionary[t].title;
                 templDescription = "title:\t\t\t\t" + title;

                 var description= dictionary[t].title;
                 templDescription+="\ndescription:\t\t"+description;

                 var isContainer= dictionary[t].isContainer;
                 templDescription+="\nisContainer:\t\t"+isContainer;

                 var parent = dictionary[t].parent;
                 if(parent){
                     templDescription += "\nparent:\t\t\t"+parent.name +"("+parent.title+")";
                 }

                 var defaultAspects = dictionary[t].defaultAspects;
                 if(defaultAspects){
                     templDescription += "\ndefaultAspects:\n";
                     for(var aspect in dictionary[t].defaultAspects) {
                         var aspectName= dictionary[t].defaultAspects[aspect].name;
                         var aspectTitle= dictionary[t].defaultAspects[aspect].title;
                         templDescription+="\t\t\t\t"+aspectName + "("+aspectTitle+")\n";
                     }
                 }

                 var properties = dictionary[t].properties;
                 if(properties){
                     templDescription += "\nproperties:\n";
                     for(var property in dictionary[t].properties) {
                         var propertyName= dictionary[t].properties[property].name;
                         var propertyDataType= dictionary[t].properties[property].dataType;

                         templDescription+="\t\t\t\t"+propertyName +" ("+propertyDataType+")\n";

                         var propertyInfo = dictionary[t].properties[property];

                         var propDescription ="title:\t\t\t\t"+propertyInfo.title+"\ndescription:\t\t\t"+propertyInfo.description+"\ndataType:\t\t\t"
                         +propertyInfo.dataType+"\ndefaultValue:\t\t"+propertyInfo.defaultValue+"\nmultivalued:\t\t"
                         +propertyInfo.multiValued+"\nmandatory:\t\t\t"+propertyInfo.mandatory+"\nenforced:\t\t\t"
                         +propertyInfo.enforced+"\nprotected:\t\t\t"+propertyInfo["protected"]+"\nindexed:\t\t\t"+propertyInfo.indexed;

                         var propertyTemplate = {
                                 "name" : "PROP_"+propertyInfo.name.replace(/:/g,'_').toUpperCase(),
                                 "description" : propDescription,
                                 "template" : propertyName,
                                 "className": "CodeMirror-hint-alfresco"
                         }

                         if(propertyNames.indexOf(propertyName)==-1){
                             templates.push(propertyTemplate);
                             propertyNames.push(propertyName);
                             var type = getTernType(propertyDataType, propertyInfo.multiValued);
                             ternProperties[propertyName] ={"!type":type,"!doc":propDescription};
                             if(propertyName.startsWith("cm:")){
                                 ternProperties[propertyName.replace(/^cm\:/,"")] ={"!type":type,"!doc":propDescription};
                             };
                         }
                     }
                 }

                 var associations = dictionary[t].associations;
                 if(associations){
                     templDescription += "\nassociations:\n";
                     for(var association in dictionary[t].associations) {
                         var assocName= dictionary[t].associations[association].name;
                         var assocTitle= dictionary[t].associations[association].title;
                         templDescription+="\t\t\t\t"+assocName + "("+assocTitle+")\n";

                         var assocInfo = dictionary[t].associations[assocName];

                         var sourceClass= dictionary[t].associations[assocName].source["class"];
                         var sourceMandatory= dictionary[t].associations[assocName].source["mandatory"];
                         var sourceMany= dictionary[t].associations[assocName].source["many"];

                         var targetClass= dictionary[t].associations[assocName].target["class"];
                         var targetMandatory= dictionary[t].associations[assocName].target["mandatory"];
                         var targetMany= dictionary[t].associations[assocName].target["many"];

                         var assocDescription ="isChildAssoc:\t\tfalse\ntitle:\t\t\t\t"+assocInfo.title+"\nsource:\t\t\t"+
                         "\n\tclass:\t\t"+sourceClass+"\n\tmandatory:\t"
                         +sourceMandatory+"\n\tmany:\t\t"+sourceMany+"\ntarget:\t\t"+
                         "\n\tclass:\t\t"+targetClass+"\n\tmandatory:\t"
                         +targetMandatory+"\n\tmany:\t\t"+targetMany;

                         var assocTemplate = {
                                 "name" : "ASSOC_"+assocInfo.name.replace(/:/g,'_').toUpperCase(),
                                 "description" : assocDescription,
                                 "template" : assocName,
                                 "className": "CodeMirror-hint-alfresco"
                         }


                         if(assocNames.indexOf(assocName)==-1){
                             templates.push(assocTemplate);
                             assocNames.push(assocName);
                         }

                     }
                 }

                 var childAssocs= dictionary[t].childassociations;
                 if(childAssocs){
                     templDescription += "\nchildassociations:\n";
                     for(var association in dictionary[t].childassociations) {
                         var assocName= dictionary[t].childassociations[association].name;
                         var assocTitle= dictionary[t].childassociations[association].title;
                         templDescription+="\t\t\t\t"+assocName + "("+assocTitle+")\n";

                         var assocInfo = dictionary[t].childassociations[assocName];

                         var sourceClass= dictionary[t].childassociations[assocName].source["class"];
                         var sourceMandatory= dictionary[t].childassociations[assocName].source["mandatory"];
                         var sourceMany= dictionary[t].childassociations[assocName].source["many"];

                         var targetClass= dictionary[t].childassociations[assocName].target["class"];
                         var targetMandatory= dictionary[t].childassociations[assocName].target["mandatory"];
                         var targetMany= dictionary[t].childassociations[assocName].target["many"];

                         var assocDescription ="isChildAssoc:\t\ttrue\ntitle:\t\t\t\t"+assocInfo.title+"\nsource:\t\t"+
                         "\n\tclass:\t\t"+sourceClass+"\n\tmandatory:\t"
                         +sourceMandatory+"\n\tmany:\t\t"+sourceMany+"\ntarget:\t\t\t"+
                         "\n\tclass:\t\t"+targetClass+"\n\tmandatory:\t"
                         +targetMandatory+"\n\tmany:\t\t"+targetMany;

                         var assocTemplate = {
                                 "name" : "ASSOC_"+assocInfo.name.replace(/:/g,'_').toUpperCase(),
                                 "description" : assocDescription,
                                 "template" : assocName,
                                 "className": "CodeMirror-hint-alfresco"
                         }

                         if(assocNames.indexOf(assocName)==-1){
                             templates.push(assocTemplate);
                             assocNames.push(assocName);
                         }
                     }
                 }


                 var templateName = type+"_"+template;
                 var template = {
                         "name" : templateName.toUpperCase(),
                         "description" : templDescription,
                         "template" : name,
                         "className": "CodeMirror-hint-alfresco"
                 }

                 templates.push(template);
             };

             var propertyMap = {
                     "!type": "fn()",
                     "prototype": ternProperties,
             };

             CodeMirror.tern.getDef()[1].Properties=propertyMap;

             templates.sort(function(a,b){
                 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                 if (nameA < nameB) // sort string ascending
                  return -1
                 if (nameA > nameB)
                  return 1
                 return 0 // default return value (no sorting)
             });

             return templates;

         }

   // Read the Alfresco workflow definitions for code completion (types and
      // aspects)
   Alfresco.util.Ajax.request(
   {
      url: Alfresco.constants.PROXY_URI + "api/workflow-definitions",
      method: Alfresco.util.Ajax.GET,
      requestContentType: Alfresco.util.Ajax.JSON,
      successCallback: {
          fn: function(res) {
              this.definitions= res.json.data;
              var templates= generateWorkflowDefinitionTemplates(this.definitions);
              var templateDefinitions = {
                      "name" : "alfresco_wfl_templates",
                      "context" : "javascript",
                      "templates" : templates
              };
              CodeMirror.templatesHint.addTemplates(templateDefinitions);
          },
          scope: this
      }
   });

   /**
    * generates the templates for properties, types and aspects. They are
    * available for autocompletion in the codemirror editor.
    */
  var generateWorkflowDefinitionTemplates = function generateWorkflowDefinitionTemplates(definitions){

      var templates = new Array();
      for(var t in definitions) {

          var type= definitions[t].name.startsWith("activiti") ? "ACTIVITI" : "JBPM";
          var name = definitions[t].name;
          var template =name.replace(/\$/g,'_');

          var id= definitions[t].id;
          var templDescription ;

          var title= definitions[t].title;
          templDescription = "id:\t\t\t" + id;

          var title= definitions[t].title;
          templDescription+= "\ntitle:\t\t\t" + title;

          var description= definitions[t].description;
          templDescription+=" \ndescription: \t"+description;

          var version= definitions[t].version;
          templDescription+=" \nversion: \t\t"+version;

          var templateName = "WFL_"+template;
          var template = {
                  "name" : templateName.toUpperCase(),
                  "description" : templDescription,
                  "template" : name,
                  "className": "CodeMirror-hint-alfresco"
          }

          templates.push(template);
      };

      templates.sort(function(a,b){
          var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
          if (nameA < nameB) // sort string ascending
           return -1
          if (nameA > nameB)
           return 1
          return 0 // default return value (no sorting)
      });
      return templates;

  }


       // Read the Alfresco workflow definitions for code completion (types and
       // aspects)
    Alfresco.util.Ajax.request(
    {
       url: Alfresco.constants.PROXY_URI + "api/actiondefinitions",
       method: Alfresco.util.Ajax.GET,
       requestContentType: Alfresco.util.Ajax.JSON,
       successCallback: {
           fn: function(res) {
               this.definitions= res.json.data;
               var templates= generateActionDefinitionTemplates(this.definitions);
               var templateDefinitions = {
                       "name" : "alfresco_action_templates",
                       "context" : "javascript",
                       "templates" : templates
               };
               CodeMirror.templatesHint.addTemplates(templateDefinitions);
           },
           scope: this
       }
    }
   );

   /**
     * generates the action templates
     */
   var generateActionDefinitionTemplates = function generateActionDefinitionTemplates(definitions){

       var ternProperties = new Object();
       var templates = new Array();
       for(var t in definitions) {

           var name = definitions[t].name;
           var templDescription="name:\t\t\t\t"+name;
           templDescription+="\ndisplayLabel:\t\t\t" + definitions[t].displayLabel;
           templDescription+="\ndescription:\t\t\t\t"+definitions[t].description;
           templDescription+="\nadHocPropertiesAllowed:\t"+definitions[t].adHocPropertiesAllowed;
           templDescription+="\nparameters:\n";
           for(var property in definitions[t].parameterDefinitions) {
               var param = definitions[t].parameterDefinitions[property];
               var propertyName= param.name;
               var propertyType= param.type;
               templDescription+="\t\t\t\t\t"+propertyName +" ("+propertyType+")\n";

               var paramDescription ="action:\t\t\t"+name+"\nname:\t\t\t"+param.name+"\ndisplayLabel:\t\t"+param.displayLabel+"\ntype:\t\t\t\t"
               +param.type+"\nmultiValued:\t\t"+param.isMultiValued+"\nmandatory:\t\t\t"+param.isMandatory +"\nconstraint:\t\t\t"+param.constraint;

               var type = getTernType(propertyType, param.isMultiValued);
               var existingTernProperty =ternProperties[propertyName];
               if(existingTernProperty){
                   existingTernProperty["!doc"] = existingTernProperty["!doc"]+"\n-------------------------------------\n" + paramDescription;
               }else{
                   ternProperties[propertyName]={"!type":type,"!doc":paramDescription};
               }
           }

           var templateName = "ACTION_"+name;
           var template = {
                   "name" : templateName.toUpperCase(),
                   "description" : templDescription,
                   "template" : name,
                   "className": "CodeMirror-hint-alfresco"
           }

           templates.push(template);
       };

       var actionParameter = {
               "!type": "fn()",
               "prototype": ternProperties,
       };

       CodeMirror.tern.getDef()[1].actionParameters=actionParameter;

       templates.sort(function(a,b){
           var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
           if (nameA < nameB) // sort string ascending
            return -1
           if (nameA > nameB)
            return 1
           return 0 // default return value (no sorting)
       });

       return templates;

   }


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

// var help = [
// '%+r **** termlib.js text wrap sample **** %-r',
// ' ',
// ' * type "clear" to clear the screen.',
// ' * type "help" to see this page.',
// ' * type "exit" to quit.',
// ' '
// ]
// var term = new Terminal(
// {
// x: 0,
// y: 33,
// termDiv: 'termDiv',
// bgColor: '#232e45',
// greeting: help.join('%n'),
// handler: termHandler,
// exitHandler: termExitHandler,
// wrapping: true
// }
// );
//
// term.open();
// term.cursorOff();
//
// function termExitHandler() {
// // // reset the UI
// // var mainPane = (document.getElementById)?
// // document.getElementById('mainPane') : document.all.mainPane;
// // if (mainPane) mainPane.className = 'lh15';
// }
//
// function termHandler() {
// // default handler + exit
// this.newLine();
// if (this.lineBuffer.match(/^\s*clear\s*$/i)) {
// this.clear();
// }
// else if (this.lineBuffer.match(/^\s*help\s*$/i)) {
// this.clear();
// this.write(help);
// }
// else if (this.lineBuffer != '') {
// // echo with write for wrapping, but escape any mark-up
// this.write(this.lineBuffer.replace(/%/g, '%%'));
// this.newLine();
// }
// this.prompt();
// }


      },

      loadRepoScriptList: function(){
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
      },

      setupResizableEditor: function() {
    	  var me = this;

          var codeMirrorScript = this.widgets.codeMirrorScript;
          var codeMirrorTemplate = this.widgets.codeMirrorTemplate;

          var resize = new YAHOO.util.Resize(this.id + "-inputContentArea", { handles : ["b"] });

 	     resize.on('resize', function(ev) {
             var h = ev.height;

             codeMirrorScript.setSize(null, h-50);
             codeMirrorTemplate.setSize(null,h-50);

  	         Dom.setStyle(me.id + "-inputContentArea", "width", "inherit");
 	     });

 	     resize.on('endResize', function(ev) {
             var h = ev.height;

             codeMirrorScript.setSize(null, h-50);
             codeMirrorTemplate.setSize(null,h-50);

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
         * Exports the datatable as CSV in a separate browser window taken from
         * http://stackoverflow.com/questions/2472424/exporting-data-from-a-yui-datatable
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

   	    this.showLoadingAjaxSpinner(true);

   	    this.executeStartTime = new Date();

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
            	 this.printExecutionStats(res.json);
            	 this.clearOutput();
            	 this.appendLineArrayToOutput(res.json.printOutput);
            	 this.widgets.templateOutputHtml.innerHTML = res.json.renderedTemplate;
            	 this.widgets.templateOutputText.innerHTML = $html(res.json.renderedTemplate);
            	 this.widgets.codeMirrorJSON.setValue(formatter.formatJson(res.json.renderedTemplate,"  "));
            	 this.widgets.codeMirrorJSON.focus();

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
               	 Dom.addClass(this.widgets.scriptOutput, 'jsgreen');

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

            	 this.markJSError(result);
            	 this.markFreemarkerError(result);

                 this.clearOutput();
                 this.setOutputText(result.status.code + " " +
                 result.status.name + "\nStacktrace-Details:\n"+result.callstack[1]+"\n\n"+
                 result.status.description + "\n" + result.message);

                 this.widgets.scriptOutput.disabled = false;
           	     this.widgets.executeButton.disabled = false;
                 Dom.removeClass(this.widgets.scriptOutput, 'jsgreen');
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

	  /**
         * marks the error in the code mirror editor if there is any line hint
         * in the error message.
         */
	  markJSError: function(result){
          var regex= /js#([\d+])+/;
          var callStackLineIndicator = regex.exec(result.callstack[1]);
          if(callStackLineIndicator){
              // show the javascript window
              this.widgets.inputTabs.selectTab(0);
              this.widgets.codeMirrorScript.focus();

              // create a marker for the editor to indicate that there was an
                // error!
              var line = callStackLineIndicator[1]-1;
              if(this.widgets.codeMirrorScript.somethingSelected()){
                  line = line + this.widgets.codeMirrorScript.getCursor().line-1;
              }
              var selectionEnd = this.widgets.codeMirrorScript.getLineHandle(line).text.length;
              var from={"line":line,"ch":0};
              var to={"line":line,"ch":selectionEnd};
              this.widgets.codeMirrorScript.markText(from,to,{clearOnEnter:"true",className: "CodeMirror-lint-mark-error", __annotation: {from:from, to:to, severity:"error", message:result.callstack[1]}});

          }
	  },

	  /**
         * marks the error in the code mirror editor if there is any line hint
         * in the error message.
         */
	  markFreemarkerError: function(result){
	      var callstack = result.callstack;
	      if(callstack){
	          for ( var i = 0; i < callstack.length; i++) {

                regex = /line (\d*), column (\d*)/;
                callStackLineIndicator = regex.exec(callstack[i]);
                if(callStackLineIndicator){
                    this.widgets.inputTabs.selectTab(1);
                    this.widgets.codeMirrorTemplate.focus();
                    var line = callStackLineIndicator[1]-1;
                    var selectionEnd = this.widgets.codeMirrorTemplate.getLineHandle(line).text.length;
                    this.widgets.codeMirrorTemplate.markText({"line":line,"ch":0},{"line":line,"ch":selectionEnd},{clearOnEnter:"true",className: "CodeMirror-lint-span-error" ,__annotation: {message:callstack[i]}});
                    break;
                }
	          }
	      }
      },

	  showLoadingAjaxSpinner : function(showSpinner) {
		  var spinner = Dom.get(this.id + "-spinner");
		  Dom.setStyle(spinner, "display", showSpinner ? "inline" : "none");
	  },

	  printExecutionStats : function(json) {
		  this.executeEndTime = new Date();
		  var overallPerf = this.executeEndTime - this.executeStartTime;

          var stats = Dom.get(this.id + "-executionStatsSimple");
          var text = " - "+this.msg("label.stats.executed.last") +" "+ (overallPerf) + "ms";
          stats.innerHTML = '';
          stats.appendChild(document.createTextNode(text));

          if(!YAHOO.util.Event.getListeners(stats,"click")){
              YAHOO.util.Event.on(stats, "click", function(){
                  this.widgets.outputTabs.selectTab(4);
                  var stats = Dom.get(this.id + "-executionStatsSimple");
              }, null, this);
          };

		  var webscriptPerf="-";
		  var fmPerf="-";
		  var scriptPerf="-";
		  var networkPerf="-";
		  var serverCodePerf ="-";

		  if(json){
		      scriptPerf = json.scriptPerf;
	          fmPerf = json.freemarkerPerf;

	          if(fmPerf === undefined){
	              fmPerf = 0;
	          }

	          webscriptPerf = json.webscriptPerf;
	          serverCodePerf = webscriptPerf - scriptPerf - fmPerf;

	          networkPerf = overallPerf - webscriptPerf;
		  }

		  var overallEl = YAHOO.lang.substitute(this.template, {
		     name:this.msg("label.stats.executed.in"),
		     value:overallPerf + "ms"
		  });

          var scriptEl = YAHOO.lang.substitute(this.template, {
              name:this.msg("label.stats.jscript.executed.in"),
              value:scriptPerf + "ms"
           });

          var fmEl = YAHOO.lang.substitute(this.template, {
              name:this.msg("label.stats.freemarker.executed.in"),
              value:fmPerf + "ms"
           });

          var codeEl = YAHOO.lang.substitute(this.template, {
              name:this.msg("label.stats.serverCode.executed.in"),
              value:serverCodePerf + "ms"
           });

          var networkEl = YAHOO.lang.substitute(this.template, {
              name:this.msg("label.stats.network.executed.in"),
              value:networkPerf + "ms"
           });

		  var text = overallEl+scriptEl+fmEl+codeEl+networkEl;

 		  this.widgets.statsModule.setBody(text);
	  },

	  loadDemoScript: function ACJC_loadDemoScript() {
		  this.widgets.codeMirrorScript.setValue(
			'var nodes = search.luceneSearch(\'@name:alfresco\');\n'+
			'\n'+
			'for each(var node in nodes) {\n'+
	        '    logger.log(node.name + \' (\' + node.typeShort + \'): \' + node.nodeRef);\n'+
	        '}\n');
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

          var callbackFreemarker = {
                  success : function(o) {
                      // set the new editor content
                      self.widgets.codeMirrorTemplate.setValue(o.responseText);
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
    		  var url = Alfresco.constants.PROXY_URI + "api/node/content;jsc:freemarkerScript/" + nodeRef.replace("://","/");
              YAHOO.util.Connect.asyncRequest('GET', url, callbackFreemarker);
    	  }
       },

       /**
         * Fired when the user selects a theme from the theme drop down menu.
         * Changes the theme of all code mirror editors.
         *
         * @method onLoadScriptClick
         */
       onThemeSelection : function ACJC_onThemeSelection(p_sType, p_aArgs, self) {
           var theme = p_aArgs[1].value;
           self.widgets.codeMirrorScript.setOption("theme", theme);
           self.widgets.codeMirrorTemplate.setOption("theme", theme);
      },



       saveAsExistingScript : function ACJC_saveAsExistingScript(filename, nodeRef) {
           Alfresco.util.Ajax.request({
               url: Alfresco.constants.PROXY_URI + "de/fme/jsconsole/savescript.json?name="+encodeURIComponent(filename)+"&isUpdate=true",
               method: Alfresco.util.Ajax.PUT,
               dataStr: YAHOO.lang.JSON.stringify({'jsScript':this.widgets.codeMirrorScript.getValue(), 'fmScript':this.widgets.codeMirrorTemplate.getValue()}),
               requestContentType: "application/json; charset=utf-8",
               successCallback: {
                   fn: function(res) {
                       Alfresco.util.PopupManager.displayMessage({
                           text: this.msg("message.save.successful", filename)
                       });
                       var listOfScripts = res.json.scripts;
                       this.createMenuButtons(listOfScripts);
                   },
                   scope: this
               },
               failureMessage: this.msg("error.script.save", filename)
           });
       },

       saveAsNewScript : function ACJC_saveAsNewScript(filename) {
           Alfresco.util.Ajax.request({
        	   url: Alfresco.constants.PROXY_URI + "de/fme/jsconsole/savescript.json?name="+encodeURIComponent(filename)+"&isUpdate=false",
        	   method: Alfresco.util.Ajax.PUT,
        	   dataStr: YAHOO.lang.JSON.stringify({'jsScript':this.widgets.codeMirrorScript.getValue(), 'fmScript':this.widgets.codeMirrorTemplate.getValue()}),
        	   requestContentType: "application/json; charset=utf-8",
        	   successCallback: {
                   fn: function(res) {
                       Alfresco.util.PopupManager.displayMessage({
                           text: this.msg("message.save.successful", filename)
                       });

                       var listOfScripts = res.json.scripts;
                       this.createMenuButtons(listOfScripts);
                   },
                   scope: this
               },
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

   function forEach(arr, f) {
       for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
     }

     function arrayContains(arr, item) {
       if (!Array.prototype.indexOf) {
         var i = arr.length;
         while (i--) {
           if (arr[i] === item) {
             return true;
           }
         }
         return false;
       }
       return arr.indexOf(item) != -1;
     }


})();












