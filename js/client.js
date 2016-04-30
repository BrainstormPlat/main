"use strict"
function connect(url, auth_json) {
    var socket = new SockJS(url);
    socket.onopen = function() {
        socket.send(auth_json);
    };
    socket.onmessage =  function (event) {
        var data = jQuery.parseJSON(event.data);  
        if (data.data_type == 'data') {
            parse(data); 
        } else if (data.data_type == 'auth_error') {
            throw data.data.message;
        }
    };
}

function parse(data) {
     for(var key in data)
            console.log("key - "+key+" data - "+data[key]); 
}

connect("http://10.240.20.158:9090/chat", new Idea().QueryJson());