import asyncio
import websockets
import cv2
import base64
import numpy as np
from tensorflow.keras.models import load_model
from datetime import datetime

# Server Configuration
HOST = "0.0.0.0"  # Allow connections from all devices
PORT = 5000  # Emotion detection server port

# Load the trained emotion model
model = load_model('Model/emotion_model.keras')

# Load Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Dictionary mapping labels to emotions
emotion_dict = {
    0: "Angry", 1: "Disgusted", 2: "Fearful",
    3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"
}

# Logging function
def log_event(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

async def handle_client(websocket):
    """Handles a WebSocket connection from a client"""
    log_event("Client connected for emotion detection")
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

                # Convert frame to grayscale
                gray_frame = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

                # Detect faces in the frame
                faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)

                if len(faces) == 0:
                    log_event("No face detected")
                    await websocket.send("No face detected")
                    continue

                log_event(f"Detected {len(faces)} face(s)")

                # Process the first detected face
                x, y, w, h = faces[0]
                roi_gray = gray_frame[y:y+h, x:x+w]
                cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray, (48, 48)), -1), 0)

                # Make a prediction
                prediction = model.predict(cropped_img)
                maxindex = int(np.argmax(prediction))

                # Get the predicted emotion
                emotion = emotion_dict[maxindex]

                await websocket.send(emotion)
                log_event(f"Detected Emotion: {emotion}")

            except Exception as e:
                error_msg = f"Error: {str(e)}"
                await websocket.send(error_msg)
                log_event(error_msg)

    except websockets.exceptions.ConnectionClosed:
        log_event("Client disconnected")

async def start_server():
    """Starts the WebSocket server"""
    log_event(f"Starting Emotion Detection WebSocket server on ws://{HOST}:{PORT}")
    async with websockets.serve(handle_client, HOST, PORT):
        await asyncio.Future()  # Keep the server running

if __name__ == "__main__":
    asyncio.run(start_server())
