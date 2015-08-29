# Note from the Author

Javascript has been for a long time a messy programming language 
and developers used to make "ready for use" library that often lake of interoperability.

For a few years now things are going better, javascript past weakness are now its best strength. Thanks to its non typed variables and its lambdas you can 
play easily with the "ready to use aspect". Modern tools and latest browser support allow you to have a good code structure that looks like other OOP language.

Ok, that's not the debate, but that actually leads me to the goal I aim to reach with zero table. 
As a developer I'm very interested in the data layer. the data layer is itself.
With this library we are addressing our attention on the rendering and the manipulation of data.

You would ask me "Yes, but why dont you use datatable or other fancy table library that already does the work?".
I'm a developer and the short answer would be : "Because i wanted my own library! That makes sense, doesn't it ?" 
but the reason is actually very different. Let's take the example of [datatable](https://www.datatables.net/) that I have been using for a long time.

Datatable has a lot of good faces, a large community, a lot of examples and it's actually a good library for a lot of cases ; 
but it's to much "ready for use" it's very good for simple usage, but it becomes really hard for advanced usage because of its internal structure.
The other problem of datatable is that it uses the html ``<table>`` tag that becomes a true problem when you want to manipulate it heavily.
For the project I was writting I needed a lot of flexibility from the grid library and that's how I began to write 
the library Zero Table : a library that is very flexible (plugin oriented). Each feature can be disabled or replaced,
you have a very easy workflow to add your own features, each plugin does its work and that's really easy to debug. Furthermore zero table
doesn't use the ``<table>`` tag, instead it uses standard ``<div>`` and some css to put everything in place.
The last point : the data manipulation in zero table is not a plugin because it's the core of the library, but it's an adaptor, 
you can change it at will or use the same data adaptor for many table, it's actually a breeze to work with.

And what's about the name Zero Table ? As I said with no plugin you have no table, and when you have a table there is no ``<table>`` tag !

**TL; DR**

I don't claim it's the perfect grid library, but I built it with maximum interoperability in mind.


# About the documentation

This documentation has two main parts : the first part explains how to deploy the table and to configure it with some cookbooks
and the second part will introduce the core of the library and the plugin development.  Everyhting is accessible from the left menu.

# Support

If you encounter a bug or weird behaviour with the library, please [open an issue on github](https://github.com/gsouf/zero-table/issues/new)

If you have problem to understand how the library works and you want further explanations please start a thread on the forum in the section ``zero table`` (todo : link)


# Other projects

I have set up other projects that may be used with zero table, all are parts of a common project that aims to 
create a platform framework :

- [Hatcher](https://github.com/hatcher-web) *A content management framework built for speed of development for heavy heavy web app*
- [Face ORM](https://github.com/face-orm/face) *a powerful and performant php ORM*
- [UForm](https://github.com/gsouf/UForm) *a php form manipulation library*
- [Khronos](https://github.com/gsouf/khronos-js) *a javascript time chart  library*