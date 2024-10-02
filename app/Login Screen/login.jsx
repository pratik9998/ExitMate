import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const { userType } = useLocalSearchParams(); // Retrieve userType from query parameters

  // State variables for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle login button press
  const handleLogin = async () => {
    try {
      // Sending a GET request to the backend login API using axios
      const response = await axios.get('http://localhost:5000/login', {
        params: { username, password }, // Pass username and password as query parameters
      });

      const result = response.data;

      console.log(result);

      if (result.success) {
        Alert.alert('Login Successful', 'Welcome to the dashboard!');
        // Navigate to the dashboard or desired screen after login
        // router.push('/Home');
      } else {
        // Display an alert based on the message returned by the backend
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-150 p-4">
      {/* Title */}
      <Text className="text-3xl font-bold mb-8">Login</Text>

      {/* Username Input Field */}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername} // Update username state as user types
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
      />

      {/* Password Input Field */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword} // Update password state as user types
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
      />

       {/* Login Button */}
       <TouchableOpacity className="bg-blue-600 py-3 px-10 rounded-full mb-4" onPress={handleLogin}>
        <Text className="text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>

      {/* Sign Up Text with Push Navigation - Only show for Student */}
      {userType !== 'Admin' && (
        <Text className="text-gray-700">
          New here?{' '}
          <Text
            className="text-blue-600 font-bold"
            onPress={() => router.push('/Login Screen/signup')} // Push sign-up onto the stack
          >
            Sign Up
          </Text>
        </Text>
      )}
    </View>
  );
}
