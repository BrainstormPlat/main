import socket
from threading import Thread

class IdeaServer:
        def __init__(self, handler):
                self.listener = IdeaListener()
                self.sender = IdeaSender()
                self.handler = handler
                self.socket.bind(('', 9090))

        def Listen(self):
                self.socket.listen(1)
                connection, addr = self.socket.accept()
                Thread.__init__(self.listener).start(connection)

        def OnMessage(self):
                Thread.__init__(self.handler).start(message)
                self.Broadcast(message)                

        def Broadcast(self, message):
                connection.sendall(message)


class IdeaListener:

    def Run(self, connection):
        while True:
            data = connection.recv(1024)
            self.server.OnMessage(data)
            if not data:
                break
