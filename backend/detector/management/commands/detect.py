from django.core.management.base import BaseCommand, CommandError
import cv2
import torch

class Command(BaseCommand):

    def handle(self, *args, **options):
        # model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
        # model.classes = list(range(10))

        url = "http://192.168.237.1:6969/stream"

        cap = cv2.VideoCapture(url)
        if not cap.isOpened():
            print("Error")
            exit()
        while True:
            ret, frame = cap.read()

            if not ret:
                print("Can't receive frame, exiting...")
                break
            frame = cv2.resize(frame, (640, 480))
            cv2.imshow('frame', frame)
            if cv2.waitKey(1) == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()
    