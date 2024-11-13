import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import  MY_URL from '../env';
import Icon from 'react-native-vector-icons/Feather';
import { useUser } from '../UserContext';

const Login = () => {
  const router = useRouter();
  const { userType } = useLocalSearchParams();
  const { setUser } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${MY_URL}/login`, {
        params: { username, password },
      });
      const result = response.data;
      console.log('after login inHostel : ', result.user.inHostel);

      if(result.success){
        Alert.alert('Login Successful', 'Welcome to ExitMate!');
        setUser(result.user);
        router.replace('/Home Screen');
      }else{
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Title */}
        <Text className="text-3xl font-bold mb-8 text-center">Login</Text>

        {/* Username Input Field */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername} // Update username state as user types
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg"
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
          <Text className="text-white text-lg font-semibold text-center">Login</Text>
        </TouchableOpacity>

        <Text className="text-gray-700 py-3 text-center">
          <Text
            className="text-blue-600 font-bold"
            onPress={() => router.push('/Login Screen/resetpassword')} // Push sign-up onto the stack
          >
            Forgot Password?
          </Text>
        </Text>

        {/* Sign Up Text with Push Navigation - Only show for Student */}
        {userType !== 'Admin' && (
          <Text className="text-gray-700 text-center">
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
    </View>
  );
}

export default Login;
