
import { createDrawerNavigator } from '@react-navigation/drawer';

import SchedulePage from '../screens/SchedulePage';
import ProfilePage from '../screens/ProfilePage';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './mainNavigation';

const Drawer = createDrawerNavigator();

export default function SideNavigation() {
  return (
      <Drawer.Navigator screenOptions={{headerShown:false}}>
        <Drawer.Screen name="main Page" component={MainNavigation} />
        <Drawer.Screen name="SchedulePage" component={SchedulePage} />
        <Drawer.Screen name="ProfilePage" component={ProfilePage} />
      </Drawer.Navigator>
  );
}