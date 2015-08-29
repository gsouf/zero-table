ZeroTable.createPlugin({
    "name" : "core.header",
    "defaultOptions" : {
        "updateDelay" : 5
    },
    "optionOverrides" : {},
    "listen" : {
        "onClearTable" : function(e){
            e.$table.find(".zt-table-header").remove();
        },

        "onDrawTable": function(e) {

            var $tableHeader = $("<div/>");
            $tableHeader.addClass("zt-table-header");
            e.$table.find(".zt-wrapper").prepend($tableHeader);

            var $tableHeaderRow = $("<div/>");
            $tableHeaderRow.addClass("zt-header-main");
            $tableHeader.prepend($tableHeaderRow);

            e.tableInstance.fire("beforeDrawHeader", [e]);
            this.plugin.drawHeaderColumns($tableHeaderRow, e.tableInstance);
            e.tableInstance.fire("afterDrawHeader", [e]);

            e.tableInstance.fire("headerUpdated",  [e]);
        },

        "headerUpdated": function(e){
            var height = e.$table.find(".zt-table-header").outerHeight() + "px";
            e.$table.find(".zt-table-wrapper").css("top", height);
        }
    },

    "pluginPrototype" : {

        drawHeaderColumns : function($row, tableInstance){

            var self = this;
            var currentOrderingIndexed = ZeroTable.clone(tableInstance.dataConnector.getOrder());
            var i = 0;
            ZeroTable.foreach(currentOrderingIndexed, function(item,key){
                currentOrderingIndexed[key] = {"order" : i , "direction" : item};
                i++;
            });


            ZeroTable.foreach(tableInstance.table.columns, function(columnDef){
                if(columnDef.options.visible){
                    var title = columnDef.options.header ? columnDef.options.header : columnDef.options.name;
                    var cell = tableInstance.drawer.drawCell(columnDef, null, {"skipClass": true});
                    var $cell = cell.$cell
                    cell.addRole("header");
                    $cell.addClass("zt-header-col");

                    var $title = $("<span/>");
                    $title.addClass("zt-header-col-title");
                    $cell.append($title);
                    $title.html(title);

                    var $order = $("<span/>");
                    $order.addClass("zt-header-col-order");
                    $cell.append($order);


                    tableInstance.fire("afterDrawCell", [
                        new ZeroTable.TableEvent(tableInstance, {"columnDef" : columnDef, "cell" : cell, "$row" : $row, "$table" : tableInstance.$table})
                    ]);
                    $row.append($row, $cell);

                    if(currentOrderingIndexed[columnDef.getDataIndex()]){
                        $cell.addClass("zt-column-order-" + currentOrderingIndexed[columnDef.getDataIndex()].order );
                        $cell.addClass("zt-column-ordered");
                        $cell.addClass("zt-column-order-" + currentOrderingIndexed[columnDef.getDataIndex()].direction );
                    }

                    if(tableInstance.disableOrdering !== true && columnDef.options.orderable == true){
                        $cell.addClass("zt-header-col-orderable");
                        $cell.click(function(e){
                            var $clickedCell = $(this);
                            var columnDef = tableInstance.table.getColumnDefinition($clickedCell);
                            var columnDataIndex = columnDef.getDataIndex();
                            var currentOrderForCol = tableInstance.dataConnector.getOrder(columnDataIndex);

                            // if shift : multi sort
                            var orders;
                            if (e.shiftKey) {
                                orders = tableInstance.dataConnector.getOrder();
                            } else {
                                orders = {};
                                orders[columnDataIndex] = "asc";
                            }


                            // if this column is already ordered, reverse its order
                            if(currentOrderForCol){
                                orders[columnDataIndex] = currentOrderForCol == "asc" ? "desc" : "asc";
                            }else{
                                orders[columnDataIndex] = "asc";
                            }

                            tableInstance.dataConnector.setOrder(orders);
                            tableInstance.dataConnector.update(self.getOption("updateDelay", tableInstance));

                        });

                    }else{
                        $cell.addClass("zt-header-col-unorderable");
                    }

                }
            });

        }
    },

    "tableKey" : {

    }
});
