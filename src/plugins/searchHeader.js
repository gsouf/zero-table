ZeroTable.createPlugin({
    "name" : "core.searchHeader",
    "defaultOptions" : {
        drawHeaders: true,
        searcherFactory: null,
        delay: 500
    },
    "optionOverrides" : {},
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

        "afterDrawHeader": function(e) {

            var $header = e.$table.find(".zt-table-header");

            if($header){

                var $searchHeaderRow = $("<div/>");
                $searchHeaderRow.addClass("zt-searchers");
                $header.append($searchHeaderRow);

                this.plugin.drawHeaderColumns($searchHeaderRow, e.tableInstance);
            }
        },

        "onInitialize": function(e){
            this.plugin.initSearchers(e.tableInstance);
        }

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

                    tableInstance.__searchHeaderSearchers[columnDef.options.name] = searcher;
                    searcher.on('valueChanged',function(value, searcher){
                        tableInstance.dataConnector.filterColumn(columnDef.options.name, value);
                        tableInstance.dataConnector.update(self.getOption("delay"));
                    });

                }
            });

        },

        drawHeaderColumns: function($row, tableInstance){

            var self = this;

            ZeroTable.foreach(tableInstance.table.columns, function(columnDef){
                if(columnDef.options.visible){
                    var cell = tableInstance.headerDrawer.drawCell(columnDef, null, {"skipClass": true});
                    var $cell = cell.$cell;
                    cell.addRole("header");
                    $cell.addClass("zt-header-col");

                    tableInstance.fire("afterDrawCell", [
                        new ZeroTable.TableEvent(tableInstance, {
                            "$table" : tableInstance.$table,
                            "columnDef" : columnDef,
                            "$row" : $row,
                            "cell" : cell
                        })
                    ]);

                    $row.append($row, $cell);

                    if(tableInstance.__searchHeaderSearchers[columnDef.options.name]){
                        $cell.append(tableInstance.__searchHeaderSearchers[columnDef.options.name].draw());
                    }


                }
            });



        }

    },
    "tableKeys" : {
        __searchHeaderSearchers : {}
    }
});