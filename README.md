ZERO TABLE
==========

[![Build Status](https://travis-ci.org/gsouf/zero-table.svg?branch=master)](https://travis-ci.org/gsouf/zero-table)
[![Code Climate](https://codeclimate.com/github/gsouf/zero-table/badges/gpa.svg)](https://codeclimate.com/github/gsouf/zero-table)
[![Test Coverage](https://codeclimate.com/github/gsouf/zero-table/badges/coverage.svg)](https://codeclimate.com/github/gsouf/zero-table/coverage)

A modular javascript grid library.

It is a work in progress, it is already working and powerful, but some features are not implemented, 
need improvement or may change until the stable version. Moreover the doc is not available at the moment.

Dependency
----------

Zero table depends on **jquery**.

Quick Start
-----------

ZeroTable was built to be super configurable. But some default options are provided to allow quick start with the library


As a starting point, you want to include ``jquery``, and the files ``build/zerotable.min.js`` and ``build/zerotable.min.css``.


The following sample will give you the most basic example of the library :

```html

<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Zero table</title>
	<link rel="stylesheet" type="text/css" href="zero-table.min.css"/>
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="zero-table.min.js"></script>
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


Develop
-------

If you want to contribute here are the steps to build the library :

```shell
    npm install
    grunt dev-compile
    
    # alternatively you can watch for changes
    grunt watch 
```

The files are generated in the directory ``build``