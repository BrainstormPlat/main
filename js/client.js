//"use strict"
$.ajaxSetup({url: '10.254.193.145:9090', type: 'post', dataType: 'json'});

var actions = {
    user : new Client(),
    Connect : function (params) {
        console.log('Connected.');
        console.log('Socket: '+params.socket);
        user.socket = params.socket;
        user.connect = true;
        user.Read();
   },
   
   Disconnect : function(params) {
       console.log("Disconnected.");
   },
   
   Print = function(params) {
    condole.log("Message: "+params.message);
   } 
};

// Action.prototype.Connect = function (params) {
//      console.log('Connected.');
//      console.log('Socket: '+params.socket);
//      this.user.socket = params.socket;
//      this.user.connect = true;
//      this.user.Read();
// }

// Action.prototype.Disconnect = function(params) {
//     console.log("Disconnected.");
// }

// Action.prototype.Print = function(params) {
//     condole.log("Message: "+params.message);
// }

function Client () {
    this.socket = 0;
    this.connect = false;
    this.busy = false;
    this.read = 0;
}

Client.prototype.OnSuccess =  function(data) {
    if (typeof data.actions == 'object') {
        for (var i = 0, iLength = data.actions.length; i < iLength; i++) {
             if (typeof actions[data.actions[i].action] == 'function') {
                 actions[data.actions[i].action](data.actions[i].params);
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
    }
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
        this.socket = 0;
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
 
 var client  = new Client();
 client.Send();