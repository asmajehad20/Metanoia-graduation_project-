import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import COLORS from '../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  label, iconName, error, password, 
  onFocus = () => {}, ...props}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);


  return (
    <ScrollView>

    <View style={{marginBottom: 10}}>

      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.A_blue
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: COLORS.A_blue, fontSize: 22, marginRight: 10}}
        />

        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ fontSize: 15, color: COLORS.black, flex: 1}}
          {...props}
        />

        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.A_blue, fontSize: 22}}
          />
        )}
      </View>

      {error && (
        <Text style={{marginTop: 1, marginBottom:1, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}

    </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 1,
    fontSize: 12,
    color: COLORS.grey,
    marginStart: 15,
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#ebecf0',//'#c8dfea'//too dark,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 35,
    // width: '100%'
  },
});

export default Input;