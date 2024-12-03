import { useUser } from '../UserContext';
import MY_URL from '../env';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ReviewPhotoScreen = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const { reqtype, plocation, photobase64 } = useLocalSearchParams();
  const location = JSON.parse(plocation);

  const [loading, setLoading] = useState(false);

  // Indian Timestamp
  const indianTimestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });

  const handleProceed = async () => {
    setLoading(true);
    const endpoint = reqtype === 'leave' ? '/outgoingrequest' : '/incomingrequest';
    try {
      // console.log(location);
      const response2 = await axios.post(`${MY_URL}/checklocation`, {
        location,
      });
      // console.log(response2.data.success);
      if (response2.data.success) {
        const response1 = await axios.post(`${MY_URL}${endpoint}`, {
          username: user.username,
          image: photobase64,
        });
        if (response1.data.success) {
          Alert.alert(
            'Request Successful',
            `${reqtype === 'leave' ? 'Leave' : 'Arriving'} request completed`
          );
          user.inHostel = !user.inHostel;
          router.dismiss();
          router.replace('/Home Screen/home');
        } else {
          Alert.alert('Request Error', response1.data.message || 'Invalid request');
        }
      } else {
        Alert.alert('Out of Location', response2.data.message || 'You need to be present in hostel');
      }
    } catch (error) {
      console.error(`Error sending ${reqtype} request to backend:`, error);
      Alert.alert('Request Failed', 'There was an issue with your request.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.dismiss();
  };

  return (
    <View className="flex-1 justify-center items-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-5 text-gray-800">Review Your Photo and Location</Text>

      {photobase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${photobase64}` }}
          className="w-72 h-72 mb-5 rounded-lg"
        />
      ) : (
        <Text className="text-gray-500">No photo available</Text>
      )}

      <Text className="text-lg text-gray-700 mb-2">
        Request Type: {reqtype === 'leave' ? 'Leave' : 'Arriving'}
      </Text>

      <Text className="text-lg text-gray-700 mb-2">
        Location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'Location not available'}
      </Text>

      <Text className="text-lg text-gray-700 mb-5">Indian Timestamp: {indianTimestamp}</Text>

      <View className="flex-row justify-between w-full">
        <TouchableOpacity
          onPress={handleProceed}
          className={`flex-1 py-4 mx-1 rounded-lg items-center ${
            loading ? 'bg-gray-400' : 'bg-green-500'
          }`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-lg font-bold text-white">Proceed</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          className="flex-1 py-4 mx-1 bg-red-500 rounded-lg items-center"
        >
          <Text className="text-lg font-bold text-white">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewPhotoScreen;
