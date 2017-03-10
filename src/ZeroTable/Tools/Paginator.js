ZeroTable.Tools.Paginator = function(table){
    this.table = table;
    this.$item = $('<div class="zt-paginator"></div>');

    var $firstPage = $('<div class="zt-pagi-ico zt-first-page">&lt;&lt;</div>');
    var $previousPage = $('<div class="zt-pagi-ico zt-previous-page">&lt;</div>');
    var $pageSelector = $('<div class="zt-page-selector"><input type="text"/></div>');
    var $totalPages = $('<div class="zt-total-pages"> / <span class="zt-show"></span></div>');
    var $lastPage = $('<div class="zt-pagi-ico zt-last-page">&gt;&gt;</div>');
    var $nextPage = $('<div class="zt-pagi-ico zt-previous-page">&gt;</div>');

    this.$item.append($firstPage);
    this.$item.append($previousPage);
    this.$item.append($pageSelector);
    this.$item.append($totalPages);
    this.$item.append($nextPage);
    this.$item.append($lastPage);



    $nextPage.click(function(){
        table.goToNextPage();
    });
    $lastPage.click(function(){
        table.goToLastPage();
    });
    $firstPage.click(function(){
        table.goToFirstPage();
    });
    $previousPage.click(function(){
        table.goToPreviousPage();
    });

    $pageSelector.find('input').on('keyup', function(e){
        if(e.which == 13) {
            table.setPage($(this).val(), 0);
        }
    });

    $pageSelector.find('input').on("click", function () {
        $(this).select();
    });

    table.on('dataUpdated', function(e){
        $totalPages.find('.zt-show').html(table.countPages());
        $pageSelector.find('input').val(table.currentPage());
    });
};

ZeroTable.Tools.Paginator.prototype = {

    draw : function(){
        return this.$item;
    }

};
