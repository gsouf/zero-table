# Write your first plugin

Basically a plugin will catch events triggered by the table instance and mays
modify the arguments attached to the event, listen at the user inputs, trigger new events,
the plugin can also add some public methods to the table... let's see how to make it real.

## Plugin Structure

Every plugin should start with this structure :

```js
    ZeroTable.createPlugin({
        "name" : "namespace.name",
        "defaultOptions" : {
            "someOption" : "someValue",
            "foo" : 20
        },
        "optionOverrides" : {
            "someOption" : "someOption",
            "foo" : "bar"
        },
        "init" : null,
        "listen" : {},
        "pluginPrototype" : {},
        "tableKey" : {}
    });
```

> "Ok, that sounds good but what does this mean ?"

When you call ``ZeroTable.createPlugin`` you define some options and functions to make
your plugin worthy. Here is the meaning of the options

## Plugin Options

* **Name**

Its the name used when you want to call the plugin. Example with the plugin named ``namespace.name`` :

```js
// This create an instance of the plugin
var pluginInstance = ZeroTable.loadPlugin("namespace.name");
```

* **defaultOptions**

Default options of the plugin :

```js
var pluginInstance = ZeroTable.loadPlugin("namespace.name");
console.log(pluginInstance.getOption("someOption"));
// > someValue
```

* **optionOverrides**

That's the options you can override from the table instance and what option they match in the table instance.
It can be tricky to understand how it works, the example will be much more concise :

```js
var pluginInstance = ZeroTable.loadPlugin("namespace.name");
var tableInstance = new ZeroTable.TableInstance({
    "someOption" : "otherValue",
    "foo" : 0,
    "bar" : 10
});
// someOption override was set for the same name, there is no ambiguity
console.log(pluginInstance.getOption("someOption", tableInstance));
// > otherValue

// foo was overriden with the "bar" option, then it will search for the option "bar" instead of "foo" in the table options
// that's actually useful to avoid conflict with other plugins that would use the same options name.
console.log(pluginInstance.getOption("foo", tableInstance));
// > 10
```


* **optionOverrides**

That's a callback function that is called at the plugin instantiation
