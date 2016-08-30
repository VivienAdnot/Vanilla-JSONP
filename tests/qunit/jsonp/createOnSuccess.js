QUnit.test("createOnSuccess should succeed", function (assert) {
    var done = assert.async();

    var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
    var success = "success";

    var jsonpCallback = function(error, data) {
        assert.ok(error == null);
        assert.ok(data == success, data);
        done();
    };
    
    var validjsonp1 = new app.Framework.jsonp({
        url: url,
        callback: jsonpCallback,
        urlParameters: {
            testA: 1234,
            testB: 5678
        }
    });

    validjsonp1.createOnSuccess();

    window[validjsonp1.settings.jsonpCallbackName](success);
});