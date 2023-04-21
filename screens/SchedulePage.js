import {ScrollView, FlatList, SafeAreaView,TouchableOpacity, View, Text , StyleSheet,Image, PanResponder,Animated, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import Chose from '../components/Chose';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../conts/colors';
import Schedule from '../components/Schedule';
import { AntDesign } from '@expo/vector-icons';



const SchedulePage = ({navigation}) => {
  
  const [flaglist, setFlagList]= useState(false);
  const [list, setList] = useState('');
  
 
  const droplist = (name) =>{
      setFlagList(!flaglist)

      if(name === 'subject'){
        setList('subject')
        fun()
        
      }
      if(name === 'spaciality'){
        setList('spaciality')
      }

      if(name === 'department'){
        setList('department')
      }
  }

      
      useEffect(() => {
    
        if(list === 'subject'){
          setList('subject')
          
        }
        if(list === 'spaciality'){
          setList('spaciality')
        }
  
        if(list === 'department'){
          setList('department')
        }
      
        // console.log(list)
      },[list]);
      

  const [data, setData] = useState([]);

  //172.19.24.59 najahwifi
  //192.168.1.76 home
  //10.0.2.2 foe emulator to work
  //localhost
  const url = "http://172.19.97.125:3000/sendSubjects"
  // useEffect(() => {
     const fun =()=>{
      console.log('inside fun')
      fetch(url)
      .then((resp) => resp.json())
      .then((json) => {setData(json)&& console.log("json", json)})
      .catch(function(error) {
        // console.log('There has been a problem with your fetch operation: ' );
      })
    console.log('last try for the nigght')
    console.log(data)
  }
  console.log(" out", data) 
      
  // },[]);
  
  // console.log(data)

  // function displayData(){
  //   return data.map((post) => {
  //     // console.log(post.subject_id)
  //     return (
  //       <View style= {styles.subContainer}>
  //         <Text style={{alignSelf:'center'}}>{post.subject_id}</Text>
  //       </View>
  //     );
  //   })
  // }

  
  const [chosenSubject, setSubject] = useState([])
  const subjectPressed = ({item})=>{
    
    sub = item;
    setSubject(item)
    // console.log(item)
  }

    return (
      <View style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>

      <View style={styles.logo}>
              <Image
                source={require('../assets/butterfly_104.png')} 
                style={styles.image}/>
                
              <View style={{alignSelf:'center', marginStart:-5, flex:1}}>
                <Text style={{fontWeight:'700', fontSize:30}}>Schedule</Text> 
              </View>

              <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>

      </View>


      <View style = {{ flex:1}}>

        
        <View style={styles.dropdown}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Chose listName = "subject" droplist = {droplist} placeholder="subject" placeholderTextColor={'black'}/>
            <Chose listName = "department" droplist = {droplist} placeholder="department" placeholderTextColor={'black'}/>
            <Chose listName = "spaciality" droplist = {droplist} placeholder="spaciality" placeholderTextColor={'black'}/>
          </ScrollView>
        </View>


        {data.length ==0 &&( fun()) }
        {/* //if data is not fetched */}
        {/* {flaglist === true && data.length === 0 && (
        
          <View style = {styles.listContainer}>
            <ScrollView 
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
            >

              <FlatList
                scrollEnabled={false}
                contentContainerStyle={{alignSelf: 'flex-start',}}
                numColumns={5}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}

                onScroll = { e => {this.scrollOffset = e.nativeEvent.contentOffset.y}}
                onLayout = { e => {this.flatlistTopOffset = e.nativeEvent.layout.y}}

                data={[{key:1, name:"asma"},{key:2, name:"tasneem"}]}
                // renderItem={}
                  
              />

            </ScrollView>

          </View>
        )} */}

        {flaglist === true && data.length!== 0&&(
          // <TouchableOpacity onPress={console.log(data.subject_id)}>

              <View style = {styles.listContainer}>

                <ScrollView horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
                >

              <FlatList
              scrollEnabled={false}
              contentContainerStyle={{alignSelf: 'flex-start',}}
              numColumns={Math.ceil(data.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              // horizontal
              data={data}
              
              renderItem={({item}) =>
              <TouchableOpacity onPress={()=>subjectPressed({item})}>
                <View style= {styles.subContainer}>
                 <Text style={{alignSelf:'center', color:'white'}}>{item.subject_name}</Text>
                </View>
              </TouchableOpacity>
              }

              keyExtractor={item => item.subject_id}/>
              

                </ScrollView>


              </View>
          // </TouchableOpacity>
        )}

       
        <View style = {styles.tableContainer}>
          <Schedule chosenSubject={chosenSubject} />
        </View>
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
        paddingTop: 50, 
        paddingHorizontal: 20,
      },

      container: {
        height: "100%",
        flex: 1,
        backgroundColor: COLORS.A_white,
      },
  
      registerButton: {
        marginTop:-30,
      },
  
      image: {
        width: 60,
        height: 60,
        marginRight:5,
        marginLeft:-10
      },

      listContainer: {
        // flex:1,
        // alignItems: 'stretch',
        // backgroundColor: 'red', 
        height:150,
        width: '100%',
        marginTop:-35
        // flexDirection:'row',
        // alignItems: 'stretch'
        
      },

      schedule: {
        // height: 100,
        flex:1,
        backgroundColor: COLORS.A_gray,
        // width: 40,
        // height: 40,
        // flex:1/2,
        //////////////////////////// marginTop:24,
        // marginHorizontal: 10,
      },

      dropdown:{
        // flex:1,
        // backgroundColor: COLORS.A_yellow,
        flexDirection:'row',
        marginBottom:15,
      },

      tableContainer:{
        flex:1,
        marginBottom:7,
        marginTop:-15,
        // backgroundColor: "#cccd",
        width:'100%',
      },

      subContainer:{
        backgroundColor:COLORS.A_dark_blue,//COLORS.A_yellow,
        width: 120,
        height:50,
        borderRadius:25,
        // paddingHorizontal:5,
        justifyContent:'center',
        // alignSelf:'center',
        marginHorizontal:5,
        marginBottom:5
      },

      logo:{
        flexDirection: 'row',
        marginBottom:-10,
      },

      box: {
        height: 150,
        width: 150,
        backgroundColor: 'blue',
        borderRadius: 5,
      },
    });
  
  export default SchedulePage;