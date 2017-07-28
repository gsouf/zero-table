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
        content: '<div class="zt-checkbox"/><span class="zt-only-for-selection"><span class="zt-for-selected-only">1</span><span class="zt-for-unselected-only">0</span></span>',
        size: 25
    })
};