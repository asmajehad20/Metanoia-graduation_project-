import {ScrollView, SafeAreaView, View, Text , StyleSheet,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import SceduleTable from '../components/SceduleTable';

import COLORS from '../conts/colors';
import SearchBar from '../components/SearchBar';
// import Button from '../components/Button';


const SchedulePage = () => {
  
    return (
      <ScrollView style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>

        <View style={{flexDirection:'row'}}>

          <View style={{width:'88%'}}>
          <SearchBar />
          </View>

          <View >
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}/>
          </View>

        </View>

        {/* //////////////////////////////////// */}
        <View style={styles.schedule}>
        {/* //here the schedual */}
        <SceduleTable/>
        </View>
  
      </SafeAreaView>
      </ScrollView>
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
        width: 40,
        height: 40,
        flex:1/2,
        // marginTop:2,
        marginHorizontal: 10,
      },

      schedule: {
        // height: 100,
        backgroundColor: COLORS.A_gray,
        // width: 40,
        // height: 40,
        // flex:1/2,
        marginTop:24,
        // marginHorizontal: 10,
      },

    });
  
  export default SchedulePage;