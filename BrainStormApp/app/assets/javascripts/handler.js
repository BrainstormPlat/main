var message="Правый клик запрещен!";  
  function clickIE4(){  
  if (event.button==2){  
  return false;  
  }  
  }  
function clickNS4(e){  
  if (document.layers||document.getElementById&&!document.all){  
  if (e.which==2||e.which==3){   
  return false;  
  }  
  }  
  }  
if (document.layers){  
  document.captureEvents(Event.MOUSEDOWN);  
  document.onmousedown=clickNS4;  
  }  
  else if (document.all&&!document.getElementById){  
  document.onmousedown=clickIE4;  
  }  
document.oncontextmenu=new Function("return false")  

function _log (data) {
    for(var key in data)
    {
        console.log("key - "+key+" data - "+data[key]);
        if( typeof(data[key]) === 'object')
           _log(data[key]);
    } 
}

function Handler() {
    this.client = new Client("http://10.240.20.158:9090/chat");
    this.participants = [];
    this.ratings = [];
}

Handler.prototype.UpdateIdea = function(_idea) {//common api to add/update idea
    console.log('id - '+_idea.id);
    this.client.ideas[_idea.id] = _idea;
    _log(this.client.ideas);
}

Handler.prototype.RemoveIdea = function(_idea) {
    delete this.client.ideas[_idea.id];
}

Handler.prototype.SendToServer = function() {
    var sent_str = "{";
    for (var key in this.client.ideas)
        sent_str += JSON.stringify(this.client.ideas[key]);
    sent_str += "}";
}

//Common stuff
Handler.prototype.UpdateMainForm = function(_object) {
    var array = _object.split("&");
    this.theme = (array[0].split("="))[1];
    for (var i = 1, l = array.length; i < l; i++) {
        this.participants[i] = (array[i].split("="))[1];
    }
    var t = '{"id":"participants_list", "content":{';
    t += '"participant":"'+this.participants[1]+'"';
    for (var i = 2, le = this.participants.length; i < le; i++) {
        t += ', "participant":"'+this.participants[i]+'"';
    }
    t += '}}';
    console.log(t);
    this.client.connect(t);
}

Handler.prototype.Authenticate = function(_user) {
    this.client.connect('{"id":"new_user", "name":"'+_user+'"}');
}

Handler.prototype.Start = function() {
    this.client.connect('{"id":"joined"}');
}

Handler.prototype.UpdateRatings = function(_idea_id, tmp) {
    this.client.ideas[_idea_id].rating = tmp;
    console.log(this.client.ideas[_idea_id].rating);
    console.log(tmp);
}

Handler.prototype.connect = function(t) {
    this.client.connect(t);
}
