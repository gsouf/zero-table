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


    it("is not interrupted", function() {
        var e = instance.fire("foo");
        expect(e.interrupted()).toBe(false);
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
    });

    instanceB.bind("foo",function(){
        this.stopPropagation();
        j++;
    });

    instanceB.bind("foo",function(){
        j++;
    });


    it("stops propagation", function() {

        j = 0;
        var event = instanceB.fire("foo",[] );
        expect(j).toEqual(2);
        expect(event.interrupted()).toBe(true);

    });


});