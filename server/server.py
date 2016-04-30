import socket
from _thread import *

HOST = ''
PORT = 9090
RECV_BUF = 1024

class IdeaServer:
        def __init__(self):
                self.socket = socket.socket()
                self.socket.bind((HOST, PORT))
                self.socket.listen(10)
                self.connections = []

                while True:
                    connection, addr = self.socket.accept()
                    self.connections.append(connection)
                    connection.send('Access-Control-Allow-Origin : *')
                    start_new_thread(self.Listen, (connection, ))

        def Listen(self, connection):
            while True:
                message = connection.recv(RECV_BUF)
                if not message:
                    connection.close()
                    self.connections.remove(connection)
                    print ('Connection with {0} was aborted'.format(address))
                    break
				   
                print (message)                
                self.Broadcast(message)

        def Broadcast(self, message):
                for connection in self.connections:
                        connection.send(message)

if __name__ == "__main__":
    idea_server = IdeaServer()