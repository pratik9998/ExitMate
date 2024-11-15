import { Stack, Slot } from 'expo-router';
import { UserProvider } from './UserContext';

const RootLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="Login Screen" options={{ headerShown: false }} />
        <Stack.Screen name="Home Screen" options={{ headerShown: false }} />
        <Stack.Screen name="Admin Screen" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
