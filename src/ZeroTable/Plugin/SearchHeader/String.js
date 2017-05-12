ZeroTable.Plugin.SearchHeader.String = function(options){
    ZeroTable.Plugin.SearchHeader.Searcher.apply(this);
    ZeroTable.extend(this.options =
        {
            contains: false,
            containsRight: true,
            containsLeft: true
        },
        [options]
    );
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
                self.update(null);
            } else {
                if(self.options.contains){
                    self.update({
                        type : "contains",
                        containsRight: self.options.containsRight,
                        containsLeft: self.options.containsLeft,
                        value: value
                    });
                } else {
                    self.update({
                        "type" : "eq",
                        "value": value
                    });
                }
            }
        });
    },

    "__updateElements": function($elements, value){
        $elements.find("input").val(value ? value.value : '');
    }

});

