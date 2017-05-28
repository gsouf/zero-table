/**
 * This plugin creates the table body rows and cells and trigger events during the creation
 * Its the most imporant body when you come to draw the table
 */
ZeroTable.createPlugin({
    "name" : "core.tableBody",
    "defaultOptions" : {
        "rowClass" : null
    },
    "optionOverrides" : {
        "rowClass" : "rowClass"
    },
    "listen" : {

        onClearTable: function(e){
            e.$table.find(".zt-table-wrapper .zt-table-table .zt-table-tbody").remove();
        },

        onDrawTable: function(e) {

            // TODO this should be in init
            var $tbody = $("<div/>");
            $tbody.addClass("zt-table-tbody");
            e.$table.find(".zt-table-wrapper .zt-table-table").append($tbody);
            e.tableInstance.$tableBody = $tbody;
        },

        dataUpdated: function(e){

            var tableInstance = e.tableInstance;
            var $table = e.$table;
            var $tbody = $table.find('.zt-table-tbody');

            $tbody.empty();

            tableInstance.tableEvent("beforeDrawRows", e);

            ZeroTable.foreach(e.data, function(dataRow){

                // E:beforeDrawRow
                tableInstance.tableEvent("beforeDrawRow", { "$table" : $table, "dataRow" : dataRow });

                var $row = tableInstance.drawer.drawRow($table,{"role" : "data"});
                $row.addClass("zt-data-row");

                tableInstance.refreshRow($row, dataRow);

                $tbody.append($row);
            });

            // E:afterDrawRows
            tableInstance.tableEvent("afterDrawRows", e);
        }



    },
    "pluginPrototype" : {},
    "tableKeys" : function(plugin){
        return {
            refreshRow: function($row, dataRow){

                // Remove custom class because they depend on the data
                var customClass = $row.attr('data-zt-custom-class');
                if(customClass){
                    $row.removeClass(customClass);
                }

                // Empty the row and build it again
                $row.empty();

                var tableInstance = this;
                var $table = tableInstance.$table;

                // Persist the dataset
                $row.data("dataSet", dataRow);

                // rowClass handler :
                // option rowClass allows to define a callback that can put class for a row depending on the row data
                var rowClassHandler = plugin.getOption("rowClass", tableInstance);
                if(rowClassHandler !== null && rowClassHandler !== false && typeof rowClassHandler !== "function"){
                    throw "bad type for 'rowClass' option. It should be null or a function";
                }

                if(rowClassHandler){
                    var rowClass = rowClassHandler(dataRow);
                    if(rowClass){
                        $row.addClass(rowClass);
                        $row.attr('data-zt-custom-class', rowClass);
                    }
                }


                // Draw cells
                ZeroTable.foreach(tableInstance.table.columns, function(columnDef){
                    if(columnDef.options.visible){

                        // E:beforeDrawCell
                        tableInstance.tableEvent("beforeDrawCell", { "$table" : $table, "dataRow" : dataRow, "columnDef" : columnDef, "$row" : $row });

                        var cell = tableInstance.drawer.drawCell(columnDef, "");
                        cell.addRole("data");

                        // E:afterDrawCell
                        tableInstance.tableEvent("afterDrawCell", {
                            "$table" : $table,
                            "dataRow" : dataRow,
                            "columnDef" : columnDef,
                            "$row" : $row,
                            "cell" : cell
                        });

                        $row.append(cell.$cell);
                    }
                });

                // E:afterDrawRow
                tableInstance.tableEvent("afterDrawRow", { "$table" : $table, "dataRow" : dataRow, "$row" : $row });
            },

            getTableBodyElement: function(){
                return this.$tableBody;
            }
        }
    }
});
