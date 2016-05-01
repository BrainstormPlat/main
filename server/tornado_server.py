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

#count for one room
class IdeaConnection(sockjs.tornado.SockJSConnection):
    # Class level variable
	owner = None
	chat_rooms = dict()
    participants = set()
	handlers = []
    #lock = allocate_lock()

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
		#remove from all participants lists e.t.c.
        self.broadcast(self.participants, "Someone left.")
    
	def broadcast_room(self, room, message):
		self.broadcast(room.participants, message)
		
    def process_message(self, message):
        json_msg = sockjs.tornado.proto.json_decode(message)
		if json_msg['ID'] == 'USER_AUTHORIZED':
			pass
		else if json_msg['ID'] == 'PARTICIPANTS_LIST':
		
			chat_room = IdeaRoomConnection()
			chat_rooms.append({self.session.conn_info.ip : chat_room})
			for ip, name in json_msg['participants
			'].iteritems():
				for participant in self.participants:
					if ip == participant.session.conn_info.ip:
						chat_room.add_participant(participant)
					    break
			self.broadcast_room(chat_room, self.session.conn_info.ip + 'invited you')
		else:
			json_msg['ID'] == 'IDEAS_LIST':
				#idea from one room
			#ideas_list.append(json_msg)
			#json_msg['source'] = self.session.conn_info.ip
			#message = sockjs.tornado.proto.json_encode(json_msg)
			#combined_ideas_list = sockjs.tornado.proto.json_encode(ideas_list)
        
			#self.lock.acquire()
			#if self.connection_processed < len(self.expected_count):
			#    self.connection_processed += 1
			#else:
			#    self.send(combined_ideas_list)
			#self.lock.release()
        
class IdeaRoomConnection:	
	IdeaConnection connection
	participants = []
	
	def _init_(self):
		pass

	def add_participant(self, participant):
		participants.append(participant)

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