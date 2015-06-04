// A number of additional default bindings that are too obscure to
// include in the core codemirror.js file.

(function() {
  "use strict";

  var Pos = CodeMirror.Pos;

  function moveLines(cm, start, end, dist) {
    if (!dist || start > end) return 0;

    var from = cm.clipPos(new Pos(start, 0)), to = cm.clipPos(new Pos(end));
    var text = cm.getRange(from, to);

    if (start <= cm.firstLine())
      cm.replaceRange("", from, new Pos(to.line + 1, 0));
    else
      cm.replaceRange("", new Pos(from.line - 1), to);
    var target = from.line + dist;
    if (target <= cm.firstLine()) {
      cm.replaceRange(text + "\n", new Pos(target, 0));
      return cm.firstLine() - from.line;
    } else {
      var targetPos = cm.clipPos(new Pos(target - 1));
      cm.replaceRange("\n" + text, targetPos);
      return targetPos.line + 1 - from.line;
    }
  }

  function moveSelectedLines(cm, dist) {
    var head = cm.getCursor("head"), anchor = cm.getCursor("anchor");
    cm.operation(function() {
      var moved = moveLines(cm, Math.min(head.line, anchor.line), Math.max(head.line, anchor.line), dist);
      cm.setSelection(new Pos(anchor.line + moved, anchor.ch), Pos(head.line + moved, head.ch));
    });
  }

  function duplicateLine(cm,dest) {
      if(dest==1){
          var previousLine =cm.getCursor().line-1;
          var currentLine = cm.getCursor().line;
          if(previousLine<0){
              previousLine =0;
              currentLine=1;
          }
          cm.setLine(previousLine, cm.getLine(previousLine)+"\n"+cm.getLine(currentLine));
          if(previousLine===0){
              cm.setCursor(previousLine);
          }else{
              cm.setCursor(currentLine);
          }
      }else{
          var nextLine =cm.getCursor().line+1;
          var currentLine = cm.getCursor().line;
          cm.setLine(nextLine, cm.getLine(currentLine)+"\n"+cm.getLine(nextLine));
          cm.setCursor(nextLine);
      }
    }

  function deleteAndKill(cm) {
      var currentLineContent = cm.getLine(cm.getCursor().line);
      if(currentLineContent.length>0){
          CodeMirror.commands.deleteLine(cm);
      }else{
          CodeMirror.commands.killLine(cm);
      }
    }

  CodeMirror.commands.moveLinesUp = function(cm) { moveSelectedLines(cm, -1); };
  CodeMirror.commands.moveLinesDown = function(cm) { moveSelectedLines(cm, 1); };
  CodeMirror.commands.duplicateLineUp = function(cm) { duplicateLine(cm, 1); };
  CodeMirror.commands.duplicateLineDown = function(cm) { duplicateLine(cm, -1); };
  CodeMirror.commands.deleteAndKill = function(cm) { deleteAndKill(cm); };

  CodeMirror.keyMap["default"]["Ctrl-Alt-Up"] = "duplicateLineUp";
  CodeMirror.keyMap["default"]["Ctrl-Alt-Down"] = "duplicateLineDown";
  CodeMirror.keyMap["default"]["Alt-Up"] = "moveLinesUp";
  CodeMirror.keyMap["default"]["Alt-Down"] = "moveLinesDown";
  CodeMirror.keyMap["default"]["Ctrl-D"] = "deleteAndKill";
})();
