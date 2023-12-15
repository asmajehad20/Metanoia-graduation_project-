import {ScrollView, SafeAreaView,KeyboardAvoidingView,TextInput, Dimensions, View, Button, Text ,StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../conts/colors'
import { Divider } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import Percentage from '../components/Percentage';

// import { theProject } from './AllProjects';

const NewProjectPage = ({navigation}) => {

  const [projectTitle, setProjectTitle] = useState('')
  const [projectGoal, setProjectGoal] = useState('')
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
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

  return (
    <ScrollView style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>

            <View style={styles.logo}>
                
                <Text style={{fontSize:20, alignSelf:'center', marginTop:6}}>Title: </Text>
                
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1}>
                    <TextInput
                        autoCorrect={false} 
                        style={{ 
                            width:width-160, 
                            height: 35,
                            // marginStart:-50,
                            marginTop:15,
                            marginBottom:10,
                            // alignSelf:'center',
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

                <TouchableOpacity style={{position:'absolute' ,marginTop:15, right:25}} onPress={()=> {}}>
                    <AntDesign name ="save" size={35} color={'black'} />
                </TouchableOpacity>

                <AntDesign name="right" size={30} color="#333" style={{position:'absolute' ,marginTop:18, right:-10}} onPress={()=> navigation.goBack()}/>

            </View>

            <Divider width={5} orientation='vertical' style={{marginTop:0, marginBottom:5}}/>
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

            {/* goal////////////////////////////////////////////////////////////////////////////////// */}
                <View style={{ marginTop:5, marginBottom:0}}>

                    <View style={{ flexDirection:'row'}}>
                        <Text style={{fontSize:18, fontWeight:'600', marginRight:5, marginStart:10,}}>Goal:</Text>
                    </View>

                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1} style={{ alignSelf:'center',}}>
                        <TextInput
                            autoCorrect={false} 
                            style={{
                                width:width-40, 
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

                    <TouchableOpacity>
                        <Feather name="book-open" size={28} color="black" style={{alignSelf:'center'}}/>
                        {/* <MaterialIcons name= "menu-book" size={30} color="black"  style={{alignSelf:'center'}}/> */}
                        <View style={{alignSelf:'center'}}>
                            <Text style={{fontSize:13, alignSelf:'center'}}>Add</Text>
                            <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>Subject</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <AntDesign name="adduser" size={28} color="black"  style={{alignSelf:'center'}}/>
                        <View style={{alignSelf:'center'}}>
                            <Text style={{fontSize:13, alignSelf:'center'}}>Add</Text>
                            <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>partners</Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <StarButton /> 

                        {!star &&
                            <View style={{alignSelf:'center'}}>
                                <Text style={{fontSize:13, alignSelf:'center'}}>Add to</Text>
                                {/* <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>to</Text> */}
                                <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>important</Text>
                            </View>
                        }
                        
                        {star &&
                            <View style={{alignSelf:'center'}}>
                                <Text style={{fontSize:13, alignSelf:'center'}}>Remove </Text>
                                {/* <Text style={{fontSize:13, alignSelf:'center', marginTop:-6}}>from</Text> */}
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

                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////////////////// */}



                {/* tasks////////////////////////////////////////////////////////////////////////////////// */}
                <View style={{ flexDirection:'row', marginStart:15, marginTop:0, marginBottom:0}}>

                        <Text style={{fontSize:18, fontWeight:'600', marginRight:5}}>Tasks:</Text>
                
            
                    <TouchableOpacity style={{right:0}} onPress={()=>{setShowAddNewPost(prevState => !prevState)}}>
                        <Octicons name="diff-added" size={25} color="black" />
                    </TouchableOpacity>

                </View>     
                <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:0}}/>

          
            </View>
            
        </SafeAreaView>
    </ScrollView>
  )
}
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
      contentContainer:{
        paddingTop: 30, 
        paddingHorizontal: 20,
      },

      container: {
        height: "100%",
        flex: 1,
        backgroundColor: COLORS.A_white,
      },
  
      image: {
        
      },

      logo:{
        flexDirection: 'row',
        flex:1,
      },

    });

export default NewProjectPage