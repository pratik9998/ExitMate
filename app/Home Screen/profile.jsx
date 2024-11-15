import { Text, View, ScrollView,StatusBar } from 'react-native';
import React from 'react';
import { useUser } from '../UserContext';

const Profile = () => {
  const { user } = useUser();

  // Function to format date to IST
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
    <View className="flex-1 bg-gray-200" style={{ paddingTop: StatusBar.currentHeight || 0, paddingBottom: 10, }}>
      <View className="flex items-center ">
        <Text className="text-black text-3xl font-bold p-3">My Profile</Text>
      </View>

     <ScrollView className="flex-1 bg-gray-200 p-4">
      {/* Basic Info Section */}
      <View className="bg-blue-300 shadow-md rounded-lg p-4 mb-4">
        <Text className="text-2xl font-semibold text-gray-800 mb-2">Basic Info</Text>
        <Text className="text-gray-600 text-xl">
          <Text className="font-medium">Enrollment Number: </Text>
          {user?.username?.toUpperCase() || 'N/A'}
        </Text>
        <Text className="text-gray-600 mt-1 text-xl">
          <Text className="font-medium">In Hostel: </Text>
          {user?.inHostel ? 'Yes' : 'No'}
        </Text>
      </View>

      {/* Requests Section */}
      <Text className="text-2xl font-semibold text-gray-800 mb-4">Your Requests</Text>
      {user?.outTokens && user.outTokens.length > 0 ? (
        [...user.outTokens].reverse().map((token, index) => (
          <View
            key={index}
            className={`mb-4 p-4 rounded-lg shadow-md ${
              index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'
            }`}
          >
            <Text className="text-gray-600 ">
              <Text className="font-medium">Request {user.outTokens.length - index}: </Text>
              {token.active ? 'Leave Request Made' : 'Both Requests Completed'}
            </Text>
            <Text className="text-gray-600 mt-1">
              <Text className="font-medium">Leave Date & Time: </Text>
              {formatToIST(token.outDate)}
            </Text>
            {!token.active && (
              <Text className="text-gray-600 mt-1">
                <Text className="font-medium">Arriving Date & Time: </Text>
                {formatToIST(token.inDate)}
              </Text>
            )}
          </View>
        ))
      ) : (
        <Text className="text-gray-600">No requests found.</Text>
      )}
    </ScrollView>
    </View>
  );
};

export default Profile;
