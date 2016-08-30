app.Framework.jsonp = function(options) {
    var defaults = {
        /* mandatory */
        url: undefined,
        callback: app.Framework.defaults.noop,
        /* !mandatory */
        urlParameters: undefined,
        responseType: "string" // available values: "string" or "jsonp"
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
}

app.Framework.jsonp.prototype = {
    init: function(callback) {
        var self = this;

        var validateMandatoryParameters = function () {
            return self.settings.url !== undefined;
        };

        if (validateMandatoryParameters()) {
            var errorMessage = self.settings.errorMessages.BAD_PARAMETERS;
            callback(errorMessage, null);
            return;
        }

        self.completeUrl();
        var script = self.createScript();

        callback(null, script);
    },

    completeUrl : function () {
        var self = this;

        var queryString = app.Framework.UrlUtilities.objectToQueryString(self.settings.urlParameters);

        if (queryString.length > 0) {
            self.settings.url = app.Framework.UrlUtilities.join(self.settings.url, queryString)
        };

        self.settings.url = app.Framework.UrlUtilities.addParameterWithSeparator(
            self.settings.url,
            self.settings.jsonpCallbackTokenName,
            self.settings.jsonpCallbackName);
    },

    createScript: function() {
        var self = this;

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = self.settings.url;

        return script;
    },

    createOnSuccess: function(callback) {
        var self = this;

        var formatDataIfNecessary = function (data, callback) {
            var formattedData = data;
            if(self.settings.responseType == "string") {
                callback(null, formattedData);
                return;
            }

            if(self.settings.responseType === "json") {
                try {
                    formattedData = JSON.parse(data);
                } catch(e) {
                    callback("invalid object", null);
                }
            }
        };

        window[self.settings.jsonpCallbackName] = function (data) {
            window[self.settings.jsonpCallbackName] = app.Framework.defaults.noop; //cancel the callback, todo test
            window.clearTimeout(self.timeoutTimer);

            var formattedData = formatDataIfNecessary(data, function(error, data) {
                self.settings.callback(error, data);
            });
        };
    },

    execute: function() {
        var self = this;

        self.init(function(error, data) {

            if(error) {
                self.settings.callback(error, null);
                return;
            }

            self.createOnSuccess();

            self.timeoutTimer = window.setTimeout(function () {
                window[self.settings.jsonpCallbackName] = app.Framework.defaults.noop;
                var errorMessage = self.settings.errorMessages.URL_TIMEOUT + self.settings.url;

                self.settings.callback(errorMessage, null, self.settings.callerCallback);
            }, 2000);

            app.Framework.Dom.body().appendChild(data.script);
        });
    }
};