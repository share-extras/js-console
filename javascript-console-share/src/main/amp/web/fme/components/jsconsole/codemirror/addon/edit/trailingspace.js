// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
    mod(CodeMirror);
})(function(CodeMirror) {
  CodeMirror.defineOption("showTrailingSpace", false, function(cm, val, prev) {
    if (prev == CodeMirror.Init) prev = false;
    if (prev && !val)
      cm.removeOverlay("trailingspace");
    else if (!prev && val)
      cm.addOverlay({
        token: function(stream) {
          for (var l = stream.string.length, i = l; i && /\s/.test(stream.string.charAt(i - 1)); --i) {}
          if (i > stream.pos) { stream.pos = i; return null; }
          stream.pos = l;
          return "trailingspace";
        },
        name: "trailingspace"
      });
  });
});
