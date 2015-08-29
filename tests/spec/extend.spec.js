describe("Extend", function() {

    var a = {"a" : "foo" , "b" : "bar" , "c" : function(i){return  i + 1;} , "d" : function(j){return j + 1;}};
    var b = {"a" : "baz" , "d" : "crow" };

    it("syntax extend(toBeExtended,[extend1,extend2])", function(){


        var c = {};

        var d = ZeroTable.extend(c,[a,b]);

        expect(c === d).toBeTruthy();


    });
});