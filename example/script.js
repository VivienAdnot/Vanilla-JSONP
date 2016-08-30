var url = "https://api.github.com/users/VivienAdnot";

var jsonpCallback = function(error, data) {
    if(error) {
        document.getElementById("target").innerHTML = error;
    } else {
        document.getElementById("target").innerHTML = JSON.stringify(data, undefined, 2);
    }
};

var jsonpInstance = new Jsonp({
    url: url,
    callback: jsonpCallback
});

jsonpInstance.execute();