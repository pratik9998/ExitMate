import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();

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
            <TouchableOpacity onPress={() => router.push({ pathname: "./Login Screen/login", params: { userType: 'Student' } })}>
              <View className="bg-white py-2 px-6 rounded-full shadow-lg">
                <Text className="text-blue-700 text-xl font-semibold text-center">Student</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push({ pathname: "./Login Screen/login", params: { userType: 'Admin' } })}>
              <View className="bg-white py-2 px-6 rounded-full shadow-lg">
                <Text className="text-blue-700 text-xl font-semibold text-center">Admin</Text>
              </View>
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

export default SplashScreen;
