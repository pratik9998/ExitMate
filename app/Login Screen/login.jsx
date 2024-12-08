import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${MY_URL}/login`, {
        params: { username, password },
      });
      const result = response.data;
      // console.log('after login inHostel : ', result.user.inHostel);

      if(result.success){
        // Alert.alert('Login Successful', 'Welcome to ExitMate!');
        setUser(result.user);
        if(userType !== 'Admin')
          router.replace('/Home Screen/home');
        else router.replace('/Admin Screen/home');
      }else{
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    }catch (error){
      console.log('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }finally{
      setLoading(false);
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
          onChangeText={setUsername}
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg"
        />

        {/* Password Input Field with Eye Icon */}
        <View className="w-full flex-row items-center border border-gray-300 rounded-lg mb-6">
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            className="flex-1 p-3"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
            <Text>
              <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className={`bg-blue-600 py-3 px-10 rounded-full mb-4 ${loading ? 'opacity-50' : ''}`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white text-lg font-semibold text-center">Login</Text>
          )}
        </TouchableOpacity>

        <Text className="text-gray-700 py-3 text-center">
          <Text
            className="text-blue-600 font-bold"
            onPress={() => router.push('/Login Screen/resetpassword')}
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
              onPress={() => router.push('/Login Screen/signup')}
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
