import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const ws = useRef<WebSocket | null>(null);
  const [detectedSign, setDetectedSign] = useState("No detection yet");
  const cameraRef = useRef(null); // Reference for the CameraView

  const serverIp = '192.168.1.149'; // Replace with your local machine's IP
  const wsUrl = `ws://${serverIp}:8080`;

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.current.onmessage = (event) => {
      setDetectedSign(event.data);
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
    const frameInterval = setInterval(() => {
      processFrame();
    }, 1000); // Process a frame every 100ms

    return () => clearInterval(frameInterval);
  }, []);

  const processFrame = async () => {
    if (cameraRef.current && ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const frame = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.5, // Adjust quality to optimize performance
        });
        if (frame && frame.base64) {
          ws.current.send(frame.base64); // Send the frame data to the WebSocket server
        }
      } catch (error) {
        console.error('Error processing frame:', error);
      }
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>

      {/* Top Bar for Detected Sign */}
      <View style={styles.topBar}>
        <Text style={styles.detectionText}>{detectedSign}</Text>
      </View>

      {/* Camera Container - smaller camera view */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        />
      </View>

      {/* Bottom bar with Flip Camera Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // Permission-related UI
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionMessage: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  // Top bar with detection text
  topBar: {
    height: 60,
    backgroundColor: '#3f51b5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    // You can add a shadow or elevation on Android if desired
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  detectionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Camera container
  cameraContainer: {
    // fixed height for smaller camera view
    height: 300, 
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  // Bottom bar
  bottomBar: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  flipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
