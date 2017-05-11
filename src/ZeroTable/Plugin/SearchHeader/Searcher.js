ZeroTable.Plugin.SearchHeader.Searcher = function(options){

    var self = this;

    ZeroTable.extend(this,[
        {

        },
        options
    ]);



    this.$drawElement = null;
    this.$cloneList = null;

};

ZeroTable.Plugin.SearchHeader.Searcher.prototype = {


    "draw": function(){
        if(!this.$drawElement){
            this.$drawElement = this.__draw();
            this.$cloneList = this.$drawElement;
        }

        var $cloneElement = this.$drawElement.clone();
        this.$cloneList = this.$cloneList.add($cloneElement);

        this.__bindEvents($cloneElement);

        return $cloneElement;
    },

    update : function(value){

        if(value === this.value)
            return;

        this.__updateElements(this.$cloneList, value);

        this.value = value;

        this.fire("valueChanged",[value, this]);

    },

    getValue: function(){
        return this.value;
    },


    lock:function(locked){
        this.__lock(locked, this.$cloneList);
    },

    "__draw": function(){
        throw "__draw() method not implemented";
    },

    "__bindEvents": function($elm){
        throw "__bindEvents() method not implemented";
    },

    "__lock": function(locked, $elements){
        var $inputs = $elements.find("input").addBack("input");
        if(locked){
            $inputs.attr("readonly","readonly");
            $inputs.addClass("zt-searcher-locked");
        }else{
            $inputs.removeAttr("readonly");
            $inputs.removeClass("zt-searcher-locked");
        }
    },

    "__updateElements": function(){
        throw "__updateElements() method not implemented";
    }


};

ZeroTable.Bindable.extends(ZeroTable.Plugin.SearchHeader.Searcher);