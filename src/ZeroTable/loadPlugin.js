/**
* Factory that will check how to instanciate the plugin and return the plugin instance
*
* @param {Object} plugin - the plugin to register
*/
ZeroTable.loadPlugin = function(plugin, options) {
    if(typeof plugin == "string"){

        if(ZeroTable._plugins.hasOwnProperty(plugin)){

            if(options){
                return new ZeroTable._plugins[plugin](options);
            }else{
                return new ZeroTable._plugins[plugin]();
            }

        }else{
            throw "Plugin " + plugin + " was not registered and could not be loaded.";
        }

    }else if(Array.isArray(plugin)){
        return ZeroTable.loadPlugin(plugin[0], plugin[1]);
    }else if(typeof plugin == "object"){
        return plugin;
    }
};
