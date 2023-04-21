import {ScrollView, FlatList,Button, SafeAreaView,TouchableOpacity, View, Text , StyleSheet,Image, PanResponder,Animated, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../conts/colors';
import { AntDesign } from '@expo/vector-icons';

const ProfilePage = ({navigation}) => {
  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.logo}>
            <Image
              source={require('../assets/butterfly_104.png')} 
              style={styles.image}/>
              {/* <Text>{currentDate}</Text> */}
              
            <View style={{alignSelf:'center', marginStart:-5, flex:1}}>
              <Text style={{fontWeight:'700', fontSize:30}}>Profile</Text> 
            </View>

            <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>
          
            {/* <AntDesign name="menu-fold" size={30} color="#333" style={{marginTop:16, right:-3}} onPress={()=> navigation.openDrawer()}/> */}

        </View>
      </SafeAreaView>
    </View>
  )
}

export default ProfilePage

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
      contentContainer:{
        flex:1,
        paddingTop: 50, 
        paddingHorizontal: 20,
      },

      container: {
        height: "100%",
        flex: 1,
        backgroundColor: COLORS.A_white,
      },
  
      image: {
        width: 60,
        height: 60,
        marginRight:5,
        marginLeft:-10
      },

      
      logo:{
        flexDirection: 'row',
        marginBottom:-10,
      },

      
    });
  