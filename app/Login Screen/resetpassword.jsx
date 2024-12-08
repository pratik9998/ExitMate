import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MY_URL from "../env";
import { useRouter } from 'expo-router'; // Use the Expo Router
import Icon from 'react-native-vector-icons/Feather'; // Make sure to have this library installed

const ResetPasswordScreen = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner

  const router = useRouter();

  // Function to handle password reset request
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    try {
      setLoading(true);

      const response2 = await axios.post(`${MY_URL}/checkuserexists`, {
        username,
      });

      if(response2.data.exists){

        const cleanedUsername = username.trim().toLowerCase();
        const userEmail = `${cleanedUsername}@iiita.ac.in`;

        const response = await axios.post(`${MY_URL}/sendmail`, {
          userEmail,
        });

        const result = response.data;
        setLoading(false);

        if (result.success) {
          Alert.alert('Success', 'An OTP has been sent to your email');
          router.push({
            pathname: './verifyresetpasswordotp',
            params: {
              username,
              newPassword,
              correctOtp: result.otp,
            },
          });
        } else {
          Alert.alert('Error', 'Failed to send OTP. Please try again.');
        }
      } else {
        setLoading(false);
        Alert.alert('Error', 'User does not exist. Please check your username.');
      }
    } catch (error) {
      setLoading(false);
      console.log('OTP Request Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View className="items-center justify-center flex-1 p-4 bg-gray-100">
      <View className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Text className="mb-4 text-xl font-bold text-center">Password Reset</Text>

        {/* Username Input */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="p-3 mb-4 border-2 border-gray-300 rounded-lg"
        />

        {/* New Password Input Field with Eye Icon */}
        <View className="flex-row items-center w-full mb-6 border border-gray-300 rounded-lg">
          <TextInput
            placeholder="New Password"
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            className="flex-1 p-3"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
            <Text>
              <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Confirm New Password Input */}
        <TextInput
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          className="p-3 mb-4 border-2 border-gray-300 rounded-lg"
        />

        {/* Reset Password Button */}
        <TouchableOpacity
          onPress={handleResetPassword}
          className="px-10 py-3 mb-1 bg-blue-600 rounded-full"
          disabled={loading}
        >
          <View className="flex items-center justify-center">
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-lg font-semibold text-white">Reset My Password</Text>
            )}
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default ResetPasswordScreen;