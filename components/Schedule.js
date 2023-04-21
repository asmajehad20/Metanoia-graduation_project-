import { View, Text , StyleSheet,TouchableOpacity, ScrollView, FlatList, LogBox} from 'react-native';
import React, { Component, useEffect, useState }from 'react';
import COLORS from '../conts/colors';
import moment from 'moment';
import App2, {schedulePushNotification} from '../Notification';

const Schedule = ({chosenSubject}) =>{

  //calculate local time
  const [currentDate, setCurrentDate] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [min, setMin] = useState('');

  const [currentLecture, setCurrentLecture] = useState('');

  

  useEffect(() => {
    
    var date = moment().utcOffset('+03:00')
    var day = date.day()+2;
    var month = date.month()+1;//Current Month
    var year = date.year(); //Current Year
    var hours = date.hour() //Current Hours
    setHour(hours);
    var min = date.minute() //Current Minutes
    setMin(min);
    var sec = date.second() //Current Seconds

    var days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    setDay(dayName);
    
    setTimeout(() => {/////currentDate changes every 50 sec///
    setCurrentDate(
      day + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    );
    }, 50000);//////////////////

    // return () => clearTimeout(timer)
   
  },[currentDate]);//currentDate

  // console.log("day:", day , "hour:", hour , "min:", min)
  

  const notify = (subject)=>{
     schedulePushNotification('You have a lecture " '+ subject +' " now');
  }

  

  
  ////////////////////////////////////////////////////////////
  
  

///////////////////////////////////////////////////////////////////////////////
    //check if user has a saved scedule
    //if yes fetch data from back and change state "data"
    //if no show data as it is
    
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


    /////////////////////////////////////////////////////////
    
    useEffect(() => {

      data.map(obj => {
        if (obj.day === day.substring(0, 3) && hour == obj.time.split(":")[0]) {
          if(obj.subject !== ""){
            if(obj.subject !== currentLecture){
              setCurrentLecture(obj.subject)
              console.log("currentLecturesubject:",currentLecture)
              console.log("subject:")
              console.log("subject:",obj.subject)
              {notify(obj.subject)}
            }
            
            // console.log("subject:",currentLecture)
            
          }

            
        }
       
      });

    },[]);

    if(false){//(hour === 7 && min === 45){
      //loop on data if today === day then get the subject
      data.map(obj => {
        if (obj.day === day.substring(0, 3) && hour === obj.time.split(":")[0]) {
            

            // console.log(day.substring(0, 3), "bb", obj.day)
            console.log(hour+':'+min, "mmm", obj.time.split(":")[0])
            console.log(hour+":"+min)
          
        }
      });
  
      //if subject is null then nothing 
      //else notify
    }
    if(min <= 5 || min === 30){
  
    }
    // if(1){
    //   console.log("hi asma")
    // }
    /////////////////////////////////////////////////////////////
    //if user has a scedule change data state to fetched data

    ////////////////////////////////////////////////////////
    var sub = null;//to catch the subject selected from schedlue page
    
    if(chosenSubject.subject_name === undefined){
      //no subject is chosen yet
      sub = null;
    }
    else{
      sub = chosenSubject;
      // console.log("sub", sub)
    }
    
    // which day and time is chosen
    const dayClicked = (day, time, index) =>{
        console.log("day:", day , "time:", time , "index:", index)
        
        const newState = data.map(item => {

          if(sub !== null){
            if (item.day === day && item.time ===time) {
              item.subject = sub.subject_name
              sub = null
            }
          }
          
          return item;
        });
    
        setData(newState);
        sub = null
    }


    const display = (data) => {
      if(data.subject !== ""){
        return(
          <View style={styles.containerSubject}>
            <Text style={styles.text2}>{data.subject}</Text>
          </View>
          
        )
      }
      else{
        return(
          <Text style={styles.text2}></Text>
        )
      }
      
    }

    return(
        <ScrollView horizontal={true} >
            <View style={{flex:1}}>
            
            <View key={0} style={{flexDirection:'row'}}>
                      <View key={"00"} style={styles.containerDay}><Text style={styles.text}>__</Text></View>
                      <View key={"01"} style={styles.containerDay}><Text style={styles.text}>SAT</Text></View>
                      <View key={"02"} style={styles.containerDay}><Text style={styles.text}>SUN</Text></View>
                      <View key={"03"} style={styles.containerDay}><Text style={styles.text}>MON</Text></View>
                      <View key={"04"} style={styles.containerDay}><Text style={styles.text}>TUE</Text></View>
                      <View key={"05"} style={styles.containerDay}><Text style={styles.text}>WED</Text></View>
                      <View key={"06"} style={styles.containerDay}><Text style={styles.text}>THU</Text></View>
                      <View key={"07"} style={styles.containerDay}><Text style={styles.text}>FRI</Text></View>
                    </View>



                <ScrollView>

                    {/* 08:00 */}
                    <View key={"08:00"} style={{flexDirection:'row'}}>

                        <View key={"10"} style={styles.containerTime}><Text style={styles.text}>08:00</Text></View>
                        <TouchableOpacity onPress={()=>dayClicked("Sat", "8:00", 0)} key={"Sat_8:00"} style={styles.container}>{display(data[0])}</TouchableOpacity>
                        <TouchableOpacity onPress={()=>dayClicked("Sun", "8:00", 1)} key={"Sun_8:00"} style={styles.container}>{display(data[1])}</TouchableOpacity>
                        <TouchableOpacity onPress={()=>dayClicked("Mon", "8:00", 2)} key={"Mon_8:00"} style={styles.container}>{display(data[2])}</TouchableOpacity>
                        <TouchableOpacity onPress={()=>dayClicked("Tue", "8:00", 3)} key={"Tue_8:00"} style={styles.container}>{display(data[3])}</TouchableOpacity>
                        <TouchableOpacity onPress={()=>dayClicked("Wed", "8:00", 4)} key={"Wed_8:00"} style={styles.container}>{display(data[4])}</TouchableOpacity>
                        <TouchableOpacity onPress={()=>dayClicked("Thu", "8:00", 5)} key={"Thu_8:00"} style={styles.container}>{display(data[5])}</TouchableOpacity>
                        <TouchableOpacity onPress={()=>dayClicked("Fri", "8:00", 6)} key={"Fri_8:00"} style={styles.container}>{display(data[6])}</TouchableOpacity>
                    </View>
                    {/* onpress calculate the time and set should show to true */}
{/* 
                    {/* 08:30 */}
                    <View key={"08:30"} style={{flexDirection:'row'}}>

                      <View key={"11"} style={styles.containerTime}><Text style={styles.text}>08:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "8:30", 7)} key={"Sat_8:30"} style={styles.container}>{display(data[7])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "8:30", 8)} key={"Sun_8:30"} style={styles.container}>{display(data[8])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "8:30", 9)} key={"Mon_8:30"} style={styles.container}>{display(data[9])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "8:30", 10)} key={"Tue_8:30"} style={styles.container}>{display(data[10])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "8:30", 11)} key={"Wed_8:30"} style={styles.container}>{display(data[11])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "8:30", 12)} key={"Thu_8:30"} style={styles.container}>{display(data[12])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "8:30", 13)} key={"Fri_8:30"} style={styles.container}>{display(data[13])}</TouchableOpacity>
                    </View>

                    {/* 09:00 */}
                    <View key={"09:00"} style={{flexDirection:'row'}}>

                      <View key={"12"} style={styles.containerTime}><Text style={styles.text}>09:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "9:00", 14)} key={"Sat_9:00"} style={styles.container}>{display(data[14])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "9:00", 15)} key={"Sun_9:00"} style={styles.container}>{display(data[15])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "9:00", 16)} key={"Mon_9:00"} style={styles.container}>{display(data[16])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "9:00", 17)} key={"Tue_9:00"} style={styles.container}>{display(data[17])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "9:00", 18)} key={"Wed_9:00"} style={styles.container}>{display(data[18])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "9:00", 19)} key={"Thu_9:00"} style={styles.container}>{display(data[19])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "9:00", 20)} key={"Fri_9:00"} style={styles.container}>{display(data[20])}</TouchableOpacity>
                      
                    </View>

                    {/* 09:30 */}
                    <View key={"09:30"} style={{flexDirection:'row'}}>

                      <View key={"13"} style={styles.containerTime}><Text style={styles.text}>09:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "9:30", 21)} key={"Sat_9:30"} style={styles.container}>{display(data[21])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "9:30", 22)} key={"Sun_9:30"} style={styles.container}>{display(data[22])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "9:30", 23)} key={"Mon_9:30"} style={styles.container}>{display(data[23])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "9:30", 24)} key={"Tue_9:30"} style={styles.container}>{display(data[24])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "9:30", 25)} key={"Wed_9:30"} style={styles.container}>{display(data[25])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "9:30", 26)} key={"Thu_9:30"} style={styles.container}>{display(data[26])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "9:30", 27)} key={"Fri_9:30"} style={styles.container}>{display(data[27])}</TouchableOpacity>
                    </View>

                    {/* 10:00 */}
                    <View key={"10:00"} style={{flexDirection:'row'}}>

                      <View key={"14"} style={styles.containerTime}><Text style={styles.text}>10:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "10:00", 28)} key={"Sat_10:00"} style={styles.container}>{display(data[28])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "10:00", 29)} key={"Sun_10:00"} style={styles.container}>{display(data[29])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "10:00", 30)} key={"Mon_10:00"} style={styles.container}>{display(data[30])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "10:00", 31)} key={"Tue_10:00"} style={styles.container}>{display(data[31])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "10:00", 32)} key={"Wed_10:00"} style={styles.container}>{display(data[32])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "10:00", 33)} key={"Thu_10:00"} style={styles.container}>{display(data[33])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "10:00", 34)} key={"Fri_10:00"} style={styles.container}>{display(data[34])}</TouchableOpacity>
                    </View>

                    {/* 10:30 */}
                    <View key={"10:30"} style={{flexDirection:'row'}}>

                      <View key={"15"} style={styles.containerTime}><Text style={styles.text}>10:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "10:30", 35)} key={"Sat_10:30"} style={styles.container}>{display(data[35])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "10:30", 36)} key={"Sun_10:30"} style={styles.container}>{display(data[36])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "10:30", 37)} key={"Mon_10:30"} style={styles.container}>{display(data[37])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "10:30", 38)} key={"Tue_10:30"} style={styles.container}>{display(data[38])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "10:30", 39)} key={"Wed_10:30"} style={styles.container}>{display(data[39])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "10:30", 40)} key={"Thu_10:30"} style={styles.container}>{display(data[40])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "10:30", 41)} key={"Fri_10:30"} style={styles.container}>{display(data[41])}</TouchableOpacity>
                    </View> 

                    {/* 11:00 */}
                    <View key={"11:00"} style={{flexDirection:'row'}}>

                      <View key={"16"} style={styles.containerTime}><Text style={styles.text}>11:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "11:00", 42)} key={"Sat_11:00"} style={styles.container}>{display(data[42])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "11:00", 43)} key={"Sun_11:00"} style={styles.container}>{display(data[43])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "11:00", 44)} key={"Mon_11:00"} style={styles.container}>{display(data[44])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "11:00", 45)} key={"Tue_11:00"} style={styles.container}>{display(data[45])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "11:00", 46)} key={"Wed_11:00"} style={styles.container}>{display(data[46])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "11:00", 47)} key={"Thu_11:00"} style={styles.container}>{display(data[47])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "11:00", 48)} key={"Fri_11:00"} style={styles.container}>{display(data[48])}</TouchableOpacity>
                    </View> 

                    {/* 11:30 */}
                    <View key={"11:30"} style={{flexDirection:'row'}}>

                      <View key={"17"} style={styles.containerTime}><Text style={styles.text}>11:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "11:30", 49)} key={"Sat_11:30"} style={styles.container}>{display(data[49])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "11:30", 50)} key={"Sun_11:30"} style={styles.container}>{display(data[50])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "11:30", 51)} key={"Mon_11:30"} style={styles.container}>{display(data[51])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "11:30", 52)} key={"Tue_11:30"} style={styles.container}>{display(data[52])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "11:30", 53)} key={"Wed_11:30"} style={styles.container}>{display(data[53])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "11:30", 54)} key={"Thu_11:30"} style={styles.container}>{display(data[54])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "11:30", 55)} key={"Fri_11:30"} style={styles.container}>{display(data[55])}</TouchableOpacity>
                    </View> 

                    {/* 12:00 */}
                    <View key={"12:00"} style={{flexDirection:'row'}}>

                      <View key={"18"} style={styles.containerTime}><Text style={styles.text}>12:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "12:00", 56)} key={"Sat_12:00"} style={styles.container}>{display(data[56])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "12:00", 57)} key={"Sun_12:00"} style={styles.container}>{display(data[57])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "12:00", 58)} key={"Mon_12:00"} style={styles.container}>{display(data[58])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "12:00", 59)} key={"Tue_12:00"} style={styles.container}>{display(data[59])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "12:00", 60)} key={"Wed_12:00"} style={styles.container}>{display(data[60])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "12:00", 61)} key={"Thu_12:00"} style={styles.container}>{display(data[61])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "12:00", 62)} key={"Fri_12:00"} style={styles.container}>{display(data[62])}</TouchableOpacity>
                    </View>

                    {/* 12:30 */}
                    <View key={"12:30"} style={{flexDirection:'row'}}>

                      <View key={"19"} style={styles.containerTime}><Text style={styles.text}>12:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "12:30", 63)} key={"Sat_12:30"} style={styles.container}>{display(data[63])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "12:30", 64)} key={"Sun_12:30"} style={styles.container}>{display(data[64])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "12:30", 65)} key={"Mon_12:30"} style={styles.container}>{display(data[65])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "12:30", 66)} key={"Tue_12:30"} style={styles.container}>{display(data[66])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "12:30", 67)} key={"Wed_12:30"} style={styles.container}>{display(data[67])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "12:30", 68)} key={"Thu_12:30"} style={styles.container}>{display(data[68])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "12:30", 69)} key={"Fri_12:30"} style={styles.container}>{display(data[69])}</TouchableOpacity>
                    </View>

                    {/* 13:00 */}
                    <View key={"13:00"} style={{flexDirection:'row'}}>

                      <View key={"20"} style={styles.containerTime}><Text style={styles.text}>13:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "13:00", 70)} key={"Sat_13:00"} style={styles.container}>{display(data[70])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "13:00", 71)} key={"Sun_13:00"} style={styles.container}>{display(data[71])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "13:00", 72)} key={"Mon_13:00"} style={styles.container}>{display(data[72])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "13:00", 73)} key={"Tue_13:00"} style={styles.container}>{display(data[73])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "13:00", 74)} key={"Wed_13:00"} style={styles.container}>{display(data[74])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "13:00", 75)} key={"Thu_13:00"} style={styles.container}>{display(data[75])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "13:00", 76)} key={"Fri_13:00"} style={styles.container}>{display(data[76])}</TouchableOpacity>
                    </View>

                    {/* 13:30 */}
                    <View key={"13:30"} style={{flexDirection:'row'}}>

                      <View key={"21"} style={styles.containerTime}><Text style={styles.text}>13:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "13:30", 77)} key={"Sat_13:30"} style={styles.container}>{display(data[77])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "13:30", 78)} key={"Sun_13:30"} style={styles.container}>{display(data[78])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "13:30", 79)} key={"Mon_13:30"} style={styles.container}>{display(data[79])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "13:30", 80)} key={"Tue_13:30"} style={styles.container}>{display(data[80])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "13:30", 81)} key={"Wed_13:30"} style={styles.container}>{display(data[81])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "13:30", 82)} key={"Thu_13:30"} style={styles.container}>{display(data[82])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "13:30", 83)} key={"Fri_13:30"} style={styles.container}>{display(data[83])}</TouchableOpacity>
                    </View>

                    {/* 14:00 */}
                    <View key={"14:00"} style={{flexDirection:'row'}}>

                      <View key={"22"} style={styles.containerTime}><Text style={styles.text}>14:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "14:00", 84)} key={"Sat_14:00"} style={styles.container}>{display(data[84])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "14:00", 85)} key={"Sun_14:00"} style={styles.container}>{display(data[85])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "14:00", 86)} key={"Mon_14:00"} style={styles.container}>{display(data[86])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "14:00", 87)} key={"Tue_14:00"} style={styles.container}>{display(data[87])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "14:00", 88)} key={"Wed_14:00"} style={styles.container}>{display(data[88])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "14:00", 89)} key={"Thu_14:00"} style={styles.container}>{display(data[89])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "14:00", 90)} key={"Fri_14:00"} style={styles.container}>{display(data[90])}</TouchableOpacity>
                    </View>

                    {/* 14:30 */}
                    <View key={"14:30"} style={{flexDirection:'row'}}>

                      <View key={"23"} style={styles.containerTime}><Text style={styles.text}>14:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "14:30", 91)} key={"Sat_14:30"} style={styles.container}>{display(data[91])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "14:30", 92)} key={"Sun_14:30"} style={styles.container}>{display(data[92])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "14:30", 93)} key={"Mon_14:30"} style={styles.container}>{display(data[93])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "14:30", 94)} key={"Tue_14:30"} style={styles.container}>{display(data[94])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "14:30", 95)} key={"Wed_14:30"} style={styles.container}>{display(data[95])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "14:30", 96)} key={"Thu_14:30"} style={styles.container}>{display(data[96])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "14:30", 97)} key={"Fri_14:30"} style={styles.container}>{display(data[97])}</TouchableOpacity>
                    </View>

                    {/* 15:00 */}
                    <View key={"15:00"} style={{flexDirection:'row'}}>

                      <View key={"24"} style={styles.containerTime}><Text style={styles.text}>15:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "15:00", 98)} key={"Sat_15:00"} style={styles.container}>{display(data[98])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "15:00", 99)} key={"Sun_15:00"} style={styles.container}>{display(data[99])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "15:00", 100)} key={"Mon_15:00"} style={styles.container}>{display(data[100])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "15:00", 101)} key={"Tue_15:00"} style={styles.container}>{display(data[101])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "15:00", 102)} key={"Wed_15:00"} style={styles.container}>{display(data[102])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "15:00", 103)} key={"Thu_15:00"} style={styles.container}>{display(data[103])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "15:00", 104)} key={"Fri_15:00"} style={styles.container}>{display(data[104])}</TouchableOpacity>
                    </View>

                    {/* 15:30 */}
                    <View key={"15:30"} style={{flexDirection:'row'}}>

                      <View key={"25"} style={styles.containerTime}><Text style={styles.text}>15:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "15:30", 105)} key={"Sat_15:30"} style={styles.container}>{display(data[105])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "15:30", 106)} key={"Sun_15:30"} style={styles.container}>{display(data[106])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "15:30", 107)} key={"Mon_15:30"} style={styles.container}>{display(data[107])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "15:30", 108)} key={"Tue_15:30"} style={styles.container}>{display(data[108])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "15:30", 109)} key={"Wed_15:30"} style={styles.container}>{display(data[109])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "15:30", 110)} key={"Thu_15:30"} style={styles.container}>{display(data[110])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "15:30", 111)} key={"Fri_15:30"} style={styles.container}>{display(data[111])}</TouchableOpacity>
                    </View>

                    {/* 16:00 */}
                    <View key={"16:00"} style={{flexDirection:'row'}}>

                      <View key={"26"} style={styles.containerTime}><Text style={styles.text}>16:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "16:00", 112)} key={"Sat_16:00"} style={styles.container}>{display(data[112])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "16:00", 113)} key={"Sun_16:00"} style={styles.container}>{display(data[113])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "16:00", 114)} key={"Mon_16:00"} style={styles.container}>{display(data[114])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "16:00", 115)} key={"Tue_16:00"} style={styles.container}>{display(data[115])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "16:00", 116)} key={"Wed_16:00"} style={styles.container}>{display(data[116])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "16:00", 117)} key={"Thu_16:00"} style={styles.container}>{display(data[117])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "16:00", 118)} key={"Fri_16:00"} style={styles.container}>{display(data[118])}</TouchableOpacity>
                    </View>

                    {/* 16:30 */}
                    <View key={"16:30"} style={{flexDirection:'row'}}>

                      <View key={"27"} style={styles.containerTime}><Text style={styles.text}>16:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "16:30", 119)} key={"Sat_16:30"} style={styles.container}>{display(data[119])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "16:30", 120)} key={"Sun_16:30"} style={styles.container}>{display(data[120])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "16:30", 121)} key={"Mon_16:30"} style={styles.container}>{display(data[121])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "16:30", 122)} key={"Tue_16:30"} style={styles.container}>{display(data[122])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "16:30", 123)} key={"Wed_16:30"} style={styles.container}>{display(data[123])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "16:30", 124)} key={"Thu_16:30"} style={styles.container}>{display(data[124])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "16:30", 125)} key={"Fri_16:30"} style={styles.container}>{display(data[125])}</TouchableOpacity>
                    </View>

                    {/* 17:00 */}
                    <View key={"17:00"} style={{flexDirection:'row'}}>

                      <View key={"27"} style={styles.containerTime}><Text style={styles.text}>17:00</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "17:00", 126)} key={"Sat_17:00"} style={styles.container}>{display(data[126])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "17:00", 127)} key={"Sun_17:00"} style={styles.container}>{display(data[127])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "17:00", 128)} key={"Mon_17:00"} style={styles.container}>{display(data[128])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "17:00", 129)} key={"Tue_17:00"} style={styles.container}>{display(data[129])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "17:00", 130)} key={"Wed_17:00"} style={styles.container}>{display(data[130])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "17:00", 131)} key={"Thu_17:00"} style={styles.container}>{display(data[131])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "17:00", 132)} key={"Fri_17:00"} style={styles.container}>{display(data[132])}</TouchableOpacity>
                    </View>

                    {/* 17:30 */}
                    <View key={"17:30"} style={{flexDirection:'row'}}>

                      <View key={"28"} style={styles.containerTime}><Text style={styles.text}>17:30</Text></View>
                      <TouchableOpacity onPress={()=>dayClicked("Sat", "17:30", 133)} key={"Sat_17:30"} style={styles.container}>{display(data[133])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Sun", "17:30", 134)} key={"Sun_17:30"} style={styles.container}>{display(data[134])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Mon", "17:30", 135)} key={"Mon_17:30"} style={styles.container}>{display(data[135])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Tue", "17:30", 136)} key={"Tue_17:30"} style={styles.container}>{display(data[136])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Wed", "17:30", 137)} key={"Wed_17:30"} style={styles.container}>{display(data[137])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Thu", "17:30", 138)} key={"Thu_17:30"} style={styles.container}>{display(data[138])}</TouchableOpacity>
                      <TouchableOpacity onPress={()=>dayClicked("Fri", "17:30", 139)} key={"Fri_17:30"} style={styles.container}>{display(data[139])}</TouchableOpacity>
                    </View>

                    
{/*/////////////////////////////////////////////////////////////////////////////////////////////// */}
                    
                    
                </ScrollView>
                </View>
            </ScrollView>
        
    );

};
export default Schedule;

//styleing 
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#ddd",
        height:80, 
        width:70, 
        marginTop:5, 
        marginLeft:5, 
        borderRadius:18
    },

    containerSubject:{
      flex:1,
      backgroundColor:"yellow",
      height:80, 
      width:70, 
      borderRadius:18
  },

    containerTime:{
        backgroundColor:COLORS.A_dark_blue,
        height:80, 
        width:70, 
        marginTop:5, 
        marginLeft:5, 
        borderRadius:18
    },

    containerDay:{
        backgroundColor:COLORS.A_dark_blue,
        height:80, 
        width:70, 
        marginTop:6, 
        marginBottom:3,
        marginLeft:5, 
        borderRadius:18,
        borderWidth:0.8,
        borderColor:"#bbb"
    },

    text:{
        fontSize:17,
        color:"white",
        textAlign: 'center',
        marginVertical:"40%"
    },

    text2:{
      fontSize:17,
      color:"black",
      textAlign: 'center',
      marginVertical:"40%"
  },
    
  });



