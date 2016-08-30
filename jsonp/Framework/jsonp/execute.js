app.Framework.jsonp.prototype.execute = function() {
    var self = this;

    self.init(function(error, script) {

        if(error) {
            self.settings.callback(error, null);
            return;
        }

        self.createOnSuccess();

        self.timeoutTimer = window.setTimeout(function () {
            window[self.settings.jsonpCallbackName] = app.Framework.defaults.noop;
            var errorMessage = self.settings.errorMessages.URL_TIMEOUT + self.settings.url;

            self.settings.callback(errorMessage, null);
        }, 2000);

        var body = app.Framework.Dom.body();
        body.appendChild(script);
    });
};