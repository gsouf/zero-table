ZeroTable.Data.DataAdapter = function(){

};

ZeroTable.Data.DataAdapter.prototype = {

    /**
     * @param {object} options - what to search in the data
     * @param {int} options.limit - how many rows to return
     * @param {int} options.offset - number of the first row to return after filtering and ordering
     * @param {int} options.filter - list of [standard filters]{@link http://gsouf.github.io/zero-table/documentation/develop/data-manipulation.html} to filter the rows
     * @param {int} options.order - list of [standard filters]{@link http://gsouf.github.io/zero-table/documentation/develop/data-manipulation.html} to filter the rows
     * @param callback a callback function called with the found range
     */
    findRange : function(options, callback){}

};

ZeroTable.Bindable.extends(ZeroTable.Data.DataAdapter);