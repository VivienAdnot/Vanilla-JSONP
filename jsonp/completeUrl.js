jsonp.prototype.completeUrl = function () {
    var self = this;

    var queryString = jsonp.Utilities.Url.objectToQueryString(self.settings.urlParameters);

    if (queryString.length > 0) {
        self.settings.url = jsonp.Utilities.Url.join(self.settings.url, queryString)
    };

    self.settings.url = jsonp.Utilities.Url.addParameterWithSeparator(
        self.settings.url,
        self.settings.jsonpCallbackTokenName,
        self.settings.jsonpCallbackName);
};