ZERO TABLE
==========

A modular javascript grid library.

It is a work in progress, I pulbish it now as an alpha version because it is already working and powerful, but some features are not implemented, 
need improvement or may change until the stable version. Moreover the doc is only partially written at the moment.

The generated javascript and css are not pushed at the moment you have to build it by yourself (explained bellow in this file)


Pros & Cons
-----------

ZeroTable pros :

* doesnt use the ``<table>`` tag, making styles very flexible
* the data layer is easy to implement to fit any application.
* the api is decoupled with adapters, you can simply change an adapter to do your custom job
* And for more customization, the library works mainly through plugin. You can easily add, remove or replace plugins


ZeroTable cons :

* Working with plugin is very flexible, but it mays lead to compatibility problems between plugins
* Writing your own plugin require you to have a good understanding of the library core

Dependency
----------

Zero table has only **jquery** as dependency

Quick Start
-----------

ZeroTable was built to be super configurable. But some default options are provided to allow quick start with the library



As a starting point, you want to include ``jquery``, and the files ``build/zerotable.min.js`` and ``build/zerotable.min.css``.


The following sample will give youthe most basic example of the library :

```html

<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Zero table</title>
	<link rel="stylesheet" type="text/css" href="file:///home/sghzal/PhpstormProjects/zero-table/build/style.min.css"/>
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="file:///home/sghzal/PhpstormProjects/zero-table/build/zero-table.min.js"></script>
</head>
<body>
	<div id="table" style="height:200px;"></div>
	<script>
		$(function(){
		    var config = {
		         columns: [
		             {
		                 name: "firstname"
		             },
		             {
		                 name: "lastname"
		             },
		             {
		                 name: "age"
		             }
		         ]
		    };

		    var data = [

		        {
		            firstname: "bart",
		            lastname : "simpsons"
		        },
		        {
		            firstname: "homer",
		            lastname : "simpsons"
		        },
		        {
		            firstname: "lisa",
		            lastname : "simpsons"
		        },
		        {
		            firstname: "marge",
		            lastname : "simpsons"
		        }
		    ];

		    var tableInstance = new ZeroTable.TableInstance(config, data);
		    $("#table").append(tableInstance.draw());

		    setTimeout( function(){tableInstance.draw()}, 1500);

	    });
	</script>
</body>
</html>

```

More information on the configuration : TODO DOC

short FAQ (LINKS TODO) :

* How to make my columns orderable
* How to make my rows selectable
* How to customize cell rendering
* How to add row actions
* How to add group row actions
* How to search accross the table
* How to use an ajax data source


Develop, build, contribute
--------------------------

If you want to contribute here are the steps to build the library :

```shell
    $> npm install
    $> grunt dev-compile # build everything a single time
    $> grunt watch # constantly awaits for file change to recompile the sources
```

The files are generated in the directory ``build``