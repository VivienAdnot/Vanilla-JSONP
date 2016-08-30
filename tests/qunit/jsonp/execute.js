QUnit.test("execute should succeed", function (assert) {
    var done = assert.async();

    var url = "https://api.github.com/users/VivienAdnot";

    var jsonpCallback = function(error, data) {
        assert.ok(error == null);
        assert.ok(data != null, JSON.stringify(data));
        done();
    };
    
    var jsonpInstance = new Jsonp({
        url: url,
        callback: jsonpCallback,
        responseType: "json"
    });

    jsonpInstance.execute();
});

QUnit.test("execute should fail", function (assert) {
    var done = assert.async();

    var url = "http://0.0.0.0";

    var jsonpCallback = function(error, data) {
        assert.ok(error != null, error);
        assert.ok(data == null);
        done();
    };
    
    var jsonpInstance = new Jsonp({
        url: url,
        callback: jsonpCallback,
        responseType: "json"
    });

    jsonpInstance.execute();
});