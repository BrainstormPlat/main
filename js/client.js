"use strict"
function _parse (data) {
    for(var key in data)
        console.log("key - "+key+" data - "+data[key]); 
}

function Client (url) {
    this.url = url;
}

Client.prototype.connect = function(auth_json) {
    var socket = new SockJS(this.url);
    socket.onopen = function() {
        socket.send(auth_json);
    };
    socket.onmessage =  function (event) {
        var data = jQuery.parseJSON(event.data);  
       // if (data.data_type == 'data') {
         if (data.data_type == 'auth_error') 
            throw data.data.message;
         else 
            _parse(data);   
    };
}

function VKClient () {
 this.data = {};
 this.api = "//vk.com/js/api/openapi.js";
 this.appID = 111;
 this.appPermissions = '';
}
 VKClient.prototype.init = function(){
  $.js(this.api);
  window.vkAsyncInit = function(){
   VK.init({apiId: this.appID});
   load();
  }
  function load(){
   VK.Auth.login(authInfo, this.appPermissions);

   function authInfo(response){
    if(response.session){ // Авторизация успешна
     this.data.user = response.session.user;
     this.getFriends();
    }else console.log("Авторизоваться не удалось!");
   }
  }
 }
 
 VKClient.prototype.getFriends = function(){
  VK.Api.call('friends.get', {fields: ['uid', 'first_name', 'last_name'], order: 'name'}, function(r){
   if(r.response){
    r = r.response;
    var ol = $('#vk_auth').add('ol');
    for(var i = 0; i < r.length; ++i){
     var li = ol.add('li').html(r[i].first_name+' '+r[i].last_name+' ('+r[i].uid+')')
    }
   }else console.log("Не удалось получить список ваших друзей");
  })
 }