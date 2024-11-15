import { Text, View,ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '../UserContext';
import axios from 'axios';
import MY_URL from '../env';

const Profile = () => {
  const router = useRouter();
  const {user, setUser} = useUser();
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{
    const fetchuser = async () =>{
      try{
        
        const response = await axios.get(`${MY_URL}/getuser`, {
          username: user.username,
        });
        
        console.log("user in profile : ", respone.data);
        setUser(respone.data);
 
      }catch (error) {
        console.error("Error getting user in Profile", error);
      }finally{
        setLoading(false);
      }
    };
    
    if(user && user.username){
      // fetchuser();
      // console.log("user in profile : ", user);
      setLoading(false);
    }
  });

  if(loading){
    return (
      <View className = "flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color='#0000ff'/>
          <Text className = "text-black text-lg">Loading..</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-black text-3xl font-bold">My Profile</Text>
    </View>
  );
}

export default Profile;
