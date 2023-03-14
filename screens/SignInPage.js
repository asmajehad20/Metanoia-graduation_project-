import {ScrollView, View, Text, SafeAreaView , StyleSheet, TextInput} from 'react-native';
import React from 'react';

import COLORS from '../conts/colors'
import Button from '../components/Button';
import Input from '../components/Input';

const SignInPage = ({navigation}) => {
    const [username, setUserName] = React.useState('');
    const [password, setUaerPass] = React.useState('');

    ///////////////////////////////////////////////////////////////////////////
    const [errors, setErrors] = React.useState({});


    const handleError = (error, input) => {
      setErrors(prevState => ({...prevState, [input]: error}));
    };
    /////////////////////////////////////////////////////////////////////////////////////

    const userLogin = () =>{
      fetch("http://10.0.2.2:3000/signin", {
        method: "post", 
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      })
      .then(res=>res)
      
      .then(data =>{
        console.log(data.status)
        if(data.status === 200) 
           canAccess();
      } )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
      });
    }

    const canAccess = () => {
      navigation.navigate('Schedule Page')
    }
   
    return (
      <ScrollView  style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>
          
          <View style={{marginLeft: 10, marginTop: 8}}>
            <Text style= {styles.textBody}>Sign in</Text> 
            <Text style={{color: COLORS.A_gray, fontSize: 16, marginBottom: 7}}>Welcom Back ^-^</Text>
          </View>

          <View style={{marginVertical: 15}}>
            <Input
              onChangeText={(text) => setUserName(text)}
              onFocus={() => handleError(null, 'username')}
              iconName="account-outline"
              label="Username"
              placeholder="Enter your username"
              error={errors.username}
            />

            <Input
              onChangeText={(text) => setUaerPass(text)}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />

            <View style={{marginTop:-8}}>
              <Button title="Sign in" onPress={userLogin} />
              {/* <Button title="Sign in" onPress={()=> navigation.navigate('Schedule Page')}/> */}
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
            }}>Don't have account?  
            </Text>

            <Text
            onPress={() => navigation.navigate('Register Page')}
            style={{ 
              color: COLORS.A_blue, 
              fontWeight: 'bold', 
              // textAlign: 'center', 
              fontSize: 16,
            }}> Create one 
            </Text>
          </View>


          </View>

        </SafeAreaView>
      </ScrollView>

    )
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
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
  export default SignInPage;