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