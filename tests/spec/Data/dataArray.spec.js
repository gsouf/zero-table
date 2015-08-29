describe("DataArray", function() {

    var baseData = [

        {"a" : "foo", "b" : "bar", "c": "baz"},
        {"a" : "1",   "b" : "2" ,  "c" : "3"}

    ];

    var dataArray = new ZeroTable.Data.DataArray(baseData);

    it("returns valid unfiltered range", function(done) {
        dataArray.findRange({}, function(data){
            expect(data.data).toEqual(baseData);
            done();
        });
    });

    it("returns valid unfiltered range", function(done) {
        dataArray.findRange({"limit": 0, "offset": 0}, function(data){
            expect(data.data).toEqual(baseData);
            done();
        });
    });

    it("returns the first item", function(done) {
        dataArray.findRange({"limit": 1, "offset": 0}, function(data){
            expect(data.data).toEqual(baseData.slice(0,1));
            done();
        });
    });

    it("returns valid unfiltered range", function(done) {
        dataArray.findRange({"limit": 2, "offset": 0}, function(data){
            expect(data.data).toEqual(baseData);
            done();
        });
    });

    it("returns valid unfiltered range", function(done) {
        dataArray.findRange({"limit": 3, "offset": 0}, function(data){
            expect(data.data).toEqual(baseData);
            done();
        });
    });

    it("returns the last item", function(done) {
        dataArray.findRange({"limit": 0, "offset": 1}, function(data){
            expect(data.data).toEqual(baseData.slice(1));
            done();
        });
    });

    it("returns the last item", function(done) {
        dataArray.findRange({"limit": 1, "offset": 1}, function(data){
            expect(data.data).toEqual(baseData.slice(1));
            done();
        });
    });

    it("returns the last item", function(done) {
        dataArray.findRange({"limit": 3, "offset": 1}, function(data){
            expect(data.data).toEqual(baseData.slice(1));
            done();
        });
    });

    it("returns empty set", function(done) {
        dataArray.findRange({"limit": 0, "offset": 2}, function(data){
            expect(data.data).toEqual([]);
            done();
        });
    });

    it("returns empty set", function(done) {
        dataArray.findRange({"limit": 1, "offset": 2}, function(data){
            expect(data.data).toEqual([]);
            done();
        });
    });
});