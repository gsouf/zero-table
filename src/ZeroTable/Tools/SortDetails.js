ZeroTable.Tools.SortDetails = function(table, options){

    this.options = {};
    options = options || {};


    ZeroTable.extend(this.options, [
        {
            'translation_sorting': 'Sorting'
        },
        options
    ]);

    console.log(this.options);

    this.table = table;
    this.$item = $('<div class="zt-sort-details"></div>');

    var self = this;

    table.dataConnector.on('orderChange', function(e){
        self.$item.empty();

        var order = this.context.getOrder();

        if (order.length > 0) {

            self.$item.append('<span class="zt-title">' + self.options['translation_sorting'] + ': </span>');

            ZeroTable.foreach(order, function(item, key){
                var column = table.table.getColumnDefinition(item.columnName);

                // Label
                var name = (column && column.options.header) ? column.options.header : item.columnName;

                // order button
                var $orderItem = $('<div class="zt-sort-item">' + name + '</div>');
                $orderItem.addClass('zt-order-' + item.direction);

                // delete button
                var $delete = $('<div class="zt-delete">&times;</div>');
                $orderItem.append($delete);

                // Add too the list
                self.$item.append($orderItem);

                // bind actions
                $orderItem.on('click', function(){
                    table.dataConnector.setOrder(item.columnName, item.direction == 'asc' ? 'desc' : 'asc');
                    table.dataConnector.update(0);
                });

                $delete.on('click', function(){
                    table.dataConnector.removeOrder(item.columnName);
                    table.dataConnector.update(0);
                });

            });
        }

    })

};

ZeroTable.Tools.SortDetails.prototype = {

    draw : function(){
        return this.$item;
    }

};
