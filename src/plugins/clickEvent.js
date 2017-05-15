/**
 * This plugin dispatch click events on the cell or rows
 */
ZeroTable.createPlugin({
    "name" : "core.clickEvents",
    "defaultOptions" : {
        preventHighlight: true
    },
    "optionOverrides" : {},
    "init" : null,
    "listen" : {
        "afterDrawCell": function(e){

            var plugin = this.plugin;

            e.cell.$cell.click(function(clickEvent){

                // prevent highligth allow to dont highlight text with shif click
                if(plugin.getOption("preventHighlight")){
                    if(clickEvent.shiftKey){
                        e.$table.addClass("zt-unhighlightable");
                        $(document).one("mouseup",function(){
                            e.$table.removeClass("zt-unhighlightable");

                            // remove all other selection (or else some text will select on the next non-shift click)
                            var sel = window.getSelection ? window.getSelection() : document.selection;
                            if (sel) {
                                if (sel.removeAllRanges) {
                                    sel.removeAllRanges();
                                } else if (sel.empty) {
                                    sel.empty();
                                }
                            }
                        });
                    }
                }

 
                e.tableInstance.tableEvent("cellClick", {
                    "$cell"  : e.$cell,
                    "$row"   : e.$row,
                    "$table" : e.$table,
                    "event"  : clickEvent,
                    "tableInstance" : e.tableInstance
                });

                e.tableInstance.tableEvent("rowClick", {
                    "cell"  : e.cell,
                    "$row"   : e.$row,
                    "$table" : e.$table,
                    "event"  : clickEvent
                });
            });
        }
    },
    "pluginPrototype" : {},
    "tableKeys" : {}
});

