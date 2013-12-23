<#escape x as jsonUtils.encodeJSONString(x)>{
    "printOutput" : [
        <#list printOutput as outputLine>
        "${outputLine}"<#if outputLine_has_next>,</#if>
        </#list>
    ]
}</#escape>