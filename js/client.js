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
        _parse(data);    
         if(data.id === "time_exceeded") {
             var t = '{"id":"ideas_list", "content":{';
            for (var key in this.ideas) {
             t += ' "idea":"'+this.ideas[key]+'",';
            }      
            t += '}}';
            t = t.replace(',}}','}}');
           console.log(t);
           this.connect(t);  
         }
         else if(data.id === 'ideas_list_combined') {  
            deleteIdeas();
            var ideas = data.content;
            this.ideas = JSON.parse(ideas);
            for(var key in ideas)
                drawIdea(ideas[key].text, ideas[key].description, ideas[key].rating);
         }
    };
}

function authInfo(response) {
  console.log("authentification info");
  if (response.session) {
    console.log('user: '+response.session.mid);
  } else {
    console.log('not auth');
  }
}

