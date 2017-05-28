ZeroTable.Column.check = function(name){

    name = name || '_check';

    return new ZeroTable.Column.Definition({
        name: name,
        header: function($title, tableInstance){
            var $checkbox = $('<div class="zt-checkbox"></div>');
            $checkbox.on('click', function(){
                if(tableInstance.countVisibleSelection() > 0){
                    tableInstance.clearVisibleSelection();
                } else {
                    tableInstance.selectVisibleRows();
                }
            });
            $title.parent().addClass('zt-no-hpadding');
            $title.append($checkbox);

            tableInstance.bindMultiple('selectionChange dataUpdated', function () {
                if(tableInstance.countVisibleSelection() > 0){
                    $checkbox.addClass('zt-active');
                } else {
                    $checkbox.removeClass('zt-active');
                }
            });
        },
        content: '<div class="zt-checkbox"/>',
        size: 25
    })
};