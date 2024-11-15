import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import MY_URL from '../env';
import { useUser } from '../UserContext';

const VerifySignUpOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const router = useRouter();
  const { correctotp, username, password } = useLocalSearchParams();

  const handleVerify = async () => {
    if (otp === correctotp) {
      setLoading(true);
      try {
  
        const response = await axios.post(`${MY_URL}/create`, {
          username: username,
          password: password,
        });

        if (response.status === 200) {
          Alert.alert('OTP Verified', 'You are successfully signed up!');
          setUser(response.data.user);
          router.replace('/Home Screen');
        } else {
          Alert.alert('Signup Failed', 'Unable to create a user. Please try again.');
        }
      } catch (error) {
        Alert.alert('Signup Failed', 'Could not create the user. Please try again.');
        console.error('Error creating user:', error);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      {/* Card Container */}
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg justify-center items-center">
        {/* Heading */}
        <Text className="text-3xl font-bold text-center mb-8">Verify OTP</Text>

        {/* OTP Input Field */}
        <TextInput
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChangeText={setOtp} // Update OTP state
          keyboardType="numeric"
          className="border-2 border-gray-300 rounded-lg p-3 mb-6 w-full text-center"
          maxLength={6} // Set max length for OTP
        />

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleVerify}
          className="bg-green-600 py-3 px-10 rounded-full"
          disabled={loading}
        >
          {loading ? (
             <ActivityIndicator size="small" color="#ffffff"/>
          ) : (
            <Text className="text-white text-lg font-semibold">Verify</Text>
          )}
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default VerifySignUpOtp;
