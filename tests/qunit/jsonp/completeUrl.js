QUnit.test("complete url", function (assert) {
    var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
    var jsonpCallback = function(error, success) {

    };

    var jsonp = new app.Framework.jsonp({
        url: url,
        callback: jsonpCallback,
        urlParameters: {
            testA: 1234,
            testB: 5678
        }
    });

    jsonp.completeUrl();
    assert.ok(jsonp.settings.url.startsWith(url + "?testA=1234&testB=5678"), jsonp.settings.url);
});