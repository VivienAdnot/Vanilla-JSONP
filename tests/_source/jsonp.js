Jsonp = function(options) {
    var defaults = {
        /* mandatory */
        url: undefined,
        callback: Jsonp.Utilities.Defaults.noop,
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

    Jsonp.Utilities.extendObject(defaults, options);
    Jsonp.Utilities.extendObject(this.settings, defaults);
};

Jsonp.prototype.completeUrl = function () {
    var self = this;

    var queryString = Jsonp.Utilities.Url.objectToQueryString(self.settings.urlParameters);

    if (queryString.length > 0) {
        self.settings.url = Jsonp.Utilities.Url.join(self.settings.url, queryString);
    };

    self.settings.url = Jsonp.Utilities.Url.addParameterWithSeparator(
        self.settings.url,
        self.settings.jsonpCallbackTokenName,
        self.settings.jsonpCallbackName);
};

Jsonp.prototype.createOnSuccess = function() {
    var self = this;

    window[self.settings.jsonpCallbackName] = function (data) {
        window[self.settings.jsonpCallbackName] = Jsonp.Utilities.Defaults.noop;
        window.clearTimeout(self.timeoutTimer);

        self.settings.callback(null, data);
    };
};

Jsonp.prototype.createScript = function() {
    var self = this;

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = self.settings.url;

    return script;
};

Jsonp.prototype.execute = function() {
    var self = this;

    self.init(function(error, script) {

        if(error) {
            self.settings.callback(error, null);
            return;
        }

        self.createOnSuccess();

        self.timeoutTimer = window.setTimeout(function () {
            window[self.settings.jsonpCallbackName] = Jsonp.Utilities.Defaults.noop;
            var errorMessage = self.settings.errorMessages.URL_TIMEOUT + self.settings.url;

            self.settings.callback(errorMessage, null);
        }, 2000);

        var body = Jsonp.Utilities.Dom.body();
        body.appendChild(script);
    });
};

Jsonp.prototype.init = function(callback) {
    var self = this;

    var validateMandatoryParameters = function () {
        return self.settings.url !== undefined;
    };

    if (!validateMandatoryParameters()) {
        var errorMessage = self.settings.errorMessages.BAD_PARAMETERS;
        callback(errorMessage, null);
        return;
    }

    self.completeUrl();
    var script = self.createScript();

    callback(null, script);
};

Jsonp.Utilities = {};

Jsonp.Utilities.Defaults = {
    noop: function () { }
};

Jsonp.Utilities.Dom = {
    body : function() {
        return document.getElementsByTagName("body")[0];
    }
};

Jsonp.Utilities.extendObject = function (destination, source) {
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

Jsonp.Utilities.Url = {
    separator: function (url) {
        return /\?/ .test( url ) ? "&" : "?";
    },

    join: function (url, urlParameters) {
        return url + this.separator(url) + urlParameters;
    },

    createAntiCache: function () {
        var random = (new Date()).getTime();
        return encodeURIComponent("_") + "=" + encodeURIComponent(random);
    },

    addParameterWithSeparator: function (url, key, value) {
        return url + this.separator(url) + encodeURIComponent(key) + "=" + encodeURIComponent(value);
    },

    objectToQueryString: function (obj, options) {
        var settings = {
            addAntiCache: true
        };
        var random = (new Date()).getTime();

        Jsonp.Utilities.extendObject(settings, options);
        var result = [];

        var addKeyValuePair = function (key, value) {
            result[result.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };

        for (var key in obj) {
            obj.hasOwnProperty(key) && addKeyValuePair(key, obj[key]);
        }

        if(settings.addAntiCache) { addKeyValuePair("_", random); }

        var urlParameters = result.join("&");

        return urlParameters;
    }
};