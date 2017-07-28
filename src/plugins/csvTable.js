/**
 * This plugin inserts characters between each cell of the table. Thus when
 * an user selects and copies rows it will be able to paste it as a valid csv string
 */
ZeroTable.createPlugin({
    "name" : "core.csv",
    "defaultOptions" : {
        'separator': ','
    },
    "optionOverrides" : {
        'separator': 'csvSeparator'
    },
    "listen" : {

        "afterDrawCell": function(e) {
            if (!e.isLast) {
                var separator = this.plugin.getOption("separator", e.tableInstance);
                e.cell.$cell.append('<span class="zt-only-for-selection">' + separator + '</span>');
            }
        },


        "data.dataUpdated, data.loadFailed": function(e) {
            var tableInstance = this.context;
            tableInstance.$table.find(".zt-wrapper .zt-loading").remove();
        }

    },
    "pluginPrototype" : {},
    "tableKeys" : {}
});

