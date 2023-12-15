import { Modal, Pressable, FlatList,KeyboardAvoidingView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../conts/colors'
import { Feather } from '@expo/vector-icons';
import {userr, pass, id} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchComponent,{keyword} from "../components/SearchComponent";
import { ip } from '../getIP';

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
const SuggestionPage = ({navigation}) => {

   // console.log(item)
   const goToChat=(email)=>{
    if(email != '' && email != null)
    navigation.navigate('one chat Page',{email})
  }

  const [updatee, setupdate] = useState(false);

  const [USERS, setUser] = useState([])

  const [data, setData]= useState([])

  const [mysubjects, setmysubjects] = useState([])

  const [Requests, setRequests] = useState([])

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get all posts*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(() => {

    try{
      fetch("http://"+ip+":3000/users")
      .then((resp) => resp.json())
      .then((json) => {setUser(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/data")
      .then((resp) => resp.json())
      .then((json) => {setData(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/requests/"+id)
      .then((resp) => resp.json())
      .then((json) => {setRequests(json)})
      .catch(function(error) {})
    }catch (error){}

    try{
      fetch("http://"+ip+":3000/mysubjects/"+id)
      .then((resp) => resp.json())
      .then((json) => {setmysubjects(json)})
      .catch(function(error) {})
    }catch (error){}
    

  },[updatee])
  
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const [showRequests, setShowRequests] = useState(false)
  const [showSearchList, setShowSearchList] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState('')

  const [term, setTerm] = useState("");

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* search term */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(()=>{ setTerm(keyword) },[term])

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* mini profile */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const miniProfile = ()=>{
    return(
      <Modal
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity onPress={()=> {setModalVisible(false)}} style={{backgroundColor:'rgba(0, 0, 0, 0.15)', flex:1}}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=> {}}
            style={[StyleSheet.absoluteFillObject,{backgroundColor:'white',marginTop:120,height:330,marginHorizontal:15,flex:1,padding:40,borderRadius:10,},]}>

            <View style={{marginTop:-35, marginHorizontal:-25, marginBottom:15,}}>

              <View style={{alignSelf:'auto', marginTop:10, flexDirection:'row', marginStart:5, justifyContent:'space-between'}}>
                <Text style={{fontSize:20, fontWeight:'600'}}>{profile.username}</Text>
                <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
                  <AntDesign name="close" size={30} color="#666" />
                </TouchableOpacity>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10, marginHorizontal:0}}/>

                <Image 
                  style={{width:100,alignSelf:'center',height:100,marginBottom:5,right:5,borderWidth:0.5,borderColor:"gray",borderRadius:100,}} 
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
                

                  <View style={{ marginTop:35, flexDirection:'row', justifyContent:'flex-start',}}>

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
  {/* requests */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getRequests=(item)=>{
    var m = false
    var Rname
    var use
    USERS.map(USER=>{
      if(item.to_user_id == id && item.from_user_id == USER.user_id ){
        Rname = USER.name
        use= USER
        m = true
      }
    })
    return (
      <View>
        {(m && !showSearchList) &&
        <View style={{}}>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setProfile(use)}} style={{flexDirection:'row', marginTop:7}}>
            {/* <Image 
              style={styles.story} 
              source={require('../assets/user_100_gray.png')} 
            /> */}
  
            {(item.subject != null && item.subject != '') &&
            <View style={{position:'absolute', right:10, alignSelf:'center' ,flexDirection:'row'}} >
              <Text style={{marginRight:5}}>{item.subject}</Text>
              <Ionicons name="md-book" size={20} color={COLORS.A_dark_blue} />
            </View>}
  
  
            <Ionicons name="person-circle-sharp" size={37} color="#666" style={{marginStart:10, marginVertical:0, marginHorizontal:5}}/>
            <Text style={{fontSize:18, alignSelf:'center', marginStart:0 }}>{Rname}</Text>
            {miniProfile()}
          </TouchableOpacity>

          <Divider style={{marginTop:5}}></Divider>
          <Text style={{flexWrap:'wrap', paddingHorizontal:15, marginVertical:5}}>{Rname} is asking you to work with them on project named: " {item.project_name} "</Text>

          <View style={{flexDirection:'row',  justifyContent:'space-evenly', marginVertical:5}}>
            
            <TouchableOpacity style={{}} onPress={()=>{declineRequest(item)}}>
              <Text style={{fontSize:16}}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{}} onPress={()=>{acceptRequest(item)}}>
              <Text style={{color:COLORS.A_dark_blue, fontSize:16}}>Accept</Text>
            </TouchableOpacity>
          </View>

          <Divider style={{marginTop:10}}></Divider>
  
        </View>
        }
      </View>
    )

  }
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* decline Request */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const declineRequest = async(item)=>{
    try{
     
          await fetch("http://"+ip+":3000/removeRequest", {
            method: "post", 
            headers:{ "Content-Type": "application/json", },
            body: JSON.stringify({
              "from_user_id":item.from_user_id, 
              "to_user_id":item.to_user_id,
              "project_name":item.project_name
            })
          })
          .then(res=>res)
          .then( async data =>{
            // console.log(data.status)
            if(data.status == 200){
              setupdate(prevState=>!prevState)
            }})
          .catch(function(error) {});

     
    }catch(error){}
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* accept Request */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const acceptRequest=(item)=>{
    // console.log(item)
    
    try{
      fetch("http://"+ip+":3000/ProjectClone", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "to_user_id":item.to_user_id, 
          "project_id":item.project_id, 
         
        })
      })
      .then(res=>res)
      .then( async data =>{
        // console.log(data.status)
        if(data.status == 200){
          //remove from request
          await fetch("http://"+ip+":3000/removeRequest", {
            method: "post", 
            headers:{ "Content-Type": "application/json", },
            body: JSON.stringify({
              "from_user_id":item.from_user_id, 
              "to_user_id":item.to_user_id, 
              "project_name":item.project_name
            })
          })
          .then(res=>res)
          .then( async data =>{
            // console.log(data.status)
            if(data.status == 200){
              try{
                fetch("http://"+ip+":3000/requests/"+id)
                .then((resp) => resp.json())
                .then((json) => {setRequests(json)})
                .catch(function(error) {})
              }catch (error){}
            }})
          .catch(function(error) {});

      }})
      .catch(function(error) {});

    }catch(error){}
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* users sugesstion*/}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getPeople2 = (item, subject, show)=>{
    // var show=false
    // var subject

    // subject = getPeople(item)
    // console.log(getPeople(item))

    return (
      <View>
        {show &&
        // (subject!='' && subject!=null && subject!=undefined)&&
          <View style={{marginTop:10,  marginHorizontal:20, backgroundColor:'white', borderRadius:10,}}>
            <TouchableOpacity onPress={()=>{setModalVisible(true),setProfile(item)}} style={{flexDirection:'row', marginTop:7}}>
              {/* <Image 
                style={styles.story} 
                source={require('../assets/user_100_gray.png')} 
              /> */}
 
              {(subject != null && subject != '') &&
                <View style={{position:'absolute', right:10, alignSelf:'center' ,flexDirection:'row'}} >
                  <Text style={{marginRight:5}}>{subject}</Text>
                  <Ionicons name="md-book" size={20} color={COLORS.A_dark_blue} />
                </View>
              }


              <Ionicons name="person-circle-sharp" size={37} color="#666" style={{marginStart:10, marginVertical:0, marginHorizontal:5}}/>
              <Text style={{fontSize:18, alignSelf:'center', marginStart:0 }}>{item.name}</Text>
              {miniProfile()}
            </TouchableOpacity>
            <Divider style={{marginTop:10}}></Divider>

          </View>
        }
      </View>
    )

  }

  const getPeople =(data)=>{//all users
    // const [show , setshow]= useState(false)
    var show = false
    var subjectold
    var subject 
    var item2

      if(data.user_id != id){
        USERS.map(item=>{
        if(item.user_id == data.user_id){
          
          mysubjects.map(sub=>{
            if(sub.subject == data.subject && sub.user_id == id && (data.day == 'sun' ||data.day == 'mon' )){
              
              subject = data.subject;

              if(subjectold != subject){
                // console.log('data',data.subject, item.email)
                subjectold = subject
                show = true
              }
              item2 = item
            }
          })
        }
      })}
        
        
        if(show){
          return(getPeople2(item2, subject, show))
        }
      
    
  }

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* search results */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getResult = ( item ) => {
    var t = false
    
    
    data.map(sub=>{
      // if(sub.subject == item.subject && item.user_id != id ){
      if(item.user_id != id ){

        if(item.name.startsWith(term)){
          t= true
        }else 

        if(item.name!=null && item.name.toLowerCase().startsWith(term.toLowerCase())){
          t= true
        }else

        if(item.subject !='' && item.subject != null){
          if(item.subject.toLocaleLowerCase().startsWith(term.toLowerCase())){
            t= true
          }
        }
      }
      // }
    })

    return (
      <View>
        {t &&
          <View style={{marginTop:10,  marginHorizontal:20, backgroundColor:'white', borderRadius:10,}}>
            <TouchableOpacity onPress={()=>{setModalVisible(true),setProfile(item)}} style={{flexDirection:'row', marginTop:7}}>
              {/* <Image 
                style={styles.story} 
                source={require('../assets/user_100_gray.png')} 
              /> */}

              {(item.subject != null && item.subject != '') &&
                <View style={{position:'absolute', right:10, alignSelf:'center' ,flexDirection:'row'}} >
                  <Text style={{marginRight:5}}>{item.subject}</Text>
                  <Ionicons name="md-book" size={20} color={COLORS.A_dark_blue} />
                </View>
              }


              <Ionicons name="person-circle-sharp" size={37} color="#666" style={{marginStart:10, marginVertical:0, marginHorizontal:5}}/>
              <Text style={{fontSize:18, alignSelf:'center', marginStart:0 }}>{item.name}</Text>
              {miniProfile()}
            </TouchableOpacity>
            <Divider style={{marginTop:10}}></Divider>

          </View>
        }
          
      </View>
    );
  };

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
    <View style={{width, height:height-255, backgroundColor:'white'}}>
    
      <View style={{ flexDirection:'row', marginStart:15, marginTop:10, marginBottom:-10}}>
        <View style={{ flexDirection:'row', marginBottom:3}}>

          <TouchableOpacity 
            style={{marginRight:5}} 
            onPress={()=>{setShowSearchList(prevState => !prevState), setTerm('')}}
          >
            <Octicons name="search" size={25} color="black" />
          </TouchableOpacity>

          {showSearchList && 
            <View style={{flex:2, position:'absolute', marginStart:-5, marginTop:-1, width:294}}> 
              <SearchComponent onSearchEnter={(newTerm) => {setTerm(newTerm);}} />
            </View>
          }

          {!showSearchList &&
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{setShowRequests(false)}} >
              <Text style={{fontSize:18, fontWeight:'600', marginRight:5}}>Peaple Suggestions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setupdate(prevState => !prevState)}} style={{alignSelf:'center', marginTop:2}}>
              <FontAwesome name="refresh" size={20} color="#333"  />
            </TouchableOpacity>
          </View>
          }

          {showSearchList && 
          <TouchableOpacity 
            style={{position:'absolute' , left:260, marginTop:2, justifyContent:'center'}} 
            onPress={()=>{ setTerm(''),setShowSearchList(prevState => !prevState)}}
            // onPress={()=>navigation.navigate('Search Page')}
          >
            <AntDesign name="close" size={22} color="black" style={{alignSelf:'center'}}/>
          </TouchableOpacity>
        }

          <TouchableOpacity onPress={()=>{setShowRequests(true), setShowSearchList(false)}} style={{alignSelf:'center', left:300, position:'absolute'}}>
            <Text style={{fontSize:15, fontWeight:'600', color:COLORS.A_dark_blue,}}>Requests</Text>
          </TouchableOpacity>
        </View>
        
        
      </View>
      
      <Divider style={{marginTop:15}}></Divider>


      {(!showRequests && !showSearchList) &&
        <FlatList
          data={data} 
          keyExtractor={item => item.id}
          initialNumToRender={500}
          windowSize={51}
          style={{marginBottom:0 , marginTop:0, backgroundColor:'#eeef', marginHorizontal:-2}}

          renderItem={({item})=>{

            return(
              <View> 
                {getPeople(item)}
              </View> 
            ) 
          }}
        /> 
      }

      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* posts page body */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}

      {/* search outputs */}
      {showSearchList && 
        <View style={{}}>

          {(term == '' || term == null) && 
            <View style={{position:'absolute', alignSelf:'center', marginTop:180}}>
              <Octicons size={62} name="search" color="#aaa" />
            </View>
          }
        
          {(term != '' && term != null) && 
          <View style= {{height:height-300}}>
            <FlatList
              data={USERS}
              keyExtractor={ (user) => user.user_id}
              style={{marginBottom:0 , marginTop:0, backgroundColor:'#eeef', marginHorizontal:-2}}

              renderItem={({item})=>{

                return(
                  <View style= {{}}>
                    
                    {getResult(item)} 
                  </View>
                ) 
              }}
            />
            </View>
          }
        </View>
      }

      {(showRequests && !showSearchList) &&
        <FlatList
          data={Requests} 
          keyExtractor={item => item.request_id}
          style={{marginBottom:0 , marginTop:0, backgroundColor:'#eeef', marginHorizontal:-2, paddingTop:10}}
          renderItem={({item})=>{

            return(
              
              <View style= {{marginBottom:10,  marginHorizontal:20, backgroundColor:'white', borderRadius:10}}>
               {getRequests(item)} 
              </View>
            ) 
          }}
        /> 
      }                 
    </View> 
  );
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
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
    width: 50,
    height: 50,
    marginRight:3,
    marginLeft:-10
  },

  logo:{
    flexDirection: 'row',
    flex:1,
  },

  add:{
    // flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'flex-end',
    backgroundColor:COLORS.A_yellow,
    height:55,
    width:55,
    borderRadius:100,
    marginTop:-200,
    marginRight:-3
  },

  postslist:{
    height: "100%",
    flex: 1,
    backgroundColor: COLORS.A_blue,
  },

  story:{
    width:40,
    height:40,
    margin:5,
    borderWidth:0.5,
    borderColor:"gray",
    borderRadius:35,
  },


  image: {
    width: 40,
    height: 40,
  },

  //////////////////////////
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SuggestionPage