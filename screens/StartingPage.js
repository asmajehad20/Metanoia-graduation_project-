import {SafeAreaView, View, Text , StyleSheet, ImageBackground, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

//moving from page to page
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPage from './SignInPage';
import RegisterPage from './RegisterPage';

const Stack = createNativeStackNavigator();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="StartingPage" component={StartingPage} />
        <Stack.Screen name="Sign In Page" component={SignInPage} />
        <Stack.Screen name="Register Page" component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//quick look on how the first page looks
//two buttons sign in and register a photo and a logo
//may add sign in using email later
const StartingPage = ({ navigation }) => {

  return (
    <SafeAreaView>
    {/* just the status bar */}
      <View style={styles.status}></View>

      <ImageBackground style={styles.container}>
        <View style={{alignItems: 'center'}}>
          {/* sign in button */}
          <TouchableOpacity 
          onPress={()=> navigation.navigate('Sign In Page')}
          style={styles.signinButton}>
            <Text style={styles.text}> Sign in </Text>
          </TouchableOpacity>

          {/* register button */}
          <TouchableOpacity 
          onPress={()=> navigation.navigate('Register Page')}
          style={styles.registerButton}>
            <Text style={styles.text}> Register </Text>
          </TouchableOpacity>
        </View>
        
      </ImageBackground>

      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//styleing 
const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#ffe',
    },

    status: {
      backgroundColor: '#aced',
      height: 40,
    },

    signinButton: {
      // flex:0.15,
      backgroundColor: '#fc5c65',
      height: 70,
      width: '80%',
      marginTop:500,
      // alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },

    registerButton: {
      // flex:0.15,
      backgroundColor: '#fc5c65',
      height: 70,
      width: '80%',
      marginTop:20,
      // alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },

    text: {
      flex:1,//fill the button
      paddingVertical: 20,//center in the y axis
      textAlign: 'center',//center in the x axis
      fontSize: 20,
      fontWeight: 'bold',
      borderWidth: 4,
      borderColor: '#20232a',
      borderRadius: 6,//make the button less sharp
    },
  });

export default App;