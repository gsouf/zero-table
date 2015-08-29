ZeroTable.stringRendererParser = function(options){

    options = options || {};

    this.filters = {

        "abs": function(value){
            return Math.abs(value);
        },

        "capitalize": function(value){
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        },

        "default": function(value, defaultValue){
            if(undefined === value || null === value){
                return defaultValue;
            }else{
                return value;
            }
        },

        "length": function(value){
            return value.length;
        },

        "lower": function(value){
            return value.toLowerCase();
        },

        "upper": function(value){
            return value.toUpperCase();
        }


    };

    if(options.filters){
        for(var i  in options.filters){
            this.addFilter(i, options.filters[i]);
        }
    }

};

ZeroTable.stringRendererParser.prototype = {

    addFilter: function(name, filter){
        this.filters[name] = filter;
    },

    render: function(renderer, set){

        var self = this;

        // TODO : compile and cache

        renderer = renderer.replace(/\[(\d+)\]/g, '.$1');


        var parts = renderer.split(/\.(?![^\(]*\))/g);

        function parseFilters(data, filters){
            if(filters.length > 0){
                for(var i = 0; i<filters.length; i++){

                    var params = filters[i].match(/\(.*\)/g);

                    if(params){

                        filterName = filters[i].slice(0, filters[i].indexOf("("));

                        if(params.length>1){
                            throw "invalid render string : " + renderer;
                        }else{
                            params = params[0].slice(1,-1);
                            if(params){
                                try{
                                    // TODO : allow reference to current value or set in params
                                    params = JSON.parse('[' + params + ']');
                                }catch(e){
                                    throw "Error while parsing render string params : \"(" + params + ")\" in \"" + renderer + "\". " + e;
                                }
                            }else{
                                params = [];
                            }
                        }

                    }else{
                        filterName = filters[i];
                        params = [];
                    }

                    if(self.filters.hasOwnProperty(filterName)){

                        if( typeof self.filters[filterName] === "function" ){
                            data = self.filters[filterName].apply({set: set}, [data].concat(params));
                        }else{
                            throw "filter " + filterName + " exists but is not a function";
                        }

                    }else{
                        throw "filter " + filterName + " does not exist";
                    }
                }
            }

            return data;
        }

        var current = set;
        while(parts.length > 0){

            var name = parts.shift();
            var nameAndFilters = name.split(/\|(?![^\(]*\))/g);

            if(null === current || undefined == current || typeof current !== "object"){
                current = null;
                nameAndFilters.shift()
            }else{
                current = current[nameAndFilters.shift()];
            }

            current = parseFilters(current, nameAndFilters);
        }

        return current;

    }

};


