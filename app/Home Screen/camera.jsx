import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useUser } from '../UserContext';
import  MY_URL from '../env';
import * as ImageManipulator from 'expo-image-manipulator';

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
      <View className="flex-1 justify-center items-center bg-gray-100">
        <View className="w-4/5 p-5 bg-white rounded-lg shadow-md">
          <Text className="text-center text-gray-700 mb-4">We need your permission to show the camera</Text>
          <TouchableOpacity onPress={requestPermission} className="bg-green-500 py-3 rounded-md">
            <Text className="text-center text-white font-bold">Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      // const quality = facing === 'back' ? 0.05 : 0.1;
      // const photo = await cameraRef.current.takePictureAsync({ base64: true, quality });
      // const photoBase64 = photo.base64;

      // // console.log('1.parsed Location : ', parsedLocation);
      // // console.log('2.captured photo in camera : ', photo.base64);

      // const manipulatedPhoto = await ImageManipulator.manipulateAsync(
      //   photo.uri,
      //   [{ resize: { width: 800 } }], // Resize to a maximum width of 800px
      //   { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
      // );

      // const compressedBase64 = manipulatedPhoto.base64;
      
      // console.log(compressedBase64);
      
      // router.replace({
      //   pathname: '/Home Screen/reviewphotoscreen',
      //   params: {reqtype : requestType, plocation : location, photobase64 : compressedBase64}
      // });
      
      const photo = await cameraRef.current.takePictureAsync();
      const quality = facing === 'back' ? 0.2 : 0.3;
      const manipulatedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [
          { resize: { width: 1000 } },
        ],
        {
          compress: quality,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );
      const compressedBase64 = manipulatedPhoto.base64;
      router.replace({
        pathname: '/Home Screen/reviewphotoscreen',
        params: { reqtype: requestType, plocation: location, photobase64: compressedBase64 },
      });
    } else {
      console.warn('Camera reference is not set.');
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current==='back' ? 'front' : 'back'));
  }

  return (
    <View className="flex-1">
    <CameraView ref={cameraRef} className="flex-1" facing={facing}>
      <View className="absolute bottom-8 left-0 right-0 flex-row justify-evenly">
        <TouchableOpacity className="bg-gray-700 px-4 py-2 rounded-lg" onPress={toggleCameraFacing}>
          <Text className="text-white text-lg font-bold">Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg" onPress={takePhoto}>
          <Text className="text-white text-lg font-bold">Take Photo</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

export default CameraScreen;
