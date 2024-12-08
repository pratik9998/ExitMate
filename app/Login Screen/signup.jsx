import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; // Added ActivityIndicator
import { useRouter } from 'expo-router';
import MY_URL from '../env';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

const SignUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }

      setLoading(true);
      const response = await axios.post(`${MY_URL}/signup`, {
        username,
        password,
        confirmPassword,
      });
      const result = response.data;
      setLoading(false);

      if (result.success) {
        const correctotp = result.otp;

        router.push({
          pathname: './verifysignupotp',
          params: {
            correctotp: correctotp,
            username: username,
            password: password,
            confirmpassword: confirmPassword
          },
        });

      } else {
        Alert.alert('Sign Up Failed', result.message || 'Could not create account');
      }
    } catch (error) {
      setLoading(false);
      console.log('Sign Up Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Title */}
        <Text className="text-3xl font-bold mb-8 text-center">Sign Up</Text>

        {/* Username Input Field */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg"
        />

        {/* Password Input Field with Eye Icon */}
        <View className="w-full flex-row items-center border-2 border-gray-300 rounded-lg mb-6">
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword} 
            value={password}
            onChangeText={setPassword}
            className="flex-1 p-3"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
            {/* Wrapping Icon inside Text to avoid the error */}
            <Text>
              <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input Field */}
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setconfirmPassword}
          className="w-full p-3 mb-6 border-2 border-gray-300 rounded-lg"
        />

        {/* Sign Up Button */}
        <TouchableOpacity
          className="bg-green-600 py-3 px-10 rounded-full mb-4"
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white text-lg text-center font-semibold">Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Sign In Text with Pop Navigation */}
        <Text className="text-gray-700 text-center">
          Already have an account?{' '}
          <Text
            className="text-blue-600 font-bold"
            onPress={() => router.back()} 
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SignUp;
