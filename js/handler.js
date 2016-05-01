function Handler() {
    this.client = new Client("http://10.240.20.158:9090/chat");
    this.ideas = {};
    this.participants = [];
    this.ratings = [];
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

Handler.prototype.UpdateRatings = function(_object) {
    var array = _object.split("&");
    for (var i = 0, le = array.length; i < le; i++) {
        this.ratings[i] = (array[i].split("="))[1];
    }
}