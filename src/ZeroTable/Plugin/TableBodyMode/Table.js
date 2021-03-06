ZeroTable.Plugin.TableBodyMode = {};

ZeroTable.Plugin.TableBodyMode.Table = function(){

};

ZeroTable.Plugin.TableBodyMode.Table.prototype = {


    prepareTableBody: function($tableBody){

    },

    drawRow: function(tableInstance, options){
        var $row = $("<div/>");

        if(!options.skipClass) {
            $row.addClass("zt-table-tr");
        }
        if(options.class){
            $row.addClass(options.class);
        }

        if(options.role){
            $row.attr("zt-row-role", options.role);
        }

        return $row;
    },

    drawInnerRow: function(tableInstance, dataRow, $row){

        // Remove custom class because they depend on the data
        var customClass = $row.attr('data-zt-rowcustom-class');
        if(customClass){
            $row.removeClass(customClass);
        }

        // rowClass handler :
        // option rowClass allows to define a callback that can put class for a row depending on the row data
        var rowClassHandler = tableInstance.getOption("rowClass");
        if(rowClassHandler !== null && rowClassHandler !== false && typeof rowClassHandler !== "function"){
            throw "bad type for 'rowClass' option. It should be null or a function";
        }

        if(rowClassHandler){
            var rowClass = rowClassHandler(dataRow);
            if(rowClass){
                $row.addClass(rowClass);
                $row.attr('data-zt-rowcustom-class', rowClass);
            }
        }

        // E:beforeDrawRow
        tableInstance.tableEvent("beforeDrawRow", { "$table" : tableInstance.$table, "dataRow" : dataRow });

        var self = this;
        var colsLength = tableInstance.table.columns.length;
        // Draw cells
        ZeroTable.foreach(tableInstance.table.columns, function(columnDef, i){


            if(columnDef.options.visible){
                var isFirst = i === 0;
                var isLast  = i === colsLength - 1;

                // E:beforeDrawCell
                tableInstance.tableEvent("beforeDrawCell", { "$table" : tableInstance.$table, "dataRow" : dataRow, "columnDef" : columnDef, "$row" : $row });

                var cell = self.drawCell(columnDef, "");
                cell.addRole("data");

                if(columnDef.options.tooltip){
                    // make it in a plugin ?

                    if(typeof columnDef.options.tooltip == 'function'){
                        cell.$cell.attr('title', columnDef.options.tooltip(dataRow))
                    } else {
                        cell.$cell.attr('title', columnDef.options.tooltip);
                    }
                }


                // E:afterDrawCell
                tableInstance.tableEvent("afterDrawCell", {
                    "$table" : tableInstance.$table,
                    "dataRow" : dataRow,
                    "columnDef" : columnDef,
                    "$row" : $row,
                    "cell" : cell,
                    "isFirst": isFirst,
                    "isLast" : isLast
                });

                $row.append(cell.$cell);
            }
        });

        // E:afterDrawRow
        tableInstance.tableEvent("afterDrawRow", { "$table" : tableInstance.$table, "dataRow" : dataRow, "$row" : $row });
    },

    drawCell: function(columnDefinition, content, options){
        var $cell = $("<div/>");

        options = options||{};

        if(!options.skipClass) {
            $cell.addClass("zt-table-td");
        }
        $cell.attr("data-zt-column", columnDefinition.options.name);

        if( content !== null && content !== undefined ){
            $cell.html(content);
        }

        var cell = new ZeroTable.Column.Cell($cell);
        $cell.data("zt-cell", cell);

        return cell;
    }
};