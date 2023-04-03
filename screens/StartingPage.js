import {ScrollView, SafeAreaView, View, Text , StyleSheet,Image,TouchableOpacity} from 'react-native';
import React from 'react';
// import { StatusBar } from 'expo-status-bar';

//moving from page to page
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import SignInPage from './SignInPage';
import RegistorPage from './RegistorPage';
import SchedulePage from './SchedulePage';
import CalendarPage from './CalendarPage';
import DailyPage from './DailyPage';
import COLORS from '../conts/colors'
import Button from '../components/Button';

function Tasks() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tasks</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>John Doe</Text>
            <Text>example@email.com</Text>
          </View>
          {/* <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          /> */}
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={DailyPage} name='Daily Page' />
      <Drawer.Screen component={Tasks} name='Tasks' />
    </Drawer.Navigator>
  );
};

function DrawerRouts() {
  return (
    <NavigationContainer>
     
     <DrawerNavigator />
     
    </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="StartingPage" component={StartingPage} />
          <Stack.Screen name="Sign In Page" component={SignInPage} />
          <Stack.Screen name="Registor Page" component={RegistorPage} />
          <Stack.Screen name="Schedule Page" component={SchedulePage} />
          <Stack.Screen name="Daily Page" component={DrawerRouts} />
        </Stack.Navigator>
       
      </NavigationContainer>
    );
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//quick look on how the first page looks
//two buttons sign in and register a photo and a logo
const StartingPage = ({ navigation }) => {
  
    return (
      <ScrollView style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>
      {/* just the status bar */}
        {/* <View style={styles.status}></View> */}
        
        {/* style={{justifyContent: 'center'}} */}
        <View >
          <View style={styles.tryto}>
            <View style={styles.logo}>
              <Image
                source={require('../assets/butterfly_104.png')} 
                style={styles.image}/>
                
              <View style={{alignSelf:'center', marginStart:-5}}>
                <Text style={{fontWeight:'bold', fontSize:40}}>Metanoia</Text> 
                <Text style={{ fontSize:18, marginTop:-10}}>One day at a time </Text> 
              </View>
            </View>

            <View>
              <Button 
                title="Sign in" 
                onPress={()=> navigation.navigate('Sign In Page')}  /> 
            </View>

            <View style={styles.registerButton}>
              <Button 
                title="Register" 
                onPress={()=> navigation.navigate('Registor Page')}/>
            </View>
            <View style={styles.calendarButton}>
              <Button 
                title="Daily" 
                onPress={()=> navigation.navigate('Daily Page')}/>
            </View>

          </View>
        </View>
  
        {/* <StatusBar style="auto" /> */}
      </SafeAreaView>
      </ScrollView>
    )
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
      contentContainer:{
        paddingTop: 50, 
        paddingHorizontal: 20,
      },

      container: {
        height: "100%",
        flex: 1,
        backgroundColor: COLORS.A_white,
      },
  
      registerButton: {
        marginTop:-30,
      },
      calendarButton:{
        marginTop:-30,

      },
  
      image: {
        width: 110,
        height: 110,
        marginStart:10,
      },

      logo:{
        flexDirection: 'row',
      },

      tryto:{
        marginTop:"60%"
      },
    });
  
  export default App ;