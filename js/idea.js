"use strict"

var _id = 0;
function Idea() {
    this.id = _id;
    _id++;
    this.text = "My Idea";
    this.priority = 0;
}

function parseToJSON(idea) {
    var JSONstr = JSON.stringify(idea);
    var str = JSON.parse(JSONstr);
}

parseToJSON(new Idea());
$('.idea').append('jh');