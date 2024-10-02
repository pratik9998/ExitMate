import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-gray-150 p-4">
      {/* Title */}
      <Text className="text-3xl font-bold mb-8">Sign Up</Text>

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
      
      {/* for confirm Password */}
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
      />

      {/* Sign Up Button */}
      <TouchableOpacity className="bg-green-600 py-3 px-10 rounded-full mb-4">
        <Text className="text-white text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      {/* Sign In Text with Pop Navigation */}
      <Text className="text-gray-700">
        Already have an account?{' '}
        <Text
          className="text-blue-600 font-bold"
          onPress={() => router.back()}  // Pop signup and go back to the previous login page
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}
