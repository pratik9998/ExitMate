import { Stack, Slot } from 'expo-router';

const LoginLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name = "verifysignupotp" options={{headerShown:false}}/>
    </Stack>
  );
};

export default LoginLayout;
