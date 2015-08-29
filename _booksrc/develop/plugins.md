# Plugins

We placed some efforts to make the plugin creation as easy and as powerful as possible.
The hardest part of the plugin creation is to know when to achieve your stuff.

Before everything it's useful to know how ZT plugins work and that's actually very simple. Take the example of the plugin named ``core.selection``

## Instantiate a plugin

Create an instance of the plugin with default options

```js
var pluginInstance = ZeroTable.loadPlugin("core.selection");
```

## plugin options

You may also create an instance of the plugin with non default options

```js
var pluginInstance = ZeroTable.loadPlugin("core.selection", {"maxSelection" : 5});
console.log(pluginInstance.getOption("maxSelection"));
// > 5
```

Some options may be overriden by the table instance options. e.g :

```js
var pluginInstance = ZeroTable.loadPlugin("core.selection", {"maxSelection" : 5});
console.log(pluginInstance.getOption("maxSelection"));
// > 5

var tableInstance = new ZeroTable.TableInstance({"maxSelection" : 8});
console.log(pluginInstance.getOption("maxSelection", tableInstance));
// > 8
```

## Plugins and events

As it was already mentioned the ZT plugins are listening at events triggered by the table.
These event are catched and the plugin does some work to achieve its goal.

Sometime it mays be tricky to know what event you want to listen at. We discuss this in the
next chapter : [choose your event](choose-your-event.md).

We will now explain how to create a plugin and how to listen at these events.
