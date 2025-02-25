import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function emotion({ navigation }) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [sending, setSending] = useState(false); // Sending status
  const [detectedText, setDetectedText] = useState("");  // Accumulated text
  const [serverIp, setServerIp] = useState<string | null>(null);
  const [detectionMessage, setDetectionMessage] = useState(""); // Small feedback for "Not detected"
  const ws = useRef<WebSocket | null>(null);
  const cameraRef = useRef(null);

const router = useRouter();
  useEffect(() => {
    // Load the server IP from AsyncStorage
    const loadServerIp = async () => {
      try {
        const storedIp = await AsyncStorage.getItem("serverUrl");
        if (storedIp) {
          setServerIp(storedIp);
        } else {
          console.warn("No server IP found. Please set it in settings.");
        }
      } catch (error) {
        console.error("Error loading server IP:", error);
      }
    };

    loadServerIp();

  }, []);
  // const serverIp = '192.168.31.2'; // Replace with your local machine's IP
  const wsUrl = `ws://${serverIp}:8080`;

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.current.onmessage = (event) => {
      const correctedText = event.data;
      if (correctedText === "No hand detected") {
        setDetectionMessage("Not detected"); // Show feedback
      } else if (!correctedText.includes("Error")) {
        setDetectionMessage(""); // Clear feedback
        setDetectedText((prevText) => `${prevText} ${correctedText}`.trim());
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    let frameInterval;
    if (sending) {
      frameInterval = setInterval(() => {
        processFrame();
      }, 1000); // Process a frame every 1 second
    } else {
      clearInterval(frameInterval);
    }

    return () => clearInterval(frameInterval);
  }, [sending]);

  const processFrame = async () => {
    if (cameraRef.current && ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const frame = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.5,
        });
        if (frame && frame.base64) {
          ws.current.send(frame.base64); // Send the frame data to the WebSocket server
        }
      } catch (error) {
        console.error('Error processing frame:', error);
      }
    }
  };

  const toggleSending = () => {
    setSending((prevSending) => !prevSending);
  };

  const speakText = () => {
    if (detectedText.trim() !== "") {
      Speech.speak(detectedText, {
        language: 'en', // Specify language if needed
        pitch: 1.0,     // Set pitch level
        rate: 1.0,      // Set speech rate
      });
    } else {
      console.log("No text to speak");
    }
  };

  const clearDetectedText = () => {
    setDetectedText(""); // Clear detected text
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container2}>
        <View style={styles.card}>
          <Ionicons name="camera-outline" size={50} color="#3F51B5" style={styles.icon} />
          <Text style={styles.permissionMessage}>
            We need access to your camera to detect sign language gestures.
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.navigate('/signtotext')} style={styles.navButton}>
          <Text style={styles.navButtonTextActive}>Sign Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate('/emotion')} style={styles.navButtonActive}>
          <Text style={styles.navButtonText}>Emotion Detection</Text>
        </TouchableOpacity>
      </View>

      {/* Camera */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        />
      </View>

      {/* Detection Feedback */}
      {detectionMessage ? (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>{detectionMessage}</Text>
        </View>
      ) : null}

      {/* Detected Text Field */}
      <View style={styles.textFieldContainer}>
        <TextInput
          style={styles.textInput}
          value={detectedText}
          placeholder="Detected text will appear here"
          editable={false}
        />
        <TouchableOpacity onPress={speakText}>
          <Ionicons name="volume-high-outline" size={28} color="#3f51b5" />
        </TouchableOpacity>
      </View>

      {/* Fixed Bottom Buttons */}
      <View style={styles.fixedBottomControls}>
        <TouchableOpacity
          style={[styles.controlButton, sending ? styles.activeButton : styles.inactiveButton]}
          onPress={toggleSending}
        >
          <Text style={styles.controlButtonText}>{sending ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={clearDetectedText}>
          <Text style={styles.controlButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
          <Text style={styles.controlButtonText}>Flip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 15, // Added padding for better alignment
    paddingTop: 10, // Added padding at the top
    paddingBottom: 10, // Added padding at the bottom
    backgroundColor: '#ffffff', // Optional: Background color for top bar
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 10, // Rounded corners
  },
  navButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  navButtonActive: {
    flex: 1,
    backgroundColor: '#3f51b5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600', // Slightly bold text
  },
  navButtonTextActive: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600', // Slightly bold text
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  feedbackContainer: {
    backgroundColor: '#ffe6e6',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  feedbackText: {
    color: '#a00',
    fontSize: 12,
  },
  textFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  fixedBottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  controlButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#4caf50',
  },
  inactiveButton: {
    backgroundColor: '#f44336',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#F4F6F9', // Light gray background for a soft look
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // Shadow for Android
  },
  icon: {
    marginBottom: 15,
  },
  permissionMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
