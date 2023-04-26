import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, FlatList, StyleSheet ,TouchableOpacity} from "react-native";
import SearchComponent from "../components/SearchComponent";
// import axios from "axios"; //npm install axios


const SearchPage = () => {
    var i =0
//   const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(""); //error state if we search for something dosn't exist 
  const [term, setTerm] = useState(""); // state for the input we enter 


  const [USERS, setUser] = useState([
    {user_id:'1', name:'asma', photo:'', },
    {user_id:'2', name:'aya', photo:'', },
    {user_id:'3', name:'tasbeh', photo:'', },
    {user_id:'4', name:'manar', photo:'', },
    {user_id:'5', name:'tasneem', photo:'', },
    {user_id:'6', name:'fatima', photo:'', },
    {user_id:'7', name:'amal', photo:'', },
    {user_id:'8', name:'anwar', photo:'', },

  ])
  const getUserName =(i)=>{
    var name 
      USERS.map(item => {
        if(i.user_id == item.user_id){
          name = item.name
        }else {
            setUser([]);
            setErr("No user found");
          }
      });//end users map

  

  const renderUser = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemWrapperStyle}>
        <Text style={styles.itemTitleStyle}>{item.id}</Text>
        <Text style={styles.itemBodyStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

//   useEffect(() => {
//     getUserName(term);
//   }, [term]);

  return (
    <>
      {/* <StatusBar backgroundColor="#0078AA" /> */}
      <View style={{paddingTop: 30}}>
        <SearchComponent onSearchEnter={(newTerm) => {
          setTerm(newTerm);
          setErr("");
        }} />

        {err ?
          <Text style={styles.errStyle}>{err}</Text>
          :
          <FlatList
            data={USERS}
            renderItem={renderUser}
            keyExtractor={ user => user.id}
          />
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderColor: "#ccc",
    paddingHorizontal: 16,
  },
  itemTitleStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  itemBodyStyle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
});
}
export default SearchPage ;