import { Modal, Pressable, ScrollView,FlatList, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useLayoutEffect,useCallback, useState } from 'react';
import COLORS from '../conts/colors'
import { Feather } from '@expo/vector-icons';
import {userr, pass, id} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import { Entypo } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import {db,  auth } from '../firebase';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { collectionGroup,orderBy,onSnapshot, query, where, getFirestore,limit, collection, addDoc,getDocs,getDoc, setDoc, doc ,docRef} from "firebase/firestore";



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


const OneChatPage = ({navigation, route}) => {
  const {email} = route.params;

  const [messages, setMessages] = useState([]);

  useLayoutEffect (()=>{
   
    const q = query(collection(db, 'chats'), where("user._id", "in", [auth?.currentUser?.email , email] ), where("to", "in",[auth?.currentUser?.email , email]));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      

      setMessages(
        snapshot.docs.map((doc) => (
          {
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }
        ))
      )//end set messages
    });

    return () => {
      unsubscribe();
    };
  },[])

  const onSend = useCallback(async(messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    const {_id, createdAt,text,user} = messages[0]
    
    const chatRef = doc(collection(db, "chats"));
    await setDoc(chatRef, { _id, createdAt,  text, user ,to:email});
    // addDoc(collection(db, 'chats'), { _id, createdAt,  text, user }); 
  },[])

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={{width, height:height-50, backgroundColor:COLORS.A_white, }}>
      {/* ///////////////////////////////////////////////////////////////// */}
      <View style={{ flexDirection:'row', paddingVertical:0, borderBottomWidth:0.8, marginTop:30}}>

        {/* <TouchableOpacity onPress={()=>{navigation.navigate('Chat test')}}>
          <Image 
            style={styles.story} 
            source={require('../assets/user_100_gray.png')} 
          />
        </TouchableOpacity> */}
        {/* {getUserName(item)} */}

        <TouchableOpacity style={{ flexDirection:'row', marginBottom:5, alignSelf:'center'}} onPress={()=>{navigation.navigate('Chat test')}}>
          <Text style={{fontSize:21, fontWeight:'400',  marginTop:5, color:'black', alignSelf:'center', marginLeft:15}}>{email}</Text>
        </TouchableOpacity>
            
        

        <AntDesign name="right" size={30} color="black" style={{position:'absolute' ,alignSelf:'center', right:10}} onPress={()=> {navigation.goBack()}}/>
      

      </View>
      
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}

          <GiftedChat
            messages={messages.sort((p1, p2)=>(p1.createdAt < p2.createdAt)? 1:(p1.createdAt > p2.createdAt)? -1:0)}
            showAvatarForEveryMessage={false}
            onSend={messages => onSend(messages)}
            user={{
              _id: auth?.currentUser?.email,
              name: auth?.currentUser?.displayName,
            }}
            // renderInputToolbar={props => customtInputToolbar(props)}
          />
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={35}></KeyboardAvoidingView>
                 
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


  });

export default OneChatPage


