import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App2() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      
    };
    
  }, []);

  // const [data, setdata] = useState('asma im trying over all')
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       alignItems: 'center',
  //       justifyContent: 'space-around',
  //     }}>
  //   {/* //   <Text>Your expo push token: {expoPushToken}</Text>
  //   //   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
  //   //     <Text>Title: {notification && notification.request.content.title} </Text>
  //   //     <Text>Body: {notification && notification.request.content.body}</Text>
  //   //     <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
  //     </View> */}
  //     <Button
  //       title="Press to schedule a notification"
  //       onPress={async () => {
  //         await schedulePushNotification(data);
  //       }}
  //     />
  //    </View>
  // );
}

  export async function schedulePushNotification(data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "metanoia",
      body: data,//'Here is the notification body',
      // data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  return token;
}