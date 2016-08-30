QUnit.module("jsonp");

var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
var jsonpCallback = function(error, success) {

};

var jsonp = new app.Framework.jsonp(url, jsonpCallback);

// assert

QUnit.test("init should success", function (assert) {
    var done = assert.async();
    assert.expect(2);

    var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
    var jsonpCallback = function(error, success) {

    };
    
    var validjsonp1 = new app.Framework.jsonp({
        url: url,
        callback: jsonpCallback,
        urlParameters: {
            testA: 1234,
            testB: 5678
        }
    });

    validjsonp1.init(function(error, data) {
        assert.ok(error == null);
        assert.ok(data != null);
        done();
    });
});

QUnit.test("init should fail", function (assert) {
    var done = assert.async();
    assert.expect(2);

    var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
    var jsonpCallback = function(error, success) {

    };

    var invalidjsonp1 = new app.Framework.jsonp({
        callback: jsonpCallback
    });

    invalidjsonp1.init(function(error, data) {
        assert.ok(error != null);
        assert.ok(data == null);
        done();
    });
});