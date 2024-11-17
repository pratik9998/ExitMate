import React, { useState } from 'react';
import { Text, View,TouchableOpacity, TextInput, Button, ScrollView, StatusBar,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useUser } from '../UserContext';
import  MY_URL from '../env';

const AdminHome = () => {
  const router = useRouter();
  const { user } = useUser();
  const [rollNumber, setRollNumber] = useState('');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${MY_URL}/getuser`, {
        username: rollNumber,
      });
      setDetails(response.data.user);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateLeaveDuration = (outDate, inDate) => {
    const out = new Date(outDate);
    const inD = new Date(inDate);
    const diff = inD - out;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  };

  const formatToIST = (dateString) => {
    const date = new Date(dateString);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  return (
    <View
      className="flex-1 bg-gray-200"
      style={{ paddingTop: StatusBar.currentHeight || 0, paddingBottom: 10 }}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Admin Dashboard Heading */}
        <Text className="text-black text-3xl font-bold text-center mb-4">Admin Dashboard</Text>

        {/* Roll Number Input and Button */}
        <View className="flex flex-row items-center mb-4 space-x-2">
          <TextInput
            className="flex-1 border rounded p-2 bg-white"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChangeText={setRollNumber}
          />
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <TouchableOpacity
              className="bg-blue-500 rounded p-2"
              onPress={handleGetDetails}
              activeOpacity={0.7} // Adjust opacity when pressed
            >
              <Text className="text-white font-semibold">Get Details</Text>
            </TouchableOpacity>
          )}
        </View>


        {/* Display Basic Info */}
        {details && (
          <View>
            <Text className="text-2xl font-semibold text-gray-800 mb-2">Basic Info</Text>
            <Text className="text-gray-600 text-xl">
              <Text className="font-medium">Enrollment Number: </Text>
              {details.username?.toUpperCase() || 'N/A'}
            </Text>
            <Text className="text-gray-600 mt-1 text-xl">
              <Text className="font-medium">In Hostel: </Text>
              {details.inHostel ? 'Yes' : 'No'}
            </Text>
          </View>
        )}

        {/* Requests Section (conditionally rendered) */}
        {rollNumber && details?.outTokens && (
          <>
            <Text className="text-2xl font-semibold text-gray-800 mt-4 mb-2">Your Requests</Text>
            {details.outTokens.length > 0 ? (
              [...details.outTokens].reverse().map((token, index) => {
                const { days, hours, minutes } =
                  !token.active && token.inDate ? calculateLeaveDuration(token.outDate, token.inDate) : { days: null, hours: null, minutes: null };

                return (
                  <View
                    key={index}
                    className={`mb-4 p-4 rounded-lg shadow-md ${
                      index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'
                    }`}
                  >
                    <Text className="text-gray-600">
                      <Text className="font-medium">Request {details.outTokens.length - index}: </Text>
                      {token.active ? 'Leave Request Made' : 'Both Requests Completed'}
                    </Text>
                    <Text className="text-gray-600 mt-1">
                      <Text className="font-medium">Leave Date & Time: </Text>
                      {formatToIST(token.outDate)}
                    </Text>
                    {!token.active && (
                      <>
                        <Text className="text-gray-600 mt-1">
                          <Text className="font-medium">Arriving Date & Time: </Text>
                          {formatToIST(token.inDate)}
                        </Text>
                        <Text className="text-gray-600 mt-1">
                          <Text className="font-medium">Total Leave Duration: </Text>
                          {days} {days === 1 ? 'day' : 'days'}, {hours} {hours === 1 ? 'hour ' : 'hours '} 
                          and {minutes} {minutes === 1 ? 'minute' : 'minutes'}
                        </Text>
                      </>
                    )}
                  </View>
                );
              })
            ) : (
              <Text className="text-gray-600">No requests found.</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AdminHome;
