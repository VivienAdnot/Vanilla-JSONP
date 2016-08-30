app.Framework.jsonp = function(options) {
    var defaults = {
        /* mandatory */
        url: undefined,
        callback: app.Framework.defaults.noop,
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

    app.Framework.extendObject(defaults, options);
    app.Framework.extendObject(this.settings, defaults);
};