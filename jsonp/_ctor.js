jsonp = function(options) {
    var defaults = {
        /* mandatory */
        url: undefined,
        callback: jsonp.Utilities.defaults.noop,
        /* !mandatory */
        urlParameters: undefined
    };

    this.settings = {
        jsonpCallbackName: (function () {
            var random = (new Date()).getTime();
            return "jsonpcallback" + random;
        } ()),

        jsonpCallbackTokenName: "callback",

        errorMessages: {
            BAD_PARAMETERS: "jsonp error: options must contain parameter url and callback",
            URL_LOAD_FAIL: "jsonp Fatal Error while loading url: ",
            URL_TIMEOUT: "jsonp timeout Error while loading url: "
        }
    };

    this.timeoutTimer = null;

    jsonp.Utilities.extendObject(defaults, options);
    jsonp.Utilities.extendObject(this.settings, defaults);
};