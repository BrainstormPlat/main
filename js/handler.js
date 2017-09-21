function _log(data) {
    for (var key in data) {
        console.log("key - " + key + " data - " + data[key]);
        if (typeof (data[key]) === 'object')
            _log(data[key]);
    }
}

function Handler() {
    this.client = new Client("http://192.168.1.48:9090/chat");
    this.participants = [];
    this.ratings = [];
}

Handler.prototype.UpdateIdea = function (idea) {//common api to add/update idea
    console.log('id: ' + idea.id);
    this.client.ideas[idea.id] = idea;
    _log(this.client.ideas);
}

// Handler.prototype.RemoveIdea = function (idea) {
//     delete this.client.ideas[idea.id];
// }

//Common stuff
Handler.prototype.UpdateMainForm = function (object) {
    var array = object.split("&");
;  //  this.theme = (array[0].split("="))[1];
    for (var i = 1, l = array.length; i < l; ++i) {
        this.participants[i] = (array[i].split("="))[1];
    }
    var t = '{"id":"participants_list", "content":{';
    t += '"participant":"' + this.participants[1] + '"';
    for (var i = 2, l = this.participants.length; i < l; ++i) {
        t += ', "participant":"' + this.participants[i] + '"';
    }
    t += '}}';
    console.log(t);
   this.client.connect(t);
}

Handler.prototype.Authenticate = function (user) {
    console.log('Aut: ' + user);
    this.client.connect('{"id":"new_user", "name":"' + user + '"}');
}

Handler.prototype.Start = function () {
    this.client.connect('{"id":"joined"}');
}

Handler.prototype.UpdateRatings = function (idea_id, tmp) {
    this.client.ideas[idea_id].rating = tmp;
    console.log(this.client.ideas[idea_id].rating);
    console.log(tmp);
}

Handler.prototype.connect = function (t) {
    this.client.connect(t);
}
