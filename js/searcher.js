"use strict"

function Searcher(_idea) {
    _idea = JSON.parse(_idea);
    this.idea = _idea;
    this.searchText = _idea.text;
    this.keyWords = _idea.description; //parse the description to get key words?
    //TODO: sync with search engine api
}

Searcher.prototype.Start = function() {
    //TODO: implement searching algorithm
}