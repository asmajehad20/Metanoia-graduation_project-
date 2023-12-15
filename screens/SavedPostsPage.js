import { Modal, Pressable, ScrollView,FlatList, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../conts/colors'
import { Feather } from '@expo/vector-icons';
import {userr, pass, id} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ip } from '../getIP';

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const SavedPostsPage = ({navigation}) => {
  const goToChat=(email)=>{
    if(email != '' && email != null)
    navigation.navigate('one chat Page',{email})
  }

  const [USERS, setUser] = useState([])
  
  const [POSTS, setPosts] = useState([]);

  const [likes, setLikes] = useState([]);

  const [saved, setSaved] = useState([]);

  const [update, setupdate] = useState(false);

  
  
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get all posts*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(() => {

    try{
      fetch("http://"+ip+":3000/posts")
      .then((resp) => resp.json())
      .then((json) => {setPosts(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/users")
      .then((resp) => resp.json())
      .then((json) => {setUser(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/likes")
      .then((resp) => resp.json())
      .then((json) => {setLikes(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/saves")
      .then((resp) => resp.json())
      .then((json) => {setSaved(json)})
      .catch(function(error) {})
    }catch (error){}
  },[update])

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState('')

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
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  
  var name 
  const[selectedId, setselectedId] = useState("")

  const [showEditDelete, setShowEditDelete] = useState(false)
  const [showReport, setShowReport] = useState(false)


  const [modalVisible2, setModalVisible2] = useState(false);

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

                <TouchableOpacity onPress={()=>{deletepost(item)}}>
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
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const [modalVisible3, setModalVisible3] = useState(false);
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
      await fetch("http://"+ip+":3000/reportpost", {
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
      await fetch("http://"+ip+":3000/editpost", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "content": contentFOREditPost,
          "subject": subjectFOREditPost,
          "id": id,
          "post_id":item.post_id
        })
      })
      .then(res=>res)
      .then( async data =>{
        // console.log(data.status)
        if(data.status == 200){
          await fetch("http://"+ip+":3000/posts")
          .then((resp) => resp.json())
          .then((json) => {setPosts(json)})
          .catch(function(error) {})

      }})
      .catch(function(error) {});

    }catch(error){}}


    setSubjectFOREditPost('')
    setContentFOREditPost('')
    setEditPost(false)
    setShowEditDelete(false)
    
    
  }

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  const LikeButton = ({ callback, data, item }) => {
    const [liked, setLiked] = useState(false);
  
    useEffect(()=>{
      data.map(like => {
        if(like.user_id == id){
          if(like.post_id == item.post_id){
            setLiked(true)
          }
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

  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const updateLikes = (liked, item) =>{
    try{
      fetch("http://"+ip+":3000/PostLikes", {
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
         
          await fetch("http://"+ip+":3000/likes")
          .then((resp) => resp.json())
          .then((json) => {setLikes(json)})
          .catch(function(error) {})
        
          
          // console.log('is it really working?')

          await fetch("http://"+ip+":3000/posts")
          .then((resp) => resp.json())
          .then((json) => {setPosts(json)})
          .catch(function(error) {})
        }
      })
    }catch(error){}
  }

  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const SaveButton = ({ callback, data, item}) => {
    const [saved, setSaved] = useState(false);

    useEffect(()=>{
      data.map(save => {
        if(save.user_id == id){
          if(save.post_id == item.post_id){
            setSaved(true)
          }
        }
      })//end posts map
    },[])

    return (
      <TouchableOpacity
        style={{ position:'absolute', right:10 }}
        onPress={() => {
          setSaved(!saved);
          if (callback) {callback();}
          {updateSaves(saved, item)}
        }}
      >

        {saved ? (<FontAwesome name="bookmark" size={25} color={COLORS.A_dark_blue} />) : (<FontAwesome name="bookmark-o" size={25} color="#666" />)}
      </TouchableOpacity>
    );
  };
  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const updateSaves = (saved, item) =>{ 
    try{
      fetch("http://"+ip+":3000/PostSaves", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "item": item,
          "saved": saved,
          "id":id,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){
         
          await fetch("http://"+ip+":3000/saves")
          .then((resp) => resp.json())
          .then((json) => {setSaved(json)})
          .catch(function(error) {})
        

          await fetch("http://"+ip+":3000/posts")
          .then((resp) => resp.json())
          .then((json) => {setPosts(json)})
          .catch(function(error) {})
        }
      })
    }catch(error){}
  }

  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const getComments = (outitem)=>{
    return(
      <TouchableOpacity onPress={()=>{navigation.navigate('Comment Page', {outitem})}}>
        <MaterialCommunityIcons name="comment" size={25} color="#ccc" style={{marginTop:-1}}/>  
      </TouchableOpacity> 
    )
  }
  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //show user name//////////////////////////////////////////
  const getUserName =(i)=>{
    var data
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
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  const [editPost, setEditPost] = useState(false);
  const [contentFOREditPost, setContentFOREditPost] = useState('');
  const [subjectFOREditPost, setSubjectFOREditPost] = useState('');

  const getSavedPosts =(item)=>{
    var save = false;
    
    saved.map(i => {
      if(i.user_id ==id && item.post_id == i.post_id){
        save = true
      }
    });//end users map

    return (
      <View>
        {(save) &&
          <TouchableOpacity 
          style={{
            width:'95%', 
            minHeight:150, 
            backgroundColor:'white', 
            borderRadius:15, 
            borderColor:'#72A0C1', 
            alignSelf:'center', 
            marginTop:5,
            marginBottom:5,
          }}
        > 

          {/* header //////photo and name////////////////////////////////*/}
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity>
              {/* <Image 
                style={styles.story} 
                source={require('../assets/user_100_gray.png')} 
              /> */}
            </TouchableOpacity>

            {getUserName(item)} 
          
            {/* //my post */}
            {(item.user_id == id ) && 
              <View style={{position:'absolute', flexDirection:'row', right:13, marginTop:5}}>
                {(!showEditDelete || item.post_id != selectedId) && <Entypo name="dots-three-horizontal" size={22} color="#555" onPress={()=>{setShowEditDelete(true),setselectedId(item.post_id)}}/>}
                {(showEditDelete && item.post_id == selectedId)&& 
                  <View style={{right:0, flexDirection:'row'}}>
                    <MaterialIcons name="edit" size={24} color="#555"  onPress={()=>{setEditPost(true), setContentFOREditPost(item.content), setSubjectFOREditPost(item.subject)}}/>
                    <MaterialIcons name="delete" size={24} color="#555"  onPress={()=>{setModalVisible2(true)}}/>
                    {areyousureDelete(item)}
                    <MaterialIcons name="close" size={24} color="#555"  onPress={()=>{setShowEditDelete(false), setEditPost(false)}}/>
                  </View>
                }
              </View>
            }

            {(item.user_id != id ) && 
                <View style={{position:'absolute',  right:13, marginTop:5}}>
                  {(!showReport || item.post_id!=selectedId)&& <Entypo name="dots-three-horizontal" size={22} color="#555" onPress={()=>{setShowReport(true),setselectedId(item.post_id)}}/>}
                  { (showReport && item.post_id==selectedId)&&
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

          </View>

          {/* post content////////////////////////////////////////////////////////////////////////// */} 
          {(!editPost || item.post_id != selectedId ) &&   
            <View style={{width:'97%', minHeight:55, marginStart:3}}>
              <Text style={{flex: 1, flexWrap: 'wrap', paddingHorizontal:10, marginRight:2, fontSize:16}}>
                {item.content}
              </Text>
            </View>
          }

          {(editPost && item.post_id == selectedId) && 
            <View style={{width:'97%', minHeight:55, marginStart:3}}>
              <TextInput 
                style={{
                  flexWrap: 'wrap',
                  paddingHorizontal:10, 
                  marginRight:2, 
                  fontSize:16,
                  textAlignVertical:'top',
                }}
                autoFocus = {true}
                multiline={true}
                onChangeText={text => setContentFOREditPost(text)}
                value={contentFOREditPost}
              />

            </View>
          }

          {(editPost && item.post_id == selectedId) &&
            <TouchableOpacity 
              style={{position:'absolute', right:89, marginTop:5}}
              onPress={()=>{saveEditChanges(item)}}
            >
              <Entypo name="save" size={24} color={COLORS.A_dark_blue} />
            </TouchableOpacity>
          }

          {(item.subject !='' && item.subject != null) &&
            <View style={{marginStart:5}}>
              <View style={{flexDirection:'row',  paddingBottom:0, marginTop:5}}>

                <View style={{ marginVertical:0, marginHorizontal:5}}>
                  <Ionicons name="md-book" size={20} color={COLORS.A_dark_blue} />
                </View>

                {(!editPost || item.post_id != selectedId ) && <Text style={{fontSize:15, fontWeight:'500', alignSelf:'center'}}>{item.subject}</Text>}
                {(editPost && item.post_id == selectedId ) && 
                  <TextInput
                    style={{
                      borderBottomWidth:1, 
                      height:20, 
                      paddingHorizontal:3,
                      fontSize:15,
                    }}
                    onChangeText={text => setSubjectFOREditPost(text)}
                    value={subjectFOREditPost}
                  />
                }
              </View>
            </View>
          }
          
          {/* like comment save/////////////////////////////////////////////////////////////////////////////////////// */}
          <View style={{flexDirection:'row', marginVertical:10, marginStart:10,}}>
            <LikeButton data={likes} item={item} />
            {getComments(item)}
            <SaveButton data={saved} item={item} />   
          </View>

        </TouchableOpacity> 
        }
      </View>
    )
  }
    ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const deletepost = (item)=>{
    // console.log(item)
    try{
      fetch("http://"+ip+":3000/deletepost", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "item": item,
          "id":id,
        })
      })
      .then(res=>res)
      .then(async data =>{
        if(data.status == 200){

          await fetch("http://"+ip+":3000/posts")
          .then((resp) => resp.json())
          .then((json) => {setPosts(json)})
          .catch(function(error) {})
        }
      })
    }catch(error){}

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////
  ///main/////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={{width, height:height-255, backgroundColor:'white'}}>

      <View style={{justifyContent:'space-between', flexDirection:'row', marginStart:15, marginTop:10, marginBottom:0}}>
        <View style={{ flexDirection:'row',marginBottom:4}}>
          <Text style={{fontSize:18, fontWeight:'600', marginRight:5,  alignSelf:'center'}}>Saved:</Text>
          <FontAwesome name="refresh" size={19} color="#555" style={{position:'absolute', right:-18, marginTop:3}} onPress={()=>{setupdate(prevState => !prevState)}}/>
        </View>
      </View>

      <View style={{flex:1}}>
        <FlatList
          extraData={selectedId}
          data={POSTS} 
          keyExtractor={item => item.post_id}
          initialNumToRender={500}
          windowSize={51}
          style={{marginTop:5, backgroundColor:'#eeef', marginHorizontal:0, paddingTop:5}}

          renderItem={({item})=>{

            return(
              <View style= {{marginTop:2}}>
                {getSavedPosts(item)}   
              </View>
            )
          }}
        /> 
      </View>         
    </View> 
  )
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//styleing 
const styles = StyleSheet.create({
  contentContainer:{
    flex:1,
    paddingTop: 50, 
    paddingHorizontal: 15,
  },

  container: {
    height: "100%",
    flex: 1,
    backgroundColor: COLORS.A_white,
  },

  image: {
    width: 50,
    height: 50,
    marginRight:3,
    marginLeft:-10
  },

  logo:{
    flexDirection: 'row',
    flex:1,
  },

  story:{
    width:40,
    height:40,
    margin:5,
    borderWidth:0.5,
    borderColor:"gray",
    borderRadius:35,
  },

  text:{
    justifyContent:'center',
      alignSelf:'center',
      fontWeight:'bold',
      marginBottom:1.5,
      fontSize:17,
      marginStart:-2
  },

});

export default SavedPostsPage