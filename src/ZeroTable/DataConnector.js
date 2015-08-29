ZeroTable.DataConnector = function(dataAdapter, options){

    this.dataAdapter = dataAdapter;
    this.data = [];

    ZeroTable.extend(this,[
        {
            order   : {}, // columnName : "asc"/"desc"
            filters : [],
            limit   : 50,
            offset  : 0,
            _currentSearch    : {},  // columnName : {...}
            defaultUpdateDelay: 200
        },
        options
    ]);

    this._currentTransaction = null;
    this._currentUpdateTimeout = null;

    ZeroTable.foreach(this.columns, function(item,i,set){
        if ( !(item instanceof ZeroTable.Column.Definition) ) {
            set[i] = new ZeroTable.Column.Definition(item);
        }
    });

};

ZeroTable.DataConnector.prototype = {

    setOrder : function(order){
        this.order = order;
        this.fire("orderChange",[this]);
    },

    clearOrder : function(){
        this.order = order;
        this.fire("orderChange",[this]);
    },

    searchColumn: function(columnName, value){
        if(null === value || undefined === value){
            delete this._currentSearch[columnName];
        }else{
            this._currentSearch[columnName] = value;
        }
    },

    getSearchers: function(){
        return this._currentSearch;
    },

    getOrder : function(name){
        if (name) {
            return this.order[name];
        } else {
            return this.order;
        }
    },

    setOffset : function(offset){
        this.offset = offset;
        this.fire("offsetChange",[this]);
    },

    setLimit : function(limit){
        this.limit = limit;
        this.fire("limitChange",[this]);
    },

    __generateGuid: function(){

        // from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();

    },

    update : function(delay){

        var transactionId = this.__generateGuid;
        this._currentTransaction = transactionId;

        if(this._currentUpdateTimeout){
            clearTimeout(this._currentUpdateTimeout);
        }


        if(undefined === delay || null === delay){
            delay = null
        }else if(isNaN(delay)){
            delay = null;
            console.error("Dataconnector.update delay is not a number, default value used instead");
        }else if(delay < 0){
            delay = 0;
            console.error("Dataconnector.update delay was negative. 0 used instead");
        }

        if(null === delay){
            delay = this.defaultUpdateDelay;
        }

        var self = this;

        this._currentUpdateTimeout = setTimeout(function(){

            self.fire("loading",[self, self._currentTransaction]);

            self.dataAdapter.findRange(self, function(info){

                self.fire("loadEnd",[self, self._currentTransaction]);

                if(self._currentTransaction !== transactionId){
                    console.info("A transaction was aborted in favor of a more recent");
                    self.fire("loadReplaced",[self, self._currentTransaction]);
                    return;
                }

                self.data = info.data;
                self.totalRows = info.totalRows;
                self.totalFilteredRows = info.totalFilteredRows;
                self.currentOffset = info.offset;
                self.currentLimit  = info.limit;

                self.fire("dataUpdated",[self, self._currentTransaction]);

            }, function(){

                self.fire("loadEnd",[self, self._currentTransaction]);
                self.fire("loadFailed",[self, self._currentTransaction]);

            });

        }, delay);

    },

    getData : function(){
        return this.data;
    }


};


ZeroTable.Bindable.extends(ZeroTable.DataConnector);