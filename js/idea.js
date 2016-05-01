"use strict"

var _id = 0;
function Idea() {
    this.id = _id;
    _id++;
    this.text = "My Idea";
    this.description = "This is my idea. Hooray!";
    this.rating = 5;
}

function Idea(_text, _description, /*optional*/ _rating) {
    _priority = ( _priority !== undefined ) ? _priority : 0;
    this.id = _id;
    _id++;
    this.text = _text;
    this.description = _description;
    this.rating = _rating;
}

Idea.prototype.QueryJson = function() {
    return JSON.stringify(this);
}