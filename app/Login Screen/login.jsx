import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-gray-150 p-4">
      {/* Title */}
      <Text className="text-3xl font-bold mb-8">Login</Text>

      {/* Username Input Field */}
      <TextInput
        placeholder="Username"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
      />

      {/* Password Input Field */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
      />

      {/* Login Button */}
      <TouchableOpacity className="bg-blue-600 py-3 px-10 rounded-full mb-4">
        <Text className="text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>

      {/* Sign Up Text with Push Navigation */}
      <Text className="text-gray-700">
        New here?{' '}
        <Text
          className="text-blue-600 font-bold"
          onPress={() => router.push('/Login Screen/signup')}  // Push sign-up onto the stack
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
