"use strict"
function _parse (data) {
    for(var key in data)
        console.log("key - "+key+" data - "+data[key]); 
}

function Client (url) {
    this.url = url;
    this.participants = {};
}

Client.prototype.connect = function(auth_json) {
    var socket = new SockJS(this.url);
    socket.onopen = function() {
        socket.send(auth_json);
    };
    socket.onmessage =  function (event) {
        var data = jQuery.parseJSON(event.data);  
         if(data.id === "timer_exceeded")
           this.connect(this.participants);  
         _parse(data);   
    };
}

Client.prototype.setParticipants = function(data) {
    this.participants = data;
}

function authInfo(response) {
  console.log("authentification info");
  if (response.session) {
    console.log('user: '+response.session.mid);
  } else {
    console.log('not auth');
  }
}

