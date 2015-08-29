/**
 *
 * Column definition structure :
 *
 *  {
 *
 *      name : "column_unique_name", // mandatory
 *      header : "My column", // the name to display in the column header
 *      type : typeModelRef, // a type model (see typeModel)
 *      dataIndex : "firstname",

 *      render : function(value,set,Table){
 *          return value.toUpperCase();
 *      }, // default to null
 *
 *      class : "custom-class1 custom-class2",  // can also be a callback function called once per row (identical to render)
 *
 *      searcher : searcherModelRef, // a searcher model (see searcherModel)
 *
 *      orderable : true,
 *
 *      visible : true,
 *
 *
 *      width : 20 // pixels
 *
 *
 *  }
 *
 * @param options
 * @constructor
 */
ZeroTable.Column.Definition = function(options){

    this.options = {};

    ZeroTable.extend(this.options, [
        {
            visible : true
        },
        options
    ]);

    if(!options.name){
        throw 'no name was specified for the column definition. Name is required';
    }



};

ZeroTable.Column.Definition.prototype = {

    getName : function(){
        return this.options.name;
    },

    /**
     * data index is the name of the property that the column represents in the dataset
     */
    getDataIndex : function(){
        return this.options.dataIndex ? this.options.dataIndex : this.getName();
    }
};
