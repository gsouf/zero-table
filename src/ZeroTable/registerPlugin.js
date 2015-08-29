/**
 * add a plugin to the library to make possible fast plugin instanciations
 *
 * @param {Object} plugin - the plugin to register
 */
ZeroTable.registerPlugin = function(plugin) {
    ZeroTable._plugins[plugin.__pluginName] = plugin;
};
