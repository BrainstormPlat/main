"use strict"
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
        _log(data);    
         if(data.id === "time_exceeded") {
            var t = '{"id":"ideas_list", "content":{';
            var i = 0;
            t += '"idea'+i+'":{';
            t += this.ideas[0].id+','+this.ideas[0].text+','+this.ideas[0].description+','+this.ideas[0].rating;
            t += '}';
            for (var k = 1, l = this.ideas.keys.length; i < l; i++) {
                t += ', "idea"'+k+':{'+this.ideas[0].id+','+this.ideas[0].text+','+this.ideas[0].description+','+this.ideas[0].rating;
                t += '}';
            }
            t += '}';
            console.log("data - "+t);
           //this.connect(t);  
            h.connect(t);
         }
         if(data.id === 'ideas_list_combined') {  
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

