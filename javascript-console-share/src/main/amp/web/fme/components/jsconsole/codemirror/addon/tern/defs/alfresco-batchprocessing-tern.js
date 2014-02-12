(function() {
    var def = {
        "executeBatch" : {
            "!doc" : "execute a batch processing for the number of threads and the batch sizes.\nThe processItemCallback is the only callback that will be called with an argument: the single work item to process.",
            "!type" :"fn(items: [?], processItemCallback: fn(?), threadCount: number, batchSize: number)"
        },
        "executeBatch1" : {
            "!doc" : "execute a batch processing for the number of threads and the batch sizes.\nThe processItemCallback is the only callback that will be called with an argument: the single work item to process.",
            "!type" :"fn(workProviderCallback: fn(), processItemCallback: fn(?), threadCount: number, batchSize: number)"
        }};

    var alfrescoDef = CodeMirror.tern.getDef()[1];
    for ( var type in def) {
        alfrescoDef[type] = def[type];
    }
})();