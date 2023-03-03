import { SafeAreaView, View, Text , StyleSheet} from 'react-native'
import React from 'react'

const SchedulePage = () => {
  return (
    <SafeAreaView>
      {/* just the status bar */}
      <View style={styles.status}></View>

      <View style={styles.container}>
        <Text>SchedulePage</Text>
      </View>
    </SafeAreaView>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//styleing 
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#ffe',
  },

  status: {
    backgroundColor: '#aced',
    height: 40,
  },

  text: {
    flex:1,//fill the button
    paddingVertical: 20,//center in the y axis
    textAlign: 'center',//center in the x axis
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,//make the button less sharp
  },
});
export default SchedulePage;