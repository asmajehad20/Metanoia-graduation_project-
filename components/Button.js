import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../conts/colors';
const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5} //when you click the button how much it shows
      style={{
        height: 55,
        width: '100%',
        backgroundColor: '#0078AA',//'#0078AA',//i changed this 
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        //////
        borderRadius: 35,
      }}>
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;