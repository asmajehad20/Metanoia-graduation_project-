// import {ScrollView, SafeAreaView, View, Text , StyleSheet,Image} from 'react-native';
// import React from 'react';
// // import { StatusBar } from 'expo-status-bar';

// //moving from page to page
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignInPage from './SignInPage';
// import RegisterPage from './RegisterPage';
// import SchedulePage from './SchedulePage';
// import COLORS from '../conts/colors'
// import Button from '../components/Button';
// import MainNavigation from '../Navigation/mainNavigation';
// import Dragtry from './dragtry';
// import SideNavigation from '../Navigation/sideNavigation';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import ProfilePage from './ProfilePage';
// import Bookmarks from '../screens/Bookmarks';
// import AllProjects from '../screens/AllProjects';
// import Project from '../screens/Project';
// import RecentlyViewed from '../screens/RecentlyViewed';
// import SearchPage from '../screens/SearchPage';

// import TaskPage from './TaskPage';
// import CommentPage from './CommentPage';

// import AllChatsPage from './AllChatsPage';
// import OneChatPage from './OneChatPage';
// // import OthersProfile from '..screens/OthersProfile';
// // import OthersProfile from './OthersProfile';


// const Stack = createNativeStackNavigator();

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// function App22() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{headerShown:false}}>

//         <Stack.Screen name="side Page" component={SideNavigation} />
//           {/* <Stack.Screen name="StartingPage" component={StartingPage} />
//           <Stack.Screen name="Sign In Page" component={SignInPage} />
//           <Stack.Screen name="Register Page" component={RegisterPage} /> */}
          
//           <Stack.Screen name="Projects" component={AllProjects} />
//           <Stack.Screen name="Comment Page" component={CommentPage} />
          
//           <Stack.Screen name="the Project" component={Project} />
//           <Stack.Screen name="Bookmarks" component={Bookmarks} />
//           <Stack.Screen name="taskpage" component={TaskPage} />
//           <Stack.Screen name="Recently Opened" component={RecentlyViewed} />

//           {/* <Stack.Screen name="OthersProfile" component={OthersProfile} /> */}
//           <Stack.Screen name="Search Page" component={SearchPage} />
          
//           <Stack.Screen name="all chats Page" component={AllChatsPage} />
//           <Stack.Screen name="one chat Page" component={OneChatPage} />
          
//           <Stack.Screen name="side Page" component={SideNavigation} />

//         </Stack.Navigator>

        

//       </NavigationContainer>
//     );
//   }
//   export default App22;