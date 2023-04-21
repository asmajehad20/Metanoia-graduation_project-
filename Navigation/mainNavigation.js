import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import SchedulePage from "../screens/SchedulePage";
import CalenderPage from "../screens/CalenderPage";
// import ProfilePage from "../screens/ProfilePage";
import CommunityPage from "../screens/CommunityPage";
import NotificationPage from "../screens/NotificationPage";
import DailyPage from "../screens/DailyPage";
import COLORS from "../conts/colors";
import ProfilePage from "../screens/ProfilePage";



const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator 
        screenOptions={
            ({ route }) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown:false,
        tabBarStyle: { 
            borderRadius: 15,
            height: 65,
            width:'95%',
            // justifyContent:'center',
            alignSelf:'center',
            backgroundColor:COLORS.A_dark_blue,
            marginBottom:5,
        },
        tabBarIcon: () => {
            // let iconName;

            switch (route.name) {
                case 'Daily':
                    return <Ionicons name="book" size={24} color="white" />
                case 'Schedule':
                    return <FontAwesome name="table" size={24} color="white" />
                case 'Community':
                    return <Ionicons name="md-people" size={24} color="white" />
                case 'Calender':
                    return <Entypo name="calendar" size={24} color="white" />
                // case 'Notification':
                //     return <Ionicons name="notifications" size={24} color="white" />
                case 'Profile':
                     return <Ionicons name="ios-person-circle-outline" size={28} color="white" />
                    // return <Ionicons name="person-circle-outline" size={28} color="white" />

                default:
                    break;
            }
            
        },
    })}>
        <Tab.Screen name="Daily" component={DailyPage} />
        <Tab.Screen name="Calender" component={CalenderPage} />
        <Tab.Screen name="Community" component={CommunityPage} />
        {/* <Tab.Screen name="Notification" component={NotificationPage} /> */}
        <Tab.Screen name="Schedule" component={SchedulePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
        

    </Tab.Navigator>
  );
}

export default MainNavigation;