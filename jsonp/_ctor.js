Jsonp = function(options) {
    var defaults = {
        /* mandatory */
        url: undefined,
        callback: Jsonp.Utilities.Defaults.noop,
        /* !mandatory */
        urlParameters: undefined,
        timeout: 2000
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

    Jsonp.Utilities.extendObject(defaults, options);
    Jsonp.Utilities.extendObject(this.settings, defaults);
};