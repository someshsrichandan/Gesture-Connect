import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from "expo-router";

export default function App() {

  const router = useRouter();

  return (
    <View style={styles.container}>
     <View style={styles.imageBox}>
      <Image source={require('../assets/images/user.png')} style={styles.image}/>
      <Text style={styles.imageText}>Hello, User</Text>
     </View>
     <View style={styles.buttons}>
        <View style={styles.buttonElements}>
          <TouchableOpacity style={[styles.buttonTouchable, {backgroundColor: "#9C27B0"}]} onPress={() => router.navigate('/texttosign')}>
            <MaterialCommunityIcons name="format-text" size={24} color="white" />
          </TouchableOpacity>
          <Text>Text to Sign</Text>
        </View>
        <View style={styles.buttonElements}>
          <TouchableOpacity style={[styles.buttonTouchable, {backgroundColor: "#CD853F"}]} onPress={() => router.navigate('/signtotext')}>
            <FontAwesome name="map-signs" size={24} color="white" />
          </TouchableOpacity>
          <Text>Sign to Text</Text>
        </View>
        <View style={styles.buttonElements}>
          <TouchableOpacity style={[styles.buttonTouchable, {backgroundColor: "#8A2BE2"}]} onPress={() => router.navigate('/audiotosign')}>
            <Ionicons name="mic-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text>Audio to Sign</Text>
        </View>
        <View style={styles.buttonElements}>
          <TouchableOpacity style={[styles.buttonTouchable, {backgroundColor: "#00BCD4"}]} onPress={() => router.navigate('/learn')}>
            <FontAwesome name="book" size={24} color="white" />
          </TouchableOpacity>
          <Text>Learn</Text>
        </View>
        <View style={styles.buttonElements}>
          <TouchableOpacity style={[styles.buttonTouchable, {backgroundColor: "#FF69B4"}]} onPress={() => router.navigate('/settings')}>
            <Ionicons name="settings-sharp" size={24} color="white" />
          </TouchableOpacity>
          <Text>Settings</Text>
        </View>
        <View style={styles.buttonElements}>
          <TouchableOpacity style={[styles.buttonTouchable, {backgroundColor: "#808080"}]} onPress={() => router.navigate('/dictionary')}>
            <Octicons name="cross-reference" size={24} color="white" />
          </TouchableOpacity>
          <Text>Dictionary</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  imageText: {
    fontSize: 30,
    marginVertical: 20,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonElements: {
    alignItems: 'center',
    margin: 10,
  },
  buttonTouchable: {
    padding: 20,
    borderRadius: 50,
  }
});
