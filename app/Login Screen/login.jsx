import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather'; // Importing Feather icons for eye icon

const Login = () => {
  const router = useRouter();
  const { userType } = useLocalSearchParams(); // Retrieve userType from query parameters

  // State variables for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  console.log(username)
  const handleLogin = async () => {
    try {
      // Sending a GET request to the backend login API using axios
      const response = await axios.post("http://192.168.14.111:5000/login", {
        params: { username, password }, // Pass username and password as query parameters
      });
      const result = response.data;

      if (result.success) {
        Alert.alert('Login Successful', 'Welcome to ExitMate!');
        // Navigate to the dashboard or desired screen after login
        router.replace('/Home Screen');
      } else {
        // Display an alert based on the message returned by the backend
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log('Login Error:', error);
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

      {/* Password Input Field with Eye Icon */}
      <View className="w-full flex-row items-center border border-gray-300 rounded-lg mb-6">
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword} // Toggle visibility based on showPassword state
          value={password}
          onChangeText={setPassword} // Update password state as user types
          className="flex-1 p-3"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
          {/* Wrapping Icon inside Text to avoid the error */}
          <Text>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" /> {/* Toggle between eye and eye-off icons */}
          </Text>
        </TouchableOpacity>
      </View>

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

export default Login;
