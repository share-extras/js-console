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
						<textarea id="${el}-jsinput" name="jsinput" cols="80" rows="5" class="jsbox"></textarea>
					</div>
				</div>
		        <div>
					<textarea id="${el}-templateinput" name="templateinput" cols="80" rows="5" class="templateInputBox"></textarea>
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
		</div>
		<div id="${el}-outputTabs" class="yui-navset">
		    <ul class="yui-nav">
		        <li class="selected"><a href="#otab1"><em>${msg("tab.label.console.output")}</em></a></li>
		        <li><a href="#otab2"><em>${msg("tab.label.freemarker.html.output")}</em></a></li>
		        <li><a href="#otab2"><em>${msg("tab.label.freemarker.text.output")}</em></a></li>
		        <#--<li><a href="#otab3"><em>${msg("tab.label.datatable.output")}</em></a></li>-->
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
		    	<div style="display:none;">
	  	        	<div id="${el}-datatable" style="display:none;"></div>
  		        	<div class="exportButton">
  	    	    		<button id="${el}-exportResults-button" tabindex="0">${msg("button.export.results")}</button>
  	        		</div>
  	        	</div>
		    </div>
		</div>
	    <div id="${el}-executionStats" class="executionStats"></div>
	</div>
</div>
