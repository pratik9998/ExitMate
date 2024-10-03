import { Stack, Slot } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="Login Screen" options={{ headerShown: false }} />
      <Stack.Screen name="Home Screen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
