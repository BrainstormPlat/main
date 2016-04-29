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
                           complete:user.onComplete
                       });
                       user.sock = null;
                       user.conn = false;
                       user.read.abort();
                   }
}
               
                /*
                * Действие.
                * Отсоединение от сервера.
                */
               Disconnect: function() {
                 
                },
               
                /*
                * Действие.
                * Отправка данных на сервер.
                */
               Send: function() {
                   if (user.conn) {
                       var data = $.trim($('#input').val());
                       if (!data) {
                           return;
                       }
                       $.ajax({
                           data:'action=Send&sock='+user.sock+'&data='+data,
                           success:user.onSuccess,
                           complete:user.onComplete
                       });
                       $('#input').val('');
                   } else {
                       log.print('Please connect.');
                   }
                },
               
                /*
                * Действие.
                * Прослушивание соккета.
                */
               Read: function() {
                   if (user.conn) {
                       user.read = $.ajax({
                           data:'action=Read&sock='+user.sock,
                           success:user.onSuccess,
                           complete:user.onCompleteRead
                       });
                   }
                }
               
            };