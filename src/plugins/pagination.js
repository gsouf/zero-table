/**
 * This plugin add methods for pagination on the table
 */
ZeroTable.createPlugin({
    "name" : "core.pagination",
    "defaultOptions" : {},
    "optionOverrides" : {},
    "init" : null,
    "listen" : {},
    "pluginPrototype" : {},
    "tableKeys" : {

        "countPages" : function(){
            var dataConnector = this.dataConnector;
            if(!dataConnector.totalFilteredRows){
                return 0;
            }
            if(!dataConnector.limit){
                return 1;
            }
            return Math.ceil(dataConnector.totalFilteredRows/dataConnector.limit);
        },

        "currentPage" : function(){
            var dataConnector = this.dataConnector;
            if(!dataConnector.offset){
                return 1;
            }
            if(!dataConnector.limit){
                return 1;
            }

            return Math.ceil(dataConnector.offset/dataConnector.limit) + 1;
        },

        "setPage" : function(page, delay){
            var dataConnector = this.dataConnector;



            if(!dataConnector.limit){
                return false;
            }

            var total = this.countPages();

            if(total < page){
                page = total;
            }else if(page <= 0){
                page = 1;
            }

            dataConnector.setOffset(dataConnector.limit * (page - 1));

            delay = delay || 50;
            dataConnector.update(delay);
        },

        "goToLastPage" : function(){
            this.setPage(this.countPages());
        },

        "goToFirstPage" : function(){
            this.setPage(1);
        },

        "goToNextPage" : function(){
            this.setPage(this.currentPage() + 1);
        },

        "goToPreviousPage" : function(){
            this.setPage(this.currentPage() - 1);
        }


    }
});

