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

        "onInitialize": function(e){
            e.tableInstance.headerDrawer = new ZeroTable.Plugin.TableBodyMode.Table();
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

        "addedToDom,headerUpdated": function(e){
            var height = e.$table.find(".zt-table-header").outerHeight() + "px";
            e.$table.find(".zt-table-wrapper").css("top", height);
        },

        "data.orderChange": function(e){
            var tableInstance = this.context;
            var dataConnector = e.originalEvent.context;

            var order = dataConnector.getOrder();

            var $header = tableInstance.$table.find(".zt-table-header");

            if(order.length === 0){
                // If no order, just clean everything
                $header
                    .find(".zt-column-ordered")
                    .removeClass('zt-column-ordered zt-column-order-asc zt-column-order-desc');
            } else {

                // make a map of column by their name
                var orderPerColumn = {};
                ZeroTable.foreach(order, function(item, key){
                    orderPerColumn[item.columnName] = item.direction;
                });

                // find currently ordered colummns and process them
                $header.find(".zt-column-ordered").each(function(index, item){
                    var columnName = $(item).attr('data-zt-column');

                    // If not in list, remove order class
                    if (!orderPerColumn.hasOwnProperty(columnName)) {
                        item.classList.remove('zt-column-ordered');
                        item.classList.remove('zt-column-order-asc');
                        item.classList.remove('zt-column-order-desc');
                    } else {

                        // if in list set the good direction
                        if(orderPerColumn[columnName] === 'asc'){
                            if(!item.classList.contains('zt-column-order-asc')){
                                item.classList.remove('zt-column-order-desc');
                                item.classList.add('zt-column-order-asc');
                            }
                        } else {
                            if(!item.classList.contains('zt-column-order-desc')){
                                item.classList.remove('zt-column-order-asc');
                                item.classList.add('zt-column-order-desc');
                            }
                        }
                    }

                    delete orderPerColumn[columnName];
                });

                ZeroTable.foreach(orderPerColumn, function(direction, columnName){
                    var $col = $header.find('.zt-header-col[data-zt-column="' + columnName + '"]');
                    $col.addClass('zt-column-ordered zt-column-order-' + direction);
                })

            }




            // if(orderPerColumn)



            // var $cols = tableInstance.$table.find(".zt-table-header").find("[zt-cell-role='header']");
            //
            // $cols.find('.zt-header-col-ordered').each()
            //
            // console.log();
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

            var colsLength = tableInstance.table.columns.length;

            ZeroTable.foreach(tableInstance.table.columns, function(columnDef, i){
                if(columnDef.options.visible){
                    var isFirst = i === 0;
                    var isLast  = i === colsLength - 1;

                    var title = columnDef.options.header;
                    if(title === null || title === false || title === undefined){
                        title = columnDef.options.name;
                    }


                    var cell = tableInstance.headerDrawer.drawCell(columnDef, null, {"skipClass": true});
                    var $cell = cell.$cell
                    cell.addRole("header");
                    $cell.addClass("zt-header-col");

                    var $title = $("<span/>");
                    $title.addClass("zt-header-col-title");
                    $cell.append($title);

                    if(typeof title === 'function'){
                        title($title, tableInstance);
                    } else {
                        $title.html(title);
                    }

                    var $order = $("<span/>");
                    $order.addClass("zt-header-col-order");
                    $cell.append($order);


                    tableInstance.fire("afterDrawCell", [
                        new ZeroTable.TableEvent(tableInstance, {
                            "columnDef" : columnDef,
                            "cell" : cell,
                            "$row" : $row,
                            "$table" : tableInstance.$table,
                            "isFirst": isFirst,
                            "isLast" : isLast
                        })
                    ]);
                    $row.append($row, $cell);

                    if(currentOrderingIndexed[columnDef.getDataIndex()]){
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

                            // if not shift : reset orders (reset multi sort)
                            var orders;
                            if (!e.shiftKey) {
                                tableInstance.dataConnector.clearOrder();
                            }


                            // if this column is already ordered, reverse its order
                            if(currentOrderForCol){
                                tableInstance.dataConnector.setOrder(
                                    columnDataIndex,
                                    currentOrderForCol['direction'] === "asc" ? "desc" : "asc"
                                );
                            } else {
                                tableInstance.dataConnector.setOrder(columnDataIndex, 'asc');
                            }

                            tableInstance.dataConnector.update(self.getOption("updateDelay", tableInstance));

                        });

                    }else{
                        $cell.addClass("zt-header-col-unorderable");
                    }

                }
            });

        }
    },

    "tableKeys" : {

    }
});
