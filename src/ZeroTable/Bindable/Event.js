/**
 * @class ZeroTable.Bindable.Event
 * Object that is propagated with the event
 */
ZeroTable.Bindable.Event = function(context){

    this.context = context;
    this._interupted = false;
};

ZeroTable.Bindable.Event.prototype={

    stopPropagation: function(){
        this._interupted = true;
    },

    interrupted: function(){
        return this._interupted;
    }

};