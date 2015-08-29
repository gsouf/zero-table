ZeroTable.Plugin.SearchHeader = {};

ZeroTable.Plugin.SearchHeader.SearcherFactory = function(options){

    var self = this;

    ZeroTable.extend(this,[
        {
            searchers: {}
        },
        options
    ]);


};



ZeroTable.Plugin.SearchHeader.SearcherFactory.prototype = {

    build: function(resource){

        if(typeof resource == "string"){

            if(this.searchers.hasOwnProperty(resource)){
                return new this.searchers[resource]();
            }else{
                throw "No such searcher in factory : '" + resource + "'";
            }

        }else if(typeof resource == "object"){

            if(resource instanceof ZeroTable.Plugin.SearchHeader.Searcher){
                return resource;
            }else{
                throw "The resource passed to the factory should be an instance of  : ZeroTable.Plugin.SearchField.Searcher'";
            }

        }

    }

};