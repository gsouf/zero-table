ZeroTable.Data.DataArray = function(data){
    this.data = data;
};


ZeroTable.extendClass(ZeroTable.Data.DataArray, ZeroTable.Data.DataAdapter, {

    /**
     * @param {object} options - what to search in the data
     * @param {int} [options.limit] - how many rows to return
     * @param {int} [options.offset] - number of the first row to return after filtering and ordering
     * @param {object} [options.filter] - list of [standard filters]{@link http://gsouf.github.io/zero-table/documentation/develop/data-manipulation.html} to filter the rows
     * @param {object} [options.order] - list of [standard filters]{@link http://gsouf.github.io/zero-table/documentation/develop/data-manipulation.html} to filter the rows
     * @param callback a callback function called with the found range
     */
    findRange : function(options, callback){

        var offset = options.offset || 0;
        var limit = options.limit || 0;

        var dataReady = this.getSortedFilteredData(options);

        if(offset < 0){
            throw "Offset cant be negative";
        }
        if(limit < 0){
            throw "Limit cant be negative";
        }

        var finalData = [];
        var end = limit > 0 ? offset + limit : dataReady.length;

        if(end > dataReady.length){
            end = dataReady.length;
        }

        for(var i=offset ; i<end ; i++){
            finalData.push(dataReady[i]);
        }

        callback({
            data: finalData,
            totalRows: this.data.length,
            totalFilteredRows: dataReady.length,
            offset: options.offset,
            limit: options.limit
        });

    },


    countAll : function(){
        return this.data.length;
    },


    getSortedFilteredData : function(options){
        var data = this.data.slice(0);

        if(options.filters && Object.keys(options.filters).length > 0){
            throw "NOT IMPLEMENTED YET";
            // TODO
        }

        if(options.order) {
            data.sort(function (a, b) {
                var sortRes = 0;
                var order = options.order;
                ZeroTable.foreach(order, function (item, key) {
                    var type = ("asc" === item ? -1 : 1);
                    if (a[key] < b[key]) {
                        sortRes = type;
                        return false;
                    } else if (a[key] != b[key]) {
                        sortRes = type * -1;
                        return false;
                    }
                    sortRes = 0;
                });
                return sortRes;
            });
        }
        return data;
    }


});
