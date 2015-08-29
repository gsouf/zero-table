ZeroTable.Data.DataArray = function(data){
    this.data = data;
};


ZeroTable.extendClass(ZeroTable.Data.DataArray, ZeroTable.Data.DataAdapter, {


    findRange : function(dataConnector, callback, errorCallback){

        var offset = dataConnector.offset;

        var limit = dataConnector.limit;
        var dataReady = this.getSortedFilteredData(dataConnector);

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
            offset: dataConnector.offset,
            limit: dataConnector.limit
        });

    },


    countAll : function(){
        return this.data.length;
    },


    getSortedFilteredData : function(dataConnector){
        var data = this.data.slice(0);

        data.sort(function(a,b){
            var sortRes = 0;

            var order = dataConnector.getOrder();

            ZeroTable.foreach(order, function(item,key){

                var type = ("asc" === item ? -1 : 1);

                if(a[key] < b[key]){
                    sortRes = type;
                    return false;
                } else if(a[key] != b[key]) {
                    sortRes = type * -1;
                    return false;
                }

                sortRes = 0;

            });

            return sortRes;

        });
        return data;
    }


});
