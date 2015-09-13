ZeroTable.extendClass = function(toExtend, baseExtend, overrides) {
    toExtend.prototype = Object.create(baseExtend.prototype);
    
    for ( var i in baseExtend.prototype ) {
        if ( baseExtend.prototype.hasOwnProperty(i) ) {
            toExtend.prototype[i] = baseExtend.prototype[i];
        }
    }

    for ( var i in overrides ) {
        toExtend.prototype[i] = overrides[i];
    }
};