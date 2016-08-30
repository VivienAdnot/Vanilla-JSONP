var url = "https://api.github.com/users/VivienAdnot";

var jsonpCallback = function(error, data) {
    if(error) {
        $("#target").text(error);
    } else {
        $(".prettyprint").text(JSON.stringify(data));
    }
};

var jsonpInstance = new jsonp({
    url: url,
    callback: jsonpCallback,
    responseType: "json"
});

jsonpInstance.execute();