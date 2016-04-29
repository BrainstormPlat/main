import socket
from threading import Thread

class IdeaServer:
        def __init__(self, handler):
                self.handler = handler
                listener = IdeaListener()

        def Listen(self):
                Thread.__init__(listener).start()

        def OnMessage(self):
                Thread.__init__(handler).start(message)
                

        def Broadcast(self):
                pass


class IdeaListener:
        def Run():
                while(True):
                        pass
