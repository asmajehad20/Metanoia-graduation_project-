import { View, Text , StyleSheet, ScrollView} from 'react-native';
import React, { Component, useState }from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import COLORS from '../conts/colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const SceduleTable = () =>{

    const [tablehead, setTableHead] = useState([
        ' Sun ', ' Mon ' , ' Tue ', ' Wed ', ' Thu ', ' Fri ', ' Sat '
    ]);
    const [table_8, setTable_8] =  useState([
        //8//id: row col //array of arrays by doing this colms are known
        [{id:'8_sun' , subject:'00' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        [{id:'0' , subject:'' }, {id:'1' , subject:'11' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        //9
        [{id:'0' , subject:'' }, {id:'1' , subject:'??' }, {id:'2' , subject:'22' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        [{id:'0' , subject:'' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        //10
        [{id:'0' , subject:'' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        [{id:'0' , subject:'' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        //11
        [{id:'0' , subject:'' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        [{id:'0' , subject:'' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        //12
        [{id:'0' , subject:'' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        [{id:'0' , subject:'' }, {id:'1' , subject:'' }, {id:'2' , subject:'' }, {id:'3' , subject:'' }, {id:'4' , subject:'' }, {id:'5' , subject:'' },{id:'6' , subject:'' }],
        //1
        
        
        //2
        //3
        //4
        //5
        //6
        //7
        //8
        //9 
    ]);

    // let x = table_8.indexOf(table_8[0][0] )+table_8[1][2].id
    // console.log(tablehead[2])
    // console.log('index of',x)
    // console.log(table_8[0][0])

    return(
        <View style={styles.container}>

            <ScrollView horizontal={true} >
                <View style = {styles.table}></View>
                {/* <Table borderStyle={styles.border}>
                    <Row data = {tablehead} style={styles.head} textStyle={styles.text} />
                    <Rows data = {table_8.subject} style={styles.head} />
                </Table> */}
            </ScrollView>
        </View>
    );

};
export default SceduleTable;

//styleing 
const styles = StyleSheet.create({
    
    container: {
        // flex:1,
        // // padding: 16,
        // // paddingTop: 30, 
        // backgroundColor: 'red',
        // alignContent:'center',
        // // justifyContent:'center',
        // width:'100%',
        // height: "100%",
    //   flex: 1,
    //   backgroundColor: COLORS.A_white,
    },
    
    border: {
        borderWidth: 2, 
        borderColor: COLORS.A_yellow,
      },
    head:{
        height: 40,
        backgroundColor: COLORS.A_blue,

    },
    text:{
        margin: 6,
    },

    table:{
        backgroundColor:COLORS.A_blue,
        // flex:1,
        // height:'100%',
        // width:'100%',
    },
  });



