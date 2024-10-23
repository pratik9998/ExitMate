import { Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-black text-3xl font-bold">My Profile</Text>
    </View>
  );
}

export default Profile;
