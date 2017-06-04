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


    __draw: function(){
        var $elm = $("<div class='zt-input-wrapper'><input type='text' placeholder='search...'/></div>");
        return $elm;
    },

    __bindEvents: function($elm){
        var self = this;

        var $input = $elm.find("input");

        $input.on('input', function(){

            var value = $input.val();
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

        $input.on('focus', function(){
            $input.addClass('zt-is-editing');
        });

        $input.on('blur', function(){
            $input.removeClass('zt-is-editing');
        });

    },

    __updateElements: function($elements, value){
        $elements.find("input").val(value ? value.value : '');
    },

    __empty: function($elements){
        $elements.find("input").val('');
    }

});

