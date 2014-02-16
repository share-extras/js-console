(function() {
    var templates = {
        "name" : "javascript",
        "context" : "javascript",
        "templates" : [
                {
                    "name" : "for",
                    "description" : "iterate over array",
                    "template" : "for (var ${index} = 0; ${index} < ${array}.length; ${index}++) {\n\t${line_selection}${cursor}\n}"
                },
                {
                    "name" : "for",
                    "description" : "iterate over array with temporary variable",
                    "template" : "for (var ${index} = 0; ${index} < ${array}.length; ${index}++) {\n\tvar ${array_element} = ${array}[${index}];\n\t${cursor}\n}"
                },
                {
                    "name" : "forin",
                    "description" : "iterate using for .. in",
                    "template" : "for (var ${iterable_element} in ${iterable}) {\n\t${cursor}\n}"
                },
                {
                    "name" : "do",
                    "description" : "do while statement",
                    "template" : "do {\n\t${line_selection}${cursor}\n} while (${condition});"
                },
                {
                    "name" : "switch",
                    "description" : "switch case statement",
                    "template" : "switch (${key}) {\n\tcase ${value}:\n\t\t${cursor}\n\t\tbreak;\n\n\tdefault:\n\t\tbreak;\n}"
                },
                {
                    "name" : "if",
                    "description" : "if statement",
                    "template" : "if (${condition}) {\n\t${line_selection}${cursor}\n}"
                },
                {
                    "name" : "ifelse",
                    "description" : "if else statement",
                    "template" : "if (${condition}) {\n\t${cursor}\n} else {\n\t\n}"
                },
                {
                    "name" : "elseif",
                    "description" : "else if block",
                    "template" : "else if (${condition}) {\n\t${cursor}\n}"
                },
                {
                    "name" : "else",
                    "description" : "else block",
                    "template" : "else {\n\t${cursor}\n}"
                },
                {
                    "name" : "tryCatch",
                    "description" : "try catch block",
                    "template" : "try {\n\t${line_selection}${cursor}\n} catch (e) {\n\t// ${todo}: handle exception\n}"
                },
                {
                    "name" : "tryCatchFinally",
                    "description" : "try catch finally block",
                    "template" : "try {\n\t${line_selection}${cursor}\n} catch (e) {\n\t// ${todo}: handle exception\n}\nfinally{\n\t//handle the finally condition\n}"
                },
                {
                    "name" : "tryFinally",
                    "description" : "try finally block",
                    "template" : "try {\n\t${line_selection}${cursor}\n}finally{\n\t//handle the finally condition\n}"
                },
                {
                    "name" : "catch",
                    "description" : "catch block",
                    "template" : "catch (e) {\n\t${cursor}// ${todo}: handle exception\n}"
                },
                {
                    "name" : "finally",
                    "description" : "finally block",
                    "template" : "finally{\n\t//handle the finally condition\n}"
                },
                {
                    "name" : "function",
                    "description" : "function",
                    "template" : "function ${name}(${}) {\n\t${cursor}\n}"
                },
                {
                    "name" : "function",
                    "description" : "anonymous function",
                    "template" : "function (${}) {\n\t${cursor}\n}"
                },
                {
                    "name" : "new",
                    "description" : "create new object",
                    "template" : "var ${name} = new ${type}(${arguments});"
                },
                {
                    "name" : "lazy",
                    "description" : "lazy creation",
                    "template" : "if (${name:var} == null) {\n\t${name} = new ${type}(${arguments});\n\t${cursor}\n}\n\nreturn ${name};"
                },
                {
                    "name" : "while",
                    "description" : "while loop with condition",
                    "template" : "while (${condition}) {\n\t${line_selection}${cursor}\n}"
                } ]
    };

    templates.templates.sort(function(a,b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
         return -1
        if (nameA > nameB)
         return 1
        return 0 //default return value (no sorting)
    });
    CodeMirror.templatesHint.addTemplates(templates);
})();