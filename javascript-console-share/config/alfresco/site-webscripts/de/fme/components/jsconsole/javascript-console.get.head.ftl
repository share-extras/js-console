<#include "../../../../org/alfresco/components/component.head.inc">
<!-- Admin Console Javascript Console -->
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/javascript-console.css" />
<@script type="text/javascript" src="${page.url.context}/res/components/console/consoletool.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/javascript-console.js"></@script>
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/modules/documentlibrary/global-folder.css" />
<@script type="text/javascript" src="${page.url.context}/res/modules/documentlibrary/global-folder.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/beautify.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/codemirror.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/match-highlighter.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/active-line.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/jshint_fme.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/lint.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/javascript-lint.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/jsonlint.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/json-validator.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/json-formatter.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/closebrackets.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/matchbrackets.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/show-hint.js"></@script>

<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/dialog.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/searchcursor.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/search.js"></@script>

<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/javascript.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/xml.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/codemirror/htmlmixed.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/yui/resize/resize.js"></@script>

<!--<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/js-logtail/jquery.min.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/fme/components/jsconsole/js-logtail/logtail.js"></@script>
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/js-logtail/logtail.css" />-->


<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/codemirror.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/default.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/lint.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/show-hint.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/addon/dialog.css" />

<!-- themes -->
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/neat.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/elegant.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/erlang-dark.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/night.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/monokai.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/cobalt.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/eclipse.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/rubyblue.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/lesser-dark.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/xq-dark.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/ambiance.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/blackboard.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/vibrant-ink.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/solarized.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/fme/components/jsconsole/codemirror/theme/twilight.css" />
