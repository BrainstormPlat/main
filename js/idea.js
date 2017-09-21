"use strict"

function Idea(id) {
    this.id = id;
    this.text = "My Idea";
    this.description = "This is my idea. Hooray!";
    this.rating = 5;
}

function Idea(id, text, description, /*optional*/ rating) {
    rating = rating != undefined  ? rating : 0;
    this.id = id;
    this.text = text;
    this.description = description;
    this.rating = rating;
}

Idea.prototype.QueryJson = function() {
    return JSON.stringify(this);
}