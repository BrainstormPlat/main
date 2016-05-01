function Handler() {
    this.ideas = {};
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
        pushed_str += JSON.stringify(this.ideas[key]);
    pushed_str += "}";
}

Handler.prototype.ReceiveFromServer = function(received_str) {
    //received_str = JSON.parse(received_str)
    this.ideas = JSON.parse(received_str);
}