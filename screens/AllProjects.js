import {ScrollView, Dimensions, SafeAreaView, View, Button,Keyboard, Modal,KeyboardAvoidingView,TextInput, TouchableOpacity, Text, StyleSheet, Image, FlatList, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../conts/colors';
import {userr, pass, id, username, bio, user_email, user_phone, user_photo} from '../user'
import { AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/base';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import Percentage from '../components/Percentage';
import SearchComponent,{keyword} from "../components/SearchComponent";
import { ip } from '../getIP';

/////////////////////////////////////////////////////////////
const openProject=(item, navigation)=>{
  // theProject = project
  navigation.navigate('the Project', {item})
}
///////////////////////////////////////////////////////////
var today = moment().format('YYYY-MM-DD')
const AllProjects = ({navigation}) => {

  const [showSearchList, setShowSearchList] = useState(false)

  const [showAllProjects, setshowAllProjects] = useState(true);
  const [showDoneProjects, setshowDoneProjects] = useState(false);

  const [update, setupdate] = useState(false);
  const [term, setTerm] = useState("");
  
  const [projects, setProjects]= useState([])

  const [USERS, setUser] = useState([])

  

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get all posts*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(() => {

    try{
      fetch("http://"+ip+":3000/projects")
      .then((resp) => resp.json())
      .then((json) => {setProjects(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/users")
     .then((resp) => resp.json())
     .then((json) => {setUser(json)})
     .catch(function(error) {})
   }catch (error){}

  },[update])



  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* search term */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(()=>{ setTerm(keyword) },[term])


  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  //add task page
  const [modalVisible, setModalVisible] = useState(false);

  
  const [projectSubject, setProjectSubject] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [projectGoal, setProjectGoal] = useState('')
  const [star, setStar] = useState(false);

  const StarButton = ({ callback }) => {
   
    return (
      <TouchableOpacity
        style={{ flexDirection:'row', alignSelf:'center' }}
        onPress={() => {
            setStar(!star);
        //   if (callback) {callback();}
        }}>
  
        {star ? (<MaterialIcons name="star" size={28} color={COLORS.A_yellow} />) : (<MaterialIcons name="star-outline" size={28} color="black" />)}
      </TouchableOpacity>
    );
  };
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* Add task page */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const [addMembers, setAddMembers] = useState(true);
  const [addsubject, setAddSubject] = useState(false);
  //in add people
  const [people, setPeople] = useState('')
  const [modalVisible2, setModalVisible2] = useState(false);
  const [profile, setProfile] = useState('')

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* add people to project */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const AddToProject = async(item)=>{

    //user = item
    // console.log(item)

    var s;
    var title;
    
    if(projectTitle == '' || projectTitle == null){
      title = 'untitled'
    }else{
      title = projectTitle
    }

    // AddNewProject()
    
    //send data to database
    try{
      await fetch("http://"+ip+":3000/sendmyRequest", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "from_user_id":id, 
          "to_user_id":item.user_id, 
          "subject":projectSubject,
          "project_name":title
        })
      })
      .then(res=>res)
      .then( async data =>{
        console.log(data.status)
        if(data.status == 200){
          setModalVisible2(false)
      }})
      .catch(function(error) {});

    }catch(error){}

    //send request to user_id in item
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
                <Text style={{fontSize:20, fontWeight:'500'}}>{profile.email}</Text>
              </View>

              <View style={{marginTop:10, marginLeft:5 }}>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text style={{fontSize:16, fontWeight:'400'}}>Name: {profile.name}</Text>
                  {( profile.phonenumber != '' && profile.phonenumber != null) && <Text style={{fontSize:16, fontWeight:'400'}}>Phone: {profile.phonenumber}</Text>}
                </View>
              
                <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-evenly'}} >
                  <TouchableOpacity style={{flexDirection:'row', paddingVertical:5, paddingHorizontal:10}} onPress={()=>{setModalVisible2(false)}}>
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


  const addProject= ()=>{
    
    return(
      <Modal
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity onPress={()=> {setModalVisible(false)}} style={{backgroundColor:"#00000778", flex:1}}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=> {Keyboard.dismiss()}}
            style={[ 
              StyleSheet.absoluteFillObject,
              {
                backgroundColor:COLORS.A_white, 
                marginTop:60,
                marginBottom:50,  
                marginHorizontal:10,
                flex:1, 
                padding:40, 
                borderRadius:10,
              },
            ]}
          >

            {/* /////////////////////////////task body start//////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////// */}
            <ScrollView style={{marginTop:-35, marginHorizontal:-25, marginBottom:15, flex:1}}>

              <View style={{alignSelf:'center', marginTop:10, flexDirection:'row'}}>
              <Text style={{fontSize:20, alignSelf:'center', marginTop:6, marginStart:-5}}>Title: </Text>
                
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1}>
                    <TextInput
                        autoCorrect={false} 
                        style={{ 
                            width:width-130, 
                            height: 35,
                            marginTop:15,
                            marginBottom:10,
                            color:'black',
                            fontSize:18,
                            textAlignVertical:'center',
                            backgroundColor: '#ebecf0',
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderRadius: 5,
                            borderBottomColor:COLORS.A_blue,
                        }}
                        
                        placeholder='Title'
                        
                        onChangeText={text => {setProjectTitle(text)}}
                        value={projectTitle}
                    />
                </KeyboardAvoidingView>

                
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:0, marginBottom:5, marginHorizontal:30}}/>

              {/* /////////add task title/////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              {/* goal////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{ marginTop:5, marginBottom:0}}>

                <View style={{ flexDirection:'row'}}>
                  <Text style={{fontSize:19, fontWeight:'400', marginRight:5, marginStart:12,}}>Goal:</Text>
                </View>

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1} style={{ alignSelf:'center',}}>
                  <TextInput
                    autoCorrect={false}
                    style={{
                      width:width-80, 
                      minHeight: 90,
                      alignSelf:'center',
                      textAlignVertical:'top',
                      fontSize:18,
                      padding: 10,
                      backgroundColor: '#ebecf0',
                      borderBottomWidth: 1,
                      borderRadius: 5,
                      borderBottomColor:COLORS.A_blue,
                    }}
    
                    placeholder='goal'
                    multiline={true}
                    onChangeText={text => {setProjectGoal(text)}}
                    value={projectGoal}
                  />
                </KeyboardAvoidingView>
              </View>

              <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:10}}/>

              <View style={{ width:'105%', height:height-150, alignSelf:'center'}}>

                <View style={{ marginTop:5, minHeight:50, flexDirection:'row',marginHorizontal:-40, justifyContent:'space-evenly'}}>

                  <TouchableOpacity onPress={()=>{setAddSubject(false), setAddMembers(true)}}>
                    <AntDesign name="adduser" size={28} color="black"  style={{alignSelf:'center'}}/>
                    <View style={{alignSelf:'center'}}>
                      <Text style={{fontSize:13, alignSelf:'center'}}>Add</Text>
                      <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>partners</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{setAddSubject(true), setAddMembers(false)}}>
                    <Feather name="book-open" size={28} color="black" style={{alignSelf:'center'}}/>
        
                    <View style={{alignSelf:'center'}}>
                      <Text style={{fontSize:13, alignSelf:'center'}}>Add</Text>
                      <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>Subject</Text>
                    </View>
                  </TouchableOpacity>


                  <View>
                    <StarButton /> 

                    {!star &&
                      <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize:13, alignSelf:'center'}}>Add to</Text>
                        <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>important</Text>
                      </View>
                    }
        
                    {star &&
                      <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize:13, alignSelf:'center'}}>Remove </Text>
                        <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>important</Text>
                      </View>
                    }
                  </View>

                </View>

                <Divider width={5} orientation='vertical' style={{marginTop:20, marginBottom:10}}/>

                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
  
                {/* here to add a subject or a member/s */}
                {(addMembers ) && 
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
    
                  <View style={{marginTop:7, flex:1, paddingHorizontal:10}}>
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
    
                        data={USERS}
                        style={{flex:1, marginTop:5}}
                        
                        keyExtractor={item => item.user_id}
                  
                        renderItem={({item}) =>{
                          return(
                            <View>
    
                            {(people == '' ) &&
                              <TouchableOpacity onPress={()=> {setModalVisible2(true),setProfile(item)}}>
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
                              (people != '' ) &&(
                               (item.name != '' && item.name.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()) )
                              //  (item.username != '' && item.username != null && item.username.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()))||
                              //  (item.email != '' && item.email !=null && item.email.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()))||
                              //  (item.phonenumber != '' && item.phonenumber !=null && item.phonenumber.toLocaleLowerCase().startsWith(people.toLocaleLowerCase()))
                               )
                              )&&
    
                              <TouchableOpacity onPress={()=> {setModalVisible2(true),setProfile(item)}}>
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

                {(addsubject)&&
                  <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1}>
                  <TextInput
                      autoCorrect={false} 
                      style={{ 
                          width:width-100, 
                          height: 35,
                          marginTop:15,
                          marginBottom:10,
                          alignSelf:'center',
                          color:'black',
                          fontSize:18,
                          textAlignVertical:'center',
                          backgroundColor: '#ebecf0',
                          paddingHorizontal: 10,
                          borderBottomWidth: 1,
                          borderRadius: 5,
                          borderBottomColor:COLORS.A_blue,
                      }}
                      
                      placeholder='subject'
                      
                      onChangeText={text => {setProjectSubject(text)}}
                      value={projectSubject}
                  />
              </KeyboardAvoidingView>

                }

    
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
              </View>
            </ScrollView>
            <View style={{position:'absolute', bottom:25, flexDirection:'row', alignSelf:'center'}} >
                  <TouchableOpacity style={{flexDirection:'row', marginRight:50, paddingVertical:5, paddingHorizontal:10}} onPress={()=>{setModalVisible2(false)}}>
                    <Text style={{alignSelf:'center', fontSize:16, color:'#444'}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{flexDirection:'row',  marginLeft:10, paddingVertical:5, paddingHorizontal:10, borderRadius:10}}
                    onPress={()=>{AddNewProject()}}
                  >
                    <Text style={{alignSelf:'center', color:COLORS.A_dark_blue, fontSize:17, fontWeight:'500'}}>Add project</Text>
                  </TouchableOpacity>
                </View>
            
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      
    )
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* addnew project*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const AddNewProject = async()=>{
    
    var s;
    var title;
    
    if(projectTitle == '' || projectTitle == null){
      title = 'untitled'
    }else{
      title = projectTitle
    }

    if(star == false ){
      s ='no' 
    }else{
      s='yes'
    }
    
    //send data to database
    try{
      await fetch("http://"+ip+":3000/AddNewProject", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "goal": projectGoal,
          "user_id":id,
          "name": title,
          "subject": projectSubject,
          "star": s,
          
        })
      })
      .then(res=>res)
      .then( async data =>{
        console.log(data.status)
        if(data.status == 200){
          setupdate(prevState=>!prevState)

      }})
      .catch(function(error) {});

    }catch(error){}

    CloseAddProjectPage() 
  }

  const CloseAddProjectPage =()=>{
    setProjectGoal('')
    setProjectTitle('')
    setProjectSubject('')
    setModalVisible(false)
  }


  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* search results */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getResult = ( item ) => {
    var t = false
    var Post
    
    projects.map(post=>{
      
      if(post.user_id == item.user_id ){
        
        if(item.name.startsWith(term) && item.user_id == id ){
          Post = post
          t= true
        }else 

        if(item.name!=null && item.name.toLowerCase().startsWith(term.toLowerCase()) && item.user_id == id ){
          Post = post
          t= true
        }

      }  
    })

    return (
      <View>
        {t &&
          <TouchableOpacity onPress={()=>{openProject(item, navigation)}}>
          <View style= {{marginBottom:10, height:80, backgroundColor:'#1111', marginHorizontal:0,marginTop:5, borderRadius:15, flexDirection:'row'}}>
            <View style={{justifyContent:'center', marginStart:10}}>
              <Percentage percentage={item.percentage}/>
            </View>
            <Text style={{fontSize:20, marginStart:5, alignSelf:'center', marginTop:-5}}>{item.name}</Text>
          </View>

          <View style={{position:'absolute', right:10, top:10, flexDirection:'row'}}>
            
          {(item.star != '' && item.star != null && item.star !='no' ) &&
              <View style={{flexDirection:'row'}}>
                <Ionicons name="star" size={20} color={COLORS.A_blue} />
              </View>
            }
            {(item.star==''|| item.star==null || item.star=='no') &&
              <View style={{flexDirection:'row'}}>
                <Ionicons name="star-outline" size={20} color={'black'} />
              </View>
            }
          </View>


          <View style={{position:'absolute', right:10, top:60, flexDirection:'row'}}>
            
            {(item.subject!=''&& item.subject!=null) &&
              <View style={{flexDirection:'row'}}>
                <Text style={{marginLeft:5, marginRight:5}}>{item.subject}</Text>
                <Ionicons name="md-book" size={20} color={COLORS.A_blue} />
              </View>
            }
            {/* {(item.subject==''|| item.subject==null) &&
              <View style={{flexDirection:'row'}}>
                <Ionicons name="md-book" size={20} color={COLORS.A_blue} />
              </View>
            } */}
          </View>
        </TouchableOpacity>
        }
          
      </View>
    );
  };

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get projects*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getProject = (item) =>{
    var myproject = false;

    if(item.user_id == id && item.percentage != "100" ){
      myproject = true
    }

    return (
      <View>
        {myproject &&(
          <TouchableOpacity onPress={()=>{openProject(item, navigation)}}>
            <View style= {{marginBottom:10, height:80, backgroundColor:'#1111', marginHorizontal:10, borderRadius:15, flexDirection:'row'}}>
              <View style={{justifyContent:'center', marginStart:10}}>
                <Percentage percentage={item.percentage}/>
              </View>
              <Text style={{fontSize:20, marginStart:5, alignSelf:'center', marginTop:-5}}>{item.name}</Text>
            </View>

            <View style={{position:'absolute', right:20, top:5, flexDirection:'row'}}>
              
            {(item.star != '' && item.star != null && item.star !='no' ) &&
              <View style={{flexDirection:'row'}}>
                <Ionicons name="star" size={20} color={COLORS.A_blue} />
              </View>
            }
            {(item.star==''|| item.star==null || item.star=='no') &&
              <View style={{flexDirection:'row'}}>
                <Ionicons name="star-outline" size={20} color={'black'} />
              </View>
            }
            </View>


            <View style={{position:'absolute', right:20, top:55, flexDirection:'row'}}>
              
              {(item.subject!=''&& item.subject!=null) &&
                <View style={{flexDirection:'row'}}>
                  <Text style={{marginLeft:5, marginRight:5}}>{item.subject}</Text>
                  <Ionicons name="md-book" size={20} color={COLORS.A_blue} />
                </View>
              }
              {/* {(item.subject==''|| item.subject==null) &&
                <View style={{flexDirection:'row'}}>
                  <Ionicons name="md-book" size={20} color={COLORS.A_blue} />
                </View>
              } */}
            </View>
          </TouchableOpacity>
        )}
      </View>
    )

  }

  ///////////////////////////////////////////////////////////////////////////////////
   {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get done projects*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getDone = (item) =>{
    var myproject = false;

    if(item.user_id == id  && item.percentage == "100"){
      myproject = true
    }

    return (
      <View>
        {myproject &&(
         <TouchableOpacity onPress={()=>{openProject(item, navigation)}}>
         <View style= {{marginBottom:10, height:80, backgroundColor:'#1111', marginHorizontal:10, borderRadius:15, flexDirection:'row'}}>
           <View style={{justifyContent:'center', marginStart:10}}>
             <Percentage percentage={item.percentage}/>
           </View>
           <Text style={{fontSize:20, marginStart:5, alignSelf:'center', marginTop:-5}}>{item.name}</Text>
         </View>

         <View style={{position:'absolute', right:20, top:5, flexDirection:'row'}}>
           
         {(item.star != '' && item.star != null && item.star !='no' ) &&
           <View style={{flexDirection:'row'}}>
             <Ionicons name="star" size={20} color={COLORS.A_blue} />
           </View>
         }
         {(item.star==''|| item.star==null || item.star=='no') &&
           <View style={{flexDirection:'row'}}>
             <Ionicons name="star-outline" size={20} color={'black'} />
           </View>
         }
         </View>


         <View style={{position:'absolute', right:20, top:55, flexDirection:'row'}}>
           
           {(item.subject!=''&& item.subject!=null) &&
             <View style={{flexDirection:'row'}}>
               <Text style={{marginLeft:5, marginRight:5}}>{item.subject}</Text>
               <Ionicons name="md-book" size={20} color={COLORS.A_blue} />
             </View>
           }
           {/* {(item.subject==''|| item.subject==null) &&
             <View style={{flexDirection:'row'}}>
               <Ionicons name="md-book" size={20} color={COLORS.A_blue} />
             </View>
           } */}
         </View>
       </TouchableOpacity>
        )}
      </View>
    )

  }

    ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///main////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}
          />
                
          <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:22}}>All Projects</Text> 
         
          </View>

          <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>
          
        </View>

        <Divider width={5} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>

        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <View style={{ marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>

          {!showSearchList && <Text style={{fontSize:22, fontWeight:'500'}}> Projects: </Text>}
          {!showSearchList && <FontAwesome name="refresh" size={24} color="#333" style={{position:'absolute', right:80, marginTop:5}} onPress={()=>{setupdate(prevState => !prevState)}}/>}
          
          {showSearchList && 
            <View style={{flex:1/1.05}}> 
              <SearchComponent onSearchEnter={(newTerm) => {setTerm(newTerm);}} />
            </View>
          }

          {!showSearchList && 
          <TouchableOpacity style={{right:-85}} onPress={()=>{setShowSearchList(prevState => !prevState), setTerm('')}}>
            <Octicons name="search" size={30} color="#222" />
          </TouchableOpacity>}

          {showSearchList &&
          <TouchableOpacity style={{right:10}} onPress={()=>{setShowSearchList(prevState => !prevState), setTerm('')}} >
            <AntDesign name="close" size={30} color="black" style={{alignSelf:'center'}}/>
          </TouchableOpacity>}

          <TouchableOpacity
            style={{right:5}} 
            onPress={()=>{setModalVisible(true), setShowSearchList(false)}}
            // onPress={()=>{navigation.navigate('NewProjectPage')}}
          >
            <Octicons name="diff-added" size={30} color="#222" />
            {addProject()}
          </TouchableOpacity>

        </View>
        {/* <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:10}}/> */}
        {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
        {!showSearchList && 
        <TouchableOpacity onPress={()=>{setshowAllProjects(prevState => !prevState), setshowDoneProjects(false)}}>
          <MaterialIcons name="sort" size={22} color="black" style={{marginTop:-25, marginStart:100 ,position:'absolute'}}/>
        </TouchableOpacity>}

        {(showAllProjects && !showSearchList ) && 
        <View>
          {/* //all projects */}
          <View style={{marginTop:10, height:height-260, width:'100%'}}>
            <FlatList
              data={projects} 
              keyExtractor={item => item.project_id}
              initialNumToRender={500}
              windowSize={51}
              style={{marginHorizontal:-10}}

              renderItem={({item})=>{
                return(
                  <View>
                    {getProject(item)}
                  </View>
                ) 
              }}
            />
          </View>
        </View>
        }

        {/* search outputs */}
        {showSearchList && 
        <View style={{}}>

          {(term == '' || term == null) && 
            <View style={{position:'absolute', alignSelf:'center', marginTop:180}}>
              <Octicons size={62} name="search" color="#aaa" />
            </View>
          }
        
          {(term != '' && term != null) && 
          <View style= {{height:height-200}}>
            <FlatList
              data={projects}
              keyExtractor={ (user) => user.project_id}
              initialNumToRender={500}
              windowSize={51}
              style={{marginTop:5, marginHorizontal:5, paddingTop:5}}

              renderItem={({item})=>{

                return(
                  <View style= {{}}>
                    
                    {getResult(item)} 
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={0}></KeyboardAvoidingView>
                  </View>
                ) 
              }}
            />
            </View>
          }
        </View>
      }

        {/* //////////////////////////////////////////////////////////////////////////////// */}
        {!showSearchList && <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:0}}/>}

        {!showSearchList && 
        <View style={{ marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:22, fontWeight:'500'}}> Done: </Text>
        </View>}

        {/* <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:0}}/> */}
        {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
        {!showSearchList && 
        <TouchableOpacity onPress={()=>{setshowDoneProjects(prevState => !prevState), setshowAllProjects(showDoneProjects)}}>
          <MaterialIcons name="sort" size={22} color="black" style={{marginTop:-25, marginStart:70 ,position:'absolute'}}/>
        </TouchableOpacity>}

        {(showDoneProjects && !showSearchList )&&
        <View style={{width:'100%', height:height-260}}>
          <FlatList
            data={projects} 
            keyExtractor={item => item.project_id}
            initialNumToRender={500}
            windowSize={51}
            style={{ marginBottom:10, marginHorizontal:-10}}

            renderItem={({item})=>{
              return(
                <View>
                  {getDone(item)}
                </View>
              ) 
            }}
          />
        </View>}

      </SafeAreaView>
    </View>
  )
}
  
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
export default AllProjects