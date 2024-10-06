import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Use the Expo Router
import Icon from 'react-native-vector-icons/Feather'; // Make sure to have this library installed

const ResetPasswordScreen = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // Function to handle password reset request
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    try {
      // Create the email address based on the username
      const cleanedUsername = username.trim().toLowerCase(); // Clean up the username
      const userEmail = `${cleanedUsername}@iiita.ac.in`; // Construct the email address

      // Sending the reset password request with userEmail in the body
      const response = await axios.post("http://192.168.1.134:5000/sendmail", {
        userEmail, // Send as JSON in the request body
      });

      const result = response.data;
      if (result.success) {
        Alert.alert('Success', 'An OTP has been sent to your email');
        // Navigate to the Verify OTP Screen with username, new password, and correct OTP
        router.push({
          pathname: './verifyresetpasswordotp',
          params: {
            username,
            newPassword,
            correctOtp: result.otp, // Pass the OTP received from the server
          },
        });
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.log('OTP Request Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-xl font-bold text-center mb-4">Password Reset</Text>

        {/* Username Input */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="border-2 border-gray-300 rounded-lg p-3 mb-4"
        />

        {/* New Password Input Field with Eye Icon */}
        <View className="w-full flex-row items-center border border-gray-300 rounded-lg mb-6">
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
          secureTextEntry={!showPassword}
          className="border-2 border-gray-300 rounded-lg p-3 mb-4"
        />

        {/* Reset Password Button */}
        <TouchableOpacity onPress={handleResetPassword} className="bg-blue-600 py-3 px-10 rounded-full mb-1">
          <View className="flex items-center justify-center">
            <Text className="text-white text-lg font-semibold">Reset My Password</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
