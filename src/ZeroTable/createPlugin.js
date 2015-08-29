/**
 * Factory that creates a plugin and regiter it globally in the library
 *
 * @param {Object} pluginDefinition - Plugin configuration
 * @param {Object} pluginDefinition.name - MANDATORY - Plugin name - used for fast plugin reference
 * @param {Object} pluginDefinition.init - A function called at the plugin instantiation
 * @param {Object} pluginDefinition.defaultOptions - The default options for the plugin, these options may be overwritten at plugin instanciation
 * @param {Object} pluginDefinition.optionOverrides - set of matches for option override from table options
 * @param {Object} pluginDefinition.listen - List of table events to listen. In the callback ``this`` will always refer to the plugin instance
 * @param {Object} pluginDefinition.tableKeys - List of table function and property that will be publicly added to the table instance
 * @param {Object} pluginDefinition.pluginPrototype - List of table function and property that will be added to the plugin prototype
 */
ZeroTable.createPlugin = function(pluginDefinition) {

    // Sometime you want to define the plugin through a callable so you can define private things
    if(typeof pluginDefinition == "function"){
        pluginDefinition = pluginDefinition();
    }

    // plugin default options
    var defaultOptions = pluginDefinition.defaultOptions || {};
    // plugin events
    var listen = pluginDefinition.listen || {};
    // table keys
    var tableKeys = pluginDefinition.tableKeys || {};
    // optoins overrides
    var optionOverrides = pluginDefinition.optionOverrides || {};

    // plugin name is mandatory
    if(!pluginDefinition.name){
        throw "a plugin must have a name";
    }

    // constructor function
    var plugin = function(options){
        this._PARENT.__contruct(pluginDefinition.name, listen, tableKeys);

        this.setOptions(defaultOptions, options);
        this.setOptionOverrides(optionOverrides);

        if(pluginDefinition.init){
            pluginDefinition.init.apply(this,[]);
        }
    };

    // set plugin name in the constructor
    plugin.__pluginName = pluginDefinition.name;

    // Extends the base plugin class
    var pluginPrototype = pluginDefinition.pluginPrototype || {};
    ZeroTable.extendClass(plugin, ZeroTable.Plugin, pluginPrototype);

    // Make the plugin plublicly available
    ZeroTable.registerPlugin(plugin);
};
