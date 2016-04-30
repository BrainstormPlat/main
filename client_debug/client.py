import socket

sock = socket.socket()
sock.connect(('10.240.20.193', 9090))
sock.send('hello, world!')
data = sock.recv(1024)
sock.close()

print data
