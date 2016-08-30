var extendObject = function (destination, source) {
    var expectedToStringCallWhenObject = Object.prototype.toString.call({});

    var isPropertyAnObject = function (property) {
        return Object.prototype.toString.call(property) === expectedToStringCallWhenObject;
    };

    for (var property in source) {
        if(source.hasOwnProperty(property)) {
            //if property is an object
            if (isPropertyAnObject(source[property])) {
                // create the property in destination if it doesn't exist yet
                destination[property] = destination[property] || {};
                //recursive call to extendObject()
                extendObject(destination[property], source[property]);
            }
            // property is not a object (string, integer ...)
            else {
                destination[property] = source[property];
            }
        }
    }

    return destination;
};

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

QUnit.test("1-2", function (assert) {
    assert.equal(test, 1, "test1");
    assert.equal(test2, 2, "test2");
});