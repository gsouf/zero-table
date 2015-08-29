ZeroTable.Plugin.SearchHeader.String = function(options){

    var self = this;

    ZeroTable.Plugin.SearchHeader.Searcher.apply(this);

    ZeroTable.extend(this,[
        {

        },
        options
    ]);

};

ZeroTable.extendClass(ZeroTable.Plugin.SearchHeader.String, ZeroTable.Plugin.SearchHeader.Searcher, {


    "__draw": function(){
        var $elm = $("<div class='zt-input-wrapper'><input type='text' placeholder='search...'/></div>");
        return $elm;
    },

    "__bindEvents": function($elm){
        var self = this;
        $elm.find("input").on('input', function(){

            var value = $(this).val();
            if("" == value){
                value = null;
            }

            self.update({
                "type" : "string",
                "value": value
            });
        });
    },

    "__updateElements": function($elements, value){
        $elements.find("input").val(value.value);
    }

});

