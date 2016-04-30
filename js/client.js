"use strict"
function Client (url) {
    this.url = url;
}

Client.prototype.connect = function(auth_json) {
    var socket = new SockJS(this.url);
    socket.onopen = function() {
        socket.send(auth_json);
    };
    socket.onmessage =  function (event) {
        var data = jQuery.parseJSON(event.data);  
        if (data.data_type == 'data') {
            this.parse(data); 
        } else if (data.data_type == 'auth_error') {
            throw data.data.message;
        }
    };
}

Client.prototype.parse = function(data) {
     for(var key in data)
            console.log("key - "+key+" data - "+data[key]); 
}

var client = new Client("http://10.240.20.158:9090/chat"); 
client.connect(new Idea().QueryJson());