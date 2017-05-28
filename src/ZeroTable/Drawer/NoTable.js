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
    }

};
