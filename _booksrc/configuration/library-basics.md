# Library Core

This section will help you to understand how the whole library works

## The table instances

In ZT each html table is linked to a javascript ``ZeroTable.TableInstance`` object.

The ``TableInstance`` wraps :

* A configuration for the table
* Some plugins that allow the table to act as you want
* A data source that allows to find/search/order row datas

Plugins and data source may be shared between many ``TableInstances``, and that's
something you have to keep in mind when you write your one plugins. They are loosly coupled
and a same plugin instance must be able to answer many tables at same time,
and so goes for the data source. Most of the communication between them is made by
**listening events**.

## The plugins

A plugin is mainly aimed to modify the way the table is drawn and to listen at
user actions (click, drag/drop, keyboard inputs...).

A plugin can add methods and properties to the table instance and should listen
to the events triggered by the table instance to do some work. It can also trigger
events that other plugins can listen.

See [manage plugins](manage-plugins.md) or [write a plugin](../develop/write-a-plugin.md).


## The datasource

A ``datasource`` is an interface. The table instance will ask the datasource for a specific
range of data with a specific ordering and specifics filters. This way we can use the
same datasource for many tables.
