ZeroTable.Column.Cell = function($cell){

    this.$cell = $cell;

    this._roles = [];

};

ZeroTable.Column.Cell.prototype = {

    addRole : function(roleName){
        this._roles.push(roleName);
        this.$cell.attr("zt-cell-role", this._roles.join(" "));
    },

    hasRole : function(roleName){
        return this._roles.indexOf(roleName) >= 0;
    }

};
