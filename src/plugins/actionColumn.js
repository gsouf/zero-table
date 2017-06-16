/**
 * This plugin allows to trigger an action on click the cell in a column
 */
ZeroTable.createPlugin({
    "name" : "core.actionColumn",
    "defaultOptions" : {
    },
    "optionOverrides" : {},
    "init" : null,
    "listen" : {
        "cellClick": function(e){
            if(e.columnDef.options.action){
                e.columnDef.options.action(e);
                this.stopPropagation();
            }
        },

        "afterDrawCell": function(e){
            if(e.columnDef.options.action){
                e.cell.$cell.addClass('zt-cell-has-action');
            }
        }
    },
    "pluginPrototype" : {},
    "tableKeys" : {}
});

