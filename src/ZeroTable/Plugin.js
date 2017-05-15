ZeroTable.Plugin = function(name, tableInstanceEvents, tableInstanceKeys){
    this.tableInstanceEvents = tableInstanceEvents;
    this.tableInstanceKeys = tableInstanceKeys;
    this.pluginName = name;

    this._options = {};
    this._optionOverrides = {};

    if(typeof this.tableInstanceKeys == 'function'){
        this.tableInstanceKeys = this.tableInstanceKeys.call(null, this);
    }
};

ZeroTable.Plugin.prototype = {

    prepare : function(tableInstance){

        var plugin = this;

        if(this.tableInstanceEvents){

            var events = [];

            ZeroTable.foreach(this.tableInstanceEvents, function(eventCb,eventName){

                var eventNames = eventName.split(",");

                ZeroTable.foreach(eventNames, function(eventName){
                    tableInstance.bind(eventName.trim(), function(){

                        this.plugin = plugin;
                        eventCb.apply(this, arguments);
                    });
                });

            });
        }


        if(this.tableInstanceKeys){
            ZeroTable.foreach(this.tableInstanceKeys, function(callback, keyName){
                tableInstance.plugKey(keyName, callback);
            })
        }

    },

    setOptions: function(defaultOptions, override){
        this._options = {};
        if(override){
            ZeroTable.extend(this._options, [defaultOptions, override]);
        }else if(defaultOptions){
            this._options = defaultOptions;
        }
    },

    setOption: function(optionName, value){
        this._options[optionName] = value;
    },

    setOptionOverrides: function(overrides){
        this._optionOverrides = overrides;
    },

    getOption: function(optionName, tableInstance){

        var value = null;

        if(
               tableInstance
            && this._optionOverrides.hasOwnProperty(optionName)
            && tableInstance.hasOption(this._optionOverrides[optionName])
        ){
            value = tableInstance.getOption(this._optionOverrides[optionName])
        }else if(this._options.hasOwnProperty(optionName)){
            value = this._options[optionName];
        }

        return value;
    }

};
