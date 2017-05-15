ZeroTable.Column.check = function(name){

    name = name || '_check';

    return new ZeroTable.Column.Definition({
        name: name,
        header: '',
        content: '<div class="zt-checkbox"/>',
        size: 25
    })
};