import {ScrollView, SafeAreaView, View, Text ,TouchableWithoutFeedback, StyleSheet,TouchableOpacity,Image, Dimensions, FlatList, Animated} from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../conts/colors'
import SearchBar from '../components/SearchBar'
import { Feather } from '@expo/vector-icons';
import CommunityHeader from '../components/CommunityHeader';
import {userr, pass, id} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { FontAwesome } from '@expo/vector-icons';
var hehe = 220

 
const CommunityPage = ({ navigation }) => {
  console.log("user:"+userr, "id:"+id)
  const [scroll, setScroll] = useState(true)
  var i =0
  const [likedstate, setlikedstate] = useState(true)

  //fetch all users and all posts from all users render them on flatlist
  const [USERS, setUser] = useState([
    {user_id:'1', name:'asma', photo:'', },
    {user_id:'2', name:'aya', photo:'', },
    {user_id:'3', name:'tasbeh', photo:'', },
    {user_id:'4', name:'manar', photo:'', },
    {user_id:'5', name:'tasneem', photo:'', },
    {user_id:'6', name:'fatima', photo:'', },
    {user_id:'7', name:'amal', photo:'', },
    {user_id:'8', name:'anwar', photo:'', },

  ])
  
  const [POSTS, setPosts] = useState([
    {post_id:'1', content:"post 1", user_id:'1'},
    {post_id:'2', content:"post 2", user_id:'2'},
    {post_id:'3', content:"post 3", user_id:'3'},
    {post_id:'4', content:"post 4", user_id:'4'},
    {post_id:'5', content:"post 5", user_id:'5'},
    {post_id:'6', content:"post 6", user_id:'6'},
    {post_id:'7', content:"post 7", user_id:'7'},
    {post_id:'8', content:"post 8 very very long text hushdsnjndevbcd hefdfhneksf jhhhfnkmsd  j jhdfsjk jhduuemf kjfuefid ijdjei ihefj njdsudhfew ehuhsud ushijijijihhuycby yhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh dddddh hhhhhhhhhhuuuuuuuu y0oijijok jhjaskmxknjschbnimkdmm jn hbh kmnh vfhjnhvfjnjg htffvjn j jhhbh bjnj j j nj nhcvgv hs s csd sj s j bdbhdbhsn bsgvxha t6t 6t6t6rdfghuuuuuuu ddddddddddd", user_id:'8'},
  ]);

  const [likes, setLikes] = useState([
    {Lp_id:'1', post_id:'1', user_id:'0'},//user who have ~~token
    {Lp_id:'2', post_id:'3', user_id:'0'},
    {Lp_id:'3', post_id:'5', user_id:'0'},
    {Lp_id:'4', post_id:'7', user_id:'0'},
    {Lp_id:'5', post_id:'2', user_id:'90'},
  ])

  
  //show likes /////////////////////////////////////////////
  
  var liked 
  const [firsttime, setfirsttime] = useState(true)

  const isLiked = (item) =>{
    if(firsttime == true)
    {
      likes.map(like => {
      if(like.user_id == id){
          if(like.post_id == item.post_id){
            liked = false//flase means its liked
            console.log("first time ", liked)
            // setlikestate(true)
          }
      }
    })//end posts map
  }//end if

    // setfirsttime(false)/////////////////
  }
  /////////////////////////////////////////////////////////

  //put like///////////////////////////////////////////////
  const[selectedId, setselectedId] = useState("")
  const[change, setchange] = useState(false)
  const[comClicked, setcomClicked] = useState(false)
  
  const setlike = (item) =>{
    console.log("gg",item.post_id)
    
    // showicon(false)
    setselectedId(item.post_id)
    setchange(!change)

    // setlikedstate(false)
    const newState = likes.map(like => {
      if(like.user_id == id){
        if(like.post_id == item.post_id){
            console.log(like)
            console.log('inside inside', like.user_id, like.post_id)
            return {...like, user_id: '', post_id:''};
        }
      }
      return like
      
    })//end posts map
    setLikes(newState);
    // forceUpdate()
    console.log('i get here hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', likes)
     
  }

  const setcomm = (item) =>{
    setselectedId(item.post_id)
    //if first time clicked through this id always open
    setcomClicked(!comClicked)
  }
 
  //show user name//////////////////////////////////////////
  const getUserName =(i)=>{
    var name 
      USERS.map(item => {
        if(i.user_id == item.user_id){
          name = item.name
        }
      });//end users map
    
    return (
    <TouchableOpacity style={styles.text}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
    )
  }
  ////////////////////////////////////////////////////////////
  

  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>
        
        <View style={{marginBottom:110}}>
          <CommunityHeader />
          {/* <SearchBar /> */}
          <Divider width={1} orientation='vertical' style={{marginTop:10, marginBottom:15}}/>

          <View style={{ flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}>

          <TouchableOpacity >
            <View style={{padding:8, height:90, width:110, backgroundColor:COLORS.A_yellow , borderRadius:8}}>

              <View style={{marginLeft:4 ,height:50, width:50}}>
                <Image 
                source={require('../assets/people.png')} 
                style={styles.image}/>
              </View>

              <Text style={{fontSize:16, fontWeight:'700', marginTop:-10,marginLeft:-3, marginStart:5}}>Suggested</Text>

            </View>
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={{padding:8, height:90, width:110, backgroundColor:COLORS.A_yellow, borderRadius:8}}>
              <View style={{marginTop:3, marginLeft:4 ,height:50, width:50}}>

                <Image 
                source={require('../assets/team.png')} 
                style={styles.image}/>

              </View>

              <Text style={{fontSize:16, fontWeight:'700', marginTop:-10,marginLeft:-3, marginStart:5}}>Friends</Text>

            </View>
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={{padding:8, height:90, width:110, backgroundColor:COLORS.A_yellow, borderRadius:8}}>
              <View style={{marginTop:3, marginLeft:4 ,height:50, width:50}}>
                <Image 
                source={require('../assets/me.png')} 
                style={styles.image}/>

              </View>

              <Text style={{fontSize:16, fontWeight:'700', marginTop:-10,marginLeft:-3, marginStart:5}}>My Posts</Text>

            </View>
          </TouchableOpacity>

          </View>

          <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10}}/>

          <View style={{backgroundColor:COLORS.A_white ,justifyContent:'space-evenly', flexDirection:'row', marginBottom:0, borderRadius:10}}>

            <View style={{height:50, width:170, justifyContent:'center'}}>
              <Text style={{textAlign:'center', fontSize:17,color:'black', fontWeight:'500'}}>Posts</Text>
              </View>

            <Divider width={1} orientation='vertical' style={{marginTop:1, marginBottom:1}}/>

            <View style={{height:50, width:170, justifyContent:'center'}}>
              <Text style={{textAlign:'center', fontSize:17,color:'black', fontWeight:'500'}}>Saved</Text>
              </View>
            
          </View>
          {/* <Divider width={1} orientation='vertical'/> */}


          <Animated.FlatList
            scrollEnabled={scroll}
            extraData={selectedId}
            data={POSTS} 
            keyExtractor={item => item.post_id}
            style={{marginBottom:20, marginTop:10}}
            renderItem={({item})=>{
              return(
                
                <View style= {{marginBottom:10}}>
                  
                <View style = {{width:'100%', height: hehe, backgroundColor:'white'}} onTouchMove={()=>setScroll(true)} >
                  {/* header */}
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                    <Image 
                      style={styles.story} 
                      // source={require('item.photo')} 
                      source= {{url:item.photo}}
                    />
                    </TouchableOpacity>

                  {getUserName(item)} 
                  </View>

                  {/* post content////////////////////////////////////////////////////////////////////////// */}
                  {/* post body */}
                  {item.content.length > 260 && (
                  <ScrollView onTouchStart={()=>setScroll(false)} onScroll={()=>setScroll(false)} style={{width:'100%', height:130, backgroundColor:'#ddd', marginStart:5}}>
                  <ViewMoreText numberOfLines={5}>
                   <Text style={{flex: 1, flexWrap: 'wrap', padding:5, marginRight:2}}>
                    {item.content}
                   </Text>
                  </ViewMoreText>
                  </ScrollView>
                  )}

                  {item.content.length <= 260 && (
                  <View style={{width:'100%', height:130, backgroundColor:'#ddd', marginStart:5}}>
                  
                   <Text style={{flex: 1, flexWrap: 'wrap', padding:5, marginRight:2}}>
                    {item.content}
                   </Text>
                  </View>
                  )}
                  {/* /////////////////////////////////////////////////////////////////////////////////////// */}

                  {/* like comment save */}
                  <View style={{flexDirection:'row', marginTop:6, marginBottom:3, marginStart:5,}}>
                    {isLiked(item)}

                    {console.log("Rendered item: ", item.post_id)}
                    <TouchableOpacity onPress={()=>setlike(item)}  >
                    {liked == true? liked=false: liked = true}
                    {/* {showicon(liked)} */}
                    <Octicons name={liked || (change && selectedId == item.post_id) ? "heart-fill" : "heart"} size={24} color={liked || (change&& selectedId == item.post_id) ? "red" : "black"} style={{marginRight:3}}/>
                    
                    </TouchableOpacity>
                    

                    {/* { !liked && <TouchableOpacity onPress={()=>setlike(item)}>
                    <Octicons name="heart" size={24} color="black" style={{marginRight:3}}/>
                    </TouchableOpacity>}
                    

                    {liked && <TouchableOpacity>
                      {liked = false}
                    <Octicons name="heart-fill" size={24} color="red" style={{marginRight:3}}/>
                    </TouchableOpacity>} */}
                    
                    <TouchableOpacity onPress={()=> setcomm(item)}>
                    <Octicons name="comment" size={24} color="black" style={{marginRight:3}}/>
                    </TouchableOpacity>

                    

                    <TouchableOpacity style={{ position: 'absolute', right: 3 }}>
                    {/* <Octicons name="archive" size={24} color="black" /> */}
                    <FontAwesome name="bookmark" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ position: 'absolute', right: 20}}>
                    <Feather name="bookmark" size={24} color="black" />
                    </TouchableOpacity>
                    
                    
                  </View>

                </View>
                {/* //commment space */}
                {/* comment space */}
                {selectedId == item.post_id && comClicked && (
                      
                      <View style={{height: 260, width:'100%' , backgroundColor:'white'}}>
                        
                      </View>
                    )
                    }

                <Divider width={1} orientation='vertical'/>
                </View>
              ) 
            }}
          />
            <TouchableOpacity style={styles.add} onPress={()=>console.log('addpost')}>
              <View >
                <Feather name="plus" size={24} color="white" style={{fontSize:25, marginTop:14}}/>
              </View>
            </TouchableOpacity>
        </View>
            
      </SafeAreaView>
      </View>
  )
}
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
      contentContainer:{
        flex:1,
        // height:'100%',
        paddingTop: 50, 
        paddingHorizontal: 15,
        // backgroundColor:'red'
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
        // marginStart:
        // marginTop:"60%"
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
        marginTop:-85,
        marginRight:-3
      },

      postslist:{
        height: "100%",
        flex: 1,
        // flexGrow:1,
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

      text:{
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'bold',
        marginBottom:3,
      },

      image: {
        width: 40,
        height: 40,
      },
    });
  
  
export default CommunityPage