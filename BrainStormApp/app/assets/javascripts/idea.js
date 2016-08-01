"use strict"

function Idea(_id) {
    this.id = _id;
    this.text = "My Idea";
    this.description = "This is my idea. Hooray!";
    this.rating = 5;
}

function Idea(_id, _text, _description, /*optional*/ _rating) {
    _rating = ( _rating !== undefined ) ? _rating : 0;
    this.id = _id;
    this.text = _text;
    this.description = _description;
    this.rating = _rating;
}

Idea.prototype.QueryJson = function() {
    return JSON.stringify(this);
}