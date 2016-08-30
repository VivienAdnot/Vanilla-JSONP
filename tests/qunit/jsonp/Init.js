QUnit.module("jsonp");

QUnit.test("init should success", function (assert) {
    var done = assert.async();

    var url = "https://api.github.com/users/VivienAdnot";
    var jsonpCallback = function(error, success) {

    };
    
    var jsonpInstance = new Jsonp({
        url: url,
        callback: jsonpCallback,
        urlParameters: {
            testA: 1234,
            testB: 5678
        }
    });

    jsonpInstance.init(function(error, data) {
        assert.ok(error == null);
        assert.ok(data != null);
        done();
    });
});

QUnit.test("init should fail", function (assert) {
    var done = assert.async();

    var url = "https://api.github.com/users/VivienAdnot";
    var jsonpCallback = function(error, success) {

    };

    var jsonpInstance = new Jsonp({
        callback: jsonpCallback
    });

    jsonpInstance.init(function(error, data) {
        assert.ok(error != null);
        assert.ok(data == null);
        done();
    });
});