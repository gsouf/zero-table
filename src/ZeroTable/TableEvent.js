ZeroTable.TableEvent = function(table, properties){
    var self = this;
    ZeroTable.foreach(properties, function(v, k){
        self[k] = v;
    });
    this.tableInstance = table;
};
