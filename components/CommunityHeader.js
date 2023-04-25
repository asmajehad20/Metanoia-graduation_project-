import { View, Text, StyleSheet,TouchableOpacity,Image ,Dimensions, SafeAreaView,TouchableHighlight} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../conts/colors';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated,{EasingNode} from 'react-native-reanimated';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';


const{Value,timing}= Animated

const width = Dimensions.get('window').width 
const height = Dimensions.get('window').height



class CommunityHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      isFoucsed: false,
      keyword:''
    }
    this._input_box_translate_x = new Value(width) 
    this._back_button_opacity= new Value(0)
    this._content_translate_y= new Value(height) 
    this._content_opacity= new Value(0)
  }

   _onFocus=()=>{
    // update state 
this.setState({isFocused: true})
// animation config
// input box
const input_box_translate_x_config = {
duration: 200,
toValue: 1,
easing: EasingNode.inOut (EasingNode.ease)
}
const back_button_opacity_config = {
  duration: 200,
  toValue: 1,
  easing: EasingNode.inOut (EasingNode.ease)
  }
  //content
  const content_translate_y_config = {
    duration: 200,
    toValue: 1,
    easing: EasingNode.inOut (EasingNode.ease)
    }
    const content_opacity_config= {
      duration: 200,
      toValue: 1,
      easing: EasingNode.inOut (EasingNode.ease)
      }

      // run animation
timing(this._input_box_translate_x, input_box_translate_x_config).start() 
timing(this._back_button_opacity, back_button_opacity_config).start() 
timing(this._content_translate_y, content_translate_y_config).start()
timing(this._content_opacity, content_opacity_config).start()

this.refs.input.focus()

  }

  _onBlur = () => {
    this.setState({ isFocused: false });
  
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: EasingNode.inOut(EasingNode.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
    };
    //content
    const content_translate_y_config = {
      duration: 200,
      toValue: height,
      easing: EasingNode.inOut(EasingNode.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
    };
  
    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();
    timing(this._content_translate_y, content_translate_y_config).start();
    timing(this._content_opacity, content_opacity_config).start();
  
    this.refs.input.blur();
  };
  
  
  render() {
    // const { navigation } = this.props;
    
  return (
    <>

    <SafeAreaView style={styles.logo}>
      <View style={styles.header}>
        <View style={styles.header_inner}>
        <View>
         <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}/>
        </View>
         <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:30}}>Community</Text> 
        </View>

        {/* <TouchableOpacity onPress={()=>console.log('to massaes page')} style={{ marginTop:6, position:'absolute', left:55, backgroundColor:'red', borderRadius:100, padding:2}}>
        <Ionicons name="add-circle" size={45} color={COLORS.A_yellow} />
        </TouchableOpacity> */}

        <TouchableHighlight onPress={this._onFocus}  activeOpacity={1} underlayColor={'#ccd0d5'} style={{width:40 ,marginStart:50, alignItems:'center',flexDirection:'row',justifyContent:'center', marginTop:7, borderRadius:50, marginBottom:10}}>
            <Ionicons name="search" size={35} color={COLORS.black} />

        </TouchableHighlight>
        <TouchableOpacity 
           onPress={()=>console.log('to massaes page')}
          // onPress={() => navigation.navigate('Messages Page')} // navigate to 'Messages' screen
          style={{ marginTop: 3.5, position: 'relative', right: 3.5 }}
        >
          <Ionicons name="md-chatbubble" size={35} color="black" />
        </TouchableOpacity>


        <Animated.View
        style={[styles.input_box,{transform:[{translateX:this._input_box_translate_x}]}]}>
          <Animated.View style={{opacity: this._back_button_opacity}}> 
           <TouchableOpacity
               activeOpacity={1}
               underlayColor={"#ccd0d5"} onPress={this._onBlur} 
               style={styles.back_icon_box}>
             <Icon name="chevron-left" size={22} color="#000000"/>
           </TouchableOpacity>
          </Animated.View>
          <TextInput
            ref="input"
            placeholder="Search Here"
            clearButtonMode="always"
            value={this.state.keyword}
            onChangeText={(value) => this.setState({keyword: value}) }
            style={styles.input}/>
        </Animated.View>
        
        
          </View>
        </View>         
    </SafeAreaView>
    <Animated.View style={[styles.content,{opacity:this._content_opacity,transform:[{translateY:this._content_translate_y}]}]}>
      <SafeAreaView style={styles.content_safe_area}>
        <View style={styles.content_inner}>
          <View style={styles.separator}>
            {
              this.state.keyword ===''
              ?
                <View style={styles.image_placeholder_contaniner}>
                  <Image source={require('../assets/search.png')}
                  style={styles.image_placeholder}/>

                  <Text style={styles.image_placeholder_text}>
                    Enter a few word {"\n"}
                    to search
                  </Text>

                </View>

              :
                <ScrollView>
                  <View style={styles.search_item}>
                    <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text> asma</Text>
                  </View>
                  <View style={styles.search_item}>
                    <Icon  style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text> tasneem</Text>
                  </View>
                  <View style={styles.search_item}>
                    <Icon  style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text> aya </Text>
                  </View>
                
               </ScrollView>
            }

          </View>

        </View>

      </SafeAreaView>

    </Animated.View>
    </>
    
  )
}
}

 //styleing 
 const styles = StyleSheet.create({
    
    image: {
      width: 60,
      height: 60,
      // marginRight:5,
      // marginLeft:-5
    },

    logo:{
      // flexDirection: 'row',
    //   flex:1,
    zIndex:1000
    },
    header:{
      height:50,
      paddingHorizontal:16


    },
    header_inner:{
      flex:1,
      overflow:'hidden',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      position:"relative"

    },

    input_box: {
       height: 50,
      flexDirection: 'row',
      alignItems:
      'center',
      position: 'absolute',
      top:0,
      left:0,
      backgroundColor: 'white',
      width: width-20

  },
  back_icon_box :{
    width:40,
    height:40,
    borderRadius:40,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginRight:5
  },
  input:{
    flex:1,
    height:40,
    backgroundColor:'#e4e6eb',
    borderRadius:16,
    paddingHorizontal:16,
    fontSize:15

  },
  content:{
    width:width,
    height:height,
    position:'absolute',
    left:0,
    bottom:0,
    zIndex:999
  },
  content_safe_area:{
    flex:1,
  
    backgroundColor:'white'
  },
  content_inner:{
    flex:1,
    paddingTop:70
  },
  separator:{
    marginTop:5,
    height:1,
    backgroundColor:'#e4e6eb',

  },
  image_placeholder_contaniner:{
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
    marginTop:'70%'
  },
  image_placeholder:{
    width:150,
    height:113,
    alignSelf:'center'
     
  },
  image_placeholder_text:{
    textAlign:'center',
    color:'gray',
    marginTop:200,
   
  },
  search_item:{
    flexDirection:'row',
    height:50,
    alignItems:'center',
    borderBottomWidth: 5,
    borderBottomColor:'#e6e4eb',
    marginLeft:16
  },
  item_icon:{
    marginLeft:15
  }
  
 }
  );
  //export default withNavigation (CommunityHeader); should add when we use withNavigation
  export default CommunityHeader;