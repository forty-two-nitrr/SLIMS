from django.core.management.base import BaseCommand, CommandError
import cv2
import torch

class Command(BaseCommand):

    def handle(self, *args, **options):
        # model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
        # model.classes = list(range(10))
        url = "http://192.168.177.1:81/stream"
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
        model.classes = list(range(9))

        cap = cv2.VideoCapture(url)
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
            if cv2.waitKey(1) == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()
    