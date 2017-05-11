ZeroTable.TableInstance = function(table, datapool, options){

    if(table instanceof ZeroTable.Table){

        this.table = table;

    }else{

        this.table = new ZeroTable.Table(table);

    }

    // DEFAULT DATAPOOL FOR QUICKSTART
    if(datapool instanceof Array){
        this.datapool = new ZeroTable.Data.DataArray(datapool);
    }else{
        this.datapool = datapool;
    }


    this.autoload = true;

    options = options || {};



    if(options.drawer){
        this.drawer = options.drawer;
    }else{
        this.drawer = new ZeroTable.Drawer.NoTable();
    }

    this.dataConnector = new ZeroTable.DataConnector(this.datapool,options);
    this.dataConnector.forwardEvents(this, "data");

    this.$table = null;

    var self = this;

    // Forward dataconnector update
    this.dataConnector.bind("dataUpdated",function(dataConnector){
        self.tableEvent("dataUpdated", {
            "dataConnector" : dataConnector,
            "data" : dataConnector.getData(),
            "$table": self.$table
        });
    });

    ZeroTable.foreach(this.table.plugins, function(item,i,set){
        item.prepare(self);
    });

    this.tableEvent("onInitialize",{});


    if(this.autoload){
        this.dataConnector.update();
    }

};


ZeroTable.TableInstance.prototype = {

    draw : function(){

        var event;
        var tableInstance = this;

        var $table;
        if(!this.$table) {
            $table = tableInstance.drawer.drawTable(tableInstance);
            this.$table = $table;
            this.tableEvent("onInitTable", { "$table" : $table });

            // If not in dom, we trigger dom added, once
            // That's useful for instance for tasks that need to get
            // get the offset height/width of an element (for instance in header plugin)
            if(!jQuery.contains(document, $table[0])){
                var self = this;
                $(document).on('DOMNodeInserted', function(e){
                    if(e.target === $table[0]){
                        self.tableEvent('addedToDom', {
                            '$table': $table
                        })
                        $(document).off(e);
                    }
                });
            }


        } else{
            $table = this.$table;
            this.tableEvent("onClearTable", { "$table" : $table });
        }

        var range = this.dataConnector.getData();

        this.tableEvent("onDrawTable", { "$table" : $table, "data" : range });

        return $table;
    },

    hasOption: function(optionName){
        if(this.table.hasOwnProperty(optionName)){
            return true;
        }else{
            return false;
        }
    },

    getOption: function(optionName){
        return this.table.hasOwnProperty(optionName) ? this.table[optionName] : null;
    },

    /**
     * Allows plugins to add method to the table instance
     * @param keyName
     * @param method
     */
    plugKey: function(keyName, method){
        this[keyName] = method;
    },



    update: function(){
        this.dataConnector.update();
    },

    /**
     * Shortcut for fire with tableEvent object
     */
    tableEvent : function(eventName, data){
        this.fire(eventName, [
            new ZeroTable.TableEvent(this, data)
        ]);
    }

};

ZeroTable.Bindable.extends(ZeroTable.TableInstance);