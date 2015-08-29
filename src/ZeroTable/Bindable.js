/**
 * @class Bindable
 * make extending class bindable and firable
 */
ZeroTable.Bindable = function(){};

ZeroTable.Bindable.prototype={

    bind : function(what,how){

        if(!this.bindable_bounds){
            this.bindable_bounds = {};
        }

        if(!this.bindable_bounds[what]){
            this.bindable_bounds[what] = [];
        }

        this.bindable_bounds[what].push(how);

    },

    fire : function(what, params){

        var event = new ZeroTable.Bindable.Event(this);

        if(this.bindable_bounds && this.bindable_bounds[what]) {

            for (var i = 0; i < this.bindable_bounds[what].length; i++) {
                var cR = this.bindable_bounds[what][i].apply(event, params);
                if (event._interupted === true) {
                    return false;
                }
            }

        }




        if(this.bindable_forwards){
            for(var i in this.bindable_forwards){
                var namespacedEvent = what;
                if(this.bindable_forwards[i].key){
                    namespacedEvent = this.bindable_forwards[i].key + "." + what;
                }
                this.bindable_forwards[i].item.fire(namespacedEvent, params);
            }

        }

        return true;

    },

    forwardEvents: function(item, key){
        if(!this.bindable_forwards){
            this.bindable_forwards = [];
        }
        this.bindable_forwards.push({
            item: item,
            key : key
        });
    }

};

ZeroTable.Bindable.extends = function (what){

    what.prototype.bind    = ZeroTable.Bindable.prototype.bind;
    what.prototype.on      = ZeroTable.Bindable.prototype.bind;

    what.prototype.trigger = ZeroTable.Bindable.prototype.fire;
    what.prototype.fire    = ZeroTable.Bindable.prototype.fire;

    what.prototype.forwardEvents    = ZeroTable.Bindable.prototype.forwardEvents;

};