// "use strict"
// $.ajaxSetup({url: 'http://10.240.20.158:9090', type: 'POST', dataType: 'json'});

// var actions = {
//     Connect : function (params) {
//         console.log('Connected.');
//         console.log('Socket: '+params.socket);
//         Client.socket = params.socket;
//         Client.connect = true;
//         Client.Read();
//    },
   
//    Disconnect : function(params) {
//        console.log("Disconnected.");
//    },
   
//    Print : function(params) {
//     condole.log("Message: "+params.message);
//    } 
// };

// var Client  =  {
//     socket : 0,
//     connect : false,
//     busy : false,
//     read : 0,
    
//     OnSuccess : function(data) {
//         console.log("onSuccess");
//         if (typeof data.actions === 'object') {
//             for (var i = 0, iLength = data.actions.length; i < iLength; i++) {
//                 if (typeof actions[data.actions[i].action] == 'function') {
//                     actions[data.actions[i].action](data.actions[i].params);
//                 } 
//             }
//         }
//     },
    
//     onError : function(data) {
//      console.log('onError : '+ data.toString());
//      for(var key in data)
//          console.log("key - "+key + ", data - "+data[key]);
//     },
    
//     onComplete : function(xhr) {
//         console.log("onComplete");
//         if (xhr.status == 404) {
//             actions.Disconnect();
//         }
//         Client.busy = false;
//     },
    
//     OnCompleteRead : function(xhr) {
//         console.log("onCompleteRead");
//         if (xhr.status == 200) {
//             Client.Read();
//         } else 
//             setTimeout(Client.Read, 5000);
//     },
    
//     Connect : function() {
//         if (!Client.connect && !Client.busy) {
//             console.log('Connecting...');
//             Client.busy = true;
//             $.ajax({
//                 data: 'action=Connect',
//                 success: Client.OnSuccess,
//                 complete: Client.OnComplete,
//                 error: Client.onError
//             });
//         }
//     },
    
//     Disconnect : function() {
//         if (Client.connect && !Client.busy && Client.read) {
//             console.log('Disconnecting...');
//             Client.busy = true;
//             $.ajax({
//             data: 'action=Disconnect&sock='+Client.socket,
//             success: Client.OnSuccess,
//             complete: Client.OnComplete
//             });
//             Client.socket = 0;
//             Client.connect = false;
//             Client.read.abort();
//         }
//     },
    
//     Send : function(data) {
//          if (Client.connect) {
//             console.log("RESPONSE1");
//             $.ajax({
//                 data: 'action=Send&sock='+Client.socket + '&data=' + data,
//                 success: Client.OnSuccess,
//                 complete: Client.OnComplete
//             });
//             console.log("RESPONSE2");
//           }
//     },
    
//     Read : function() {
//         if (Client.connect) {
//             Client.read = $.ajax({
//                 data: 'action=Read&sock=' + Client.socket,
//                 success: Client.OnSuccess,
//                 complete: Client.OnCompleteRead
//             });              
//         }
//     }
// };
                              
//  Client.Connect();           
//  Client.Send(new Idea().ConvertToJson());
function connect(url, auth_json) {
    var socket = new SockJS(url);
    socket.onopen = function() {
        socket.send(auth_json);
    };
    socket.onmessage =  function (event) {
        data = jQuery.parseJSON(event.data);
        if (data.data_type == 'data') {
            // parse your data here
        } else if (data.data_type == 'auth_error') {
            throw data.data.message;
        }
    };
}
connect("http://10.240.20.158:9090", new Idea().QueryJson());
