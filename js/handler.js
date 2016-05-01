function Handler() {
    this.client = new Client("http://10.240.20.158:9090/chat");
    
    this.ideas = {};
    this.participants = [];
}

Handler.prototype.UpdateIdea = function(_idea) {//common api to add/update idea
    this.ideas[_idea.id] = _idea;//should work according to Lisa
}

Handler.prototype.RemoveIdea = function(_idea) {
    delete this.ideas[_idea.id];
}

Handler.prototype.SendToServer = function() {
    var sent_str = "{";
    for (var key in this.ideas)
        sent_str += JSON.stringify(this.ideas[key]);
    sent_str += "}";
}

Handler.prototype.ReceiveFromServer = function(received_str) {
    //received_str = JSON.parse(received_str)
    this.ideas = JSON.parse(received_str);
}

//Common stuff
Handler.prototype.UpdateMainForm = function(_object) {
    var array = _object.split("&");
    this.theme = (array[0].split("="))[1];
    for (var i = 1, l = array.length; i < l; i++) {
        this.participants[i] = (array[i].split("="))[1];
    }
    /*console.log(this.theme);
    for (var k in this.participants) {
        console.log(this.participants[k]);
    }*/
    //console.log(this.theme);
    var t = '{ "id":"participants_list"';
    for (var k in this.participants) {
        t += ', "participant":"'+this.participants[k]+'"';
    }
    t += '}';
    console.log(t);
    this.client.connect(JSON.stringify(this.participants));
}

Handler.prototype.Authenticate = function(_user) {
    this.client.connect('{"id":"new_user", "name":"'+_user+'"}');
}