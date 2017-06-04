ZeroTable.Tools.SearchDetails = function(table, options){

    this.options = {};
    options = options || {};


    ZeroTable.extend(this.options, [
        {
            'translation_filters': 'Filters'
        },
        options
    ]);


    this.table = table;
    this.$item = $(
        '<div class="zt-search-details">' +
            '<span class="zt-title">' +
                this.options['translation_filters'] + ': ' +
            '</span>' +
            '<div class="zt-filters-list zt-badge-list"></div>' +
        '</div>');

    var $filtersList = this.$item.find('.zt-filters-list');


    table.dataConnector.on('filtersCleared', function(e){
        $filtersList.empty();
    });

    table.dataConnector.on('filterRemoved', function(e){
        var filterName = e.filterName;

        var $filterItem = $filtersList.find('.zt-filter-item[zt-filter-name="' + filterName + '"]');

        if($filterItem.find('.zt-is-editing').length === 0){
            $filterItem.remove();
        }
    });

    table.dataConnector.on('filterAdded', function(e){

        var filterName = e.filterName;

        if($filtersList.find('.zt-filter-item[zt-filter-name="' + filterName + '"]').length > 0){
            return;
        }

        var searcher = table.getSearcher(filterName);
        var columnDef = table.table.getColumnDefinition(filterName);

        var $searchItem = $('<div class="zt-filter-item zt-badge" zt-filter-name="' + filterName + '"/>');

        var label;
        if(columnDef){
            label = columnDef.options.header || columnDef.options.name;
        } else {
            label = filterName;
        }

        $searchItem.append(label);
        $searchItem.append(searcher.draw());

        // Delete button
        var $delete = $('<div class="zt-badge-delete">&times;</div>');
        $searchItem.append($delete);


        $delete.on('click', function(){
            searcher.empty();
        });

        $filtersList.append($searchItem);
    })

};

ZeroTable.Tools.SearchDetails.prototype = {

    draw : function(){
        return this.$item;
    }

};
