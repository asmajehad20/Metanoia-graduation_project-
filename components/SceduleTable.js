import { View, Text , StyleSheet, ScrollView} from 'react-native';
import React, { Component, useState }from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import COLORS from '../conts/colors';

const SceduleTable = () =>{

    const [tablehead, setTableHead] = useState([
        'Time/Day ',' Sun ', ' Mon ' , ' Tue ', ' Wed ', ' Thu ', ' Fri ', ' Sat '
    ]);
    const [tabledata, setTableData] =  useState(
        
    );

    return(
        <View style={styles.container}>

            <ScrollView horizontal={true} >
                <Table borderStyle={styles.border}>
                    <Row data = {tablehead} style={styles.head} textStyle={styles.text}/>
                    <Rows data = {tabledata} textStyle = {styles.text}/>
                </Table>
            </ScrollView>
        </View>
    );

};
export default SceduleTable;

//styleing 
const styles = StyleSheet.create({
    
    container: {
        flex:1,
        // padding: 16,
        // paddingTop: 30, 
        backgroundColor: 'red',
        alignContent:'center',
        // justifyContent:'center',
        width:'100%',
        height: "100%",
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
  });



