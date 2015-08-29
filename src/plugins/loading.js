/**
 * This plugin creates the table body rows and cells and trigger events during the creation
 * Its the most imporant body when you come to draw the table
 */
ZeroTable.createPlugin({
    "name" : "core.loading",
    "defaultOptions" : {},
    "optionOverrides" : {},
    "listen" : {

        "data.loading": function(dataConnector) {
            var tableInstance = this.context;

            var $loader = $("<div/>");
            $loader.addClass("zt-loading");
            tableInstance.$table.find(".zt-wrapper").append($loader);

            var $spinner = $("<div/>");
            $spinner.addClass("zt-loading-spinner");
            $loader.append($spinner);

        },


        "data.dataUpdated, data.loadFailed": function(e) {
            var tableInstance = this.context;
            tableInstance.$table.find(".zt-wrapper .zt-loading").remove();
        }


      

    },
    "pluginPrototype" : {},
    "tableKey" : {}
});

