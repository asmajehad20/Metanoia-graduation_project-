import React, { useState }from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import COLORS from '../conts/colors';
import { Feather } from '@expo/vector-icons'; 



const Choose = ({ iconName, list, listName, droplist, tt,
    onFocus = () => {}, ...props}) => {

    const [isFocused, setIsFocused] = useState(false);
    
    return (
      
      <ScrollView >
      <View style={{marginBottom: 10}}>
  
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: 
                  isFocused
                ? COLORS.A_blue
                : COLORS.light,
                 alignItems: 'center',
                 marginHorizontal:1.5
            },
          ]}>
  
          <TextInput
            autoCorrect={false}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            style={{ 
              fontSize: 15,
              color: COLORS.black, 
              flex: 1,
            }}
            {...props}
          />
          {/* name="chevron-down" */}
          {/* name={iconName} */}
          
          <TouchableOpacity onPress = {()=>{droplist(listName)}}>
            <Feather name="chevron-down" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
     
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      flex:1,
      height: 45,
      width: 150,
      backgroundColor: '#ddd',//'#ebecf0',//'#c8dfea'//too dark,
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderWidth: 0.5,
      borderRadius: 35,
      marginTop:20,
      
      // width: '100%'
    },

    listContainer: {
      flex:1,
      alignItems: 'stretch',
      backgroundColor: 'red', 
      height:150,
      width: 190,
      flexDirection:'row',
      alignItems: 'stretch'
      
    },
    listContainer1: {
      backgroundColor: COLORS.A_blue, 
      height:150,
      width: '100%',
      flex:1
    },
  });


  

export default Choose;

