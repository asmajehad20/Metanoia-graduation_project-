import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import COLORS from '../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ 
  onFocus = () => {}, ...props}) => {

  const [isFocused, setIsFocused] = React.useState(false);


  return (
    <ScrollView>

    <View style={{marginBottom: 10}}>

      <View
        style={[
          style.inputContainer,
          {
            borderColor: 
                isFocused
              ? COLORS.A_blue
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>

        {/* <Feather name="search" size={18} color="black" /> */}
        <Ionicons name="search-sharp" size={24} color="black" />
        {/* <Ionicons name="search-sharp" size={24} color="black" /> */}
        {/* <AntDesign name="search1" size={18} color="black" style={{marginRight:6}}/> */}
        {/* <Icon
          name={iconName}
          style={{color: COLORS.A_blue, fontSize: 22, marginRight: 10}}
        /> */}

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

      </View>

    </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 45,
    backgroundColor: '#ddd',///'#c8dfea',//'#ebecf0',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 35,
    // width: '100%'
  },
});

export default SearchBar;