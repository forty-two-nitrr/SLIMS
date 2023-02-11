from django.core.management.base import BaseCommand, CommandError
import cv2
import torch
import requests
import socket
import base64

DETECTED = True
NOTDETECTED = False

class Socket():

    def __init__(self, host_ip, port):
        self.BUFF_SIZE = 65536
        self.server_socket = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
        self.server_socket.setsockopt(socket.SOL_SOCKET,socket.SO_RCVBUF,self.BUFF_SIZE)
        self.host_name = socket.gethostname()
        self.host_ip = host_ip
        self.port = port
        self.socket_address = (host_ip,port)
        self.server_socket.bind(self.socket_address)


class Command(BaseCommand):

    status = NOTDETECTED
    socket = Socket('192.168.177.97', 6969)

    def handle(self, *args, **options):
        url = "http://192.168.177.1"
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
        model.classes = list(range(10))

        cap = cv2.VideoCapture(url + ":81/stream")
        if not cap.isOpened():
            print("Error")
            exit()
        while True:

            ret, frame = cap.read()
            results = model(frame)
            if not ret:
                print("Can't receive frame, exiting...")
                break
            for box in results.xyxy[0]:
                xB = int(box[2])
                xA = int(box[0])
                yB = int(box[3])
                yA = int(box[1])
                cv2.rectangle(frame, (xA, yA), (xB, yB), (0, 255, 0), 2)
           
            frame = cv2.resize(frame, (640, 480))
            cv2.imshow('frame', frame)
            
            if len(results.xyxy[0]) == 0:
                if status == DETECTED:
                    r = requests.get(url = url+'/toggle')
                    status = NOTDETECTED
            else:
                if status == NOTDETECTED:
                    r = requests.get(url = url+'/toggle')
                    status = DETECTED
            if cv2.waitKey(1) == ord('q'):
                break

            encoded,buffer = cv2.imencode('.jpg',frame,[cv2.IMWRITE_JPEG_QUALITY,80])
            message = base64.b64encode(buffer)
            socket.server_socket.sendto(message,client_addr)
        
        cap.release()
        cv2.destroyAllWindows()
        socket.server_socket.close()
    