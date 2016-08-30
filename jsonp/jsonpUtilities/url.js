jsonp.Utilities.Url = {
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

        jsonp.Utilities.extendObject(settings, options);
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