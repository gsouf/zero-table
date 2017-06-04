ZeroTable.Tools.SearchDetails = function(table, options){

    this.options = {};
    options = options || {};

    var self = this;


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
            '<div class="zt-add">' +
                '<div class="zt-add-btn">+</div>' +
                '<ul class="zt-add-list"></ul>' +
            '</div>' +
        '</div>');

    var $filtersList = this.$item.find('.zt-filters-list');
    this.$filtersList = $filtersList;

    var $addButton = this.$item.find('.zt-add-btn');
    var $addList = this.$item.find('.zt-add-list');
    this.$addList = $addList;


    // Populate filter list
    ZeroTable.foreach(table.table.columns, function(columnDef){
        if(columnDef.options.searcher){

            var label = columnDef.options.header || columnDef.options.name;
            var $item = $('<li zt-filter-name="' + columnDef.options.name + '">' + label + '</li>');

            $addList.append($item);

            $item.on('click',function(){
                self.showSearcher(columnDef.options.name);
                $item.addClass('zt-disabled');
            });
        }
    });

    // Show filter list on click on "+"
    $addButton.on('click', function(){
        $addList.addClass('zt-show');

        setTimeout(function(){
            $(document).on('click', function(e){
                $addList.removeClass('zt-show');
                $(document).off(e);
                $addList.css({top: 0})
            });
        }, 100);

        // console.log($addList.)


        var yPos = $addList[0].getBoundingClientRect().top;
        yPos += $addList[0].offsetHeight;
        yPos += 10;

        if(yPos > window.innerHeight) {
            $addList.css({top: window.innerHeight - yPos})
        }



    });


    table.dataConnector.on('filtersCleared', function(e){
        $filtersList.empty();
    });

    table.dataConnector.on('filterRemoved', function(e){
        var filterName = e.filterName;

        var $filterItem = $filtersList.find('.zt-filter-item[zt-filter-name="' + filterName + '"]');

        if($filterItem.find('.zt-is-editing').length === 0){
            $filterItem.remove();
            self.$addList.find('li[zt-filter-name="' + filterName + '"]').removeClass('zt-disabled');
        }
    });

    table.dataConnector.on('filterAdded', function(e){
        var filterName = e.filterName;
        self.showSearcher(filterName);


        self.$addList.find('li[zt-filter-name="' + filterName + '"]').addClass('zt-disabled');
    })

};

ZeroTable.Tools.SearchDetails.prototype = {

    draw : function(){
        return this.$item;
    },

    showSearcher: function(filterName){

        if(this.$filtersList.find('.zt-filter-item[zt-filter-name="' + filterName + '"]').length > 0){
            return;
        }

        var searcher = this.table.getSearcher(filterName);

        if(!searcher){
            return;
        }

        var columnDef = this.table.table.getColumnDefinition(filterName);


        var label;
        if(columnDef){
            label = columnDef.options.header || columnDef.options.name;
        } else {
            label = filterName;
        }

        var $searchItem = $('<div class="zt-filter-item zt-badge" zt-filter-name="' + filterName + '"/>');
        $searchItem.append(label);
        $searchItem.append(searcher.draw());

        // Delete button
        var $delete = $('<div class="zt-badge-delete">&times;</div>');
        $searchItem.append($delete);

        var self = this;

        $delete.on('click', function(){
            searcher.empty();
            self.$filtersList.find('.zt-filter-item[zt-filter-name="' + filterName + '"]').remove();
            self.$addList.find('li[zt-filter-name="' + filterName + '"]').removeClass('zt-disabled');
        });

        this.$filtersList.append($searchItem);
    }

};
