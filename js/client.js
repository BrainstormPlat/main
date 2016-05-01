"use strict"
function _parse (data) {
    for(var key in data)
        console.log("key - "+key+" data - "+data[key]); 
}

function Client (url) {
    this.url = url;
    this.ideas = {};
}

Client.prototype.connect = function(auth_json) {
    var socket = new SockJS(this.url);
    socket.onopen = function() {
        socket.send(auth_json);
    };
    socket.onmessage =  function (event) {
        var data = jQuery.parseJSON(event.data);  
         if(data.id === "timer_exceeded")
           this.connect(this.ideas);  
         else if(data.id === 'idea_list_combained') {  
            deleteIdeas();
            this.ideas = JSON.parse(data.content);
         }
         _parse(data);   
    };
}

Client.prototype.setIdea = function(data) {
    this.ideas.push(data);
}

function authInfo(response) {
  console.log("authentification info");
  if (response.session) {
    console.log('user: '+response.session.mid);
  } else {
    console.log('not auth');
  }
}

