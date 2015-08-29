# First Steps

The following step will explain you how to set up a basic table by creating a simple html page.

## Import the assets

The library is made of two files :
* ``zero-table.min.js``
* ``zero-table.min.css``

There is only one dependency :
* ``jquery``


Here is what you html would look for now

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
```


## Setup a html wrapper

We needs a wrapper in the DOM that will contain the generated table. Just add a div to the html:

```html
<div id="table" style="height:200px;"></div>
```

> **Note** The wrapper dimensions (width and height) are very important because it will be the max size of the table.

## Create the table

Now we need to create a table with some default data. For this example let's put all the code into a simple ``<script>`` tag (view code comments for informations)

```html
<script>
	$(function(){
	
		// This is an data array that we want to show in the table
		var data = [
        
			{
				firstname: "bart",
				lastname : "simpsons",
				age : 10
			},
			{
				firstname: "homer",
				lastname : "simpsons",
				age : 40
			},
			{
				firstname: "lisa",
				lastname : "simpsons",
				age : 8
			},
			{
				firstname: "marge",
				lastname : "simpsons",
				age : 40
			}
		];
	
		// Then we setup the most basic configuration possible for the table
		// We only tell what columns we want to show
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

		
		// we create the table with the previous configuration and data
		var tableInstance = new ZeroTable.TableInstance(config, data)
			// we add the generated table to the wrapper
			.appendTo($("#table"));

	});
</script>
```

> **Note**  We created a simple javascript array for the data. Behind the mood zero table translate it to a standard
 ``ZeroTable.Data.DataArray``.  Learn more about data adaptor (LINK TODO)
