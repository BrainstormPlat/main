function Handler() {
    this.client = new Client("http://10.240.20.158:9090/chat");
    this.participants = [];
    this.ratings = [];
}

Handler.prototype.UpdateIdea = function(_idea) {//common api to add/update idea
    this.client.ideas[_idea.id] = _idea;
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
    var t = '{"id":"participants_list", "content":{';
    t += '"participant":"'+this.participants[1]+'"';
    for (var i = 2, le = this.participants.length; i < le; i++) {
        t += ', "participant":"'+this.participants[i]+'"';
    }
    t += '}}';
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