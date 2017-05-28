/**
 * This plugin allows to select datas on the table
 */
ZeroTable.createPlugin({
    "name" : "core.selection",
    "defaultOptions" : {
        maxSelection: -1,
        keepSelection: false,
        selectionClass: 'zt-selected',
        noSelectableClass: 'zt-no-select'
    },
    "optionOverrides" : {
        "maxSelection": "maxSelection",
        "keepSelection": "keepSelection"
    },
    "init" : null,
    "listen" : {

        rowClick: function(e){
            if(
                e.$row.hasClass("zt-data-row")
                && ! e.$row.hasClass(this.plugin.getOption("noSelectableClass"))
                && ! e.cell.$cell.hasClass(this.plugin.getOption("noSelectableClass"))
            ){
                this.plugin.emulateClick(e.tableInstance, e.$row, e.event.shiftKey);
            }
        },

        afterDrawRows: function(e){
            if(this.plugin.getOption("keepSelection", e.tableInstance)) {
                if ( !e.tableInstance.table.idProperties  || e.tableInstance.table.idProperties.length === 0) {
                    throw "Cannot enable keepSelection feature. table.idProperties was not specified";
                }

                this.plugin.__restoreSelection(e.tableInstance);

            }
        },

        afterDrawCell: function(e){
            if(e.columnDef.options.disableSelection){
                e.cell.$cell.addClass(this.plugin.getOption("noSelectableClass"));
            }
        }

    },



    "pluginPrototype" : {

        __restoreSelection: function(tableInstance){

            var self = this;

            tableInstance.$table.find(".zt-table-tr.zt-data-row").each(function(i,item){
                var $row = $(item);
                var id = tableInstance.table.getRowId($row);

                if( id && tableInstance.internalSelection[id]){
                    $row.addClass(self.getOption("selectionClass"));
                }else{
                    $row.removeClass(self.getOption("selectionClass"));
                }

            });

        },

        /**
         * Should not be called directly, instead use emulateClick method
         */
        makeRowSelection: function(tableInstance, $row, largeSelection){

            // check if we already reached the max selection
            var maxSelection = this.getOption("maxSelection", tableInstance);
            if(maxSelection === 0){
                return false;
            }

            var changed = false;

            if(largeSelection){
                if(tableInstance.lastSelection && tableInstance.$table.find(tableInstance.lastSelection)){
                    var mode = tableInstance.lastSelection.hasClass(this.getOption("selectionClass")) ? 1 : -1;

                    var lastIndex   = tableInstance.lastSelection.index();
                    var clickIndex  = $row.index();

                    var first = lastIndex > clickIndex ? clickIndex : lastIndex;
                    var last  = lastIndex > clickIndex ? lastIndex  : clickIndex;

                    for(var i = first ; i <= last ; i++){
                        var $curRow = tableInstance.$table.find(".zt-table-tr").eq(i);
                        if(this.selectRow(tableInstance, $curRow, mode)){
                            changed = true;
                        }
                    }
                }else{
                    changed = this.selectRow(tableInstance, $row, 0);
                }
            }else{
                changed = this.selectRow(tableInstance, $row, 0);
            }

            // Update the last selection and css
            if(tableInstance.lastSelection){
                tableInstance.lastSelection.removeClass("zt-last-selection");
            }
            $row.addClass("zt-last-selection");
            tableInstance.lastSelection = $row;

            return changed;
        },

        /**
         * Should not be called directly, instead use emulateClick method
         * proceed to a single row selection according to the selectionType parameter
         *
         * SelectionType values :
         *  -1 : unselect only
         *   1 : select only
         *   0 : automatic (select if not already selected  OR  unselect if already selected)
         */
        selectRow : function(tableInstance, $row, selectionType){

            var maxSelection = this.getOption("maxSelection", tableInstance);
            var plugin = this;

            if(maxSelection > 1){
                if($row.hasClass(plugin.getOption("selectionClass")) && selectionType !== 1){
                    plugin.rowSetSelection(tableInstance, $row, false);
                    return true;
                }else if( selectionType !== -1 ){
                    if(tableInstance.$table.find("." + plugin.getOption("selectionClass")).length >= maxSelection){
                        return false;
                    }else{
                        this.rowSetSelection(tableInstance, $row, true);
                        return true;
                    }
                }
            }else if(maxSelection == 1){
                if($row.hasClass(plugin.getOption("selectionClass")) && selectionType !== 1){
                    this.rowSetSelection(tableInstance, $row, false);
                    return true;
                }else if( selectionType !== -1 ){
                    this.clearTableSelection(tableInstance);
                    this.rowSetSelection(tableInstance, $row, true);
                    return true;
                }
            }else if(maxSelection === false){
                if( selectionType === 0 ){
                    if($row.hasClass(plugin.getOption("selectionClass"))){
                        this.rowSetSelection(tableInstance, $row, false);
                    }else{
                        this.rowSetSelection(tableInstance, $row, true);
                    }
                }else if( selectionType === 1 ){
                    this.rowSetSelection(tableInstance, $row, true);
                }else{
                    this.rowSetSelection(tableInstance, $row, false);
                }
                return true;
            }
        },

        getSelectedRows : function(tableInstance){
            return tableInstance.$table.find('.' + this.getOption("selectionClass"));
        },


        rowSetSelection : function(tableInstance, $row, selected){
            if(selected){
                $row.addClass(this.getOption("selectionClass"));
                if(this.getOption("keepSelection", tableInstance)){
                    this.__internalSelectionAdd(tableInstance, $row);
                }
            }else{
                $row.removeClass(this.getOption("selectionClass"));
                if(this.getOption("keepSelection", tableInstance)){
                    this.__internalSelectionRemove(tableInstance, tableInstance.table.getRowId($row));
                }
            }
        },

        clearTableSelection: function(tableInstance, includeHidden){

            var self = this;

            if(includeHidden){
                var rows = tableInstance.getSelection();
                for(var i = 0 ; i < rows.length ; i++){
                    this.rowSetSelection(tableInstance, $(rows[i]),false);
                }
                tableInstance.internalSelection = {};

                if(rows.length > 0){
                    tableInstance.tableEvent("selectionChange", {"changed" : true});
                }
            } else {
                var $rows = tableInstance.getTableBodyElement().find('.zt-data-row.' + this.getOption("selectionClass"));
                if($rows.length > 0){
                    $rows.each(function(i, v){
                        self.rowSetSelection(tableInstance, $(v), false);
                    });
                    tableInstance.tableEvent("selectionChange", {"changed" : true});
                }
            }



        },

        selectVisibleRows: function(tableInstance){

            var $rows = tableInstance.getTableBodyElement().find('.zt-data-row');
            var self = this;
            var changed = 0;

            $rows.each(function(i, v){
                var $row = $(v);
                if(!$row.hasClass('zt-selected')){
                    self.rowSetSelection(tableInstance, $row, true);
                    changed++;
                }
            });

            if(changed){
                tableInstance.tableEvent("selectionChange", {"changed" : true});
            }
        },

        /**
         * should not be called directly
         * used to keep selection across draw events
         */
        __internalSelectionAdd : function(tableInstance, $row){
            tableInstance.internalSelection[tableInstance.table.getRowId($row)] = $row.data("dataSet");
        },

        /**
         * should not be called directly
         * used to keep selection across draw events
         */
        __internalSelectionRemove : function(tableInstance, id){
            tableInstance.internalSelection[id] = null;
            delete tableInstance.internalSelection[id];
        },

        emulateClick: function(tableInstance, $row, largeSelection){

            var changed = this.makeRowSelection(tableInstance, $row, largeSelection);

            if(changed){
                tableInstance.tableEvent("selectionChange", {"changed" : changed});
            }

        }


    },
    "tableKeys" : function(plugin){

        return {

            internalSelection: {},
            lastSelection: null,

            getSelection: function () {

                if(plugin.getOption("keepSelection", this)){
                    var selection = [];
                    ZeroTable.foreach(this.internalSelection, function(item){
                        selection.push(item);
                    });
                    return selection;
                }else{
                    return this.getVisibleSelection();
                }
            },

            countSelection: function () {
                return this.getSelection().length;
            },

            getVisibleSelection: function(){
                var selection = [];
                this.$table.find(".zt-table-tr.zt-data-row.zt-selected").each(function(i,item){
                    var $row = $(item);
                    selection.push($row.data("dataSet"));
                });
                return selection;
            },

            countVisibleSelection: function () {
                return this.getVisibleSelection().length;
            },


            countHiddenSelection: function(){
                return this.countSelection() - this.countVisibleSelection();
            },

            clearSelection : function(){
                plugin.clearTableSelection(this, true);
            },

            clearVisibleSelection : function(){
                plugin.clearTableSelection(this, false);
            },

            selectVisibleRows: function(){
                plugin.selectVisibleRows(this);
            }
        };

    }
});