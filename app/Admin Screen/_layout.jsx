import { Stack, Slot } from 'expo-router';

const AdminLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AdminLayout;
