# -*- coding: utf-8 -*-
"""
    Simple sockjs-tornado chat application. By default will listen on port 8080.
"""
import tornado.ioloop
import tornado.web

import sockjs.tornado
from _thread import *
import time

cached_users = dict()

class IndexHandler(tornado.web.RequestHandler):
    """Regular HTTP handler to serve the chatroom page"""
    def get(self):
        self.render('index.html')

class IdeaConnection(sockjs.tornado.SockJSConnection):
    
    # Class level variable
    participants = set()
      
    def __init__(self, *args):
        super(IdeaConnection, self).__init__(*args)
        self.lock = allocate_lock()
        self.owner_name = ''
        self.room_participants = []        
        self.ready = False
        self.joined = False
        
    def on_open(self, info):
        # Send that someone joined
        self.broadcast(IdeaConnection.participants, "Someone joined.")
        # Add client to the clients list
        IdeaConnection.participants.add(self)
        if self.session.conn_info.ip in cached_users:
            self.restore_config()
        else:
            cached_user = {self.session.conn_info.ip : dict()}
            cached_users.update(cached_user)
        cache_sync()
        
    def cache_sync(self):
        cached_users[self.session.conn_info.ip]['owner_name'] = self.owner_name
        cached_users[self.session.conn_info.ip]['room_participants'] = self.room_participants
        cached_users[self.session.conn_info.ip]['ready'] = self.ready
        cached_users[self.session.conn_info.ip]['joined'] = self.joined
        
    def restore_config(self):
        self.owner_name = cached_users[self.session.conn_info.ip]['owner_name']
        self.room_participants = cached_users[self.session.conn_info.ip]['room_participants']
        self.ready = cached_users[self.session.conn_info.ip]['ready']
        self.joined = cached_users[self.session.conn_info.ip]['joined']
        print(cached_users[self.session.conn_info.ip])
        self.send(sockjs.tornado.proto.json_encode(cached_users[self.session.conn_info.ip]))

    def on_message(self, message):
        #Process message
        print(message)
        start_new_thread(self.process_message, (message, ))     
        
    def on_close(self):    
        # Remove client from the clients list and broadcast leave message
        IdeaConnection.participants.remove(self)
        try:
            self.room_participants.remove(self)
        except:
            print('No room for this participant ' + self.session.conn_info.ip)
        #remove from all participants lists e.t.c.
        json_msg = {'ID' : 'GONE_USER', 'name' : self.owner_name}
        message = sockjs.tornado.proto.json_encode(json_msg)
        self.broadcast(IdeaConnection.participants, message)
          
    def process_message(self, message):
        json_msg = sockjs.tornado.proto.json_decode(message)
        print(message)
        if json_msg['id'] == 'new_user':            
            self.owner_name = json_msg['name']
            self.broadcast(IdeaConnection.participants, message)
        elif json_msg['id'] == 'participants_list':
            for name in json_msg['content']:
                for participant in IdeaConnection.participants:
                    if name == participant.owner_name and self.owner_name != '':
                        self.room_participants.append(participant)
                        break
            self.room_participants.append(self)
            for participant in self.room_participants:
                participant.room_participants = self.room_participants
                # to do message = {'id' : 'join_allowed'}
            self.broadcast(self.room_participants, self.session.conn_info.ip + 'invited you')
            #join allowed
        elif json_msg['id'] == 'joined':
            self.joined = True
            joined = True
            self.lock.acquire()
            for participant in self.room_participants:
                joined = joined & participant.joined
            if joined:
                time.sleep(600)
                self.broadcast(self.rooms_participants, sockjs.tornado.proto.json_encode({'id' : 'timer_exceeded'}))
            self.lock.release()
        elif json_msg['id'] == 'ideas_list':#ideas_list_combined
            ideas_list.append(json_msg['content'])
            self.ready = True
            ready = True
            self.lock.acquire()
            for participant in self.room_participants:
                ready = ready & participant.ready
            if ready:
                msg = {'id' : 'ideas_list_combined'}.update(ideas_list)
                self.broadcast(self.room_participants, sockjs.tornado.proto.json_encode(msg))
            self.lock.release()
        self.cache_sync()
                    
if __name__ == "__main__":
    import logging
    logging.getLogger().setLevel(logging.DEBUG)

    # 1. Create chat router
    ChatRouter = sockjs.tornado.SockJSRouter(IdeaConnection, '/chat')

    # 2. Create Tornado applications
    app = tornado.web.Application(
            [(r"/chat", IndexHandler)] + ChatRouter.urls
    )

    # 3. Make Tornado app listen on port 9090
    app.listen(9090)

    # 4. Start IOLoop
    tornado.ioloop.IOLoop.instance().start()