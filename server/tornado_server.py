# -*- coding: utf-8 -*-
"""
    Simple sockjs-tornado chat application. By default will listen on port 8080.
"""
import tornado.ioloop
import tornado.web

import sockjs.tornado
from _thread import *


class IndexHandler(tornado.web.RequestHandler):
    """Regular HTTP handler to serve the chatroom page"""
    def get(self):
        self.render('index.html')


class IdeaConnection(sockjs.tornado.SockJSConnection):
    # Class level variable
    participants = set()
    ideas_list = []
    connection_processed = 0
    lock = allocate_lock()

    def on_open(self, info):
        # Send that someone joined
        self.broadcast(self.participants, "Someone joined.")

        # Add client to the clients list
        self.participants.add(self)

    def on_message(self, message):
        #Process message
        print(message)
        start_new_thread(self.process_message, (message, ))
        
        
    def on_close(self):
        # Remove client from the clients list and broadcast leave message
        self.participants.remove(self)
        self.broadcast(self.participants, "Someone left.")
    
    def process_message(self, message):
        json_msg = sockjs.tornado.proto.json_decode(message)
        self.ideas_list.append(json_msg)
        json_msg['source'] = self.session.conn_info.ip
        message = sockjs.tornado.proto.json_encode(json_msg)
        combined_ideas_list = self.combine_jsons(self.ideas_list)
        
        self.lock.acquire()
        if self.connection_processed < len(self.participants):
            self.connection_processed += 1
        else:
            self.send(combined_ideas_list)
        self.lock.release()
        
    def combine_jsons(self, jsons):
        return sockjs.tornado.proto.json_encode(jsons)
        

if __name__ == "__main__":
    import logging
    logging.getLogger().setLevel(logging.DEBUG)

    # 1. Create chat router
    ChatRouter = sockjs.tornado.SockJSRouter(IdeaConnection, '/chat')

    # 2. Create Tornado applications
    app = tornado.web.Application(
            [(r"/chat", IndexHandler)] + ChatRouter.urls
    )

    # 3. Make Tornado app listen on port 8080
    app.listen(9090)

    # 4. Start IOLoop
    tornado.ioloop.IOLoop.instance().start()