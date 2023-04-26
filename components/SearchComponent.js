import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const SearchComponent = ({ onSearchEnter }) => {
const navigation = useNavigation();
  const [term, setTerm] = useState("");

  return (
    <View style={styles.searchWrapperStyle}>
        {/* <TouchableOpacity onPress={()=>navigation.navigate('Community Page')}>
           <Icon name="chevron-back" size={20} color="black" style={styles.iconStyle}/> 
        </TouchableOpacity> */}
      
      <Icon size={18} name="search" color="black" style={styles.iconStyle} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        style={styles.searchInputStyle}
        value={term}
        onChangeText={(newText) => {
          setTerm(newText);
        }}
        onEndEditing={() => {
          onSearchEnter(term);
        }}
        selectionColor="black" // this for the curser(virtical line) that flashes 
      />
      <Icon
        size={18}
        name="close"
        color="black"
        style={styles.iconStyle}
        onPress={() => {
          setTerm("");
          onSearchEnter(""); // The onSearchEnter function updates the state of term with the entered search term and also sets the error message to an empty string. The onSearchEnter function does not have any color associated with it.
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius:30,
  },
  iconStyle: {
    marginTop: 12,
    marginHorizontal: 8,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
    color: "black",
  },
});

export default SearchComponent;