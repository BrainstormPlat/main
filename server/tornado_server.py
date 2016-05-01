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
    lock = allocate_lock()

	def _init_(self):
		self.room = IdeaRoom()
		self.owner_name = ''
		self.shit_code_sent = False
		
    def on_open(self, info):
        # Send that someone joined
        self.broadcast(IdeaConnection.participants, "Someone joined.")
        # Add client to the clients list
        IdeaConnection.participants.add(self)

    def on_message(self, message):
        #Process message
        print(message)
        start_new_thread(self.process_message, (message, ))     
        
    def on_close(self):	
        # Remove client from the clients list and broadcast leave message
        IdeaConnection.participants.remove(self)
		self.room_participants.pop(self)
        #remove from all participants lists e.t.c.
		json_msg = {'ID' : 'GONE_USER', 'name' : self.owner_name}
		message = sockjs.tornado.proto.json_decode(json_msg)
        self.broadcast(IdeaConnection.participants, message)
          
    def process_message(self, message):
        json_msg = sockjs.tornado.proto.json_decode(message)
		if json_msg['id'] == 'new_user':			
		    self.owner_name = json_msg['name']
			self.broadcast(IdeaConnection.participants, message)
		else if json_msg['id'] == 'participants_list':
			self.room_participants = []
			for name in json_msg['content']:
				for participant in IdeaConnection.participants:
					if name == participant.owner_name and owner_name != ''
						room.append(participant)
						break
			room.append(self)		
			self.broadcast(self.room_participants, self.session.conn_info.ip + 'invited you')
        else if json_msg['id'] == 'ideas_list':
            ideas_list.append(json_msg['content'])
            combined_ideas_list = sockjs.tornado.proto.json_encode(ideas_list)
        
            self.lock.acquire()
            if self.connection_processed < len(self.room_participants):
                self.connection_processed += 1
            else:
                self.broadcast(self.room_participants, combined_ideas_list)
            self.lock.release()
			
class IdeaRoom:
	participanst = []
        
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