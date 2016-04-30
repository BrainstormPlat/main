"use strict"

var _id = 0;
function Idea() {
    this.id = _id;
    _id++;
    this.text = "My Idea";
    this.priority = 0;
}

Idea.prototype.ConvertToJson = function() {
    return JSON.stringify(this);
}

new Idea().ConvertToJson();