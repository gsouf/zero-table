describe("Bindable", function() {

    var A = function(){};
    A.prototype = {};
    ZeroTable.Bindable.extends(A);

    var instance = new A();

    var i = 0;

    instance.bind("foo",function(){
        i++;
    });

    instance.bind("bar",function(){
        i=0;
    });


    it("Triggers bound callbacks", function() {
        expect(i).toEqual(0);
        instance.fire("foo");
        expect(i).toEqual(1);
        instance.fire("foo");
        expect(i).toEqual(2);
        instance.fire("foo");
        expect(i).toEqual(3);
        instance.fire("bar");
        expect(i).toEqual(0);
        instance.fire("foo");
        expect(i).toEqual(1);

    });


    var text ="";

    instance.bind("baz",function(p1, p2, p3){
        text = p1 + " " + p2 + " " + p3;
    });

    it("Triggers callbacks with params", function() {

        instance.fire("baz",["hello","world","!"]);
        expect(text).toEqual("hello world !");

    });


    var B = function(){};
    B.prototype = {};
    ZeroTable.Bindable.extends(B);

    var instanceB = new B();

    var j = 0;

    instanceB.bind("foo",function(){
        j++;
        return false;
    });

    instanceB.bind("foo",function(){
        j++;
    });


    it("Doesn't cancels on false", function() {

        j = 0;

        var retVal = instanceB.fire("foo",[], false );
        expect(j).toEqual(2);
        expect(retVal).toBe(true);



    });

    it("Cancels on false", function() {

        j = 0;

        var retVal = instanceB.fire("foo",[], true );
        expect(j).toEqual(1);
        expect(retVal).toBe(false);

    });


});