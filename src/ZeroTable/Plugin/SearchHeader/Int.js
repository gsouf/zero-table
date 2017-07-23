ZeroTable.Plugin.SearchHeader.Int = function(options){
    ZeroTable.Plugin.SearchHeader.Searcher.apply(this);
    ZeroTable.extend(this.options =
        {
            min: null,
            max: null
        },
        [options]
    );
};

ZeroTable.extendClass(ZeroTable.Plugin.SearchHeader.Int, ZeroTable.Plugin.SearchHeader.Searcher, {


    __draw: function(){
        var $elm = $("<div class='zt-input-wrapper'><input type='number'/></div>");
        return $elm;
    },

    __bindEvents: function($elm){
        var self = this;

        var $input = $elm.find("input");

        $input.on('input', function(){
            var value = $input.val();
            self.update(self.__createFilterValue(value));
        });

        $input.on('focus', function(){
            $input.addClass('zt-is-editing');
        });

        $input.on('blur', function(){
            $input.removeClass('zt-is-editing');
        });

    },

    __createFilterValue: function(value){
        if("" === value){
            return null;
        } else {
            return {
                "type" : "eq",
                "value": value
            };
        }
    },

    __updateElements: function($elements, value){
        $elements.find("input").val(value ? value.value : '');
    },

    __empty: function($elements){
        $elements.find("input").val('');
    }

});

