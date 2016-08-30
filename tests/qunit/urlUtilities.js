QUnit.module("urlUtilities");

// using
var urlUtilities = Jsonp.Utilities.Url;

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