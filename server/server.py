import socket
from threading import Thread

class IdeaServer:
        def __init__(self):
                self.socket = socket.socket()
                self.socket.bind(('', 9090))
                self.socket.listen(10)
                self.connections = []

                while True:
                    connection, addr = self.socket.accept()
                    self.connections.append((connection, address))
                    start_new_thread(self.Listen, connection)

        def Listen(self, connection):
            while True:
                message = connection.recv(1024)
                if not message:
                   break

                self.Broadcast(message)

        def Broadcast(self, message):
                for connection in self.connections:
                    connection.send(message)

if __name__ == "__main__":
    idea_server = IdeaServer()