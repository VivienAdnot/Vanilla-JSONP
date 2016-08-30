app.Framework.jsonp.prototype.completeUrl = function () {
    var self = this;

    var queryString = app.Framework.UrlUtilities.objectToQueryString(self.settings.urlParameters);

    if (queryString.length > 0) {
        self.settings.url = app.Framework.UrlUtilities.join(self.settings.url, queryString)
    };

    self.settings.url = app.Framework.UrlUtilities.addParameterWithSeparator(
        self.settings.url,
        self.settings.jsonpCallbackTokenName,
        self.settings.jsonpCallbackName);
};