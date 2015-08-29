/**
 * This plugin creates the table body rows and cells and trigger events during the creation
 * Its the most imporant body when you come to draw the table
 */
ZeroTable.createPlugin({
    "name" : "core.tableBody",
    "defaultOptions" : {},
    "optionOverrides" : {},
    "listen" : {

        "onClearTable": function(e){
            e.$table.find(".zt-table-wrapper .zt-table-table .zt-table-tbody").remove();
        },

        "onDrawTable": function(e) {

            var tableInstance = e.tableInstance;
            var $table = e.$table;
            // TODO : THIS SHOULD BE SPLIT IN INIT TABLE

            var $tbody = $("<div/>");
            $tbody.addClass("zt-table-tbody");
            e.$table.find(".zt-table-wrapper .zt-table-table").append($tbody);

            // TODO THIS SHOULD BE SPLIT IN UPDATE DATA

            tableInstance.tableEvent("beforeDrawRows", e);

            ZeroTable.foreach(e.data, function(dataRow){

                // E:beforeDrawRow
                tableInstance.tableEvent("beforeDrawRow", { "$table" : $table, "dataRow" : dataRow });

                var $row = tableInstance.drawer.drawRow($table,{"role" : "data"});
                $row.data("dataSet", dataRow);
                $row.addClass("zt-data-row");

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
                $tbody.append($row);
            });

            // E:afterDrawRows
            tableInstance.tableEvent("afterDrawRows", e);


        }



    },
    "pluginPrototype" : {},
    "tableKey" : {}
});
