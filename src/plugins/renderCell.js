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
                var value;
                if(!e.columnDef.options.render && e.columnDef.options.content){
                    value = e.columnDef.options.content;
                } else {
                    value = this.plugin.renderParse(e.dataRow, e.columnDef.getDataIndex(), e.columnDef.options.render, e.tableInstance);
                }

                if(e.columnDef.options.align){
                    switch(e.columnDef.options.align){
                        case "left":
                            e.cell.$cell.css({'text-align': 'left'});
                            break;
                        case "right":
                            e.cell.$cell.css({'text-align': 'right'});
                            break;
                        case "center":
                            e.cell.$cell.css({'text-align': 'center'});
                            break;
                    }
                }


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
                console.log(render);
                value = this.getOption("stringRenderer").render(render, set);
            }else{
                throw "unknown type for render : " + typeof render;
            }

            return value;

        }

    },
    "tableKeys" : {}
});
