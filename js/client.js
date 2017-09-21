"use strict"

function Client(url) {
    url = url;
    this.ideas = [];

    // server message handlers start
    // the handler function hame should be message id
    var handlers = {
        time_exceeded: function () {
            var ideasJson = '{"id":"ideas_list", "content":{';
            for (var i = 0, l = ideas.keys.length; i < l; ++i) {
                ideasJson += ', "idea"' + l + ':{'
                    + JSON.stringify(ideas[l]) + '}';
            }
            ideasJson += '}';
            console.log("data - " + ideasJson);
            this.connect(ideasJson);
        },
        ideas_list_combined: function (data) {
            deleteIdeas();
            console.log(data.content);
            ideas = JSON.parse(data.content);
            ideas.forEach(function (idea) { drawIdea(idea); });
        }
    };

    this.connect = function (authJson) {
        var self = this;
        var socket = new SockJS(url);
        socket.onopen = function () {
            socket.send(authJson);
        };
        socket.onmessage = function (event) {
            console.log('message');
            var data = event.data;//JSON.parse(event.data);
            console.log('data: ' + data);
            if (handlers[data.id] != undefined) {
                handlers[data.id](data);
            }
        };
    }
};

// function authInfo(response) {
//     console.log("authentification info");
//     if (response.session) {
//         console.log('user: ' + response.session.mid);
//     } else {
//         console.log('not auth');
//     }

