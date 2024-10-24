import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useUser } from '../UserContext';
import  MY_URL from '../env';

const CameraScreen = () => {
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();
  const { requestType, location } = useLocalSearchParams();
  const {user} = useUser();

  const parsedLocation = JSON.parse(location);

  if (!permission) {
    return <View><Text>Loading camera permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('1.parsed Location : ', parsedLocation);
      console.log('2.captured photo in camera : ', photo);

      // Determine API endpoint based on requestType
      const endpoint = requestType === 'leave' ? '/outgoingrequest' : '/incomingrequest';

      try {
        const response = await axios.post(`${MY_URL}${endpoint}`,{ 
          username: user.username, 
          // image: photo.uri, // The photo URI or base64
          // location: {
          //   latitude: parsedLocation.coords.latitude,
          //   longitude: parsedLocation.coords.longitude,
          // },
        });
        
        const result = response.data;
        if (result.success) {
          Alert.alert(`${requestType === 'leave' ? 'Leave' : 'Arriving'} Request Successful`);
        } else {
          Alert.alert('Request Error', result.message || `Invalid ${requestType} response`);
        }

      } catch (error) {
        console.error(`Error sending ${requestType} request to backend:`, error);
        Alert.alert('Request Failed', 'There was an issue with your request.');
      }
      user.inHostel = !user.inHostel;
      router.replace('/Home Screen');
    } else {
      console.warn('Camera reference is not set.');
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraScreen;
