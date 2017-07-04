ZeroTable.createPlugin({
    "name" : "core.search",
    "defaultOptions" : {
        searcherFactory: null,
        delay: 500
    },
    "optionOverrides" : {

    },

    "init" : function(){

        if(!this.getOption("searcherFactory")){
            this.setOption("searcherFactory", new ZeroTable.Plugin.SearchHeader.SearcherFactory({

                "searchers" : {
                    "string": ZeroTable.Plugin.SearchHeader.String,
                    "range": ZeroTable.Plugin.SearchHeader.String
                }

            }));
        }

        this.searchers = {};

    },

    "listen" : {

        "onInitialize": function(e){
            this.plugin.initSearchers(e.tableInstance);
        },



    },
    "pluginPrototype" : {


        initSearchers: function(tableInstance){

            var self = this;

            if(!self.getOption("searcherFactory")){
                throw "invalid searcher factory";
            }

            ZeroTable.foreach(tableInstance.table.columns, function(columnDef){
                if(columnDef.options.searcher){

                    var searcher = self.getOption("searcherFactory").build(columnDef.options.searcher, columnDef.options.searcherOptions);

                    tableInstance.searcherInstances[columnDef.options.name] = searcher;

                    searcher.on(
                        'valueChanged',
                        function(value){
                            tableInstance.dataConnector.filterColumn(columnDef.options.name, value);
                            tableInstance.dataConnector.setOffset(0);
                            tableInstance.dataConnector.update(self.getOption("delay"));
                        }
                    );

                }
            });
        }

    },
    "tableKeys" : function(plugin) {

        return {
            searcherInstances: {},

            getSearcher: function(searcherName){
                return this.searcherInstances[searcherName];
            },

            filterColumn: function(columnName, value){
                var searcher = this.getSearcher(columnName);
                var filterValue = searcher.__createFilterValue(value);
                searcher.update(filterValue);
            }
        }

    }
});
