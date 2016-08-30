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