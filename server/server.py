import asyncio
import websockets
import cv2
import base64
import numpy as np
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
from datetime import datetime

# Server Configuration
HOST = "0.0.0.0"  # Allow connections from all devices
PORT = 8080

# Initialize Hand Detector and Classifier
detector = HandDetector(maxHands=2)
classifier = Classifier("Model/keras_model.h5", "Model/labels.txt")

# Parameters
offset = 20
imgSize = 300
labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

# Logging function
def log_event(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

async def handle_client(websocket):
    """Handles a WebSocket connection from a client"""
    log_event("Client connected")
    try:
        async for message in websocket:
            log_event("Received image from client")

            try:
                # Decode base64 image
                img_data = base64.b64decode(message)
                np_arr = np.frombuffer(img_data, np.uint8)
                img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

                if img is None:
                    log_event("Error: Invalid image received")
                    await websocket.send("Error: Invalid Image")
                    continue

                imgOutput = img.copy()
                hands, img = detector.findHands(img)  # Detect hands

                if hands:
                    log_event(f"Detected {len(hands)} hand(s)")

                    hand = hands[0]  # Process the first detected hand
                    x, y, w, h = hand['bbox']

                    imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
                    y1, y2 = max(0, y - offset), min(img.shape[0], y + h + offset)
                    x1, x2 = max(0, x - offset), min(img.shape[1], x + w + offset)
                    imgCrop = img[y1:y2, x1:x2]

                    aspectRatio = h / w
                    if aspectRatio > 1:
                        k = imgSize / h
                        wCal = int(w * k)
                        imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                        wGap = (imgSize - wCal) // 2
                        imgWhite[:, wGap:wGap + wCal] = imgResize
                    else:
                        k = imgSize / w
                        hCal = int(h * k)
                        imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                        hGap = (imgSize - hCal) // 2
                        imgWhite[hGap:hGap + hCal, :] = imgResize

                    prediction, index = classifier.getPrediction(imgWhite, draw=False)
                    result = labels[index]

                    await websocket.send(result)
                    log_event(f"Detected Sign: {result}")
                else:
                    await websocket.send("No hand detected")
                    log_event("No hand detected")

            except Exception as e:
                error_msg = f"Error: {str(e)}"
                await websocket.send(error_msg)
                log_event(error_msg)

    except websockets.exceptions.ConnectionClosed:
        log_event("Client disconnected")

async def start_server():
    """Starts the WebSocket server"""
    log_event(f"Starting WebSocket server on ws://{HOST}:{PORT}")
    async with websockets.serve(handle_client, HOST, PORT):
        await asyncio.Future()  # Keep the server running

if __name__ == "__main__":
    asyncio.run(start_server())
