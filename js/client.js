"use strict"
$.ajaxSetup({url: 'server.php', type: 'post', dataType: 'json'});
function Action() {
    this.user = new Client();
}

Action.prototype.connect = function (params) {
     console.log('Connected.');
     console.log('Socket: '+params.socket);
     user.socket = params.socket;
     user.connect = true;
     user.Read();
}

Action.prototype.disconnect = function() {
    console.log("Disconnected.");
}

Action.prototype.print = function(params) {
    condol.log("Message: "+params.message);
}
function Client () {
    this.socket = 0;
    this.connect = false;
    this.busy = false;
    this.read = 0;
}

Client.prototype.onSuccess =  function(data) {
    if (typeof data.actions == 'object') {
        for (var i = 0; i <data.actions.length; i++) {
             if (typeofactions[data.actions[i].action] == 'function') {
                 actionS[data.actions[i].action](data.actions[i].params);
             } 
        }
    }
}
               
Client.prototype.onComplete = function(xhr) {
    if (xhr.status == 404) {
        actions.Disconnect();
    }
    this.busy = false;
}     
                  
Client.prototype.onCompleteRead = function(xhr) {
    if (xhr.status == 200) {
        user.Read();
    } else 
        setTimeout(this.Read, 5000);
}
               
Client.prototype.connect = function() {
    if (user.conn == false && user.busy == false) {
        console.log('Connecting...');
        this.busy = true;
        $.ajax({
            data: 'action=Connect',
            success: this.onSuccess,
            complete: this.onComplete
        });
    }
}

Client.prototype.disconnect = function() {
    if (user.conn && user.busy == false &&user.read) {
        console.log('Disconnecting...');
        this.busy = true;
        $.ajax({
        data: 'action=Disconnect&sock='+this.socket,
        success: this.onSuccess,
        complete: this.onComplete
        });
        this.socket = null;
        this.connect = false;
        this.read.abort();
    }
}

Client.prototype.send = function() {
    if (this.connect) {
        $.ajax({
            data: 'action=Send&sock='+this.socket+'&data='+data,
            success: this.onSuccess,
            complete: this.onComplete
        });
    }
}
 
Client.prototype.read = function() {
    if (this.connect) {
        this.read = $.ajax({
            data: 'action=Read&sock=' + this.socket,
            success: this.onSuccess,
            complete: this.onCompleteRead
            });
    }
}               
 