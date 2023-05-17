import React, { useEffect, useState} from 'react';
import {userr, pass, id} from '../user'
 import {
   SafeAreaView,
   StatusBar,
   StyleSheet,
   TouchableOpacity,
   Text,
   Image,
   FlatList,
   Button,
   useColorScheme,
   View,
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons'
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import { ScrollView } from 'react-native-virtualized-view';
import firestore from '@react-native-firebase/firestore';

import { database } from '../config/firebase';
import {
  collection,
  doc,
  where,
  query,
  onSnapshot,

} from 'firebase/firestore';

 Icon.loadFont().then();

 const Stack = createNativeStackNavigator();
 
 const MessagesPage = ({user, navigation}) => {
   const [users, setUsers] = useState(null)
 //   const [messages, setMessages] = useState([]);
//  console.log(user)

useEffect(() => {
    const collectionRef = collection(database, 'users');
    
    const q = query(collectionRef, where('uid', '==', 'id'));

    const unsub = onSnapshot(doc(database, "uid", "id"), (doc) => {
      console.log("Current data: ", doc);
    });
    
    const users = onSnapshot(q, (querySnapshot) => {

      
      setUsers(
        querySnapshot.docs.map((doc) => ({
          
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          
          // console.log( doc)
          // Add any additional fields you want to fetch from the users collection here
        })
        )
      );
      
    });

    return users;
  
}, []);




 
 
   return (
     <SafeAreaView >
       <StatusBar />
        <ScrollView>
         <View style={styles.Contain}>
             <FlatList
                 data={users}
                 keyExtractor={(item)=>item.uid}
                 renderItem={({item}) => (
                     <TouchableOpacity
                     onPress={() => navigation.navigate('Chat Page', {name: item.name, uid: item.uid})}
                     >
                     <View style={styles.card} >
                         <Image style={styles.userImageST} source={{uri: 'https://placeimg.com/140/140/any'}} />
                         <View style={styles.textArea}>
                         <Text style={styles.nameText} >{item.name}</Text>
                         <Text style={styles.msgTime}>{item.messageTime}</Text>
                         <Text style={styles.msgContent} >{item.email}</Text>
                        </View>
                     </View>
                     </TouchableOpacity>
                 )}
                 />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
     Contain: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
     },
   Container: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   card: {
     width: '100%',
     height: 'auto',
     marginHorizontal: 4,
     marginVertical: 6,
     flexDirection: 'row',
     flexWrap: 'wrap',
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   imageContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
   },
   userImage: {
     paddingTop: 15,
     paddingBottom: 15,
   },
   userImageST: {
     width: 50,
     height: 50,
     borderRadius: 25,
   }, 
   textArea: {
     flexDirection: 'column',
     justifyContent: 'center',
     padding: 5,
     paddingLeft: 10,
     width: 300,
     backgroundColor: 'transparent',
     borderBottomWidth: 1,
     borderBottomColor: '#cccccc',
   },
   userText: {
     flexDirection: 'row',
     justifyContent: 'space-between',
   },
   nameText: {
     fontSize: 14,
     fontWeight: '900',
     fontFamily: 'Verdana'
   },
   msgTime: {
     textAlign: 'right',
     fontSize: 11,
     marginTop: -20,
   },
   msgContent: {
     paddingTop: 5,
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default MessagesPage;