import { useUser } from '../UserContext';
import MY_URL from '../env';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {React, useState} from 'react';
import { View,Text,Image,TouchableOpacity,Alert,StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';

const ReviewPhotoScreen = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const {reqtype, plocation, photobase64} = useLocalSearchParams();
  const location = JSON.parse(plocation);

  const [loading, setLoading] = useState(false);

  // console.log("review photo request type : ",reqtype);

  // Indian Timestamp
  const indianTimestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });

  const handleProceed = async () => {
    setLoading(true);
    const endpoint = reqtype === 'leave' ? '/outgoingrequest' : '/incomingrequest';
    // console.log(endpoint)
    try {
      const response1 = await axios.post(`${MY_URL}${endpoint}`, {
        username: user.username,
        image: photobase64
      });
      const response2 = await axios.post(`${MY_URL}/checklocation`, {
        location
      });      
      const result1 = response1.data;
      const result2 = response2.data;

      if (result2.success && result1.success) {
        Alert.alert('Request Successful', `${reqtype === 'leave' ? 'Leave' : 'Arriving'} request completed`);
        user.inHostel = !user.inHostel;
        router.replace('/Home Screen/home');
      } else {
        if(!result1.success)
          Alert.alert('Request Error', result1.message || 'Invalid request');
        else 
          Alert.alert('Out of Location', result2.message || 'You need to be present in hostel');
      }
    } catch (error) {
      console.error(`Error sending ${reqtype} request to backend:`, error);
      Alert.alert('Request Failed', 'There was an issue with your request.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.replace('/Home Screen/home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Photo and Location</Text>

      {photobase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${photobase64}` }}
          style={styles.photo}
        />
      ) : (
        <Text>No photo available</Text>
      )}

      <Text style={styles.requesttype}>
        Request Type: {reqtype==='leave' ?  'Leave' : 'Arriving'}
      </Text>

      <Text style={styles.location}>
        Location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'Location not available'}
      </Text>

      <Text style={styles.timestamp}>Indian Timestamp: {indianTimestamp}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleProceed} style={styles.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Proceed</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  requesttype: {
    fontSize: 16,
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 16,
    margin: 5,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ReviewPhotoScreen;
