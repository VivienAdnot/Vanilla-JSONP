jsonp.prototype.createOnSuccess = function() {
    var self = this;

    window[self.settings.jsonpCallbackName] = function (data) {
        window[self.settings.jsonpCallbackName] = jsonp.Utilities.defaults.noop;
        window.clearTimeout(self.timeoutTimer);

        self.settings.callback(null, data);
    };
};