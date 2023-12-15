import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { getAuth, signOut} from "firebase/auth";
import { auth } from '../firebase';


const SignOutPage = ({navigation}) => {

    signOut(auth).then(() => {
        navigation.navigate('StartingPage')
      }).catch((error) => {
        // An error happened.
      });
  
}

export default SignOutPage