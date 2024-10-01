// app/Login Screen/index.jsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/Login Screen/login'); // Automatically redirect to the login screen
  }, [router]);

  return null;
}
