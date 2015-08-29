ZeroTable.extend = function(toExtend, extendsObjects) {

  if ( ! toExtend ) {
    toExtend = {};
  } else if ( toExtend instanceof Array && !extendsObjects ) {
    extendsObjects = toExtend;
    toExtend = {};
  }

  for ( var i = 0 ; i < extendsObjects.length ; i++ ) {

    var actualObject = extendsObjects[i];

    for (var j in actualObject){
      if(actualObject.hasOwnProperty(j)){
        toExtend[j] = actualObject[j];
      }
    }
  }
  return toExtend;
};
