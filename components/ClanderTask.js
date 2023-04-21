import { View, Text, TouchableOpacity ,Dimensions, StyleSheet} from 'react-native'
import React from 'react'
import COLORS from '../conts/colors'
import { MaterialIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')

const ClanderTask = ({title, content, status}) => {
  return (
    <TouchableOpacity onPress={()=>console.log("open task page and pass pars")}>
      <View style={styles.TaskContainer}>
        <View style={{flex:1, flexDirection:'row', marginTop:15}}>
          <Text style={{fontSize:20, marginStart:10}}>Title</Text>

          {/* <View style={{flex:1, flexDirection:'row', marginTop:2, position:'absolute', right:10}}>
          
          <TouchableOpacity >
            <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity >
            <Feather style={{marginLeft:3}} name="delete" size={22} color="black" />
          </TouchableOpacity>
          </View> */}

          <View style={{flex:1, flexDirection:'row', marginTop:2, position:'absolute', right:10}}>
          
          <TouchableOpacity >
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity >
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
          </View>
          
          
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  label: {
    marginVertical: 1,
    fontSize: 12,
    color: "#aaa",
    marginStart: 15,
  },

  TaskContainer: {
    width:'95%',//width-40,
    felx:1,
    alignSelf:'center',
    padding:3,
    // marginStart:-5,
    height:70, 
    backgroundColor:"#aaa",
    
    borderRadius:15,
    justifyContent: "center",
    
  },

});


export default ClanderTask