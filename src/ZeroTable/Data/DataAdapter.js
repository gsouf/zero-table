ZeroTable.Data.DataAdapter = function(){

};

ZeroTable.Data.DataAdapter.prototype = {

    countAll : function(){},

    countFiltered : function(){},

    findRange : function(offset, limit, dataConnector){},

    order : function(columns){},

    filter : function(field, filter){}

};

ZeroTable.Bindable.extends(ZeroTable.Data.DataAdapter);