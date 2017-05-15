ZeroTable.createPlugin({
    "name" : "core.sizing",
    "defaultOptions" : {
        "defaultWidth" : 100,
    },
    "optionOverrides" : {
        "columnDefaultWidth" : "defaultWidth",
    },
    "listen" : {

        "onClearTable": function(e){
            e.$table.find(".zt-table-table .zt-table-colgroup").remove();
        },

        "afterDrawCell": function(e) {
            this.plugin.sizeCell(e.cell.$cell, e.columnDef);
        },

        "afterDrawRow": function(e) {
            this.plugin.sizeRow(e.$row, e.$table);
        }

    },
    "pluginPrototype" : {

        sizeCell : function($cell, columnDef){

            var width;
            if(columnDef.options.size){
                width = columnDef.options.size + "px";
            }else{
                width = this.getOption("defaultWidth") + "px";
            }

            $cell.css("width", width);

        },

        sizeRow : function($row, $table){

            var width = 0;
            $row.find(".zt-table-td").each(function(item){
                width += $(this).outerWidth();
            });
            $row.width(width);
            $table.find(".zt-wrapper").width(width);

        }

    },
    "tableKeys" : {}
});
