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

        "rowClick" : function(e){

            if( ! e.$row.hasClass(this.plugin.getOption("noSelectableClass"))){
                this.plugin.emulateClick(e.tableInstance, e.$row, e.event.shiftKey);
            }

        },

        "afterDrawRows" : function(e){

            if(this.plugin.getOption("keepSelection") == true) {
                if ( ! e.tableInstance.table.idProperties > 0) {
                    throw "Cannot enable keepSelection feature. table.idProperties was not specified";
                }

                this.plugin.__restoreSelection(e.tableInstance);

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
            if(maxSelection == 0){
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
                    this.clearSelection();
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
            return this.$table.find(this.getOption("selectionClass"));
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
    "tableKey" : function(plugin){

        return {

            internalSelection: {},
            lastSelection: {},

            "getSelection": function () {
                var selection = [];

                if(plugin.getOption("keepSelection", this)){
                    ZeroTable.foreach(this.internalSelection, function(item){
                        selection.push(item);
                    })
                }else{

                }

                return selection;
            },

            "countSelection": function () {
                return this.getSelection().length;
            },

            getVisibleSelection: function(){
                var selection = [];
                this.tableInstance.$table.find(".zt-table-tr.zt-data-row").each(function(i,item){
                    var $row = $(item);
                    selection.push($row.data("dataSet"));
                });
                return selection;
            },

            "countVisibleSelection": function () {
                return this.getVisibleSelection().length;
            },


            "countHiddenSelection": function(){
                return this.countSelection() - this.countVisibleSelection();
            },

            clearSelection : function(){
                var rows = plugin.getSelectedRows(this);
                for(var i = 0 ; i < rows.length ; i++){
                    plugin.rowSetSelection(this, $(rows[i]),false);
                }
                this.internalSelection = {};
                //this.__updateSelectionCount();
            },
        };

    }
});