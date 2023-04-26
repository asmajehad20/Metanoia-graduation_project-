import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../conts/colors';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CommunityHeader = () => {
  const navigation = useNavigation();
  return (

    <View style={styles.logo}>
        <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}/>
                
        <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:30}}>Community</Text> 
        </View>

        {/* <TouchableOpacity onPress={()=>console.log('to massaes page')} style={{ marginTop:6, position:'absolute', left:55, backgroundColor:'red', borderRadius:100, padding:2}}>
        <Ionicons name="add-circle" size={45} color={COLORS.A_yellow} />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={()=>navigation.navigate('Search Page')} style={{width:65 ,marginStart:75, alignSelf:'flex-end', marginTop:7, borderRadius:50, marginBottom:10}}>
            <Ionicons name="search" size={35} color={COLORS.black} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Messages Page')} style={{ marginTop:12, position:'absolute', right:1}}>
            {/* <Ionicons name="chatbubbles-outline" size={35} color={COLORS.A_dark_blue} /> */}
            {/* <MaterialCommunityIcons name="chat-outline" size={35} color="black" /> */}
            {/* <MaterialIcons name="chat-bubble-outline" size={35} color="black" /> */}
            <Ionicons name="md-chatbubble" size={35} color="black" />
        </TouchableOpacity>
        
        

              
    </View>
  )
}

 //styleing 
 const styles = StyleSheet.create({
    
    image: {
      width: 60,
      height: 60,
      marginRight:5,
      marginLeft:-5
    },

    logo:{
      flexDirection: 'row',
    //   flex:1,
    },

  });

export default CommunityHeader