QUnit.test("createOnSuccess should succeed", function (assert) {
    var done = assert.async();

    var url = "https://api.github.com/users/VivienAdnot";
    var success = "success";

    var jsonpCallback = function(error, data) {
        assert.ok(error == null);
        assert.ok(data == success, data);
        done();
    };
    
    var jsonpInstance = new jsonp({
        url: url,
        callback: jsonpCallback,
        urlParameters: {
            testA: 1234,
            testB: 5678
        }
    });

    jsonpInstance.createOnSuccess();

    window[jsonpInstance.settings.jsonpCallbackName](success);
});