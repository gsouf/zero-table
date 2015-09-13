describe("ExtendClass", function() {

    var A = function(){};
    A.prototype = {

        foo: function(what1,what2){
            return "foo" + what1 + what2;
        },

        fooA: function(){
            return "A";
        }

    };

    var B = function(){};
    ZeroTable.extendClass(B,A,{
        foo:function(what1, what2){
            return "bar " + what1 + " " + what2;
        },

        upperFoo : function(what1,what2){
            return this.foo(what1.toUpperCase(), what2.toUpperCase());
        }
    });

    it("is extended", function(){

        var bInstance = new B();

        expect(bInstance.foo("bar","baz")).toEqual("bar bar baz") ;
        expect(bInstance.upperFoo("bar","baz")).toEqual("bar BAR BAZ") ;
        expect(bInstance.fooA()).toEqual("A") ;


    });
});