ZeroTable.Plugin.SearchHeader.Select = function(options){
    ZeroTable.Plugin.SearchHeader.Searcher.apply(this);
    ZeroTable.extend(this.options =
        {
            values: {}
        },
        [options]
    );
};

ZeroTable.extendClass(ZeroTable.Plugin.SearchHeader.Select, ZeroTable.Plugin.SearchHeader.Searcher, {

    __draw: function(){

        var $select = $('<select />');
        $select.append('<option value=""></option>');
        ZeroTable.foreach(this.options.values, function(v, i){
            $select.append('<option value="' + v +'">' + i + '</option>')
        });

        var $elm = $("<div class='zt-input-wrapper'></div>");
        $elm.append($select);
        return $elm;
    },

    __bindEvents: function($elm){
        var self = this;

        var $input = $elm.find("select");

        $input.on('change', function(){
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
        $elements.find("select").val(value ? value.value : '');
    },

    __empty: function($elements){
        $elements.find("input").val('');
    }

});

