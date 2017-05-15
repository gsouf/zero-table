ZeroTable.createPlugin({
    "name" : "core.renderCell",
    "defaultOptions" : {
        "stringRenderer" : null
    },

    "optionOverrides" : {
        "stringRenderer" : "cellStringRenderer"
    },

    "init" : function(){
        if(!this.getOption("stringRenderer")){
            this.setOption("stringRenderer", new ZeroTable.stringRendererParser());
        }
    },

    "listen" : {
        "afterDrawCell": function(e){

            if(e.cell.hasRole("data")){
                var value = this.plugin.renderParse(e.dataRow, e.columnDef.getDataIndex(), e.columnDef.options.render, e.tableInstance);
                e.cell.$cell.html(value);
            }

        }
    },
    "pluginPrototype" : {

        renderParse: function(set, dataName, render, tableInstance){

            var value;

            if(undefined === render || null === render){
                value = set[dataName];
            }else if(typeof render == "function"){
                value = render(set[dataName], set);
            }else if(typeof render == "string"){
                value = this.getOption("stringRenderer").render(render, set);
            }else{
                throw "unknown type for render : " + typeof render;
            }

            return value;

        }

    },
    "tableKeys" : {}
});
