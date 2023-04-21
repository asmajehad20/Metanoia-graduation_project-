import { View, Text , StyleSheet,ToutchableOpacity, ScrollView, FlatList, LogBox} from 'react-native';
import React, { Component, useEffect, useState }from 'react';
import COLORS from '../conts/colors';

import { DataTable } from 'react-native-paper';


const MyTable = ({chosenSubject}) =>{

    
    const [table, setTable] = useState([
        {key:'08:00', sat:'', sun:'', mon:'ffffff', tue:'', wed:'', the:'', fri:''},
        {key:'08:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //9
        {key:'09:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'09:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //10
        {key:'10:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'10:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //11
        {key:'11:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'11:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //12
        {key:'12:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'12:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //1
        {key:'13:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'13:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //2
        {key:'14:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'14:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //3
        {key:'15:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'15:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //4
        {key:'16:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'16:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //5
        {key:'17:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'17:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //6
        {key:'18:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'18:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //7
        {key:'19:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'19:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //8
        {key:'20:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'20:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        //9
        {key:'21:00', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
        {key:'21:30', sat:'', sun:'', mon:'', tue:'', wed:'', the:'', fri:''},
    
    ]);

    let clicked = 0;
    const [subject, setSubject] = useState()
    
    console.log(chosenSubject)
    if(clicked === 1 && chosenSubject !== undefined){
         
         setSubject(chosenSubject)
         clicked = 0
    }
    

    LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

    
    
    const cellPressed = (item, string)=>{
        console.log('cell:',item.key, "string", string)
        clicked = 1
        
        if(chosenSubject == undefined){
            console.log("chose a subject")
        }
        else{

            const newState = table.map(obj => {

            // console.log("object.sub", obj)
            // console.log("chosenSubject.subject_id",chosenSubject)
            // 👇️ if id equals 2, update country property
            if (item.key === obj.key) {
                if(string === "sat"){
                    return {...obj, sat: chosenSubject.subject_name};
                }
                if(string === "sun"){
                    return {...obj, sun: chosenSubject.subject_name};
                }
                // console.log(chosenSubject.subject_name)
              
            }
      
            // 👇️ otherwise return the object as is
            return obj;
          });
      
          setTable(newState);
          chosenSubject = []
        }//else
        
    }

    function display(){
        return table.map((item)=>{
            return(
                
                <DataTable.Row key={item.key}>
                    <DataTable.Cell onPress={()=>cellPressed(item, "")} style={styles.cell}>{item.key}</DataTable.Cell>
                    <DataTable.Cell onPress={()=>cellPressed(item, "sat")} style={styles.cell}>{item.sat}</DataTable.Cell>
                    <DataTable.Cell onPress={()=>cellPressed(item, "sun")} style={styles.cell}>{item.sun}</DataTable.Cell>
                    <DataTable.Cell onPress={()=>cellPressed(item, "mon")} style={styles.cell}>{item.mon}</DataTable.Cell>
                    <DataTable.Cell onPress={()=>cellPressed(item, "tue")} style={styles.cell}>{item.tue}</DataTable.Cell>
                    <DataTable.Cell onPress={()=>cellPressed(item, "wed")} style={styles.cell}>{item.wed}</DataTable.Cell>
                    <DataTable.Cell onPress={()=>cellPressed(item, "the")} style={styles.cell}>{item.the}</DataTable.Cell>
                    <DataTable.Cell onPress={()=>cellPressed(item, "fri")} style={styles.cell}>{item.fri}</DataTable.Cell>

                </DataTable.Row>
                
                // <Text>
                //     {item.id}
                // </Text>
            )
        })
    }

    return(
        <View style={styles.main}>
            <ScrollView horizontal={true}  >

                <DataTable style={styles.table}>
                    <DataTable.Header >
                        <DataTable.Title style={styles.headtitle}> </DataTable.Title>
                        <DataTable.Title style={styles.headtitle} textStyle={styles.text}>S</DataTable.Title>
                        <DataTable.Title style={styles.headtitle} textStyle={styles.text}>S</DataTable.Title>
                        <DataTable.Title style={styles.headtitle} textStyle={styles.text}>M</DataTable.Title>
                        <DataTable.Title style={styles.headtitle} textStyle={styles.text}>T</DataTable.Title>
                        <DataTable.Title style={styles.headtitle} textStyle={styles.text}>W</DataTable.Title>
                        <DataTable.Title style={styles.headtitle} textStyle={styles.text}>T</DataTable.Title>
                        <DataTable.Title style={styles.headtitle} textStyle={styles.text}>F</DataTable.Title>
                    </DataTable.Header> 
                    

                <ScrollView>
                    {display()}
                </ScrollView>

                </DataTable> 
            </ScrollView>
            
        </View>
    );

};
export default MyTable;

//styleing 
const styles = StyleSheet.create({
   
    main:{
        flex:1,
        backgroundColor:'#ddd',
        // marginLeft:-5,
    },

    table:{
        flex:1,
        paddingVertical:2,
        marginHorizontal:-15,
        // marginTop:5,
    },

    cell:{
        // flex:2,
        // backgroundColor:'red', 
        justifyContent:'center',
        height:50, 
        width:44,
        borderWidth:0.5,
    },
    
    headtitle:{
        backgroundColor:'#dee',
        justifyContent:'center',
        width:44,
        borderWidth:0.5,
    },

    text:{
        fontSize:16, 
        fontWeight:'100', 
        color:'black',
    },

    
  });



