import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useUser } from '../UserContext';

const Home = () => {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingButton, setLoadingButton] = useState(null);
  const router = useRouter();
  const { photoUri } = useLocalSearchParams();

  const {user} = useUser(); //from user context
  console.log(user.inHostel);//now ok

  useEffect(() => {
    if (photoUri) {
      setPhoto(photoUri); // Update the photo state if photoUri is present
      console.log('2. Captured Photo:', photoUri); // Log the captured photo URI
    }
  }, [photoUri]); // Dependency array ensures this runs when photoUri changes

  const handleLogout = () => {
    router.dismiss(); // Clearing the navigation stack back to the root.
  };

  const handleProfile = () => {
    router.push('/Home Screen/profile'); // Navigate to the profile screen
  };

  const handleLeaveRequest = async () => {
    setLoadingButton('leave'); // Set loading state for leave button
    await getLocation(); // Get the current location
    // await sendDataToBackend(); // Uncomment to send data to the backend
    router.push('/Home Screen/camera'); // Navigate to the camera screen
    setLoadingButton(null); // Reset loading state after navigation
  };

  const handleArrivingRequest = async () => {
    setLoadingButton('arriving'); // Set loading state for arriving button
    await getLocation(); // Get the current location
    // await sendDataToBackend(); // Uncomment to send data to the backend
    router.push('/Home Screen/camera'); // Navigate to the camera screen
    setLoadingButton(null); // Reset loading state after navigation
  };

  const getLocation = async () => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords); // Store the location in state
      console.log('1. Current Location:', location.coords); // Log the location
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const sendDataToBackend = async () => {
    if (!photo || !location) {
      console.log('Photo or location not available');
      return;
    }

    try {
      const response = await axios.post('https://your-api-endpoint.com/upload', {
        image: photo, // Send the photo URI
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
      console.log('Data sent to backend:', response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-3xl font-bold mb-8 text-center">Welcome to ExitMate!</Text>

        {/* Leave Request Button */}
        {user.inHostel ? <TouchableOpacity onPress={handleLeaveRequest} disabled={loadingButton === 'leave'}>
          <View className="bg-blue-600 py-3 px-10 rounded-full mb-4 w-62">
            {loadingButton === 'leave' ? (
              <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner for leave button
            ) : (
              <Text className="text-white text-lg font-semibold text-center">Leave Request</Text>
            )}
          </View>
        </TouchableOpacity> : <View/>
        }

        {/* Arriving Request Button */}
        {(!user.inHostel) ? <TouchableOpacity onPress={handleArrivingRequest} disabled={loadingButton === 'arriving'}>
          <View className="bg-blue-600 py-3 px-10 rounded-full mb-4 w-62">
            {loadingButton === 'arriving' ? (
              <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner for arriving button
            ) : (
              <Text className="text-white text-lg font-semibold text-center">Arriving Request</Text>
            )}
          </View>
        </TouchableOpacity> : <View/>
        }

        {/* My Profile Button */}
        <TouchableOpacity onPress={handleProfile} disabled={loadingButton}>
          <View className="bg-blue-600 py-3 px-10 rounded-full mb-4 w-62">
            <Text className="text-white text-lg font-semibold text-center">My Profile</Text>
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} disabled={loadingButton}>
          <View className="bg-red-600 py-3 rounded-lg w-full">
            <Text className="text-white text-lg font-semibold text-center">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
