import { Text, View, ScrollView, StatusBar,ActivityIndicator,TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { useUser } from '../UserContext';
import { Buffer } from 'buffer';
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import MY_URL from '../env';
import axios from 'axios';

const Profile = () => {
  const { user } = useUser();
  const [downloadLoading, setDownloadLoading] = useState(false);

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

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      const response = await axios.post(`${MY_URL}/makecsv`,{ 
        username: user.username, 
      });
       if (response.data) {
         const base64Data = Buffer.from(response.data.excelBuffer, "binary").toString(
           "base64"
         );

         const fileUri = `${FileSystem.documentDirectory}${user.username}.xlsx`;
         await FileSystem.writeAsStringAsync(fileUri, base64Data, {
           encoding: FileSystem.EncodingType.Base64,
         });

         if (await Sharing.isAvailableAsync()) {
           await Sharing.shareAsync(fileUri);
          //  alert("File shared successfully!");
         } else {
          //  alert("Sharing is not available on this device.");
         }
       } else {
         alert("Failed to download file: No data available.");
       }    
    }catch(err)
    {
      console.log(err);
    };
    setDownloadLoading(false);
  }

  const calculateLeaveDuration = (outDate, inDate) => {
    const outTime = new Date(outDate);
    const inTime = new Date(inDate);
    const durationMs = inTime - outTime;

    const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  };

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: StatusBar.currentHeight || 0, paddingBottom: 10 }}>
      <View className="flex items-center">
        <Text className="text-black text-3xl font-bold p-3">My Profile</Text>
      </View>

      <ScrollView className="flex-1 bg-gray-100 p-4">
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
        <View className="mt-6 flex flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-semibold text-gray-800">Your Requests</Text>
        {user && user.outTokens.length > 0 && (
          downloadLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <TouchableOpacity
              className="bg-green-500 rounded p-2"
              onPress={handleDownload}
              activeOpacity={0.7}
            >
              <Text className="text-white font-semibold">Download</Text>
            </TouchableOpacity>
          )
        )}
      </View>

        {user?.outTokens && user.outTokens.length > 0 ? (
          [...user.outTokens].reverse().map((token, index) => {
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
                  <Text className="font-medium">Request {user.outTokens.length - index}: </Text>
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
      </ScrollView>
    </View>
  );
};

export default Profile;
