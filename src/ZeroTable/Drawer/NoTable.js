ZeroTable.Drawer.NoTable = function(){

};


ZeroTable.Drawer.NoTable.prototype = {

    drawTable: function(tableInstance){

        var $scroller = $("<div/>");
        $scroller.addClass("zt-scroller");

        var $table = $("<div/>");
        $table.addClass("zt-wrapper");
        $scroller.append($table);

        $tableWrapper = $("<div/>");
        $tableWrapper.addClass("zt-table-wrapper");
        $table.append($tableWrapper);

        $realTable = $("<div/>");
        $realTable.addClass("zt-table-table");
        $tableWrapper.append($realTable);

        return $scroller;
    },

    drawRow: function($table,options){
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


    drawCell: function(columnDefinition,content,options){
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
