ZeroTable.Plugin.SearchHeader.Searcher = function(options){

    var self = this;

    ZeroTable.extend(this,[
        {

        },
        options
    ]);



    this.$drawElement = null;
    this.$cloneList = $();

};

ZeroTable.Plugin.SearchHeader.Searcher.prototype = {


    draw: function(){
        this._initializeDraw();

        var $cloneElement = this.$drawElement.clone();
        this.$cloneList = this.$cloneList.add($cloneElement);

        this.__bindEvents($cloneElement);

        return $cloneElement;
    },

    _initializeDraw: function(){
        if(!this.$drawElement){
            this.$drawElement = this.__draw();
            this.$cloneList = this.$drawElement;
        }
    },

    update : function(value, silently){
        this._initializeDraw();

        if(value === this.value)
            return;
        this.__updateElements(this.$cloneList, value);
        this.value = value;

        if(!silently){
            this.fire("valueChanged",[value, this]);
        }
    },

    empty: function(silently){
        this.__empty(this.$cloneList);

        if(!silently){
            this.fire("valueChanged",[null, this]);
        }
    },

    getValue: function(){
        return this.value;
    },


    lock:function(locked){
        this.__lock(locked, this.$cloneList);
    },

    __draw: function(){
        throw "__draw() method not implemented";
    },

    __empty: function(){
        throw "__empty() method not implemented";
    },

    __createFilterValue: function(value){
        throw "__createFilterValue() method not implemented";
    },

    __bindEvents: function($elm){
        throw "__bindEvents() method not implemented";
    },

    __lock: function(locked, $elements){
        var $inputs = $elements.find("input").addBack("input");
        if(locked){
            $inputs.attr("readonly","readonly");
            $inputs.addClass("zt-searcher-locked");
        }else{
            $inputs.removeAttr("readonly");
            $inputs.removeClass("zt-searcher-locked");
        }
    },

    __updateElements: function(){
        throw "__updateElements() method not implemented";
    }


};

ZeroTable.Bindable.extends(ZeroTable.Plugin.SearchHeader.Searcher);