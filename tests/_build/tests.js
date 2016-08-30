var extendObject = function (destination, source) {
    var expectedToStringCallWhenObject = Object.prototype.toString.call({});

    var isPropertyAnObject = function (property) {
        return Object.prototype.toString.call(property) === expectedToStringCallWhenObject;
    };

    for (var property in source) {
        if(source.hasOwnProperty(property)) {
            //if property is an object
            if (isPropertyAnObject(source[property])) {
                // create the property in destination if it doesn't exist yet
                destination[property] = destination[property] || {};
                //recursive call to extendObject()
                extendObject(destination[property], source[property]);
            }
            // property is not a object (string, integer ...)
            else {
                destination[property] = source[property];
            }
        }
    }

    return destination;
};

var validateObject = function (source, propertiesArray, contextName, callback) {
    // default values
    var defaultCallback = function (missingProperties) {
        if(!missingProperties || missingProperties.length == 0) {
            callback(true, "");
            return;
        }

        var message = "missing properties:";

        for (var prop in missingProperties) {
            message += ". " + missingProperties[prop];
        }

        console.warn(message);

        callback(false, message);
    };

    // init

    var missingProperties = [];
    propertiesArray = propertiesArray || [];
    contextName = contextName || "Playtem Template JS";
    callback = callback || defaultCallback;

    // execute

    if (!source || Object.prototype.toString.call(source) != "[object Object]") {
        callback["ERROR: source is not a valid object"];
        return;
    }

    for (var arrayIndex in propertiesArray) {
        var currentProperty = propertiesArray[arrayIndex];

        if (source.hasOwnProperty(currentProperty) === false || source[currentProperty] === undefined) {
            missingProperties.push(currentProperty);
        }
    }

    callback(missingProperties);
};

QUnit.module("extendObject");

QUnit.test("extendObject", function (assert) {
    // valid

    var source = {
        prop1: "123",
        prop2: "456",
        propO: {
            A: "1",
            B: "2",
            testArray2: [10, 12]
        }
    };

    var dest = {
        prop3: "789",
        prop4: "ABC",
        propO: {
            A: "10",
            C: "110",
            testArray1: [1, 2, 3],
            testArray3: [
                {
                    sub1: "test",
                    sub2: [
                        7,
                        8,
                        {
                            test: 9
                        }
                    ]
                }
            ],
            propO1: {
                test: "1"
            }
        }
    };

    var expectedResult = {
        prop1: "123",
        prop2: "456",
        prop3: "789",
        prop4: "ABC",
        propO: {
            A: "10",
            B: "2",
            C: "110",
            testArray1: [1, 2, 3],
            testArray2: [10, 12],
            testArray3: [
                {
                    sub1: "test",
                    sub2: [
                        7,
                        8,
                        {
                            test: 9
                        }
                    ]
                }
            ],
            propO1: {
                test: "1"
            }
        }
    };
    
    var mergeResult = app.Framework.extendObject(source, dest);
    assert.equal(_.isEqual(mergeResult, expectedResult), true, "merge source with dest ok");

    // invalid

    var wrongType1 = "this is a string";
    var wrongType2 = 1;
    var wrongType3 = function () {
        return null;
    }

    var notEmptyArray = [1, 2, 3];

    var notEmptyObject1 = { test: "test" };
    var notEmptyObject2 = { prop: "prop" };

    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, undefined), notEmptyObject1), true, "notEmptyObject1 unchanged");
    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, undefined), notEmptyObject2), false, "notEmptyObject1 unchanged");
    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, null), notEmptyObject1), true, "notEmptyObject1 unchanged");
    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, {}), notEmptyObject1), true, "notEmptyObject1 unchanged");
});

QUnit.module("jsonp");

var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
var jsonpCallback = function(error, success) {

};

var jsonp = new app.Framework.jsonp(url, jsonpCallback);

// assert

QUnit.test("init should success", function (assert) {
    var done = assert.async();
    assert.expect(4);

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
    assert.expect(4);

    var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
    var jsonpCallback = function(error, success) {

    };

    var invalidjsonp1 = new app.Framework.jsonp({
        callback: jsonpCallback
    });

    invalidjsonp1.init(function(error, data) {
        assert.ok(error != null);
        assert.ok(data == null);
    });
});

var url = "https://cas.criteo.com/delivery/0.1/napi.jsonp";
var jsonpCallback = function(error, success) {

};

var jsonp = new app.Framework.jsonp(url, jsonpCallback);

// assert

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

QUnit.module("urlUtilities");

// using
var urlUtilities = app.Framework.UrlUtilities;

// utils
var getTimeStamp = function () {
    return (new Date()).getTime();
}

// setup vars
var shortUrl = "http://test.com/";
var longUrl = "http://test.com/?test=1";
var singleUrlParametersAsString = "status=success";
var singleUrlParametersAsJson = {
    key: "status",
    value: "success"
};

var multipleUrlParametersAsJson = {
    status: "success",
    type: "campaign"
};

// assert

QUnit.test("request-utilities:urlUtilities:separator", function (assert) {
    assert.ok(urlUtilities.separator(shortUrl) == "?", "? ok: " + shortUrl);
    assert.ok(urlUtilities.separator(longUrl) == "&", "& ok: " + longUrl);
});

QUnit.test("request-utilities:urlUtilities:join", function (assert) {
    var shortUrlConcatExpectedResult = "http://test.com/?status=success";
    var longUrlConcatExpectedResult = "http://test.com/?test=1&status=success";

    assert.ok(urlUtilities.join(shortUrl, singleUrlParametersAsString) == shortUrlConcatExpectedResult, "? ok: " + shortUrlConcatExpectedResult);
    assert.ok(urlUtilities.join(longUrl, singleUrlParametersAsString) == longUrlConcatExpectedResult, "& ok: " + longUrlConcatExpectedResult);
});

QUnit.test("request-utilities:urlUtilities:createAntiCache", function (assert) {
    var beforeTimeStamp = getTimeStamp();
    var antiCache = urlUtilities.createAntiCache();
    var afterTimeStamp = getTimeStamp();

    var firstChunk = antiCache.slice(0, 2);
    var lastChunk = antiCache.slice(2);
    var value = parseInt(lastChunk);

    assert.ok(1 == 1, "log res: " + antiCache);
    assert.ok(firstChunk == "_=", "first chunk ok: " + firstChunk);
    assert.ok(beforeTimeStamp <= value && afterTimeStamp >= value, "last chunk ok: " + lastChunk);
});

QUnit.test("request-utilities:urlUtilities:addParameterWithSeparator", function (assert) {
    var shortUrlConcatExpectedResult = "http://test.com/?status=success";
    var longUrlConcatExpectedResult = "http://test.com/?test=1&status=success";

    assert.ok(urlUtilities.addParameterWithSeparator(shortUrl, singleUrlParametersAsJson.key, singleUrlParametersAsJson.value) == shortUrlConcatExpectedResult, "? ok: " + shortUrlConcatExpectedResult);
    assert.ok(urlUtilities.addParameterWithSeparator(longUrl, singleUrlParametersAsJson.key, singleUrlParametersAsJson.value) == longUrlConcatExpectedResult, "& ok: " + longUrlConcatExpectedResult);
});

QUnit.test("request-utilities:urlUtilities:objectToQueryString", function (assert) {
    // without anticache
    var withoutAntiCacheExpectedResult = "status=success&type=campaign";
    assert.ok(urlUtilities.objectToQueryString(multipleUrlParametersAsJson, { addAntiCache: false }) == withoutAntiCacheExpectedResult, "without anticache ok: " + withoutAntiCacheExpectedResult);

    // with anticache
    var withAntiCacheExpectedResult = "status=success&type=campaign&_=";

    var beforeTimeStamp = getTimeStamp();
    var withAntiCache = urlUtilities.objectToQueryString(multipleUrlParametersAsJson);
    var afterTimeStamp = getTimeStamp();

    var timeStampLength = ("" + beforeTimeStamp).length;

    var firstChunk = withAntiCache.slice(0, withAntiCache.length - timeStampLength);
    var lastChunk = withAntiCache.slice(-timeStampLength);
    var value = parseInt(lastChunk);

    assert.ok(1 == 1, "log res: " + withAntiCache);
    assert.ok(firstChunk == withAntiCacheExpectedResult, "first chunk ok: " + firstChunk);
    assert.ok(beforeTimeStamp <= value && afterTimeStamp >= value, "last chunk ok: " + lastChunk);
});