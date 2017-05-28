ZeroTable.Plugin.TableBodyMode.Grid = function(){
};

ZeroTable.Plugin.TableBodyMode.Grid.prototype = {
    drawRow: function(tableInstance, options){
        var $row = $("<div/>");

        $row.addClass("zt-table-grid-item");

        if(options.role){
            $row.attr("zt-row-role", options.role);
        }


        return $row;
    },

    drawInnerRow: function(tableInstance, dataRow, $row){
        var drawGrid = tableInstance.getOption('gridItemRender');

        if(!drawGrid){
            throw 'No handler provided for drawing grid items';
        }

        drawGrid(dataRow, $row);
    },

    prepareTableBody: function($tableBody, tableInstance){
        $tableBody.addClass('zt-grid-body');

        var gridClass = tableInstance.getOption('gridClass');
        if(gridClass){
            $tableBody.addClass(gridClass);
        }
    }
};