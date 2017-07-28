ZeroTable.createPlugin({
    "name" : "core.searchHeader",
    "defaultOptions" : {
        drawHeaders: true
    },
    "optionOverrides" : {},
    "listen" : {

        "afterDrawHeader": function(e) {

            var $header = e.$table.find(".zt-table-header");

            if($header){

                var $searchHeaderRow = $("<div/>");
                $searchHeaderRow.addClass("zt-searchers");
                $header.append($searchHeaderRow);

                this.plugin.drawHeaderColumns($searchHeaderRow, e.tableInstance);
            }
        }

    },
    "pluginPrototype" : {



        drawHeaderColumns: function($row, tableInstance){

            var self = this;

            var colsLength = tableInstance.table.columns.length;

            ZeroTable.foreach(tableInstance.table.columns, function(columnDef, i){
                if(columnDef.options.visible){
                    var isFirst = i === 0;
                    var isLast  = i === colsLength - 1;

                    var cell = tableInstance.headerDrawer.drawCell(columnDef, null, {"skipClass": true});
                    var $cell = cell.$cell;
                    cell.addRole("header");
                    $cell.addClass("zt-header-col");

                    tableInstance.fire("afterDrawCell", [
                        new ZeroTable.TableEvent(tableInstance, {
                            "$table" : tableInstance.$table,
                            "columnDef" : columnDef,
                            "$row" : $row,
                            "cell" : cell,
                            "isFirst": isFirst,
                            "isLast" : isLast
                        })
                    ]);

                    $row.append($row, $cell);

                    var searcher = tableInstance.getSearcher(columnDef.options.name);

                    if(searcher){
                        $cell.append(searcher.draw());
                    }


                }
            });



        }

    },
    "tableKeys" : {
        __searchHeaderSearchers : {}
    }
});