import {ScrollView, SafeAreaView,TouchableOpacity,Keyboard, Modal, KeyboardAvoidingView, TextInput, Dimensions, View, Button, Text ,StyleSheet, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../conts/colors'
import { Divider } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {userr, pass, id, username, bio, user_email, user_phone, user_photo} from '../user'
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import moment from 'moment';
import Percentage from '../components/Percentage';
import CalendarStrip,{getSelectedDate,} from 'react-native-calendar-strip';
import DatePicker from 'react-native-modern-datepicker';
import { ip } from '../getIP';

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
var today = moment().format('YYYY-MM-DD')
var time =''
const Project = ({navigation, route}) => {
  const [ updatee, setupdate] = useState(false)

  const {item} = route.params;
  // console.log(item)
  useEffect(()=>{
    try{
      fetch("http://"+ip+":3000/addView", {
       method: "post", 
       headers:{ "Content-Type": "application/json", },
       body: JSON.stringify({
         "item": item,
         "today":today
       })
     })
     .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
        //  setupdate(prevState => !prevState)
        }
      })

     
   }catch(error){}
  },[])


  // console.log(item)
  const goToChat=(email)=>{
    if(email != '' && email != null)
    navigation.navigate('one chat Page',{email})
  }

  const [tasks, setTasks] = useState([])

  // useEffect(() => {
  //   try{
  //      fetch("http://"+ip+":3000/tasks2")
  //     .then((resp) => resp.json())
  //     .then((json) => {setTasks(json)})
  //     .catch(function(error) {})
  //   }catch (error){
  //      console.log('error')
  //    }

  // },[])
  
  // const [selectedId, setSelectedId] = useState([])

  const [showSave, setShowSave] = useState(false)

  const [showDetails, setShowDetails] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  const [addToStar, setAddToStar] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  //in add people
  const [people, setPeople] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState('')

  const [editGoal, setEditGoal] = useState('')
  const [newGoal, setNewGoal] = useState(item.goal)

  //team members interactions 
  const [modalVisible2, setModalVisible2] = useState(false);
  const [profile2, setProfile2] = useState('')

  

  //this state will only have the project with the same team id
  const [projects, setProjects]= useState([])

  const [USERS, setUser] = useState([])

  useEffect(()=>{

    try{
       fetch("http://"+ip+":3000/users")
      .then((resp) => resp.json())
      .then((json) => {setUser(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
       fetch("http://"+ip+":3000/ProjectForTeam/"+item.team_id)
      .then((resp) => resp.json())
      .then((json) => {setProjects(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/tasks2")
     .then((resp) => resp.json())
     .then((json) => {setTasks(json)})
     .catch(function(error) {})
   }catch (error){
      // console.log('error')
    }
  },[updatee])

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const [value, setValue] = useState(today);
  //add task page
  const [modalVisible3, setModalVisible3] = useState(false);
  //tasks info
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [Description, setDescription] = useState('');

  //set priority
  const [priority, setPriority] = useState('');
  const [revealedAlert, setRevealedAlert] = useState(false);
  
  //set Due Date
  const [Due, setDue] = useState('')
  const [selectedDate, setSelectedDate] = useState(value);
  const [revealedTime, setRevealedTime] = useState(false);

  //set category
  const [Category, setCategory] = useState('');
  const [revealedCat, setRevealedCat] = useState(false);

  //set reminder
  const [remind, setremind] = useState('')
  const [selectedReminder, setSelectedReminder] = useState(value);
  const [revealedAlarm, setRevealedAlarm] = useState(false);

  const [color, setcolor] = useState('black')

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* close add task page*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const CloseAddTaskPage = async()=>{
    setTaskTitle('')
    setTaskSubject('')
    setDescription('')

    setPriority('')
    setRevealedAlert(false)

    setDue('')
    setSelectedDate(today)
    setRevealedTime(false)

    setCategory('')
    setRevealedCat(false)

    setremind('')
    setSelectedReminder('')
    setRevealedAlarm(false)
    setcolor('black')

    try{
      await fetch("http://"+ip+":3000/tasks2")
      .then((resp) => resp.json())
      .then((json) => {setTasks(json)})
      .catch(function(error) {})
    }catch(error){}

  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* Dissmiss Add Task Page */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const DissmissAddTaskPage = ()=>{
    setRevealedAlert(false)
    setRevealedTime(false)
    setRevealedCat(false)
    setRevealedAlarm(false)
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* save new task to database */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const SaveNewTask = async()=>{
    var user_id = id;
    var title;
    var taskpriority;
    var category;
    var due;

    if(taskTitle == '' || taskTitle == null){
      title = 'title'
    }else{
      title = taskTitle
    }

    if(priority == '' || priority == null){
      taskpriority = 'Average'
    }else{
      taskpriority = priority;
    }

    if(Category == '' || Category == null){
      category = 'task'
    }else{
      category = Category
    }

    if(Due == '' || Due == null){
      due = ''+' '+time
    }else{
      due = Due
    }
    if(item.team_id == '' || item.team_id == null){
      item.team_id = 0 
    }
    
    //send data to database
    try{
      await fetch("http://"+ip+":3000/AddNewTask", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "title": title,
          "taskSubject": taskSubject,
          "Description": Description,
          "taskpriority": taskpriority,
          "due": due,
          "category": category,
          "remind": remind+' '+'',
          "user_id": user_id,
          "date": '',
          "team_id": item.team_id,
        })
      })
      .then(res=>res)
      .then( async data =>{
        // console.log(data.status)
        if(data.status == 200){
          try{
          await fetch("http://"+ip+":3000/tasks2")
          .then((resp) => resp.json())
          .then((json) => {setTasks(json)})
          .catch(function(error) {
          })
        }catch(error){}

      }})
      .catch(function(error) {});

    }catch(error){}

    CloseAddTaskPage() 
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* Add task page */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const addTask= ()=>{
    
    return(
      <Modal
        transparent={true}
        visible={modalVisible3}
      >
        <TouchableOpacity onPress={()=> {DissmissAddTaskPage(),setModalVisible3(false)}} style={{backgroundColor:"#00000778", flex:1}}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=> {Keyboard.dismiss()}}
            style={[ 
              StyleSheet.absoluteFillObject,
              {
                backgroundColor:'white', 
                marginTop:70,
                marginBottom:80,  
                marginHorizontal:10,
                flex:1, 
                padding:40, 
                borderRadius:10,
              },
            ]}
          >

            {/* /////////////////////////////task body start//////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////// */}
            <ScrollView style={{marginTop:-35, marginHorizontal:-25, marginBottom:15}}>

              <View style={{alignSelf:'center', marginTop:10, flexDirection:'row'}}>
                <Text style={{fontSize:20, fontWeight:'600'}}>Add New Task: </Text>
                <FontAwesome5 name="pencil-alt" size={24} color="black" style={{marginTop:1}}/>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:5, marginHorizontal:30}}/>

              {/* /////////add task title/////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{ marginTop:5, alignSelf:'center', marginBottom:5, }}> 
                <Text style={{fontSize:18, fontWeight:'600'}}>Title: </Text>
                <TextInput
                  autoCorrect={false} 
                  style={{ 
                    width:width-90, 
                    height: 35, 
                    marginTop:-3,
                    backgroundColor: '#ebecf0',
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor:COLORS.A_blue,
                  }}

                  onChangeText={setTaskTitle}
                  value={taskTitle}
                />
              </View>

              <View style={{ marginTop:5, alignSelf:'center', marginBottom:10}}> 
                <Text style={{fontSize:18, fontWeight:'600'}}>Subject: </Text>
                <TextInput
                  autoCorrect={false} 
                  // placeholder='Title'
                  // placeholderTextColor={'#666'}
                  style={{ 
                    width:width-90, 
                    height: 35, 
                    marginTop:-3,
                    backgroundColor: '#ebecf0',//'#c8dfea'//too dark,
                    // flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor:COLORS.A_blue,
                  }}

                  onChangeText={setTaskSubject}
                  value={taskSubject}
                />
              </View>
              {/* //add task description//////////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1} style={{alignSelf:'center',}}> 
                <Text style={{fontSize:18, marginBottom:0, fontWeight:'600'}}>Description: </Text>
                <TextInput
                  // autoCorrect={false}
                  
                  style={{ 
                    width:width-90,
                    height: 130, 
                    backgroundColor: '#ebecf0',
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor:COLORS.A_blue
                  }}
                  multiline={true}
                  onChangeText={setDescription}
                  value={Description}
                />
              </KeyboardAvoidingView>

              {/* /////set priority////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{marginTop:20, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedAlert(prevState => !prevState)}>
                  <MaterialCommunityIcons name={revealedAlert ? "close" : "alert-circle-outline"} size={30} color={COLORS.A_dark_blue} />
                  {(priority != null && priority != '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500', color:color}}>{priority}</Text>}
                  {(priority == null || priority == '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500', color:color}}>Set Priority</Text>}
                </TouchableOpacity>
              </View>

              {revealedAlert &&
              <View style={{marginTop:10, alignSelf:'center', width:width-80, }}> 
                {/* <Text style={{fontSize:20, fontWeight:'600', marginBottom:15, marginStart:-5}}>Priority: </Text> */}
                
                <View style={{flexDirection:'row', justifyContent:'space-evenly', marginHorizontal:0}}>

                  <View style={{justifyContent:'center', backgroundColor:'#E60026', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity style={{}} onPress={()=>{setPriority('Very Important'), setcolor('#E60026')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#FFBF00', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Important'), setcolor('#FFBF00')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#BEBFC5', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Average'), setcolor('#555')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#00B9E8', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Slightly Important'), setcolor('#00B9E8')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#007FFF', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Not Important'), setcolor('#007FFF')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider width={1} orientation='vertical' style={{marginTop:15, marginBottom:0, marginHorizontal:10}}/>
              </View>}

              {/* /////set deadline////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{marginVertical:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedTime(prevState => !prevState)}>
                  <MaterialCommunityIcons name={revealedTime ? "close" : "clock-time-four-outline"} size={30} color={COLORS.A_dark_blue}  />
                  {( Due != null && Due != '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Due to: {Due}</Text>}
                  {( Due == null || Due == '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set Deadline</Text>}
                </TouchableOpacity>
              </View>

              {revealedTime && 
                <DatePicker 
                  options={{
                    backgroundColor: COLORS.A_white,
                    mainColor:COLORS.A_blue,
                  }}

                  selected = {selectedDate}
                  onSelectedChange={date => {setSelectedDate(date), setDue(date)}}
                />}


              {/* /////set Category////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */} 
              <View style={{marginBottom:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedCat(prevState => !prevState)}>
                  <MaterialIcons name={revealedCat ? "close" : "category"} size={28} color={COLORS.A_dark_blue}  />
                  {( Category != null && Category !='') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>{Category}</Text>}
                  {( Category == null || Category =='') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set Category</Text>}
                </TouchableOpacity>
              </View>

              {revealedCat &&
                <ScrollView 
                  horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={{ height:70, width:'90%', alignSelf:'center', marginBottom:5, marginTop:-10}}
                >

                  {/* default none */}
                  {/* no remainder expect user set one  */}
                  <TouchableOpacity 
                    onPress={()=>{setCategory('task')}}
                    style={{flexDirection:'row', alignSelf:'center', backgroundColor:COLORS.A_dark_blue, height:45, paddingHorizontal:15, justifyContent:'center', borderRadius:150, marginStart:5 }}>
                    <Image
                      source={require('../assets/task_50_white.png')} 
                      style={{width:30, height:30, alignSelf:'center', marginStart:-5, marginRight:5}}
                    />
                    <Text style={{alignSelf:'center', textAlign:'center', color:'white', fontSize:18}}>Task</Text>
                  </TouchableOpacity>

                  {/* exam */}
                  {/* if exam -- remaind the user to set the time to be reminded of the exam */}
                  <TouchableOpacity
                    onPress={()=>{setCategory('exam')}}
                    style={{flexDirection:'row', alignSelf:'center', backgroundColor:COLORS.A_dark_blue, height:45, paddingHorizontal:15, justifyContent:'center', borderRadius:150, marginStart:5 }}>
                    <Image 
                      source={require('../assets/exam_50_white.png')} 
                      style={{width:30, height:30, alignSelf:'center', marginStart:-3, marginRight:5}}
                    />
                    <Text style={{alignSelf:'center', textAlign:'center', color:'white', fontSize:18}}>Exam / Quiz</Text>
                  </TouchableOpacity>

                  {/* Homework */}
                  {/* remainder will be set at due date midnite if not set by user */}
                  <TouchableOpacity 
                    onPress={()=>{setCategory('homework')}}
                    style={{flexDirection:'row', alignSelf:'center', backgroundColor:COLORS.A_dark_blue, height:45, paddingHorizontal:15, justifyContent:'center', borderRadius:150, marginStart:5 }}>
                    <Image
                      // source={require('../assets/task_100_white.png')} 
                      source={require('../assets/hw_50_white.png')} 
                      style={{width:30, height:30, alignSelf:'center', marginStart:-3, marginRight:7}}
                    />
                    <Text style={{alignSelf:'center', textAlign:'center', color:'white', fontSize:18}}>Homework / project</Text>
                  </TouchableOpacity>

                </ScrollView>
              }

              {/* /////set remainder////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */} 
              <View style={{marginBottom:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedAlarm(prevState => !prevState)}>
                  <MaterialIcons name={revealedAlarm ? "close" : "alarm"} size={28} color={COLORS.A_dark_blue}  />
                  {(remind != null && remind != '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>{remind}</Text>}
                  {(remind == null || remind == '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set reminder</Text>}
                </TouchableOpacity>
              </View>

              {revealedAlarm && 
                <DatePicker 
                  options={{
                    backgroundColor: COLORS.A_white,
                    mainColor:COLORS.A_blue,
                  }}

                  selected = {selectedReminder}
                  onSelectedChange={date => {setSelectedReminder(date), setremind(date)}}
                />}
              

            </ScrollView>

            
            <TouchableOpacity style={{height:50, width:80, position:'absolute', bottom:10, right:10, alignSelf:'center', justifyContent:'center', borderRadius:30}} onPress={()=>{SaveNewTask(),setModalVisible3(false)}}>
              <Text style={{textAlign:'center', fontSize:18, fontWeight:'500', color:COLORS.A_dark_blue}}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:50, width:80, position:'absolute', bottom:10, right:70, alignSelf:'center', justifyContent:'center', borderRadius:30}} onPress={()=>{CloseAddTaskPage(),setModalVisible3(false)}}>
              <Text style={{textAlign:'center', fontSize:17, fontWeight:'500', color:COLORS.A_gray}}>Cancle</Text>
            </TouchableOpacity>
            
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      
    )
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var update ={checked:'', item:''}

const CheckButton = ({ callback, data, taskItem }) => {
  const [checked, setChecked] = useState(false);

  useEffect(()=>{
    data.map(check => {
      if(check.team_id == item.team_id){
        if(check.task_id == taskItem.task_id && taskItem.done == "yes"){
          setChecked(true)
        }
      }
    })//end posts map
  },[])

  return (
    <TouchableOpacity
      style={{marginRight:20, marginLeft:10, marginTop:10, alignSelf:'center'}}
      onPress={() => {
        update.checked =checked
        update.item = taskItem

        setChecked(!checked);
        
        if (callback) {callback()}
        // console.log({update})
        {updateTasks(update)}
      }}>

      {checked ? (<FontAwesome name="check-circle" size={33} color={COLORS.A_blue} style={{marginTop:-1}}/>) : (<FontAwesome5 name="circle" size={30} color='#666' style={{marginTop:-1}} />)}
    </TouchableOpacity>
  );
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const updateTasks = async(update)=>{
  
  try{

    await fetch("http://"+ip+":3000/taskDoneUndone2", {
      method: "post", 
      headers:{ "Content-Type": "application/json", },
      body: JSON.stringify({
        "update": update,
        "team_id":item.team_id,
      })
    })
    .then(res=>res)
    .then(async data =>{
      if(data.status == 200){
      const url = "http://"+ip+":3000/tasks2"
      try{
       await fetch(url)
       .then((resp) => resp.json())
       .then((json) => {setTasks(json)})
       .catch(function(error) { })
      }catch(error){}
    }
    
    })
  }catch(error){

   }
      
}


  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get Data From backend */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* tasks */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getTasks = (taskItem)=>{
    var mytasks = false;
    // console.log(taskItem.team_id)

    if(item.team_id == taskItem.team_id && item.user_id== id ){
      mytasks = true
    }
    

    return (
      <View>
        {mytasks &&(
          <TouchableOpacity onPress={()=>{navigation.navigate('projecttaskpage', {taskItem})}}>
            <View style= {{marginTop:10, height:80, backgroundColor:'#1111', marginHorizontal:10, borderRadius:15}}>

              <View style={{ flexDirection:'row', }}>
                <CheckButton data={tasks} taskItem={taskItem} />
                <Text style={{fontSize:19, marginStart:-12, alignSelf:'center', marginTop:10}}>{taskItem.title}</Text>
              </View>

              {/* //priority// */}
              <View style={{ flex:1,  borderRadius:15, marginStart:0, marginTop:-5}}>

                <View style={{flex:1, borderRadius:15, flexDirection:'row', marginTop:0}}>
                  <MaterialCommunityIcons name="clock-time-four-outline" size={23} color={COLORS.A_dark_blue} style={{alignSelf:'center', marginStart:10}}/>
                  {(taskItem.due_date != null && taskItem.due_date != '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>({taskItem.due_date} {taskItem.dueTime})</Text>}
                  {(taskItem.due_date == null || taskItem.due_date == '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>Not Set</Text>}

                  <MaterialIcons name= "alarm" size={22} color={COLORS.A_dark_blue} style={{alignSelf:'center', marginStart:5}}/>
                  {(taskItem.alarm != null && taskItem.alarm != '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>({taskItem.alarm})</Text>}
                  {(taskItem.alarm == null || taskItem.alarm == '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>Not Set</Text>}


                  {(taskItem.category == 'none' || taskItem.category == 'task') &&
                    <View style={{alignSelf:'center', height:30, paddingHorizontal:0, justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                      <Image
                        source={require('../assets/task_50_blue.png')} 
                        style={{width:30, height:30, alignSelf:'center'}}
                      />
                    </View>
                  }


                  {(taskItem.category == 'quiz' || taskItem.category == 'exam') &&
                    <View style={{alignSelf:'center', justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                      <Image
                        source={require('../assets/exam_50_blue.png')} 
                        style={{width:30, height:30, alignSelf:'center'}}
                      />
                    </View>
                  }

                  {(taskItem.category == 'homework' || taskItem.category == 'project') &&
                    <View style={{alignSelf:'center', height:30, paddingHorizontal:0, justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                      <Image
                        source={require('../assets/hw_50_blue.png')} 
                        style={{width:30, height:30, alignSelf:'center'}}
                      />
                    </View>
                  }

                  {(taskItem.category == 'lecture') &&
                    <View style={{alignSelf:'center', height:30, paddingHorizontal:0, justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                      <Image
                        source={require('../assets/lec_50_blue.png')} 
                        style={{width:30, height:30, alignSelf:'center'}}
                      />
                    </View>
                  } 
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* Remove From Star */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const RemoveFromStar = async()=>{

    try{

      await fetch("http://"+ip+":3000/unstarproject", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          
          "project_id":item.project_id,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
          setShowSave(false)
          setShowDetails(false)
          setupdate(prevState=>!prevState)
      }
      
      })
    }catch(error){
  
     }


  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get users to team */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getUsers = (item)=>{
    var tt = false
    var use
    USERS.map(u=>{
      if(u.user_id == item.user_id){
        tt = true
        use = u
      }
    })
    return(
      <View>
        {tt &&
        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{setModalVisible2(true),setProfile2(use)}}>
          <Ionicons name="person-circle-sharp" size={30} color="#666" style={{alignSelf:'center', marginRight:-5, marginLeft:5}}/>
          <Text style={{fontSize:17, fontWeight:'500', marginStart:5, alignSelf:'center'}}>{use.name}</Text> 
          {teamInteractions()}
        </TouchableOpacity>}
      </View>
    )
  }
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* team interactions */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const teamInteractions = ()=>{
    return(
      <Modal 
        transparent={true}
        visible={modalVisible2} >
        <TouchableOpacity onPress={()=> {setModalVisible2(false)}} style={{backgroundColor:'rgba(0, 0, 0, 0.15)', flex:1,}}>
          <TouchableOpacity 
            activeOpacity={1}
            style={[ StyleSheet.absoluteFillObject, { backgroundColor:'white',position: 'absolute', marginTop:230, height:200, marginHorizontal:15, flex:1, padding:40, borderRadius:10, }, ]} >

            {/* ////miniprofile start///////////////////////////////////////////////////// */}
            <View style={{marginTop:-35, marginHorizontal:-25, marginBottom:15,}}>

              <View style={{alignSelf:'flex-end', marginTop:10, flexDirection:'row', marginStart:5}}>
                <TouchableOpacity onPress={()=>{setModalVisible2(false)}}>
                  <AntDesign name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10, marginHorizontal:0}}/>

              {/* ///////////////////////////////////////////////////////////////////////////// */}
              <View style={{alignSelf:'center', flexDirection:'row'}}>
                <Text style={{fontSize:20, fontWeight:'500'}}>{profile2.email}</Text>
              </View>

              <View style={{marginTop:10, marginLeft:5 }}>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text style={{fontSize:16, fontWeight:'400'}}>Name: {profile2.name}</Text>
                  {( profile2.phonenumber != '' && profile2.phonenumber != null) && <Text style={{fontSize:16, fontWeight:'400'}}>Phone: {profile2.phonenumber}</Text>}
                </View>
              
                <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-evenly'}} >
                  <TouchableOpacity 
                    style={{flexDirection:'row', paddingVertical:5, paddingHorizontal:10, backgroundColor:COLORS.A_dark_blue,borderRadius:10}} 
                    onPress={()=>{goToChat(profile2.email)}}
                  >
                    <Text style={{alignSelf:'center',color:'white', fontSize:15}}>Send a message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{flexDirection:'row', backgroundColor:COLORS.A_dark_blue, paddingVertical:5, paddingHorizontal:10, borderRadius:10}}
                    onPress={()=>{RemoveFromTeam(profile2)}}
                  >
                    <Text style={{alignSelf:'center', color:'white', fontSize:15}}>Remove from project</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* Remove From Team */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const RemoveFromTeam = async(user)=>{
    //user.user_id = user_id
    //item.team_id
    try{
      await fetch("http://"+ip+":3000/removefromgroup", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "user_id":user.user_id, 
          "team_id":item.team_id, 

          
        })
      })
      .then(res=>res)
      .then( async data =>{
        try{
          // console.log(data.status)
          if(data.status == 200){
            // navigation.navigate('Projects')
            setModalVisible2(false)
            setupdate(prevState => !prevState)
          }
        }catch(error){}
      })
      .catch(function(error) {});

    }catch(error){}


  }
  
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* delete project*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const DeleteProject = async()=>{
    
    try{
      await fetch("http://"+ip+":3000/deleteProject", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "project_name":item.name, 
          "team_id":item.team_id, 

          
        })
      })
      .then(res=>res)
      .then( async data =>{
        try{
          // console.log(data.status)
          if(data.status == 200){
            setShowDetails(false)
            setShowDelete(false)
            navigation.navigate('Projects')
          }
        }catch(error){}
      })
      .catch(function(error) {});

    }catch(error){}

}

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* save Project Changes function */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const saveProjectChanges = ()=>{

  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* add to importenet file */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const AddToStar = async()=>{
    try{

      await fetch("http://"+ip+":3000/starproject", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "project_id":item.project_id,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
          setShowSave(false)
          setShowDetails(false)
          setupdate(prevState=>!prevState)
      }
      
      })
    }catch(error){
  
     }

  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* save Project Changes function */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const AddToProject = async(itemm)=>{
    //user = item
    // console.log(item)

    var s;
    var title;
    
    if(item.name == '' || item.name == null){
      title = 'untitled'
    }else{
      title = item.name
    }

    // AddNewProject()
    
    //send data to database
    try{
      await fetch("http://"+ip+":3000/sendRequest2", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "from_user_id":id, 
          "to_user_id":itemm.user_id, 
          "subject":item.subject,
          "project_id":item.project_id,
          "project_name":title
        })
      })
      .then(res=>res)
      .then( async data =>{
        try{
        console.log(data.status)
        if(data.status == 200){
          setModalVisible(false)
        }
      }catch(error){}
      })
      .catch(function(error) {});

    }catch(error){}
  }

  

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* are you sure you want to add people? */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const areYouSure = ()=>{
    return(
      <Modal 
        transparent={true}
        visible={modalVisible} >
        <TouchableOpacity onPress={()=> {setModalVisible(false)}} style={{backgroundColor:'rgba(0, 0, 0, 0.15)', flex:1,}}>
          <TouchableOpacity 
            activeOpacity={1}
            style={[ StyleSheet.absoluteFillObject, { backgroundColor:'white',position: 'absolute', marginTop:230, height:200, marginHorizontal:15, flex:1, padding:40, borderRadius:10, }, ]} >

            {/* ////miniprofile start///////////////////////////////////////////////////// */}
            <View style={{marginTop:-35, marginHorizontal:-25, marginBottom:15,}}>

              <View style={{alignSelf:'flex-end', marginTop:10, flexDirection:'row', marginStart:5}}>
                <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
                  <AntDesign name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10, marginHorizontal:0}}/>

              {/* ///////////////////////////////////////////////////////////////////////////// */}
              <View style={{alignSelf:'center', flexDirection:'row'}}>
                <Text style={{fontSize:20, fontWeight:'500'}}>{profile.email}</Text>
              </View>

              <View style={{marginTop:10, marginLeft:5 }}>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text style={{fontSize:16, fontWeight:'400'}}>Name: {profile.name}</Text>
                  {( profile.phonenumber != '' && profile.phonenumber != null) && <Text style={{fontSize:16, fontWeight:'400'}}>Phone: {profile.phonenumber}</Text>}
                </View>
              
                <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-evenly'}} >
                  <TouchableOpacity style={{flexDirection:'row', paddingVertical:5, paddingHorizontal:10}} onPress={()=>{setModalVisible(false)}}>
                    <Text style={{alignSelf:'center', fontSize:17}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{flexDirection:'row', backgroundColor:COLORS.A_dark_blue, paddingVertical:5, paddingHorizontal:10, borderRadius:10}}
                    onPress={()=>{AddToProject(profile)}}
                  >
                    <Text style={{alignSelf:'center', color:'white', fontSize:17}}>Add to project</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>

        {/* ///////////////////////////////////////////////////////////////////// */}
        {/* header logo project name save and back arrow*/}
        {/* ///////////////////////////////////////////////////////////////////// */}
        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}
          />
                
          <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'600', fontSize:24}}></Text> 
          </View>
          
          { showSave &&
            <TouchableOpacity 
              style={{position:'absolute' ,marginTop:15, right:20}}
              onPress={()=>{saveProjectChanges()}}
            >
              <Entypo name="save" size={30} color={COLORS.A_dark_blue} />
            </TouchableOpacity>
          }

          <AntDesign name="right" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-10}} onPress={()=> navigation.goBack()}/>
          <FontAwesome name="refresh" size={30} color="#555" style={{position:'absolute', marginTop:15, left:50}} onPress={()=>{setupdate(prevState => !prevState)}}/>

        </View>

        <Divider width={5} orientation='vertical' style={{marginTop:-5, marginBottom:0}}/>
        

        {/* ///////////////////////////////////////////////////////////////////// */}
        {/* project details */}
        {/* ///////////////////////////////////////////////////////////////////// */}
        <View style={{ width:'105%', height:height-150, alignSelf:'center', }}>
          
          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* ... add members, delete, edit, add to star */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={{flexDirection:'row',minHeight:40, marginTop:5, marginStart:10}}>

            <View style={{marginTop:5, minHeight:35, flexDirection:'row', marginRight:50}}>
              <Text style={{fontSize:19, fontWeight:'500'}}>Title: </Text>
              <Text style={{fontSize:19, fontWeight:'400' ,marginStart:5, marginRight:5, width:'60%'}}>{item.name}</Text>
            </View> 

            {!showDetails && 
              <View style={{position:'absolute', right:10}}>
                <TouchableOpacity style={{marginTop:5}} onPress={()=>{setShowDetails(prevState => !prevState)}}>
                  <Entypo name="dots-three-horizontal" size={25} color="#555"/>
                </TouchableOpacity>
              </View>
            }

            {showDetails &&
              <View style={{flexDirection:'row', marginTop:5, position:'absolute', right:8}}>
                <View>
                  <TouchableOpacity onPress={()=>{setAddToStar(false), setAddMembers(true), setShowDelete(false)}} style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:5, marginRight:5, marginBottom:5}}>
                    <MaterialIcons name="person-add" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={()=>{setAddToStar(true), setAddMembers(false), setShowDelete(false)}} style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:5, marginRight:5, marginBottom:5}}>
                    <MaterialCommunityIcons name="folder-star" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={()=>{setShowDelete(true), setAddMembers(false), setAddToStar(false)}} style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:5, marginBottom:5}}>
                    <MaterialIcons name="delete" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={()=>{setShowDetails(prevState => !prevState), setShowDelete(false), setAddMembers(false), setAddToStar(false) }} style={{alignSelf:'center', marginLeft:0, marginTop:-9}}>
                  <MaterialIcons name="close" size={30} color="#555" />
                </TouchableOpacity>

              </View>
            }

          </View>

          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* add members to project hideen space */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          {(showDetails && addMembers) &&
            <View style={{ width:'100%', minHeight:225,  alignSelf:'center'}}>

              <View style={{flexDirection:'row', marginTop:10}}>
                <FontAwesome name="group" size={28} color='black' style={{marginStart:15, marginTop:5}} />

                {/* ///////////////////////////////////////////////////////////////////// */}
                {/* search users */}
                {/* ///////////////////////////////////////////////////////////////////// */}
                <View style={[ styles.inputContainer, {alignItems: 'center', marginStart:10},]}>
                  <TextInput
                    placeholder="Search for people here" 
                    placeholderTextColor={'#222'}
                    autoCorrect={false}
                    onChangeText={text=>setPeople(text)}
                    value={people}
                    style={{ fontSize: 15, flex: 1, }}
                  />
                </View>
              </View>

              <View style={{marginTop:7, flex:1, }}>
                <ScrollView horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >

                  <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{alignSelf: 'flex-start',}}
                    numColumns={Math.ceil(USERS.length / 2)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    // initialNumToRender={50}
                    initialNumToRender={200}
                    windowSize={51}


                    data={USERS}
                    style={{flex:1, marginTop:5}}
                    
                    keyExtractor={item => item.user_id}
              
                    renderItem={({item}) =>{
                      return(
                        <View>

                        {(people == '' ) &&
                          <TouchableOpacity onPress={()=> {setModalVisible(true),setProfile(item)}}>
                            <View style= {styles.subContainer}>
                              <Entypo name="plus" size={24} color="black" style={{position:'absolute', right:15, top:10}}/>
                              {(item.name != '' && item.name != null ) && <Text style={{ color:'black', fontSize:17, fontWeight:'500'}}>{item.name}</Text>}
                              {(item.email != '' && item.email != null ) && <Text style={{alignSelf:'center', color:'black', fontSize:16, fontWeight:'500'}}>{item.email}</Text>}
                              {areYouSure()}
                            </View>
                          </TouchableOpacity>
                        }

                        {/* 0 0 1 */}
                        {(
                          (people != '') &&(
                           (item.name!='' &&item.name!=null && item.name.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()) )
                          //  (item.username!='' &&item.username!=null &&item.username.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()))||
                          //  (item.email!='' &&item.email!=null &&item.email.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()))||
                          //  (item.phonenumber!='' &&item.phonenumber!=null &&item.phonenumber.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()))
                           )
                          )&&

                          <TouchableOpacity onPress={()=> {setModalVisible(true),setProfile(item)}}>
                            <View style= {styles.subContainer}>
                              <Entypo name="plus" size={24} color="black" style={{position:'absolute', right:15, top:10}}/>
                              {(item.name != '' && item.name != null ) && <Text style={{ color:'black', fontSize:17, fontWeight:'500'}}>{item.name}</Text>}
                              {(item.email != '' && item.email != null ) && <Text style={{alignSelf:'center', color:'black', fontSize:16, fontWeight:'500'}}>{item.email}</Text>}
                              {areYouSure()}
                            </View>
                          </TouchableOpacity>
                        }

                      </View>
                    )
                  }
                  }
                />
              
              </ScrollView>
              </View>

            </View>
          }

          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* add project to bookmares */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          {(showDetails && addToStar && item.star != 'yes') &&
            <View style={{ width:'100%', minHeight:110,  alignSelf:'center'}}>
              <Text style={{alignSelf:'center', marginTop:10, fontSize:18, marginHorizontal:10}}>do you want to add "{item.name}" to important?</Text>

              <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-evenly'}} >

                  <TouchableOpacity 
                    style={{flexDirection:'row', paddingVertical:5, paddingHorizontal:10}} 
                    onPress={()=>{setAddToStar(false)}}
                  >
                    <Text style={{alignSelf:'center', fontSize:17}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{flexDirection:'row', backgroundColor:COLORS.A_dark_blue, paddingVertical:5, paddingHorizontal:10, borderRadius:10}}
                    onPress={()=>{AddToStar()}}
                  >
                    <Text style={{alignSelf:'center', color:'white', fontSize:17}}>Add to important</Text>
                  </TouchableOpacity>
                </View>
            </View>
          }

          {(showDetails && addToStar && item.star == 'yes') &&
            <View style={{ width:'100%', minHeight:110,  alignSelf:'center'}}>
              <Text style={{alignSelf:'center', marginTop:10, fontSize:18, marginHorizontal:10}}>do you want to Remove "{item.name}" from important?</Text>

              <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-evenly'}} >

                  <TouchableOpacity 
                    style={{flexDirection:'row', paddingVertical:5, paddingHorizontal:10}} 
                    onPress={()=>{setAddToStar(false)}}
                  >
                    <Text style={{alignSelf:'center', fontSize:17}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{flexDirection:'row', backgroundColor:COLORS.A_dark_blue, paddingVertical:5, paddingHorizontal:10, borderRadius:10}}
                    onPress={()=>{RemoveFromStar()}}
                  >
                    <Text style={{alignSelf:'center', color:'white', fontSize:17}}>Remove from important</Text>
                  </TouchableOpacity>
                </View>
            </View>
          }

          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* delete confirm */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          {(showDetails && showDelete) &&
            <View style={{ width:'100%', minHeight:105,  alignSelf:'center'}}>
            <Text style={{alignSelf:'center', marginTop:10, fontSize:18}}>are you sure you want to delete this project?</Text>

            <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-evenly'}} >

                <TouchableOpacity 
                  style={{flexDirection:'row', paddingVertical:5, paddingHorizontal:10}} 
                  onPress={()=>{setShowDelete(false), setShowDetails(false)}}
                >
                  <Text style={{alignSelf:'center', fontSize:17}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{flexDirection:'row', backgroundColor:COLORS.A_dark_blue, paddingVertical:5, paddingHorizontal:10, borderRadius:10}}
                  onPress={()=>{DeleteProject()}}
                >
                  <Text style={{alignSelf:'center', color:'white', fontSize:17}}>Delete this project</Text>
                </TouchableOpacity>
              </View>
          </View>
          }
          

          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* goal */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={{ paddingTop:10, minHeight:75, borderBottomWidth:0.2, borderTopWidth:0.2, flexDirection:'row', marginTop:5, }}>
            <Text style={{fontSize:19, fontWeight:'500', marginStart:10}}>Goal:</Text>

            {!editGoal && <Text style={{fontSize:17, marginTop:3, marginStart:5, marginRight:5, width:'75%'}}>{item.goal}</Text>}
            {!editGoal &&
              <TouchableOpacity onPress={()=>{setEditGoal(true), setShowSave(true) }} style={{marginTop:3}}>
                <MaterialIcons name="edit" size={20} color="#555" />
              </TouchableOpacity>
            }

            {editGoal && 
              <TextInput 
                style={{
                  fontSize:17, 
                  marginTop:3, 
                  marginStart:5, 
                  marginRight:5, 
                  width:'75%',
                  textAlignVertical:'top',
                  backgroundColor:'#1111',
                  marginBottom:10
                }}
                multiline={true}
                autoCorrect={false}
                onChangeText={text=>setNewGoal(text)}
                value={newGoal}
              />}
            {editGoal &&
              <TouchableOpacity onPress={()=>{setEditGoal(false)}} style={{marginTop:3}}>
                <MaterialIcons name="close" size={24} color="#555" />
              </TouchableOpacity>
            }
          </View>

          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* subject and team details */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={{marginTop:3, flexDirection:'row',  borderBottomWidth:0.5,  paddingTop:10}}>

            <View style={{marginStart:10, flex:1}}>

              {/* ///////////////////////////////////////////////////////////////////// */}
              {/* team list */}
              {/* ///////////////////////////////////////////////////////////////////// */}
              <View style={{flexDirection:'row'}}>
                <View style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:5, marginBottom:5}}>
                  <Ionicons name="people" size={18} color="white" />
                </View>

                <View style={{ flex:1, width:'90%', marginRight:5}}>
                  <ScrollView horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >

                    <FlatList
                      scrollEnabled={false}
                      contentContainerStyle={{}}
                      numColumns={10}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      initialNumToRender={200}
                      windowSize={51}


                      data={projects}
                     
                      keyExtractor={item => item.project_id}
              
                      renderItem={({item}) =>{
                        return(
                          <View>
                            {getUsers(item)}
                          </View>
                        )
                      }}
                    />
                  </ScrollView>
                </View>
              </View>

              {/* ///////////////////////////////////////////////////////////////////// */}
              {/* subject list */}
              {/* ///////////////////////////////////////////////////////////////////// */}
              {<View style={{flexDirection:'row'}}>
                <View style={{marginBottom:15, flexDirection:'row'}}>
                  <Ionicons name="md-book" size={17} color="white" style={{backgroundColor:COLORS.A_dark_blue, borderRadius:100, padding:5,}}/>
                  <Text style={{alignSelf:'center', fontSize:17, fontWeight:'500', marginStart:5}}>{item.subject}</Text>
                </View>
              </View>}

            </View>

          </View>

          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* tasks list add tasks*/}
          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={{ marginTop:5, minHeight:35, borderBottomWidth:0.5}}>
            <Text style={{fontSize:19, fontWeight:'500', marginStart:10}}>tasks:</Text>

            <TouchableOpacity 
              style={{right:15, position:'absolute', alignSelf:'center'}} 
              onPress={()=>{setModalVisible3(true)}}
            >
              <Octicons name="diff-added" size={30} color="#222" />
              {addTask()}
            </TouchableOpacity>
          </View>

          <View style={{marginTop:5, flex:1, }}>
            {
              <FlatList
              // extraData={selectedId}
                data={tasks}
             
                keyExtractor={item => item.task_id}
                initialNumToRender={600}
                windowSize={71}

      
                renderItem={({item}) =>{
                  return(
                    <View>
                      {getTasks(item)}
                    </View>
                  )
                }}
              />
            }
          </View>
          
        </View>
            
      </View>
    </View>
  )
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//styleing 
const styles = StyleSheet.create({
  contentContainer:{
    flex:1,
    paddingTop: 25, 
    paddingHorizontal: 15,
  },

  container: {
    height: "100%",
    flex: 1,
    backgroundColor: COLORS.A_white,
  },
  
  image: {
    width: 60,
    height: 60,
    marginRight:3,
    marginLeft:-10
  },

  logo:{
    flexDirection: 'row',
  },

  inputContainer: {
    flex:1/1.16,
    height: 40,
    minWidth:130,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingleft: 15,
    paddingRight:10,
    borderRadius: 35,
        
  },

  subContainer:{
    backgroundColor:'#B9D9EB',
    height:75,
    paddingHorizontal:25,
    borderRadius:20,
    justifyContent:'center',
    marginHorizontal:5,
    marginBottom:5 
  },

});
export default Project