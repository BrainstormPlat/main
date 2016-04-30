"use strict"

var _id = 0;
function Idea() {
    this.id = _id;
    _id++;
    this.text = "My Idea";
    this.description = "This is my idea. Hooray!";
    this.priority = 0;
}

Idea.prototype.QueryJson = function() {
    return JSON.stringify(this);
}