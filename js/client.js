"use strict"
$.ajaxSetup({url: 'server.php', type: 'post', dataType: 'json'});

function Action() {
    this.user = new Client();
}

Action.prototype.Connect = function (params) {
     console.log('Connected.');
     console.log('Socket: '+params.socket);
     this.user.socket = params.socket;
     this.user.connect = true;
     this.user.Read();
}

Action.prototype.Disconnect = function(params) {
    console.log("Disconnected.");
}

Action.prototype.Print = function(params) {
    condol.log("Message: "+params.message);
}

function Client () {
    this.socket = null;
    this.connect = false;
    this.busy = false;
    this.read = null;
    this.action = new Action();
}

Client.prototype.OnSuccess =  function(data) {
    if (typeof data.actions == 'object') {
        for (var i = 0, iLength = data.actions.length; i < iLength; i++) {
             if (typeof this.action.prototype[data.actions[i].action] == 'function') {
                 this.action.prototype[data.actions[i].action](data.actions[i].params);
             } 
        }
    }
}
               
Client.prototype.onComplete = function(xhr) {
    if (xhr.status == 404) {
        this.action.Disconnect();
    }
    this.busy = false;
}     
                  
Client.prototype.OnCompleteRead = function(xhr) {
    if (xhr.status == 200) {
        this.Read();
    } else 
        setTimeout(this.Read, 5000);
}
               
Client.prototype.Connect = function() {
    if (this.connect && this.busy) {
        console.log('Connecting...');
        this.busy = true;
        $.ajax({
            data: 'action=Connect',
            success: this.OnSuccess,
            complete: this.OnComplete
        });
    }s
}

Client.prototype.Disconnect = function() {
    if (this.connect && this.busy && this.read) {
        console.log('Disconnecting...');
        this.busy = true;
        $.ajax({
        data: 'action=Disconnect&sock='+this.socket,
        success: this.OnSuccess,
        complete: this.OnComplete
        });
        this.socket = null;
        this.connect = false;
        this.read.abort();
    }
}

Client.prototype.Send = function() {
    if (this.connect) {
        $.ajax({
            data: 'action=Send&sock='+this.socket + '&data=' + data,
            success: this.OnSuccess,
            complete: this.OnComplete
        });
    }
}
 
Client.prototype.Read = function() {
    if (this.connect) {
        this.read = $.ajax({
            data: 'action=Read&sock=' + this.socket,
            success: this.OnSuccess,
            complete: this.OnCompleteRead
            });
    }
}               
 