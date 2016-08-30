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