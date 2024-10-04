import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const verifySignUpOTP = () => {
  const [otp, setOtp] = useState(''); // OTP input state

  const router = useRouter();
  const { correctotp, username, password, confirmpassword } = useLocalSearchParams();

  // Handle OTP verification
  const handleVerify = async () => {
    console.log(otp)
    console.log(correctotp)

    if (otp === correctotp) {
      try {
        // Make a POST request to the backend to create the user
        const response = await axios.post('http://192.168.14.111:5000/create', {
          username: username, 
          password: password,
        });

        if (response.status === 200) {
          Alert.alert('OTP Verified', 'You are successfully signed up!');
          router.replace('/Home Screen'); // Redirect to home screen after successful signup
        } else {
          Alert.alert('Signup Failed', 'Unable to create a user. Please try again.');
        }
      } catch (error) {
        Alert.alert('Signup Failed', 'Could not create the user. Please try again.');
        console.error('Error creating user:', error);
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* Heading */}
      <Text className="text-3xl font-bold mb-8">Verify OTP</Text>

      {/* OTP Input Field */}
      <TextInput
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChangeText={setOtp} // Update OTP state
        keyboardType="numeric"
        minLength={6}
        maxLength={6} // Set max length for OTP
        className="w-3/4 p-3 mb-6 border border-gray-300 rounded-lg text-center"
      />

      {/* Verify Button */}
      <TouchableOpacity
        onPress={handleVerify}
        className="bg-green-600 py-3 px-10 rounded-full"
      >
        <Text className="text-white text-lg font-semibold">Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default verifySignUpOTP;
