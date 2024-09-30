import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <TextInput
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <TouchableOpacity className="bg-blue-600 py-2 px-6 rounded-full">
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
