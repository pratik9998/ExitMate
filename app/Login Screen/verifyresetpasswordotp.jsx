import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

const VerifyResetPasswordOtp = () => {
  const { username, newPassword, correctOtp } = useLocalSearchParams(); // Get params from router
  const [otp, setOtp] = useState('');
  const router = useRouter();

  // Function to handle OTP verification and password change
  const handleVerifyOtp = async () => {
    if (otp === correctOtp) {
      try {
        // Sending request to change the password using username and newPassword
        const response = await axios.post("http://192.168.54.111:5000/changepassword", {
          params: { username, newPassword },
        });

        const result = response.data;
        if (result.success) {
          Alert.alert('Success', 'Password changed successfully.');
          router.replace('/login'); // Navigate to login screen after successful password change
        } else {
          Alert.alert('Error', 'Failed to change password.');
        }
      } catch (error) {
        console.log('Password Change Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      {/* Card Container */}
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg justify-center items-center">
        <Text className="text-xl font-bold text-center mb-6">Verify OTP</Text>

        {/* OTP Input Field */}
        <TextInput
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          className="border-2 border-gray-300 rounded-lg p-3 mb-6 w-full"
          maxLength={6}
        />

        {/* Verify OTP Button */}
        <TouchableOpacity
          onPress={handleVerifyOtp}
          className="bg-green-600 py-3 px-10 rounded-full"
        >
          <Text className="text-white text-lg font-semibold">Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyResetPasswordOtp;
