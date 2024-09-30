import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <TouchableOpacity className="bg-blue-500 p-4 m-2 rounded">
        <Text className="text-white">Students</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-green-500 p-4 m-2 rounded">
        <Text className="text-white">Admin</Text>
      </TouchableOpacity>
    </View>
  );
}
