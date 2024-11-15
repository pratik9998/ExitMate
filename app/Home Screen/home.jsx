import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useUser } from '../UserContext';
import  MY_URL from '../env';

const Home = () => {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingButton, setLoadingButton] = useState(null);
  const router = useRouter();

  const {user,setUser} = useUser(); //from user context
  // console.log('home screen user : ' , user);//now ok 

  const handleLogout = () => {
    setUser(null);
    router.dismiss();
  };

  const handleProfile = () => {
    router.push('/Home Screen/profile');
  };

  const handleLeaveRequest = async () => {
    setLoadingButton('leave');
    await getLocation('leave');
  };
  
  const handleArrivingRequest = async () => {
    setLoadingButton('arriving');
    await getLocation('arrival');
  };  

  const getLocation = async (reqType) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location); 
      router.replace({
        pathname: '/Home Screen/camera',
        params: { requestType: reqType, location: JSON.stringify(location) },
      });
      setLoadingButton(null);
    } catch (error) {
      console.error("Error getting location:", error);
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
