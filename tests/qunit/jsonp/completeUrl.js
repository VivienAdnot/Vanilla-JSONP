QUnit.test("complete url", function (assert) {
    var url = "https://api.github.com/users/VivienAdnot";
    var jsonpCallback = function(error, success) {

    };

    var jsonpInstance = new jsonp({
        url: url,
        callback: jsonpCallback,
        urlParameters: {
            testA: 1234,
            testB: 5678
        }
    });

    jsonpInstance.completeUrl();
    assert.ok(jsonpInstance.settings.url.startsWith(url + "?testA=1234&testB=5678"), jsonpInstance.settings.url);
});