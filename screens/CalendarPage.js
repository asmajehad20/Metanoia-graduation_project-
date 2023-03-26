import React, { useState, PureComponent,Dimensions } from 'react';
import { View, TouchableOpacity, Text, VirtualizedList,SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';




const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Item = ({ item }) => {
  return (
    <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
      <Card>
        <Card.Content>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{item.name}</Text>
          </View> */}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const CalendarPage = ({navigation}) => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <SafeAreaView  style={{ flex: 1, marginTop: 25}}>
      <Agenda  items={items} loadItemsForMonth={loadItems}
      selected={'2023-01-1'}>
        {/* {(data) => (
          <VirtualizedList
            // data={data}
            // getItemCount={getItemCount}
            // getItem={getItem}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )} */}
      </Agenda>
     
    </SafeAreaView>
  );
};

export default CalendarPage;