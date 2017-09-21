"use strict"

function Searcher(idea) {
    idea = JSON.parse(idea); //deserialization
    this.searchText = idea.text;
    this.keyWords = idea.description; //parse the description to get key words?
    //TODO: sync with search engine api
}

Searcher.prototype.Start = function() {
    //TODO: implement searching algorithm
}