//"use strict"
$.ajaxSetup({url: '/10.254.193.158:9090', type: 'post', dataType: 'jsonp'});

var actions = {
    Connect : function (params) {
        console.log('Connected.');
        console.log('Socket: '+params.socket);
        Client.socket = params.socket;
        Client.connect = true;
        Client.Read();
   },
   
   Disconnect : function(params) {
       console.log("Disconnected.");
   },
   
   Print : function(params) {
    condole.log("Message: "+params.message);
   } 
};

var Client = {
    socket : 0,
    connect : false,
    busy : false,
    read : 0,
    
    OnSuccess : function(data) {
        console.log("client onsuccess");
        if (typeof data.actions == 'object') {
            for (var i = 0, iLength = data.actions.length; i < iLength; i++) {
                if (typeof actions[data.actions[i].action] == 'function') {
                    actions[data.actions[i].action](data.actions[i].params);
                } 
            }
        }
    },
    
    onError : function() {
     console.log('onError');
    },
    
    onComplete : function(xhr) {
        if (xhr.status == 404) {
            actions.Disconnect();
        }
        Client.busy = false;
    },
    
    OnCompleteRead : function(xhr) {
        if (xhr.status == 200) {
            Client.Read();
        } else 
            setTimeout(Client.Read, 5000);
    },
    
    Connect : function() {
        if (Client.connect && Client.busy) {
            console.log('Connecting...');
            Client.busy = true;
            $.ajax({
                data: 'action=Connect',
                success: Client.OnSuccess,
                complete: Client.OnComplete
            });
        }
    },
    
    Disconnect : function() {
        if (Client.connect && Client.busy && Client.read) {
            console.log('Disconnecting...');
            Client.busy = true;
            $.ajax({
            data: 'action=Disconnect&sock='+Client.socket,
            success: Client.OnSuccess,
            complete: Client.OnComplete
            });
            Client.socket = 0;
            Client.connect = false;
            Client.read.abort();
        }
    },
    Send : function(data) {
      //   if (Client.connect) {
            console.log("RESPONSE1");
            $.ajax({
                data: 'action=Send&sock='+Client.socket + '&data=' + data,
                success: Client.OnSuccess,
                complete: Client.OnComplete
            });
            console.log("RESPONSE2");
     //     }
    },
    Read : function() {
        if (Client.connect) {
            Client.read = $.ajax({
                data: 'action=Read&sock=' + Client.socket,
                success: Client.OnSuccess,
                complete: Client.OnCompleteRead
            });              
        }
    }
};
                              
            
 Client.Send(new Idea().ConvertToJson());