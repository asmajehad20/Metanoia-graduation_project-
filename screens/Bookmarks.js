import {ScrollView, Dimensions,KeyboardAvoidingView,TextInput, SafeAreaView, View, Button, TouchableOpacity, Text, StyleSheet, Image, FlatList, Animated} from 'react-native';
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
const {width, height} = Dimensions.get('screen')
import Percentage from '../components/Percentage';
import SearchComponent,{keyword} from "../components/SearchComponent";
import { ip } from '../getIP';

/////////////////////////////////////////////////////////////
const openProject=(item, navigation)=>{
  // theProject = project
  navigation.navigate('the Project', {item})
}

var today = moment().format('YYYY-MM-DD')
const Bookmarks = ({navigation}) => {

  const [showSearchList, setShowSearchList] = useState(false)

  const [showAllProjects, setshowAllProjects] = useState(true);
  const [showDoneProjects, setshowDoneProjects] = useState(false);

  const [update, setupdate] = useState(false);
  const [term, setTerm] = useState("");
  
  const [projects, setProjects]= useState([])

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

  },[update])
  useEffect(() => {

    try{
      fetch("http://"+ip+":3000/projects")
      .then((resp) => resp.json())
      .then((json) => {setProjects(json)})
      .catch(function(error) {})
    }catch (error){}

  },[])

  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* search term */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  useEffect(()=>{ setTerm(keyword) },[term])
  
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* get star projects */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////// */}
  const getProject = (item) =>{
    var myproject = false;

    if(item.star == "yes" && item.user_id == id ){
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

  //////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


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
        
        if(item.name.startsWith(term) && item.star == "yes" && item.user_id == id ){
          Post = post
          t= true
        }else 

        if(item.name!=null && item.name.toLowerCase().startsWith(term.toLowerCase())&&item.star == "yes" && item.user_id == id ){
          Post = post
          t= true
        }else
        
        if(post.subject!=null && post.subject!='' && post.subject.toLocaleLowerCase().startsWith(term.toLowerCase())&&item.star == "yes" && item.user_id == id ){
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


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}
          />
                
          <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:22}}>Bookmarks</Text> 
          </View>

          <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>
          
        </View>

        <Divider width={5} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>

        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <View style={{ marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>

          {!showSearchList && <Text style={{fontSize:22, fontWeight:'500'}}> Projects: </Text>}
          {!showSearchList && <FontAwesome name="refresh" size={24} color="#555" style={{position:'absolute', left:100, marginTop:5}} onPress={()=>{setupdate(prevState => !prevState)}}/>}

          {showSearchList && 
            <View style={{flex:1/1.05}}> 
              <SearchComponent onSearchEnter={(newTerm) => {setTerm(newTerm);}} />
            </View>
          }

          {!showSearchList &&
          <TouchableOpacity style={{right:10}} onPress={()=>{setShowSearchList(prevState => !prevState), setTerm('')}} >
            <Octicons name="search" size={30} color="#222" />
          </TouchableOpacity>}

          {showSearchList &&
          <TouchableOpacity style={{right:10}} onPress={()=>{setShowSearchList(prevState => !prevState), setTerm('')}} >
            <AntDesign name="close" size={30} color="black" style={{alignSelf:'center'}}/>
          </TouchableOpacity>}

        </View>

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
        

        {!showSearchList &&
        <View>
          {/* //all projects */}
          <View style={{marginTop:10, height:height-190, alignSelf:'center', width:'100%'}}>
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

  });

export default Bookmarks