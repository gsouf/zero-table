ZeroTable.Table = function(options){

    var self = this;

    ZeroTable.extend(this,[
        {
            columns : [],
            plugins : null,
            idProperties: []
        },
        options
    ]);

    // DEFAULT PLUGINS FOR QUICKSTART
    if(null == this.plugins){
        this.plugins = [
            "core.tableBody",
            "core.header",
            "core.search",
            "core.sizing",
            "core.renderCell",
            "core.clickEvents",
            "core.actionColumn",
            "core.pagination",
            "core.selection",
            "core.loading",
            "core.searchHeader",
            "core.csv"
        ]
    }

    ZeroTable.foreach(this.plugins, function(v, k){
        self.plugins[k] = ZeroTable.loadPlugin(v);
    });

    if(this.additionalPlugins){
        ZeroTable.foreach(this.additionalPlugins, function(v, k){
            self.plugins.push(ZeroTable.loadPlugin(v));
        });
    }

    ZeroTable.foreach(this.columns, function(item,i,set){
        if ( !(item instanceof ZeroTable.Column.Definition) ) {
            set[i] = new ZeroTable.Column.Definition(item);
        }
    });


};

ZeroTable.Table.prototype = {


    getColumnDefinition : function(param){

        var name = null;

        if(typeof param == "string"){
            name = param;
        } else if(param instanceof jQuery){
            name = param.attr("data-zt-column");
        }

        if(!name){
            return null;
        }else{

            var rcolumn = null;
            ZeroTable.foreach(this.columns,function(column){
                if(column.getName() == name){
                    rcolumn = column;
                    return false;
                }
            });

            return rcolumn;
        }

    },

    getRowId: function($row){

        var set = $row.data("dataSet");

        var id = "";

        for(var i = 0; i < this.idProperties.length; i++){
            id += set[this.idProperties[i]];
        }

        return id;

    }

};
