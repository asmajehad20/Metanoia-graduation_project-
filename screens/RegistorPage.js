import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
 
} from 'react-native';
import COLORS from '../conts/colors'
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPage from './SignInPage';


const Stack = createNativeStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="StartingPage" component={StartingPage} />
          <Stack.Screen name="Sign In Page" component={SignInPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


const RegistorPage = ({navigation}) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
      });
      const [errors, setErrors] = React.useState({});
      const [loading, setLoading] = React.useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
    
        if (!inputs.email) {
          handleError('Please input email', 'email');
          isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
          handleError('Please input a valid email', 'email');
          isValid = false;
        }
    
        if (!inputs.fullname) {
          handleError('Please input fullname', 'fullname');
          isValid = false;
        }
    
        if (!inputs.phone) {
          handleError('Please input phone number', 'phone');
          isValid = false;
        }
    
        if (!inputs.password) {
          handleError('Please input password', 'password');
          isValid = false;
        } else if (inputs.password.length < 5) {
          handleError('Min password length of 5', 'password');
          isValid = false;
        }
    
        if (isValid) {
          register();
        }
      };

      const register = () => {
        setLoading(true);
        setTimeout(() => {
          try {
            setLoading(false);
            AsyncStorage.setItem('userData', JSON.stringify(inputs));
            navigation.navigate('Sign In Page');
          } catch (error) {
            Alert.alert('Error', 'Something went wrong');
          }
        }, 3000);
      };
    
      const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
      };
      const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };

    return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
    {/* style={{backgroundColor: COLORS.white, }} */}
    <ScrollView  style={styles.contentContainer}>
        <Text style= {styles.textBody}>Register</Text> 
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text>
        <View style={{marginVertical: 20}}>
        <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
           error={errors.phone}
          />
            <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('Sign In Page')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ?Login
          </Text>
        </View>
    </ScrollView>
    </SafeAreaView> 
   
   );
};

const styles = StyleSheet.create({
    container: {
      height: "100%",
      flex: 1,
      backgroundColor: COLORS.white
    },
    contentContainer:{
        paddingTop: 50, 
        paddingHorizontal: 20
        
    },
    textBody:{
        color: COLORS.black, 
        fontSize: 40, 
        fontWeight: 'bold'

    }

});
export default RegistorPage;