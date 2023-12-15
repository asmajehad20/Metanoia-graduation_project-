import {Keyboard, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, FlatList, Image, ScrollView, TouchableOpacity,SafeAreaView, Modal, TextInput, Alert, StyleSheet} from 'react-native';
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
import { Feather } from '@expo/vector-icons';

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export default CommentPage = ({navigation, route}) => {
  const {outitem} = route.params;
  const [update2, setupdate2] = useState(false)

  // console.log(outitem)

  const goToChat=(email)=>{
    if(email != '' && email != null)
    navigation.navigate('one chat Page',{email})
  }
  
  const [Comment, setComment] = useState([
    // {comment_id:'0', post_id:'9', user_id:'1', content:'fu'},
    // {comment_id:'3', post_id:'1', user_id:'1', content:'comment 1'},//user who have ~~token
    // {comment_id:'5', post_id:'1', user_id:'3', content:'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'},
    // {comment_id:'2', post_id:'5', user_id:'1', content:'fu'},
    // {comment_id:'4', post_id:'7', user_id:'09', content:'what?'},
  ])

  const [CommentLikes, setCommentLikes] = useState([
    // {Liked_comment_id:'1', comment_id:'3', user_id:'09'},//user who have ~~token
    // {Liked_comment_id:'2', comment_id:'3', user_id:'3'},
    // {Liked_comment_id:'3', comment_id:'5', user_id:'1'},
    // {Liked_comment_id:'4', comment_id:'7', user_id:'09'},
  ])
    
  const [USERS, setUser] = useState([
    // {user_id:'1', name:'asma',    photo:'', email:'asmajehad919@gmail.com', username:'asma_jehad', phonenumber:'09080', subject:'java'},
    // {user_id:'2', name:'aya',     photo:'', email:'aya1@gmail.com'        , username:'aya04'     , phonenumber:'', subject:'java'},
    // {user_id:'3', name:'tasbeh',  photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    // {user_id:'4', name:'manar',   photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    // {user_id:'5', name:'tasneem', photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    // {user_id:'6', name:'asma2',   photo:'', email:'asma2@gmail.com'       , username:'asma22'    , phonenumber:'0000', subject:'data structure'},
    // {user_id:'7', name:'amal',    photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    // {user_id:'8', name:'anwar',   photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
  ])

  useEffect(()=>{
    try{
      fetch("http://"+ip+":3000/users")
      .then((resp) => resp.json())
      .then((json) => {setUser(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/CommentLikes")
      .then((resp) => resp.json())
      .then((json) => {setCommentLikes(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/Comment")
      .then((resp) => resp.json())
      .then((json) => {setComment(json)})
      .catch(function(error) {})
    }catch (error){}

  },[update2])

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  const [ addComment, setAddComment] = useState('')
  const [selectedId, setselectedId] = useState("")
  const [showEditDelete, setShowEditDelete] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState('')

  const [editPost, setEditPost] = useState(false);
  const [contentFOREditPost, setContentFOREditPost] = useState('');

  //are you sure delete
  const [modalVisible2, setModalVisible2] = useState(false);

  //are you sure report
  const [modalVisible3, setModalVisible3] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* Like Button */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const LikeButton = ({ callback, data, item }) => {
    const [liked, setLiked] = useState(false);
  
    useEffect(()=>{
      data.map(like => {
        if(like.user_id == id){
          if(like.post_id == item.post_id){ setLiked(true) }
        }
      })//end posts map
    },[])

    return (
      <TouchableOpacity
        style={{ flexDirection:'row', marginRight:5 }}
        onPress={() => {
          setLiked(!liked);
          if (callback) {callback();}
          {updateLikes(liked, item)}
        }}
      >
        {liked ? (<AntDesign name="heart" size={25} color="red" />) : (<AntDesign name="hearto" size={25} color="#666" />)}
      </TouchableOpacity>
    );
  };

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* update likes list */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const updateLikes = async(liked, item) =>{

    // console.log(item, liked)
    try{
      await fetch("http://"+ip+":3000/updatecommentLikes", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "item": item,
          "liked": liked,
          "id":id,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
         setupdate2(prevState=> !prevState)
        }
      })
    }catch(error){}
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* user name */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getUserName =(i)=>{
    var data
    var name
    USERS.map(item => {
      if(i.user_id == item.user_id){
        name = item.name
        data = {user_id:item.user_id, name:item.name, phonenumber:item.phonenumber, username:item.username, email:item.email, photo:item.photo}
      }
    });//end users map
    
    return (
      <TouchableOpacity 
        style={{
          flexDirection:'row',
          justifyContent:'center',
          alignSelf:'center',
          fontWeight:'bold',
          marginBottom:1.5,
          fontSize:17,
          marginStart:-2
        }}
        onPress={()=> {setModalVisible(true),setProfile(data)}}
      >

        <Ionicons name="person-circle-sharp" size={37} color="#666" style={{marginStart:10, marginVertical:5, marginHorizontal:5}}/>
        <Text style={styles.text}>{name}</Text>
        {miniProfile()}
      </TouchableOpacity>
    )
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* mini profile */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const miniProfile = ()=>{
    return(
      <Modal 
        transparent={true}
        visible={modalVisible} >
        <TouchableOpacity onPress={()=> {setModalVisible(false)}} style={{backgroundColor:'rgba(0, 0, 0, 0.15)', flex:1,}}>
          <TouchableOpacity 
            activeOpacity={1}
            style={[ StyleSheet.absoluteFillObject, { backgroundColor:'white',position: 'absolute', marginTop:120, height:330, marginHorizontal:15, flex:1, padding:40, borderRadius:10, }, ]} >

            {/* ////miniprofile start///////////////////////////////////////////////////// */}
            <View style={{marginTop:-35, marginHorizontal:-25, marginBottom:15,}}>

              <View style={{alignSelf:'auto', marginTop:10, flexDirection:'row', marginStart:5, justifyContent:'space-between'}}>
                <Text style={{fontSize:20, fontWeight:'600'}}>{profile.username}</Text>
                <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
                  <AntDesign name="close" size={30} color="#666" />
                </TouchableOpacity>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10, marginHorizontal:0}}/>

              {/* ///////////////////////////////////////////////////////////////////////////// */}
              <Image 
                style={{ width:100, alignSelf:'center', height:100, marginBottom:5, right:5, borderWidth:0.5, borderColor:"gray", borderRadius:100, }} 
                source={require('../assets/user_100_gray.png')} 
              />

              <View style={{alignSelf:'center', flexDirection:'row'}}>
                <MaterialIcons name="email" size={25} color={COLORS.A_dark_blue} style={{alignSelf:'center', marginTop:4}}/>
                <Text style={{fontSize:20, fontWeight:'500'}}>{profile.email}</Text>
              </View>

              <View style={{marginTop:10, marginLeft:5 }}>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text style={{fontSize:16, fontWeight:'400'}}>Name: {profile.name}</Text>
                  {( profile.phonenumber != '' && profile.phonenumber != null) && <Text style={{fontSize:16, fontWeight:'400'}}>Phone: {profile.phonenumber}</Text>}
                </View>
              
                <View style={{marginTop:35, flexDirection:'row', justifyContent:'flex-start',}} >
                  <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{goToChat(profile.email), setModalVisible(false)}}>
                    <MaterialCommunityIcons name="send-circle" size={45} color={COLORS.A_dark_blue} />
                    <Text style={{alignSelf:'center'}}> Send a message</Text>
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
  {/* are you sure delete */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const areyousureDelete = (item)=>{
    return(
      <Modal 
        transparent={true}
        visible={modalVisible2} >
        <TouchableOpacity onPress={()=> {setModalVisible2(false)}} style={{backgroundColor:'rgba(0, 0, 0, 0.15)', flex:1,}}>
          <TouchableOpacity 
            activeOpacity={1}
            style={[ StyleSheet.absoluteFillObject, { backgroundColor:'white',position: 'absolute', marginTop:190, height:240, marginHorizontal:15, flex:1, padding:40, borderRadius:10, }, ]} >

            {/* ////miniprofile start///////////////////////////////////////////////////// */}
            <View style={{marginTop:-35, marginHorizontal:-25, marginBottom:15,}}>

              <View style={{alignSelf:'auto', marginTop:10, flexDirection:'row', marginStart:5, justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={()=>{setModalVisible2(false)}}>
                  <AntDesign name="close" size={30} color="#666" />
                </TouchableOpacity>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10, marginHorizontal:0}}/>

              {/* ///////////////////////////////////////////////////////////////////////////// */}
              <Text style={{alignSelf:'center', fontSize:16, marginTop:30}}>Are You Sure you want to Delete this post</Text>
              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:50}}>
                <TouchableOpacity onPress={()=>{setModalVisible2(false)}}>
                  <Text style={{fontSize:18, fontWeight:'400'}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{deletepost(item), setModalVisible2(false)}}>
                  <Text style={{fontSize:18, fontWeight:'500', color:COLORS.A_dark_blue}}>Delete</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* are you sure report */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const areyousureReport = (item)=>{
    return(
      <Modal 
        transparent={true}
        visible={modalVisible3} >
        <TouchableOpacity onPress={()=> {setModalVisible3(false)}} style={{backgroundColor:'rgba(0, 0, 0, 0.15)', flex:1,}}>
          <TouchableOpacity 
            activeOpacity={1}
            style={[ StyleSheet.absoluteFillObject, { backgroundColor:'white',position: 'absolute', marginTop:190, height:240, marginHorizontal:15, flex:1, padding:40, borderRadius:10, }, ]} >

            {/* ////miniprofile start///////////////////////////////////////////////////// */}
            <View style={{marginTop:-35, marginHorizontal:-25, marginBottom:15,}}>

              <View style={{alignSelf:'auto', marginTop:10, flexDirection:'row', marginStart:5, justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={()=>{setModalVisible3(false)}}>
                  <AntDesign name="close" size={30} color="#666" />
                </TouchableOpacity>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10, marginHorizontal:0}}/>

              {/* ///////////////////////////////////////////////////////////////////////////// */}
              <Text style={{alignSelf:'center', fontSize:16, marginTop:30}}>Are You Sure you want to Report this post</Text>
              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:50}}>
                <TouchableOpacity onPress={()=>{setModalVisible3(false)}}>
                  <Text style={{fontSize:18, fontWeight:'400'}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{reportPost(item), setModalVisible3(false)}}>
                  <Text style={{fontSize:18, fontWeight:'500', color:COLORS.A_dark_blue}}>Report</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* report post */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const reportPost = async( item)=>{
    // console.log('in report post fun')
    // console.log(selectedId, item)
    try{
      await fetch("http://"+ip+":3000/reportcomment", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "item": item,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
        }
      })
    }catch(error){}
  }

  const deletepost = async(item)=>{
    // console.log(item)
    try{
      await fetch("http://"+ip+":3000/deletecomment", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "comment_id": item.comment_id,
          "user_id":id,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
          setupdate2(prevState => !prevState)
        }
      })
    }catch(error){}

  }


  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* save Edit Changes */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const saveEditChanges = async(item)=>{
    // console.log('in save edit post')

    // contentFOREditPost
    // subjectFOREditPost
    // id
    

    if(contentFOREditPost != '')
    {try{
      await fetch("http://"+ip+":3000/editcomment", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "comment_id":item.comment_id,
          "content": contentFOREditPost,
          "id": id,
          "post_id":item.post_id
        })
      })
      .then(res=>res)
      .then( async data =>{
        // console.log(data.status)
        if(data.status == 200){
          setupdate2(prevState => !prevState)
        

      }})
      .catch(function(error) {});

    }catch(error){}}


    setContentFOREditPost('')
    setEditPost(false)
    setShowEditDelete(false)
    
  }


  ////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  const addnewComment=async()=>{
    //outitem.post_id
    //id
    //addComment

    try{
      await fetch("http://"+ip+":3000/addcomment", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "post_id": outitem.post_id,
          "user_id": id,
          "content": addComment,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
         setupdate2(prevState => !prevState)
        }
      })
    }catch(error){}

    setAddComment('')

  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  return (  
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <View style={{flex:1,marginTop:10, backgroundColor:COLORS.A_dark_blue, marginHorizontal:-20}}>

          <View style={{marginTop:15, marginBottom:10, marginStart:15}}>
            <Text style={{color:'white', fontSize:24}}>Comments</Text>
          </View>

          <AntDesign name="right" size={28} color="#fff" style={{position:'absolute' ,marginTop:18, right:10}} onPress={()=> {navigation.goBack()}}/>

          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* comment list view */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={{flex:1, backgroundColor:'#eeef', borderTopLeftRadius:30, borderTopRightRadius:30}}>
            <FlatList
              extraData={selectedId}
              data={Comment} 
              keyExtractor={item => item.comment_id}
              initialNumToRender={500}
              windowSize={51}
              style={{flex:1, marginTop:9, marginHorizontal:5,}}

              renderItem={({item})=>{

                return(
                  <View style= {{marginBottom:4}}>
                    {( outitem.post_id == item.post_id ) && 
                      <View 
                        style={{
                          width:'95%', 
                          minHeight:100, 
                          backgroundColor:'white', 
                          borderRadius:15, 
                          borderColor:'#72A0C1',
                          alignSelf:'center', 
                          marginTop:5,
                          marginBottom:5,
                        }}

                      > 
                        {/* ///////////////////////////////////////////////////////////////////// */}
                        {/* name and photo */}
                        {/* ///////////////////////////////////////////////////////////////////// */}
                        <View style={{flexDirection:'row'}}>
                          {/* <TouchableOpacity onPress={()=>{console.log('open')}}>
                            <Image 
                              style={{width:30, height:30, margin:5, borderWidth:0.5, borderColor:"gray", borderRadius:35, marginStart:8}} 
                              source={require('../assets/user_100_gray.png')} 
                            />
                          </TouchableOpacity> */}
                          {getUserName(item)} 
                          
                        </View>

                        {/* ///////////////////////////////////////////////////////////////////// */}
                        {/* three dots */}
                        {/* ///////////////////////////////////////////////////////////////////// */}
                        {(item.user_id != id ) && 
                          <View style={{position:'absolute',  right:13, marginTop:5}} onPress={()=>{console.log('report this post', item)}}>
                            {(!showReport || item.comment_id != selectedId)&& <Entypo name="dots-three-horizontal" size={22} color="#555" onPress={()=>{setShowReport(true),setselectedId(item.comment_id)}}/>}
                            { (showReport && item.comment_id == selectedId)&&
                              <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{}} onPress={()=>{setModalVisible3(true)}}>
                                  <MaterialIcons name="report" size={24} color="#888" style={{alignSelf:'center'}}/>
                                  {areyousureReport(item)}
                                </TouchableOpacity>
                                <MaterialIcons name="close" size={24} color="#888" style={{alignSelf:'center'}} onPress={()=>{setShowReport(false)}}/>
                              </View>
                            }
                          </View>
                        }

                        {(item.user_id == id ) && 
                          <View style={{position:'absolute', flexDirection:'row', right:13, marginTop:5}}>
                            {(!showEditDelete || item.comment_id != selectedId) && <Entypo name="dots-three-horizontal" size={22} color="#555" onPress={()=>{setShowEditDelete(true),setselectedId(item.comment_id)}}/>}
                            {(showEditDelete && item.comment_id == selectedId)&& 
                              <View style={{right:0, flexDirection:'row'}}>
                                <MaterialIcons name="edit" size={24} color="#555"  onPress={()=>{setEditPost(true), setContentFOREditPost(item.content)}}/>
                                <MaterialIcons name="delete" size={24} color="#555"  onPress={()=>{setModalVisible2(true)}}/>
                                {areyousureDelete(item)}
                                <MaterialIcons name="close" size={24} color="#555"  onPress={()=>{setShowEditDelete(false), setEditPost(false)}}/>
                              </View>
                            }
                          </View>
                        }

                        {/* ///////////////////////////////////////////////////////////////////// */}
                        {/* content */}
                        {/* ///////////////////////////////////////////////////////////////////// */}
                        {(!editPost || item.comment_id != selectedId ) && 
                          <View style={{width:'97%', minHeight:30, marginStart:3, marginTop:-5, marginBottom:3}}>
                            <Text style={{flex: 1, flexWrap: 'wrap', paddingHorizontal:10, marginRight:2, fontSize:16}}>
                              {item.content}
                            </Text>
                          </View>
                        }

                        {(editPost && item.comment_id == selectedId) && 
                          <View style={{width:'97%', minHeight:30, marginStart:3, marginTop:-5, marginBottom:3}}>
                            
                            <TextInput 
                              style={{ flexWrap: 'wrap', paddingHorizontal:10, marginRight:2, fontSize:16, textAlignVertical:'top',}}
                              autoFocus = {true}
                              multiline={true}
                              onChangeText={text => setContentFOREditPost(text)}
                              value={contentFOREditPost}
                            />
  
                          </View>
                        }

                        {(editPost && item.comment_id == selectedId) &&
                          <TouchableOpacity 
                            style={{position:'absolute', right:89, marginTop:5}}
                            onPress={()=>{saveEditChanges(item)}}
                          >
                            <Entypo name="save" size={24} color={COLORS.A_dark_blue} />
                          </TouchableOpacity>
                        }

                        {/* ///////////////////////////////////////////////////////////////////// */}
                        {/* like */}
                        {/* ///////////////////////////////////////////////////////////////////// */}
                        <View style={{flexDirection:'row', marginBottom:7, marginTop:3, marginStart:10,}}>
                          <LikeButton data={CommentLikes} item={item} />
                        </View>
                      </View> 
                    }
        
                  </View>
                ) 
              }}      
            />

            {/* ///////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////// */}
            {/* addcomment */}
            {/* ///////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////// */}
            <View style={{flexDirection:'row', backgroundColor:'white', borderColor:COLORS.A_dark_blue, marginBottom:5, borderWidth:1, alignSelf:'center', marginHorizontal:5,  borderRadius:20}}>

              <TextInput
                style={{ 
                  flex:1,
                  minHeight: 10, 
                  alignSelf:'center',
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  fontSize:20,
                  borderRadius: 20,
                  justifyContent:'center',
                  textAlignVertical:'top',   
                }}

                multiline={true}
                onChangeText={setAddComment}
                value={addComment}
              />

              <TouchableOpacity 
                style={{ marginRight:10, marginLeft:-5, height:60, justifyContent:'center'}}
                onPress={()=>{addnewComment()}}
              >
                <Feather name="send" size={28} color={COLORS.A_dark_blue} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    text:{
      justifyContent:'center',
      alignSelf:'center',
      fontWeight:'bold',
      marginBottom:1.5,
      fontSize:15,
      marginStart:-2
    },

  });