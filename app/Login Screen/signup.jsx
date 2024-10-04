import React,{ useState } from 'react';
import { View, Text, TextInput, TouchableOpacity ,Alert} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather'; // Importing Feather icons for eye icon

const SignUp = () => {
  const router = useRouter();

  // State variables for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Handle Sign Up
  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }

      // Sending a POST request to the backend sign-up API using axios
      const response = await axios.post("http://192.168.14.111:5000/signup", {
        username,
        password,
        confirmPassword,
      });
      const result = response.data;

      if (result.success) {
        const correctotp = result.otp; // Retrieve the correct OTP from backend response

        // Navigate to the OTP verification page and pass the OTP as a parameter
        router.push({
          pathname: './verifysignupotp',
          params: { correctotp : correctotp,
              username : username,
              password : password,
              confirmpassword : confirmPassword
           },
        });

      }else{
        Alert.alert('Sign Up Failed', result.message || 'Could not create account');
      }
    } catch (error) {
      console.log('Sign Up Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-150 p-4">
      {/* Title */}
      <Text className="text-3xl font-bold mb-8">Sign Up</Text>

      {/* Username Input Field */}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername} // Update username state as user types
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
      />

      {/* Password Input Field with Eye Icon */}
      <View className="w-full flex-row items-center border border-gray-300 rounded-lg mb-6">
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword} // Toggle visibility based on showPassword state
          value={password}
          onChangeText={setPassword} // Update password state as user types
          className="flex-1 p-3"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
          {/* Wrapping Icon inside Text to avoid the error */}
          <Text>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" /> {/* Toggle between eye and eye-off icons */}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* for confirm Password */}
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setconfirmPassword} // Update username state as user types
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
      />

      {/* Sign Up Button */}
      <TouchableOpacity className="bg-green-600 py-3 px-10 rounded-full mb-4" onPress={handleSignUp}>
        <Text className="text-white text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      {/* Sign In Text with Pop Navigation */}
      <Text className="text-gray-700">
        Already have an account?{' '}
        <Text
          className="text-blue-600 font-bold"
          onPress={() => router.back()}  // Pop signup and go back to the previous login page
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}


export default SignUp;
