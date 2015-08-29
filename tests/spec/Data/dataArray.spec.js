describe("DataArray", function() {

    var baseData = [

        {"a" : "foo", "b" : "bar", "c": "baz"},
        {"a" : "1",   "b" : "2" ,  "c" : "3"}

    ];

    var dataArray = new ZeroTable.Data.DataArray(baseData);

    it("returns valid unfiltered range", function() {

        var dataConnector = new ZeroTable.DataConnector(dataArray);

        expect(dataConnector.findRange(0,0)).toEqual(baseData);
        expect(dataConnector.findRange(0,1)).toEqual([ baseData[0] ]);
        expect(dataConnector.findRange(0,2)).toEqual(baseData);
        expect(dataConnector.findRange(0,3)).toEqual(baseData);
        expect(dataConnector.findRange(0,1000)).toEqual(baseData);

        expect(dataConnector.findRange(1,1)).toEqual([ baseData[1] ]);
        expect(dataConnector.findRange(1,5000)).toEqual([ baseData[1] ]);
        expect(dataConnector.findRange(1,0)).toEqual([ baseData[1] ]);
        expect(dataConnector.findRange(2,0)).toEqual([]);

    });

    it("returns valid total", function() {

        expect(dataArray.countAll()).toEqual(2);

    });

});