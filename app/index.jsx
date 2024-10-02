import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Top Section with Logo */}
        <View className="w-full bg-blue-500 items-center pt-12 pb-10">
          {/* College Logo */}
          <Image
            source={require('./../assets/images/college_logo.jpeg')}
            className="w-40 h-40"
            resizeMode="contain"
          />

          {/* Student and Admin Buttons */}
          <View className="mt-8 space-y-10">
            <TouchableOpacity>
              <Link
                href={{ pathname: "/Login Screen/login", params: { userType: 'Student' } }}
                className="bg-white text-blue-700 py-2 px-6 text-center rounded-full shadow-lg"
              >
                <Text className="text-blue-700 text-xl font-semibold">Student</Text>
              </Link>
            </TouchableOpacity>

            <TouchableOpacity>
              <Link
                href={{ pathname: "/Login Screen/login", params: { userType: 'Admin' } }}
                className="bg-white text-blue-700 py-2 px-6 text-center rounded-full shadow-lg"
              >
                <Text className="text-blue-700 text-xl font-semibold">Admin</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Section with Illustration */}
        <View className="flex-1 w-full bg-white items-center justify-center mt-0 p-4">
          <Image
            source={require('./../assets/images/home_students.jpeg')}
            className="max-w-md"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
