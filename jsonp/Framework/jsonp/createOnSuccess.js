app.Framework.jsonp.prototype.createOnSuccess = function() {
    var self = this;

    window[self.settings.jsonpCallbackName] = function (data) {
        window[self.settings.jsonpCallbackName] = app.Framework.defaults.noop;
        window.clearTimeout(self.timeoutTimer);

        self.settings.callback(null, data);
    };
};