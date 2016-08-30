Jsonp.prototype.createOnSuccess = function() {
    var self = this;

    window[self.settings.jsonpCallbackName] = function (data) {
        window[self.settings.jsonpCallbackName] = Jsonp.Utilities.Defaults.noop;
        window.clearTimeout(self.timeoutTimer);

        self.settings.callback(null, data);
    };
};