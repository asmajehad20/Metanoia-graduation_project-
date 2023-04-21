import React, { useState, PureComponent,Dimensions, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, Text, VirtualizedList, ScrollView, Button,SafeAreaView ,StyleSheet, Image} from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import COLORS from '../conts/colors';
import { registerTaskAsync } from 'expo-notifications';
import ClanderTask from '../components/ClanderTask';
// import { Divider } from '@rneui/base';
import { Divider } from 'react-native-paper';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

const CalendarPage = ({navigation}) => {
  const [selected, setSelected] = useState();

  //fetch data here
  const [fdata, setFdata] = useState([]);

  //if there is no data fetched
  //schedule data if user has no saved scedule
  const [data, setData]= useState([
    {day:"Sat", time:"8:00", subject:"java"},//0
    {day:"Sun", time:"8:00", subject:""},//1
    {day:"Mon", time:"8:00", subject:""},//2
    {day:"Tue", time:"8:00", subject:""},//3
    {day:"Wed", time:"8:00", subject:""},//4
    {day:"Thu", time:"8:00", subject:""},//5
    {day:"Fri", time:"8:00", subject:""},//6
    
    {day:"Sat", time:"8:30", subject:"java"},//7
    {day:"Sun", time:"8:30", subject:""},//8
    {day:"Mon", time:"8:30", subject:""},//9
    {day:"Tue", time:"8:30", subject:""},//10
    {day:"Wed", time:"8:30", subject:""},//11
    {day:"Thu", time:"8:30", subject:""},//12
    {day:"Fri", time:"8:30", subject:""},//13

    {day:"Sat", time:"9:00", subject:"java"},//14
    {day:"Sun", time:"9:00", subject:""},//15
    {day:"Mon", time:"9:00", subject:""},//16
    {day:"Tue", time:"9:00", subject:""},//17
    {day:"Wed", time:"9:00", subject:""},//18
    {day:"Thu", time:"9:00", subject:""},//19
    {day:"Fri", time:"9:00", subject:""},//20

    {day:"Sat", time:"9:30", subject:""},//21
    {day:"Sun", time:"9:30", subject:""},//22
    {day:"Mon", time:"9:30", subject:""},//23
    {day:"Tue", time:"9:30", subject:""},//24
    {day:"Wed", time:"9:30", subject:""},//25
    {day:"Thu", time:"9:30", subject:""},//26
    {day:"Fri", time:"9:30", subject:""},//27

    {day:"Sat", time:"10:00", subject:""},
    {day:"Sun", time:"10:00", subject:""},
    {day:"Mon", time:"10:00", subject:""},
    {day:"Tue", time:"10:00", subject:""},
    {day:"Wed", time:"10:00", subject:""},
    {day:"Thu", time:"10:00", subject:""},
    {day:"Fri", time:"10:00", subject:""},

    {day:"Sat", time:"10:30", subject:""},
    {day:"Sun", time:"10:30", subject:""},
    {day:"Mon", time:"10:30", subject:""},
    {day:"Tue", time:"10:30", subject:""},
    {day:"Wed", time:"10:30", subject:""},
    {day:"Thu", time:"10:30", subject:""},
    {day:"Fri", time:"10:30", subject:""},

    {day:"Sat", time:"11:00", subject:""},
    {day:"Sun", time:"11:00", subject:""},
    {day:"Mon", time:"11:00", subject:""},
    {day:"Tue", time:"11:00", subject:""},
    {day:"Wed", time:"11:00", subject:""},
    {day:"Thu", time:"11:00", subject:""},
    {day:"Fri", time:"11:00", subject:""},

    {day:"Sat", time:"11:30", subject:""},
    {day:"Sun", time:"11:30", subject:""},
    {day:"Mon", time:"11:30", subject:""},
    {day:"Tue", time:"11:30", subject:""},
    {day:"Wed", time:"11:30", subject:""},
    {day:"Thu", time:"11:30", subject:""},
    {day:"Fri", time:"11:30", subject:""},

    {day:"Sat", time:"12:00", subject:""},
    {day:"Sun", time:"12:00", subject:""}, 
    {day:"Mon", time:"12:00", subject:""},
    {day:"Tue", time:"12:00", subject:""},
    {day:"Wed", time:"12:00", subject:""},
    {day:"Thu", time:"12:00", subject:""},
    {day:"Fri", time:"12:00", subject:""},

    {day:"Sat", time:"12:30", subject:""},
    {day:"Sun", time:"12:30", subject:""},
    {day:"Son", time:"12:30", subject:""},
    {day:"Tue", time:"12:30", subject:""},
    {day:"Wed", time:"12:30", subject:""},
    {day:"Thu", time:"12:30", subject:""},
    {day:"Fri", time:"12:30", subject:""},

    {day:"Sat", time:"13:00", subject:""},
    {day:"Sun", time:"13:00", subject:""},
    {day:"Mon", time:"13:00", subject:""},
    {day:"Tue", time:"13:00", subject:""},
    {day:"Wed", time:"13:00", subject:""},
    {day:"Thu", time:"13:00", subject:""},
    {day:"Fri", time:"13:00", subject:""},

    {day:"Sat", time:"13:30", subject:""},
    {day:"Sun", time:"13:30", subject:""},
    {day:"Mon", time:"13:30", subject:""},
    {day:"Tue", time:"13:30", subject:""},
    {day:"Wed", time:"13:30", subject:""},
    {day:"Thu", time:"13:30", subject:""},
    {day:"Fri", time:"13:30", subject:""},

    {day:"Sat", time:"14:00", subject:""},
    {day:"Sun", time:"14:00", subject:""},
    {day:"Mon", time:"14:00", subject:""},
    {day:"Tue", time:"14:00", subject:""},
    {day:"Wed", time:"14:00", subject:""},
    {day:"Thu", time:"14:00", subject:""},
    {day:"Fri", time:"14:00", subject:""},

    {day:"Sat", time:"14:30", subject:""},
    {day:"Sun", time:"14:30", subject:""},
    {day:"Mon", time:"14:30", subject:""},
    {day:"Tue", time:"14:30", subject:""},
    {day:"Wed", time:"14:30", subject:""},
    {day:"Thu", time:"14:30", subject:""},
    {day:"Fri", time:"14:30", subject:""},

    {day:"Sat", time:"15:00", subject:""},
    {day:"Sun", time:"15:00", subject:""},
    {day:"Mon", time:"15:00", subject:""},
    {day:"Tue", time:"15:00", subject:""},
    {day:"Wed", time:"15:00", subject:""},
    {day:"Thu", time:"15:00", subject:""},
    {day:"Fri", time:"15:00", subject:""},

    {day:"Sat", time:"15:30", subject:""},
    {day:"Sun", time:"15:30", subject:""},
    {day:"Mon", time:"15:30", subject:""},
    {day:"Tue", time:"15:30", subject:""},
    {day:"Wed", time:"15:30", subject:""},
    {day:"Thu", time:"15:30", subject:""},
    {day:"Fri", time:"15:30", subject:""},

    {day:"Sat", time:"16:00", subject:""},
    {day:"Sun", time:"16:00", subject:""},
    {day:"Mon", time:"16:00", subject:""},
    {day:"Tue", time:"16:00", subject:""},
    {day:"Wed", time:"16:00", subject:""},
    {day:"Thu", time:"16:00", subject:""},
    {day:"Fri", time:"16:00", subject:""},

    {day:"Sat", time:"16:30", subject:""},
    {day:"Sun", time:"16:30", subject:""},
    {day:"Mon", time:"16:30", subject:""},
    {day:"Tue", time:"16:30", subject:""},
    {day:"Wed", time:"16:30", subject:""},
    {day:"Thu", time:"16:30", subject:""},
    {day:"Fri", time:"16:30", subject:""},

    {day:"Sat", time:"17:00", subject:""},
    {day:"Sun", time:"17:00", subject:""},
    {day:"Mon", time:"17:00", subject:""},
    {day:"Tue", time:"17:00", subject:""},
    {day:"Wed", time:"17:00", subject:""},
    {day:"Thu", time:"17:00", subject:""},
    {day:"Fri", time:"17:00", subject:""},

    {day:"Sat", time:"17:30", subject:""},
    {day:"Sun", time:"17:30", subject:""},
    {day:"Mon", time:"17:30", subject:""},
    {day:"Tue", time:"17:30", subject:""},
    {day:"Wed", time:"17:30", subject:""},
    {day:"Thu", time:"17:30", subject:""},
    {day:"Fri", time:"17:30", subject:""},

])

  useEffect(()=>{
    var date = moment().utcOffset('+05:30').format('YYYY-MM-DD');
    setSelected(date)
  },[])
  

  function CustomCalendar(props) {

    const marked = useMemo(() => ({
      [selected]: {
        customStyles: {
          container: {
            backgroundColor: COLORS.A_blue,
            borderRadius: 100,
          },
          text: {
            color: 'white',
          }
        }
      }
    }), [selected]);

    

    return (
      <Calendar
        // current= {todayy}
        markingType="custom"
        markedDates={marked}
        // selected = {marked}
        onDayPress={(day) => {
          setSelected(day.dateString);
          props.onDaySelect && props.onDaySelect(day);
        }}
        // {...props}
        style={{
          borderTopEndRadius:30,
          borderTopStartRadius:30,
          marginHorizontal:-20,
          marginBottom: 10,
          elevation: 5,
          // borderWidth: 2,
          // borderColor: 'rgba(100, 100, 100, 0.2)',
        }}
        theme={{
          calendarBackground:COLORS.A_dark_blue,//'#444',
          dayTextColor: '#fff',
          textDisabledColor: '#444',
          monthTextColor: 'white',//'#fff'
          todayTextColor: 'white',
          // dayTextColor: 'white',
        }}
      />
    );
  }

  console.log('selected day',selected)
  
  return (
    <ScrollView style={styles.container}>

    <SafeAreaView style={styles.contentContainer}>

      <View style={styles.logo}>
        <Image
          source={require('../assets/butterfly_104.png')} 
          style={styles.image}/>
          
        <View style={{alignSelf:'center', marginStart:-5}}>
          <Text style={{fontWeight:'700', fontSize:30}}>Calendar</Text> 
        </View>

        <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:18}} onPress={()=> navigation.openDrawer()}/>
        
      </View>

      {/* just padding */}
      {/* <View style={{height:10, width:'120%', backgroundColor:COLORS.A_dark_blue, marginStart:-20}}></View> */}
      
      <CustomCalendar/>

      {/* just padding */}
      <View style={{height:50, width:'120%', backgroundColor:COLORS.A_dark_blue, marginTop:-10, marginStart:-20}}></View>
      <View style={{backgroundColor:COLORS.A_white, marginHorizontal:-20, marginTop:-40, borderTopEndRadius:30, borderTopStartRadius:30}}>

      <View style={{height:40, justifyContent:'center',marginStart:20 }}>
        <Text style={{fontWeight:'700', fontSize:18, marginTop:10 }}>Tasks of {}</Text>
        {/* <Divider width={1} orientation='vertical'/> */}
        <Divider style={{backgroundColor:'#999', height:1, width:'93%', marginTop:3}} />
      </View>

      <View style={{marginTop:10, marginLeft:15,flex:1, flexDirection:'column', justifyContent:'center'}}>
        {/* when day clicked show tasks */}
        {fdata.length === 0 && (
        <ScrollView style={styles.taskContainer}>
          {/* <View style={styles.CalenderTask}><Text>task</Text></View> */}
          <ClanderTask />
        </ScrollView>
        )}
      
     
      {/* if no tasks avaliable show this */}
      {fdata.length !== 0 && (
        <ScrollView style={styles.taskContainer}></ScrollView>
      )}

      </View>
      </View>

    </SafeAreaView>
   </ScrollView> 

  );
};

export default CalendarPage;

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

    image: {
      width: 60,
      height: 60,
      marginRight:5,
      marginLeft:10
    },

    logo:{
      flexDirection: 'row',
      flex:1,
      backgroundColor:COLORS.A_white,
      marginHorizontal:-20,
      // marginStart:
      // marginTop:"60%"
    },

    taskContainer:{

      width:'100%',
      marginStart:-8,
      // backgroundColor:'red'
      // borderWidth: 2,
      // borderColor: 'rgba(100, 100, 100, 0.2)',
    },

    CalenderTask:{
      // flex:1,
      // flexDirection:'row',
      margin:4,
      height:40,
      width:360,
      backgroundColor:'red',
      borderRadius:8,
    },

  });