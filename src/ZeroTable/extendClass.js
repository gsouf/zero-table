ZeroTable.extendClass = function(toExtend, baseExtend, overrides) {
    toExtend.prototype = Object.create(baseExtend.prototype);

    toExtend.prototype._PARENT = toExtend.prototype._PARENT || {};

    toExtend.prototype._PARENT.__contruct = function(){
        baseExtend.apply(this, Array.prototype.slice.call(arguments, 0));
    };

    for ( var i in baseExtend.prototype ) {
        if ( baseExtend.prototype.hasOwnProperty(i) ) {
            toExtend.prototype[i] = baseExtend.prototype[i];

            (function(i){
                toExtend.prototype._PARENT[i] = function(){
                    return baseExtend.prototype[i].apply(this, arguments);
                };
            })(i);
        }
    }

    for ( var i in overrides ) {
        toExtend.prototype[i] = overrides[i];
    }
};