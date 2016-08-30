// app.Framework.jsonp = function(options) {
//     var defaults = {
//         /* mandatory */
//         url: undefined,
//         callback: __playtem.F.defaults.noop,
//         /* !mandatory */
//         urlParameters: undefined,
//         responseType: "string" // available values: "string" or "jsonp"
//     };

//     this.settings = {
//         jsonpCallbackName: (function () {
//             var random = (new Date()).getTime();
//             return "jsonpcallback" + random;
//         } ()),

//         jsonpCallbackTokenName: "callback",

//         errorMessages: {
//             BAD_PARAMETERS: "jsonp error: options must contain parameter: ",
//             URL_LOAD_FAIL: "jsonp Fatal Error while loading url: ",
//             URL_TIMEOUT: "jsonp timeout Error while loading url: "
//         }
//     };

//     this.timeoutTimer = null;

//     __playtem.F.Tools.extendObject(defaults, options);
//     __playtem.F.Tools.extendObject(this.settings, defaults);
// }

// playtemApp.Framework.requestProtocol.jsonp.prototype = {
//     init: function(callback) {
//         var self = this;

//         var validateMandatoryParameters = function () {
//             return self.settings.url !== undefined && self.settings.callback.toString() !== __playtem.F.defaults.noop.toString();
//         };

//         var validateParametersResult = validateMandatoryParameters(options);
//         if (validateParametersResult.status === false) {
//             var errorMessage = settings.errorMessages.BAD_PARAMETERS + validateParametersResult.propertyNotFound;
//             callback(errorMessage, null);
//             return;
//         }

//         self.completeUrl();
//         var script = createScript();
//         self.createOnSuccessFunction();

//         callback(null, script);
//     },

//     completeUrl : function () {
//         var self = this;

//         var queryString = __playtem.F.requestUtilities.urlSetup.objectToQueryString(self.settings.urlParameters);

//         if (queryString.length > 0) {
//             self.settings.url = __playtem.F.requestUtilities.urlSetup.join(self.settings.url, self.settings.urlParameters)
//         };

//         self.settings.url = __playtem.F.requestUtilities.urlSetup.addParameterWithSeparator(
//             self.settings.url,
//             self.settings.jsonpCallbackTokenName,
//             self.settings.jsonpCallbackName);
//     },

//     createScript: function() {
//         var self = this;

//         var script = document.createElement("script");
//         script.type = "text/javascript";
//         script.async = true;
//         script.src = self.settings.url;

//         return script;
//     },

//     createOnSuccessFunction(callback) {
//         var self = this;

//         var formatDataIfNecessary = function (data) {
//             var formattedData = (self.settings.responseType === "json") ? JSON.parse(data) : data; // try / catch
//             return formattedData;
//         };

//         window[self.settings.jsonpCallbackName] = function (data) {
//             window[self.settings.jsonpCallbackName] = __playtem.F.defaults.noop; //cancel the callback, todo test
//             window.clearTimeout(self.timeoutTimer);

//             var formattedData = formatDataIfNecessary(data);
//             callback(null, formattedData);
//         };
//     },

//     execute: function() {
//         self.timeoutTimer = window.setTimeout(function () {
//             window[self.settings.jsonpCallbackName] = __playtem.F.defaults.noop;
//             var errorMessage = self.settings.errorMessages.URL_TIMEOUT + self.settings.url;
//             self.settings.callback(errorMessage, null, self.settings.callerCallback);
//         }, playtemApp.Settings.shared.ajax.httpRequestTimeout);

//         __playtem.$body().appendChild(script);
//     }
// };