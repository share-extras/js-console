<!--[if IE]>
<iframe id="yui-history-iframe" src="${url.context}/res/yui/history/assets/blank.html"></iframe>
<![endif]-->
<input id="yui-history-field" type="hidden" />

<#assign el=args.htmlid?html>
<script type="text/javascript">//<![CDATA[
   new Fme.JavascriptConsole("${el}").setMessages(${messages});
//]]></script>

<div id="${el}-body" class="javascript-console">

	<div id="${el}-main" class="hidden">
	    <div class="buttonbar">

	    	<div class="scriptmenu">
				<div id="${el}-scriptload"></div>
	    	</div>
	    	<div class="scriptmenu">
				<div id="${el}-scriptsave"></div>
	    	</div>
	    	<div class="scriptmenu">
				<div id="${el}-documentation"></div>
	    	</div>
	    	<div class="scriptmenu">
				<div id="${el}-theme"></div>
	    	</div>

	    	<span id="${el}-pathDisplay" style="line-height:2em;">
				${msg("label.run.with")} <b>var space = </b>
				<span id="${el}-pathField" name="pathField" value=""></span>
				<input id="${el}-nodeRef" type="hidden" name="spaceNodeRef" value=""/>
				<button id="${el}-selectDestination-button" tabindex="0">${msg("button.select")}</button>
			</span>
			<span id="${el}-documentDisplay" style="display:none;white-space:nowrap;line-height:2em;">
				<b>var document = </b><span id="${el}-documentField" name="documentField" value=""></span>
			</span>
		</div>
		<div id="${el}-inputTabs" class="yui-navset">
		    <ul class="yui-nav">
		        <li class="selected"><a href="#itab1"><em>${msg("tab.label.javascript.input")}</em></a></li>
		        <li><a href="#itab2"><em>${msg("tab.label.freemarker.input")}</em></a></li>
		        <li><a href="#itab3"><em>${msg("tab.label.script.execution.parameters")}</em></a></li>
		    </ul>
		    <div id="${el}-inputContentArea" class="yui-content">
		        <div>

					<div id="${el}-editorResize">
						<textarea id="${el}-jsinput" placeholder="${msg("editor.js.placeholder")}" name="jsinput" cols="80" rows="5" class="jsbox"></textarea>

					</div>
					<div id="${el}-scriptEditorInfo" class="scriptStatusLine"><br/></div>

				</div>
		        <div>
					<textarea id="${el}-templateinput" placeholder="${msg("editor.fm.placeholder")}" name="templateinput" cols="80" rows="5" class="templateInputBox"></textarea>
					<div id="${el}-templateEditorInfo" class="templateStatusLine"><br/></div>
				</div>
		        <div>
                    <div class="configform">
                        <div class="control">
                            <span class="label">${msg("option.arguments")}</span>
                            <input id="${el}-urlarguments" type="text" size="50"/>
                        </div>
                        <div class="control">
                            <span class="label">${msg("option.run")}</span>
                            <input id="${el}-runas" type="text" size="20" value="admin"/>
                        </div>
                        <div class="control">
                            <span class="label">${msg("option.isolation")}</span>
                            <select id="${el}-transactions">
                                <option value="none">${msg("value.none")}</option>
                                <option value="readonly">${msg("value.readonly")}</option>
                                <option value="readwrite" selected="selected">${msg("value.readwrite")}</option>
                            </select>
                        </div>
                        <div class="control">
                            <span class="label">${msg("option.crazy")}</span>
                            <select id="${el}-runlikecrazy">
                                <option value="0" selected="selected">${msg("value.off")}</option>
                                <option value="10000">${msg("value.tenseconds")}</option>
                                <option value="1000">${msg("value.onesecond")}</option>
                                <option value="1">${msg("value.nodelay")}</option>
                            </select>
                        </div>
                    </div> 
                </div>
		    </div>
		</div>
		<div class="execute-buttonbar">
			<button type="submit" name="${el}-execute-button" id="${el}-execute-button">${msg("button.execute")}</button>
			 ${msg("label.execute.key")}
			 <img id="${el}-spinner" src="${page.url.context}/res/components/images/ajax_anim.gif" class="spinner" width="16" height="16"></img>
			 <span id="${el}-executionStatsSimple" class="executionStatsSimple"></span>
		</div>


		<div id="${el}-outputTabs" class="yui-navset">
		    <ul class="yui-nav">
		        <li class="selected"><a href="#otab1"><em>${msg("tab.label.console.output")}</em></a></li>
		        <li><a href="#otab2"><em>${msg("tab.label.freemarker.html.output")}</em></a></li>
		        <li><a href="#otab2"><em>${msg("tab.label.freemarker.text.output")}</em></a></li>
		        <li><a href="#otab3"><em>${msg("tab.label.json.output")}</em></a></li>
		        <li><a href="#otab4"><em>${msg("tab.label.performance.output")}</em></a></li>
		        <li><a href="#otab4"><em>${msg("tab.label.repoinfo.output")}</em></a></li>
		        <li><a href="#otab5"><em>${msg("tab.label.dump.output")}</em></a></li>

		        <!--<li><a href="#otab3"><em>RepoLogviewer</em></a></li>-->
		    </ul>
		    <div class="yui-content">
		        <div>
				    <p id="${el}-jsoutput" class="textOutputBox"></p>
				</div>
		        <div>
				    <div id="${el}-templateoutputhtml" class="htmlOutputBox"></div>
				</div>
		        <div>
				    <div id="${el}-templateoutputtext" class="textOutputBox"></div>
				</div>
				<div>
					<textarea id="${el}-jsonOutput" name="jsonOutput" cols="80" rows="5" class="jsonOutput"></textarea>
					<div id="${el}-templateEditorInfo" class="jsonStatusLine"><br/></div>
				</div>
				<div>
					<div id="${el}-executionStats" class="executionStats"></div>
				</div>

				<div>
					<button type="submit" name="${el}-refresh-button" id="${el}-refresh-button" class="refresh-button">${msg("button.refresh")}</button>
					<div id="${el}-repoInfo" class="repoInfo"></div>
				</div>
				<div class="dumpTab">
					<label for="js-filter">Filter by property:</label> <input type="text" id="js-filter" value="">
					<div style="float:right" id="differentButtonContainer"></div>
					<div style="float:right" id="equalButtonContainer"></div>
					<div style="float:right" id="nullButtonContainer"></div>
					<div style="float:right" id="splitButtonContainer"></div>
					<div id="${el}-dump" class="dump"></div>
				</div>

			<!--<div>
        			<div id="termDiv"></div>
        		</div>-->

		    	<!--<div style="display:none;">
	  	        	<div id="${el}-datatable" style="display:none;"></div>
  		        	<div class="exportButton">
  	    	    		<button id="${el}-exportResults-button" tabindex="0">${msg("button.export.results")}</button>
  	        		</div>
  	        	</div>-->
		    </div>
		</div>


	</div>
</div>
