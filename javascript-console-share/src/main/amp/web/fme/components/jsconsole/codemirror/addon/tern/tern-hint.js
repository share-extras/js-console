(function() {
  var server = null, defs = [];
  var Pos = CodeMirror.Pos;

  function TernState(cm, options) {
    this.options = options;
  }

  function parseOptions(options) {
    if (options instanceof Function) return {getText: options};
    else if (!options || !options.getText) throw new Error("Required option 'getText' missing (tern-hint addon)");
    return options;
  }

  function load(file, c) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", file, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4)
        c(xhr.responseText, xhr.status);
    };
  }

  CodeMirror.tern = {};
  CodeMirror.tern.addDef = function(def) {
    if (typeof def == "string") {
      load(def, function(json) {
        defs.push(JSON.parse(json));
      });
    } else {
      defs.push(def);
    }
  }

  function isWithDocs() {
    return CodeMirror.attachContextInfo;
  }

  function startsWith(str, token) {
    return str.slice(0, token.length).toUpperCase() == token.toUpperCase();
  }

  function getText(completion) {
    var text = completion.name;
    var type = completion.type;
    var returnType = null;
    if (startsWith(type, 'fn(')) {
      var bracket = 0;
      var afterStartFn = type.substring(2, type.length);
      var i = 0;
      for (i = 0; i < afterStartFn.length; i++) {
        var c = afterStartFn.charAt(i);
        if (c == '(') {
          bracket++;
        } else if (c == ')') {
          bracket--;
        }
        text += c;
        if (bracket == 0)
          break;
      }
      var afterEndFn = afterStartFn.substring(i + 1, afterStartFn.length);
      var returnTypeIndex = afterEndFn.lastIndexOf(' -> ');
      if (returnTypeIndex != -1) {
        returnType = afterEndFn.substring(returnTypeIndex + 4,
            afterEndFn.length);
      }
    } else {
      returnType = type;
    }
    if (returnType) {
      text += ' -> ' + returnType;
    }
    return text;
  }

  function getInsertText(completion) {
    var text = completion.name;
    var type = completion.type;
    var firstParam = null, currentParam = null, typeParsing = false;
    if (startsWith(type, 'fn(')) {
      text += '(';
      var bracket = 0;
      var afterStartFn = type.substring(2, type.length);
      var i = 0;
      for (i = 0; i < afterStartFn.length; i++) {
        var c = afterStartFn.charAt(i);
        switch (c) {
        case '(':
          bracket++;
          break;
        case ')':
          bracket--;
          break;
        default:
          if (bracket == 1) {
            if (typeParsing) {
              if (c == ',') typeParsing = false;
            } else {
              if (currentParam == null) {
                if (c != ' ' && c != '?') {
                  currentParam = c;
                }
              } else {
                if (c == ':') {
                  typeParsing = true;
                  if (firstParam == null) {
                    firstParam = currentParam;
                  } else {
                    text += ', ';
                  }
                  text += currentParam;
                  currentParam = null;
                } else {
                  if (c != ' ' && c != '?') {
                    currentParam += c;
                  }
                }
              }
            }
          }
        }
        if (bracket == 0)
          break;
      }
      text += ')';
    }
    text=text.replace(/[0-9]/g, '');

    return {
      "text" : text,
      "firstParam" : firstParam
    };
  }

  CodeMirror.ternHints = function(cm, c) {
    var req = buildRequest(cm, {
      type : "completions",
      caseInsensitive : true,
      types : true,
      docs : isWithDocs(),
      urls : isWithDocs()
    });

    var server = getServer();
    server
        .request(
            req,
            function(error, data) {
              if (error)
                return displayError(error);
              var completions = [], after = "";
              var from = data.start, to = data.end;
              if (cm.getRange(Pos(from.line, from.ch - 2), from) == "[\""
                  && cm.getRange(to, Pos(to.line, to.ch + 2)) != "\"]")
                after = "\"]";

              for ( var i = 0; i < data.completions.length; ++i) {
                var completion = data.completions[i], className = typeToIcon(completion.type);
                if (data.guess)
                  className += " Tern-completion-guess";
                var text = getText(completion);
                var item = {
                  "text" : text,
                  "className" : className,
                  "ternItem" : completion
                };
                item.hint = function(cm, data, completion) {
                  var from = Pos(data.from.line, data.from.ch);
                  var to = Pos(data.to.line, data.to.ch);
                  var inserText = getInsertText(completion.ternItem);
                  cm.replaceRange(inserText.text, from, to);
                  var firstParam = inserText.firstParam
                  if (firstParam != null) {
                    var name = completion.ternItem.name;
                    // the function to insert has parameters, select the first
                    // parameter.
                    cm.setSelection(Pos(data.from.line, data.from.ch + name.length
                        + 1), Pos(data.to.line, data.from.ch + name.length + 1
                        + firstParam.length));
                  }
                };
                item.info = function(completion) {
                  var ternItem = completion.ternItem;
                  var doc = ternItem.doc;
                  var url = ternItem.url;
                  var content = null;
                  if (doc || url) {
                    content = '<ul class="Tern-completion-doc" >'
                    if (doc)
                      content += '<li>' + doc + '</li>';
                    if (url) {
                      content += '<li>See <a href="' + url + '" target="_blank" >'
                          + url + '</a></li>';
                      /*
                       * content += '<li><iframe src="' + url + '" ></iframe></li>';
                       */
                    }
                    content += '</ul>'
                  }
                  return content;
                };
                completions.push(item);
              }

              // templates
              var token = cm.getRange(from, to);
              if (CodeMirror.templatesHint) {
                CodeMirror.templatesHint.getCompletions(cm, completions, token);
              }

              var data = {
                from : from,
                to : to,
                list : completions
              };

              if (CodeMirror.attachContextInfo) {
                // if context info is available, attach it
                CodeMirror.attachContextInfo(data);
              }
              c(data);
            });
  }

  function buildRequest(cm, query, allowFragments) {
    var text = null;
    if (cm.state && cm.state.tern) {
      text = cm.state.tern.options.getText(cm);
    } else {
      text = cm.getValue();
    }
    // files
    var files = [];
    files.push({
      type : "full",
      name : "cm-tern",
      text : text
    });
    // query
    query.lineCharPositions = true;
    if (query.end == null) {
      query.end = cm.getCursor("end");
      if (cm.somethingSelected())
        query.start = cm.getCursor("start");
    }
    query.file = "#0";
    return {
      query : query,
      files : files
    }
  }

  function displayError(err) {
    /*
     * var out = document.getElementById("out"); out.innerHTML = "";
     * out.appendChild(document.createTextNode(err.message || String(err)));
     */
    alert(err.message || String(err));
  }

  function typeToIcon(type) {
    var suffix;
    if (type == "?")
      suffix = "unknown";
    else if (type == "number" || type == "string" || type == "bool")
      suffix = type;
    else if (/^fn\(/.test(type))
      suffix = "fn";
    else if (/^\[/.test(type))
      suffix = "array";
    else
      suffix = "object";
    return "Tern-completion-" + suffix;
  }

  function getServer() {
    if (server == null) {
      server = new tern.Server({
        async : true,
        defs : defs,
        debug : true
      /*
       * , plugins: {requirejs: {}, doc_comment: true}
       */
      });
    }
    return server;
  }

  CodeMirror.defineOption("ternWith", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      delete cm.state.tern;
    }

    if (val) {
      var state = cm.state.tern = new TernState(cm, parseOptions(val));
    }
  });

})();
