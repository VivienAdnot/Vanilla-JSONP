jsonp.prototype.createScript = function() {
    var self = this;

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = self.settings.url;

    return script;
};