import { Stack, Slot } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen name="reviewphotoscreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
