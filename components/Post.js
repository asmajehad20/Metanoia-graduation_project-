import { View, Text ,StyleSheet,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base';

import { Ionicons } from '@expo/vector-icons';
import COLORS from '../conts/colors';

const Post = ({post, user}) => {
  // console.log("user", user)
  console.log("post", post)
  return (
    <View style={{marginBottom:30}}>
        <Divider width={1} orientation='vertical'/>
        <PostHeader post={post}/>
    </View>
  )
}

const PostHeader = ({post, user}) =>(
    <View style={{ flexDirection:'row', justifyContent:'space-between' , margin:5, alignItems:'center'}}>
        <View style={{ flexDirection:'row', alignItems:'center'}}>
          {/* {post.image == ""(console.log('empty', post.user))} */}
            <Image style={styles.story} source= {{url:post.image}}/>
            <Text style={{ marginLeft:5, fontWeight:'bold'}}>
                {/* {user.name} */}
                {console.log(post.user,post.image)}
            </Text>
        </View>
        {/* <TouchableOpacity>
        <Ionicons name="person-circle" size={35} color={COLORS.A_dark_blue} style={{ flex:1,marginStart:120,alignSelf:'flex-end',marginTop:8}}/>
        </TouchableOpacity> */}
    </View>
)

  //styleing 
  const styles = StyleSheet.create({
    story:{
      width:30,
      height:30,
      marginLeft:5,
      borderWidth:3,
      borderColor:"#ff8501",
      borderRadius:35,
    },

  });

export default Post;