// app/_layout.jsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* You don't need to reference _layout.jsx explicitly */}
      <Stack.Screen name="Login Screen" options={{ headerShown: false }} />
    </Stack>
  );
}
