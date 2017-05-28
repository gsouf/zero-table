/**
 * This plugin creates the table body rows and cells and trigger events during the creation
 * Its the most imporant body when you come to draw the table
 */
ZeroTable.createPlugin({
    "name" : "core.tableBody",
    "defaultOptions" : {
        "bodyMode" : 'table'
    },
    "optionOverrides" : {
        "bodyMode" : "bodyMode"
    },

    "init": function(){
        this.availableBodyModes = {
            'table': new ZeroTable.Plugin.TableBodyMode.Table(),
            'grid': new ZeroTable.Plugin.TableBodyMode.Grid()
        };
    },

    "listen" : {

        onInitialize: function(e){
            var bodyMode = this.plugin.getOption('bodyMode', e.tableInstance);
            if(!this.plugin.availableBodyModes.hasOwnProperty(bodyMode)){
                throw 'Invalide body mode :' + bodyMode;
            }
            e.tableInstance.bodyDrawer = this.plugin.availableBodyModes[bodyMode];
            e.tableInstance.bodyMode = bodyMode;
        },

        onClearTable: function(e){
            e.$table.find(".zt-table-wrapper .zt-table-table .zt-table-tbody").remove();
        },

        onDrawTable: function(e) {
            // TODO this should be in init
            var $tbody = $("<div/>");
            $tbody.addClass("zt-table-tbody");
            e.$table.find(".zt-table-wrapper .zt-table-table").append($tbody);
            e.tableInstance.$tableBody = $tbody;
        },

        bodyModeChanged: function(e){
            // TODO: make a tbodyInitialized event
            e.tableInstance.$tableBody.removeClass();
            e.tableInstance.$tableBody.addClass('zt-table-tbody');
            e.tableInstance.bodyDrawer.prepareTableBody(e.tableInstance.$tableBody, e.tableInstance);
        },

        'dataUpdated,bodyModeChanged': function(e){

            var tableInstance = e.tableInstance;
            var $table = tableInstance.$table;
            var $tbody = $table.find('.zt-table-tbody');
            var data = tableInstance.dataConnector.getData();

            $tbody.empty();

            tableInstance.tableEvent("beforeDrawItems", e);

            ZeroTable.foreach(data, function(dataRow){


                var $item = tableInstance.bodyDrawer.drawRow(tableInstance, {"role" : "data"});
                $item.addClass("zt-data-row");

                tableInstance.refreshRow($item, dataRow);

                // E:afterDrawItem
                tableInstance.tableEvent("afterDrawItem", {"dataRow" : dataRow, "$item" : $item });

                $tbody.append($item);
            });

            // E:afterDrawItems
            tableInstance.tableEvent("afterDrawItems", e);
        },




    },
    "pluginPrototype" : {},
    "tableKeys" : function(plugin){
        return {
            refreshRow: function($row, dataRow){

                // Empty the row and build it again
                $row.empty();

                var tableInstance = this;
                var $table = tableInstance.$table;

                // Persist the dataset
                $row.data("dataSet", dataRow);

                tableInstance.bodyDrawer.drawInnerRow(tableInstance, dataRow, $row);
            },

            changeBodyMode: function(newBodyMode) {
                if(!plugin.availableBodyModes.hasOwnProperty(newBodyMode)){
                    throw 'Invalide body mode :' + newBodyMode;
                }
                this.bodyDrawer = plugin.availableBodyModes[newBodyMode];
                this.bodyMode = newBodyMode;

                // E:bodyModeChanged
                this.tableEvent("bodyModeChanged", {});
            },

            getTableBodyElement: function(){
                return this.$tableBody;
            }
        }
    }
});
