import { Modal, Pressable, ScrollView, FlatList, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../conts/colors'
import { Feather } from '@expo/vector-icons';
import {userr, pass, id, user_email} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchComponent2,{keyword2} from "../components/SearchComponent2";
import { ip } from '../getIP';
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
 

const AllChatsPage = ({navigation}) => {

  const goToChat=(email)=>{
    if(email != '' && email != null)
    navigation.navigate('one chat Page',{email})
  }

  const [USERS, setUser] = useState([])

  const [showSearchList, setShowSearchList] = useState(false)
  const [term, setTerm] = useState("");

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get all users*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(() => {

    try{
      fetch("http://"+ip+":3000/users")
      .then((resp) => resp.json())
      .then((json) => {setUser(json)})
      .catch(function(error) {})
    }catch (error){}

  },[])

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* search term */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(()=>{ setTerm(keyword2) },[term])


  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get users */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getUsers = ( item ) => {
    var t = false

    if(item.email != auth?.currentUser?.email){
      t= true
    }

    return (
      <View>
        {t &&
          <TouchableOpacity onPress={()=>{goToChat(item.email)}}
            style={{ borderBottomWidth: 0.6, paddingVertical: 20, borderColor: "#ccc", paddingHorizontal: 16, flexDirection:'row' }}
          >
            <Ionicons name="person-circle-sharp" size={37} color="#666" style={{marginStart:0, marginVertical:0, marginHorizontal:5}}/>
            <Text style={styles.itemBodyStyle}>{item.name}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  };

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get users */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getSearchUsers = ( item ) => {
    var t = false

    if(item.email != auth?.currentUser?.email){
      if(item.name.startsWith(term)){
        
        t= true
      }else 

      if(item.name!=null && item.name.toLowerCase().startsWith(term.toLowerCase())){
        
        t= true
      }
      // t= true
    }

    return (
      <View>
        {t &&
          <TouchableOpacity onPress={()=>{goToChat(item.email)}}
            style={{ borderBottomWidth: 0.6, paddingVertical: 20, borderColor: "#ccc", paddingHorizontal: 16, flexDirection:'row' }}
          >
            <Ionicons name="person-circle-sharp" size={37} color="#666" style={{marginStart:0, marginVertical:0, marginHorizontal:5}}/>
            <Text style={styles.itemBodyStyle}>{item.name}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={{width, height:height-70, backgroundColor:COLORS.A_white, marginTop:35}}>

      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* searchbar */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      <View style={{ flexDirection:'row', paddingVertical:10, backgroundColor:COLORS.A_dark_blue}}>
        <TouchableOpacity style={{marginRight:10, marginLeft:15, alignSelf:'center'}} onPress={()=>{setShowSearchList(prevState => !prevState)}} >
          <Octicons name="search" size={25} color="white" />
        </TouchableOpacity>

        {!showSearchList && 
          <View style={{ flexDirection:'row', marginBottom:5, alignSelf:'center'}}>
            <Text style={{fontSize:22, fontWeight:'600',  marginTop:5, color:'white', alignSelf:'center'}}>Messages</Text>
          </View>
        }

        {showSearchList && 
          <View style={{flex:1/1.15, marginStart:0}}> 
            <SearchComponent2 onSearchEnter={(newTerm) => {setTerm(newTerm);}} />
          </View>
        }

        <AntDesign name="right" size={30} color="white" style={{position:'absolute' ,alignSelf:'center', right:5}} onPress={()=> {navigation.goBack()}}/>
      </View>
      
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* contact expert */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      <TouchableOpacity 
        onPress={()=>{goToChat('expert@gmail.com')}}
        style={{ borderBottomWidth: 0.6, paddingVertical: 20, borderColor: "#ccc", paddingHorizontal: 16, flexDirection:'row' }}
      >
        <FontAwesome5 name="hands-helping" size={24} color={COLORS.A_dark_blue} style={{marginHorizontal:5}}/>
        <Text style={styles.itemBodyStyle}>Ask Expert for help</Text>
      </TouchableOpacity>

      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* users list */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {!showSearchList &&
        <FlatList
          style={{flex:1,}}
          data={USERS}
          keyExtractor={ (user) => user.user_id}
          initialNumToRender={500}
          windowSize={51}
          renderItem={({item})=>{

            return(
              <View style= {{}}>

                {/* the users */}
                {getUsers(item)} 
              </View>
            ) 
          }}
        /> 
      }

      {showSearchList &&
        <FlatList
          style={{flex:1,}}
          data={USERS}
          keyExtractor={ (user) => user.user_id}
          initialNumToRender={500}
          windowSize={51}
          renderItem={({item})=>{

            return(
              <View style= {{}}>
                {getSearchUsers(item)} 
              </View>
            ) 
          }}
        /> 
      }
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
      width:35,
      height:35,
      marginHorizontal:10,
      marginVertical:7,
      borderWidth:0.5,
      borderColor:"gray",
      borderRadius:35,
    },

    text:{
      justifyContent:'center',
      alignSelf:'center',
      fontWeight:'bold',
      marginBottom:1.5,
      fontSize:17,
      marginStart:-2
    },

    itemTitleStyle: {
      fontSize: 14,
      color: "#000",
      fontWeight: "bold",
    },
    itemBodyStyle: {
      fontSize: 15,
      fontWeight:'500',
      color: "#000",
      // marginTop: 4,
      alignSelf:'center'
    },

  });

export default AllChatsPage


