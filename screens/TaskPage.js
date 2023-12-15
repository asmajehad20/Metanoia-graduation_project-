
import {Keyboard, View, Text, TouchableWithoutFeedback, Dimensions, FlatList, Image, ScrollView, TouchableOpacity,SafeAreaView, Modal, TextInput, Alert, StyleSheet, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import COLORS from '../conts/colors';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import { Divider } from '@rneui/base';
import {userr, pass, id, username} from '../user'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ip } from '../getIP';
import { Octicons } from '@expo/vector-icons';


const TaskPage = ({navigation, route}) => {
  const {item} = route.params;
  // const {taskItem} = route.params;
  
  

  var p 
  var c
  if(item.priority == '5'){
    p = 'Very Important'
    c = '#E60026'
    // setPriority('Very Important')
  }
  if(item.priority == '4'){
    p = 'Important'
    c = '#FFBF00'
    // setPriority('Important')
  }
  if(item.priority == '3'){
    p = 'Average'
    c = '#555'
    // setPriority('Average')
  }
  if(item.priority == '2'){
    p = 'Slightly Important'
    c = '#00B9E8'
    // setPriority('Slightly Important')
  }
  if(item.priority == '1'){
    p = 'Not Important'
    c = '#007FFF'
    // setPriority('Not Important')
  }

  //title
  const [showtitle, setShowTitle] = useState(true)
  const [tasktitle, setTaskTitle] = useState(item.title)

  const [Description, setDescription] = useState(item.task_body)

  const [edit, setEdit] = useState(false)
  const [showSave, setShowSave] = useState(false)
  // const [showCancel, setShowCancel] = useState(false)

  //setdeadline
  const [revealedTime, setRevealedTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState(item.due_date);

  //set alarm
  const [revealedAlarm, setRevealedAlarm] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState(item.alarm);

  //set subject
  const [revealedSubject, setRevealedSubject] = useState(false);
  const [subject, setSubject] = useState(item.subject);


  //set priority
  const [priority, setPriority] = useState(p);
  
  
  const [revealedAlert, setRevealedAlert] = useState(false);
  const [colorr, setcolor] = useState(c)

  /////////////////////////////////////////////////////////////////
  const SaveChange = async()=>{

    //send data to database
    try{
    await fetch("http://"+ip+":3000/updateTask", {
      method: "post", 
      headers:{ "Content-Type": "application/json", },
      body: JSON.stringify({
        "title": tasktitle,
        "taskSubject": subject,
        "Description": Description,
        "taskpriority": priority,
        "due": selectedDate+' '+item.dueTime,
        "remind": selectedAlarm+' '+'',
        "task_id":item.task_id,
      })
    })
    
  }catch(error){}
    //////////////////////////////////

  }

  const deleteTask = async()=>{

    //send data to database
    try{
    await fetch("http://"+ip+":3000/deletetask", {
      method: "post", 
      headers:{ "Content-Type": "application/json", },
      body: JSON.stringify({
        "task_id": item.task_id,
      })
    })
    .then(res=>res)
    .then(async data =>{
      if(data.status == 200){
        navigation.goBack()
      }
    })
    .catch(function(error) {
    });
  }catch(error){}
    //////////////////////////////////

  }
  /////////////////////////////////////////////////////////////////

  // console.log(item)
  var color = 'blue'

  return (  
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={{alignSelf:'center', marginTop:50, marginBottom:15,  width:'100%', flexDirection:'row'}}>

          {(item.category == 'task' || item.category == 'none') && 
            <Image
              source={require('../assets/task_50_white.png')} 
              style={{width:40, height:40, marginStart:5, marginTop:-5}}
            />
          }

          {(item.category == 'exam' || item.category == 'quiz') && 
            <Image
              source={require('../assets/exam_50_white.png')} 
              style={{width:40, height:40, marginStart:5, marginTop:-5}}
            />
          }
          
          {(item.category == 'lecture') && 
            <Image
              source={require('../assets/lec_50_white.png')} 
              style={{width:40, height:40, marginStart:5, marginTop:-5}}
            />
          }

          
          {(item.category == 'homework' || item.category == 'project') && 
            <Image
              source={require('../assets/hw_50_white.png')} 
              style={{width:40, height:40, marginStart:5, marginTop:-5}}
            />
          }
          
          <TouchableOpacity onPress={()=>{if(item.fromE !='yes'){setShowTitle(false)}}}>

            {showtitle && <Text style={{color:'white', fontSize:25, marginStart:5}}>{item.title}</Text>}
            {(!showtitle && item.fromE !='yes')&& 
              <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1}>
                <TextInput
                  autoCorrect={false} 
                  
                  style={{ 
                    width:width-170, 
                    height: 40, 
                    marginTop:-3,
                    alignSelf:'center',
                    color:'white',
                    fontSize:24, 
                    textAlignVertical:'center',
                    paddingHorizontal: 5,
                    borderBottomColor:'white',
                    borderBottomWidth:0.5
                  }}

                  onChangeText={text => {setTaskTitle(text), setShowSave(true)}}
                  value={tasktitle}
                />
              </KeyboardAvoidingView>
            }
          </TouchableOpacity>

        </View>

        {(showSave) && <AntDesign name="save" size={30} color="white" style={{position:'absolute' ,marginTop:75, right:60}} onPress={()=>{SaveChange()}}/>}
        <AntDesign name="right" size={28} color="#fff" style={{position:'absolute' ,marginTop:78, right:20}} onPress={()=> {navigation.goBack()}}/>

        
        {/* ///////////////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////// */}
        
        <View style={{height:height-160, width:'112%', marginTop:0, backgroundColor:COLORS.A_white, alignSelf:'center', borderTopEndRadius:35, borderTopStartRadius:35, borderTopColor:{color}, borderWidth:0.5}}>
          <ScrollView style={{ margin:10}}>

              {/* //////////////////////////////////////////////////////////////////////////////////////// */}
              {(item.fromE != 'yes') &&
              <TouchableOpacity 
                style={{flexDirection:'row', position:'absolute', right:15, top:2, marginBottom:10}}
                onPress={()=>{deleteTask()}}
              >
                <Text style={{fontSize:16}}>Delete task</Text>
                <MaterialCommunityIcons name="delete" size={24} color={COLORS.A_dark_blue} />
              </TouchableOpacity>}

               {/* /////////set priority */}
              <View style={{marginTop:25, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedAlert(prevState => !prevState)}>
                  <MaterialCommunityIcons name={revealedAlert ? "close" : "alert-circle-outline"} size={30} color={COLORS.A_dark_blue} />
                  {(item.priority != null && item.priority != '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500', color:colorr}}>{priority}</Text>}
                  {(item.priority == null || item.priority == '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500', color:colorr}}>Set Priority</Text>}
                </TouchableOpacity>
              </View>

              {revealedAlert &&
              <View style={{marginTop:10, alignSelf:'center', width:width-80, }}> 
                {/* <Text style={{fontSize:20, fontWeight:'600', marginBottom:15, marginStart:-5}}>Priority: </Text> */}
                
                <View style={{flexDirection:'row', justifyContent:'space-evenly', marginHorizontal:0}}>

                  <View style={{justifyContent:'center', backgroundColor:'#E60026', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity style={{}} onPress={()=>{setPriority('Very Important'), setcolor('#E60026'), setShowSave(true)}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#FFBF00', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Important'), setcolor('#FFBF00'), setShowSave(true)}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#BEBFC5', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Average'), setcolor('#555'), setShowSave(true)}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#00B9E8', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Slightly Important'), setcolor('#00B9E8'), setShowSave(true)}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#007FFF', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Not Important'), setcolor('#007FFF'), setShowSave(true)}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider width={1} orientation='vertical' style={{marginTop:15, marginBottom:0, marginHorizontal:10}}/>
              </View>}

              {/* ////////////////set deadine */}
              <View style={{marginVertical:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {if(item.fromE !='yes'){setRevealedTime(prevState => !prevState)}}}>
                  <MaterialCommunityIcons name={revealedTime ? "close" : "clock-time-four-outline"} size={30} color={COLORS.A_dark_blue}  />
                  {( selectedDate != null && selectedDate != '' ) && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Due to :{selectedDate.split(' ')[0]} {(selectedDate.split(' ')[1]=='00:00'||selectedDate.split(' ')[1]==''||selectedDate.split(' ')[1]==null)? item.dueTime: selectedDate.split(' ')[1]}</Text>}
                  {( selectedDate == null || selectedDate == '' ) && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set Deadline</Text>}
                </TouchableOpacity>
              </View>

              {(revealedTime && item.fromE !='yes' )&& 
                <DatePicker 
                  options={{
                    backgroundColor: COLORS.A_white,
                    mainColor:COLORS.A_blue,
                  }}

                  selected = {selectedDate}
                  minuteInterval={2}
                  onSelectedChange={date => {setSelectedDate(date), setShowSave(true)}}
                />}


              {/* * /////set reminder/////// */}
              <View style={{marginBottom:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedAlarm(prevState => !prevState)}>
                  <MaterialIcons name={revealedAlarm ? "close" : "alarm"} size={33} color={COLORS.A_dark_blue}  />
                  {/* <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set remainder</Text> */}
                  {( selectedAlarm != null && selectedAlarm != '' ) && 
                    <View style={{flexDirection:'row'}}>
                      <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>{selectedAlarm}</Text>
                      <TouchableOpacity 
                        style={{alignSelf:'center', right:-100}} 
                        onPress={()=>{setSelectedAlarm(''), setRevealedAlarm(false)}}>
                          <Text style={{fontSize:14}}>Cancle</Text>
                      </TouchableOpacity>
                    </View>
                  }
                  {( selectedAlarm == null || selectedAlarm == '' ) && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set reminder</Text>}
                </TouchableOpacity>
              </View>

              {revealedAlarm && 
                <DatePicker 
                  options={{
                    backgroundColor: COLORS.A_white,
                    mainColor:COLORS.A_blue,
                  }}

                  selected = {selectedAlarm}
                  minuteInterval={2}
                  onSelectedChange={date => {setSelectedAlarm(date), setShowSave(true)}}
                />
              }

              
              
               {/* /////set subject///////////////////////////////////////////////////// */}
               <View style={{marginBottom:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {if(item.fromE !='yes'){setRevealedSubject(prevState => !prevState)}}}>
                  <MaterialIcons name={revealedSubject ? "close" : "menu-book"} size={33} color={COLORS.A_dark_blue}  />
                  {/* <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set remainder</Text> */}
                  {( subject != null && subject != '' ) && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>{subject}</Text>}
                  {( subject == null || subject == '' ) && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set Subject</Text>}
                </TouchableOpacity>
              </View>

              {(revealedSubject && item.fromE !='yes' )&& 
                <TextInput
                  autoCorrect={false} 
                  // placeholder='Title'
                  // placeholderTextColor={'#666'}
                  style={{ 
                    width:width-60, 
                    height: 35, 
                    marginTop:-3,
                    alignSelf:'center',
                    backgroundColor: '#ebecf0',//'#c8dfea'//too dark,
                    // flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor:COLORS.A_blue,
                  }}

                  onChangeText={text => {setSubject(text), setShowSave(true)}}
                  value={subject}
                />
              }

              
               {/* ////////////////////////////////////////////////////////// */}
               {/* ////////////////////////////////////////////////////////// */}
               {/* ////////////////////////////////////////////////////////// */}

              <Divider width={1} orientation='vertical' style={{marginTop:15, marginBottom:0, marginHorizontal:20}}/>
               {/* ////////////////////////////////////////////////////////// */}
               {/* ////////////////////////////////////////////////////////// */}
              {/* * /////description/////// */}
              <View style={{ marginTop:20, marginBottom:5, alignSelf:'center', width:'85%', justifyContent:'space-between', flexDirection:'row'}}> 
                <Text style={{fontSize:22, fontWeight:'600'}}>Description: </Text>
                {(!edit && item.fromE !='yes' )&& <AntDesign name="edit" size={26} color="#444" style={{marginTop:2}} onPress={()=>{setEdit(true), setShowSave(true)}}/>}
                {(edit && item.fromE !='yes' )&& <AntDesign name="closesquareo" size={26} color="black" onPress={()=>{setEdit(false), setShowSave(false)}}/>}
              </View>
              

              <View style={{ alignSelf: 'center', paddingHorizontal:25, paddingTop:5, width:'95%' , minHeight:height-460, }}>
                {(!edit )&& <Text style={{ fontSize:17}}>{item.task_body}</Text>}
                {(edit && item.fromE !='yes') &&
                <TextInput
                  // disableFullscreenUI={true}
                  editable
                  multiline
                  numberOfLines={15}
                  // maxLength={40}
                  autoCorrect={false}

                  style={{
                    backgroundColor: '#ebecf0',//'#c8dfea'//too dark,
                    borderWidth: 0.5,
                    width:width-65,
                    borderRadius: 5,
                    alignSelf:'center',
                    textAlignVertical:'top',
                    paddingVertical:5,
                    borderColor:COLORS.A_blue,
                    paddingHorizontal: 10,
                    marginBottom:300,
                    flex:1
                  }}
                  
                  onChangeText={setDescription}
                  value={Description}
                  // defaultValue={item.task_body}
                />}
              </View>

          </ScrollView>
        </View>

      </SafeAreaView>
    </View>
  );
}

export default TaskPage

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
    contentContainer:{
      flex:1,
      paddingTop: 25, 
      paddingHorizontal: 20,
    },

    container: {
      height: "100%",
      flex: 1,
      backgroundColor: COLORS.A_dark_blue,
    },

    image: {
      width: 90,
      height: 90,
      // padding:10,
      marginTop:5,
      marginLeft:-15
      // marginRight:15,
      // marginLeft:-10
    },

    logo:{
      flexDirection: 'row',
      marginBottom:-10,
    },

  });
