logger=jsconsole.getLogger();
function print(obj) {
	jsconsole.print(obj);
};

function dump(obj){
    dumpService.addDump(obj);
};