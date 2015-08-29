ZeroTable.clone = function(toClone) {

  var cloned = {};
  ZeroTable.extend(cloned, [toClone]);
  return cloned;
};
