import { Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '../UserContext';
import axios from 'axios';
import MY_URL from '../env';

const Profile = () => {
  const router = useRouter();
  const {user, setUser} = useUser();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-black text-3xl font-bold">My Profile</Text>
    </View>
  );
}

export default Profile;
