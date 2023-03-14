import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState }from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert, StyleSheet, } from 'react-native';

import COLORS from '../conts/colors'
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader'; 


const RegistorPage = ({navigation}) => {


    // const [inputs, setInputs] = React.useState('');

    const [username, setUserName] = useState('');
    const [password, setUserPass] = useState(''); 
    const [phone, setPhone] = useState('');
    const [email, setUaerEmail] = useState('');  
    const [fullname, setFulllName] = useState(''); 

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!username){
          handleError('Please input a username', 'username');
          isValid = false;
        }
    
        if (!email) {
          handleError('Please input email', 'email');
          isValid = false;
        } else if (!email.match(/\S+@\S+\.\S+/)) {
          handleError('Please input a valid email', 'email');
          isValid = false;
        }
    
        if (!fullname) {
          handleError('Please input fullname', 'fullname');
          isValid = false;
        }
    
        if (!phone) {
          handleError('Please input phone number', 'phone');
          isValid = false;
        }
    
        if (!password) {
          handleError('Please input password', 'password');
          isValid = false;
        } else if (password.length < 5) {
          handleError('Min password length of 5', 'password');
          isValid = false;
        }
    
        if (isValid) {
          // register();
          {userregistor}
        }
      };

      // console.log(inputs.email)
    const userregistor = () =>{
      fetch("http://10.0.2.2:3000/registor", {
        method: "post", 
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": username,
          "password": password,
          "email": email,
          "name":  fullname,
          "phonenumber": phone,
        })
      })
      .then(res=>res)
      
      .then(data =>{
        // console.log(data.status)
        // if(data.status === 200) 
      } )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
      });
    }

    //////////////////////////////////////////////////////////////
      const register = () => {
        setLoading(true);
        setTimeout(() => {
          try {
            setLoading(false);
            // AsyncStorage.setItem('userData', JSON.stringify(inputs));
            navigation.navigate('Sign In Page');
          } catch (error) {
            Alert.alert('Error', 'Something went wrong');
          }
        }, 3000);
      };
    
      // const handleOnchange = (text, input) => {
      //   setInputs(prevState => (text));
      // };
      const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };


//////////////////////////////////////////////////////////////////////////////////////////////////
    return (
    <ScrollView  style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>

      <Loader visible={loading}/>

        <View style={{marginLeft: 10, marginTop: 8}}>
          <Text style= {styles.textBody}>Register</Text> 
          <Text style={{color: COLORS.A_gray, fontSize: 16, marginBottom: 7}}>Enter Your Details to Register</Text>
        </View>
        
        <View style={{marginVertical: 15}}>

        <Input
            onChangeText={(text) => setUserName(text)}
            onFocus={() => handleError(null, 'username')}
            // iconName="email-outline"
            label="Username"
            placeholder="Enter your username"
            error={errors.username}
          />

        <Input
            onChangeText={(text) => setUaerEmail(text)}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
     
          <Input
            onChangeText={(text) => setFulllName(text)}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
           error={errors.phone}
          />
          <Input
            onChangeText={(text) => setUserPass(text)}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <View style={{marginTop:-8}}>
            <Button title="Register" onPress={userregistor} />
          </View>
          

          <View style={{ 
              marginTop:-10,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
          <Text
            style={{ 
              color: COLORS.black, 
              fontWeight: 'bold', 
              // textAlign: 'center', 
              fontSize: 16,
            }}>Already have account?  
            </Text>

            <Text
            onPress={() => navigation.navigate('Sign In Page')}
            style={{ 
              color: COLORS.A_blue, 
              fontWeight: 'bold', 
              // textAlign: 'center', 
              fontSize: 16,
            }}> Login
            </Text>
          </View>
        </View>
    </SafeAreaView> 
    </ScrollView>
   
   );
};

const styles = StyleSheet.create({
    container: {
      height: "100%",
      flex: 1,
      backgroundColor: COLORS.A_white
    },
    contentContainer:{
        paddingTop: 50, 
        paddingHorizontal: 20
        
    },
    textBody:{
        color: COLORS.black, 
        fontSize: 40, 
        fontWeight: 'bold'
    },

});
export default RegistorPage;