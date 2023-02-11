from django.core.management.base import BaseCommand, CommandError
import cv2
import torch
import requests
import socket
import base64
import time

DETECTED = True

SOCKET_HOST = '192.168.246.97'
SOCKET_PORT = 6969

class Command(BaseCommand):


    def handle(self, *args, **options):

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((SOCKET_HOST, SOCKET_PORT))
        s.listen()
        conn, addr = s.accept()

        url = "http://192.168.246.1"
        status = not DETECTED
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
        model.classes = list(range(10))
        cap = cv2.VideoCapture(0)
        # cap = cv2.VideoCapture(url + ":81/stream")

        curr_time = time.time()

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
                if status == DETECTED and time.time() - curr_time > 5:
                    r = requests.get(url = url+'/toggle')
                    curr_time = time.time()
                    status = not DETECTED
            else:
                if status == (not DETECTED) and time.time() - curr_time > 5:
                    r = requests.get(url = url+'/toggle')
                    curr_time = time.time()
                    status = DETECTED
            if cv2.waitKey(1) == ord('q'):
                break
            
            _, encoded_img = cv2.imencode('.jpg', frame)
            message = base64.b64encode(encoded_img)
            conn.sendall(message) 

        conn.close()

        cap.release()
        cv2.destroyAllWindows()
        s.close()
    