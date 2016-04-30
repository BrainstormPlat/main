"use strict"
function _parse (data) {
    for(var key in data)
        console.log("key - "+key+" data - "+data[key]); 
}

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
       // if (data.data_type == 'data') {
         if (data.data_type == 'auth_error') 
            throw data.data.message;
         else 
            _parse(data);   
    };
}
function authInfo(response) {
  if (response.session) {
    alert('user: '+response.session.mid);
  } else {
    alert('not auth');
  }
}

