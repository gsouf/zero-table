ZeroTable.foreach = function(set,callback){

  if(set instanceof Array){
    for(var i = 0; i < set.length ; i++ ){
      var r = callback(set[i],i,set);
      if(false === r){
        break;
      }
    }
  } else {
    for(i in set){
      if(set.hasOwnProperty(i)){
        var r = callback(set[i],i,set);
        if(false === r){
          break;
        }
      }
    }
  }

};
