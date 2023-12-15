StyleSheet
import { View, Text, TouchableOpacity ,Image, StyleSheet} from 'react-native'
import React, {useContext, useEffect} from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import COLORS from '../conts/colors'
import {db,  auth } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import {userr, pass, id} from '../user'
import { Ionicons } from '@expo/vector-icons';
import { ip } from "../getIP";

const CustonDrawer = (props) => {


  const signOut = ()=>{
    props.navigation.navigate('signOut')
  }
 

  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView contentContainerStyle={{backgroundColor:COLORS.A_dark_blue}}>
            <View style={{flex:1, marginStart:15, marginTop:20}}>

              <TouchableOpacity>
                <Image 
                  style={{
                    width:70,
                    height:70,
                    borderRadius:35,
                    marginBottom:5
                  }} 
                  source={require('../assets/user_100_gray.png')} 
                />
              </TouchableOpacity>

              <View style={{flexDirection:'row', marginStart:5}}>
                <Text style={{color:'white', fontSize:17}}>Name: </Text>
                <Text style={{color:'white', fontSize:17}}>{userr}</Text>
              </View>

              <View style={{flexDirection:'row', marginStart:5}}>
                <MaterialIcons name="email" size={22} color="white" />
                {/* <Text style={{color:'white', fontSize:15}}>email: </Text> */}
                <Text style={{color:'white', fontSize:15, marginLeft:5}}>{auth?.currentUser?.email}</Text>
              </View>
              
            </View>

            <View style={{backgroundColor:"white", marginTop:20, paddingVertical:10}}>
               <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>

        <TouchableOpacity 
          onPress={()=>{signOut()}}
          style={{height:60, flexDirection:'row', marginBottom:0, borderTopWidth:0.5}}
        >
          <Ionicons name="exit-outline" size={30} color="#333" style={{alignSelf:'center', marginHorizontal:15}}/>
          <Text style={{alignSelf:'center', marginStart:-5, fontWeight:'700', fontSize:18}}>Log Out</Text>
        </TouchableOpacity>

    </View>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//styleing 
const styles = StyleSheet.create({
  contentContainer:{
    flex:1,
    paddingTop: 25, 
    paddingHorizontal: 15,
  },

  container: {
    height: "100%",
    flex: 1,
    backgroundColor: COLORS.A_white,
  },

  image: {
    width: 50,
    height: 50,
    marginRight:3,
    marginLeft:-10
  },

  logo:{
    flexDirection: 'row',
    flex:1,
  },

  story:{
    
  },

  text:{
    justifyContent:'center',
    alignSelf:'center',
    fontWeight:'bold',
    marginBottom:1.5,
    fontSize:17,
    marginStart:-2
  },


});

export default CustonDrawer