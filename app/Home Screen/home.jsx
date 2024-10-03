import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  // Function to handle navigation and clear routes
  const handleLogout = () => {

    //till we only have '/' and '/Home Screen'
    //if you get error, try one of the following
    // router.back(); //now we only have '/'
    router.dismiss(); //clearing the navigation stack back to the root.
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;
