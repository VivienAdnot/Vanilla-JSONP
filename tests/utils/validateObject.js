var validateObject = function (source, propertiesArray, contextName, callback) {
    // default values
    var defaultCallback = function (missingProperties) {
        if(!missingProperties || missingProperties.length == 0) {
            callback(true, "");
            return;
        }

        var message = "missing properties:";

        for (var prop in missingProperties) {
            message += ". " + missingProperties[prop];
        }

        console.warn(message);

        callback(false, message);
    };

    // init

    var missingProperties = [];
    propertiesArray = propertiesArray || [];
    contextName = contextName || "Playtem Template JS";
    callback = callback || defaultCallback;

    // execute

    if (!source || Object.prototype.toString.call(source) != "[object Object]") {
        callback["ERROR: source is not a valid object"];
        return;
    }

    for (var arrayIndex in propertiesArray) {
        var currentProperty = propertiesArray[arrayIndex];

        if (source.hasOwnProperty(currentProperty) === false || source[currentProperty] === undefined) {
            missingProperties.push(currentProperty);
        }
    }

    callback(missingProperties);
};