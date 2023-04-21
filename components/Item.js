import React ,{useRef,useState}from 'react';
import {StyleSheet, View, Text, Animated, PanResponder} from 'react-native';
// import Layout from '../constants/Layout'

export default function Item(props) {

  const width = 200//Layout.width;
  const gestureDelay = 50;
  const pan = new Animated.ValueXY();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only start moving the item if the user has moved the item more than
        // 10 pixels in any direction
        return (
          Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        // Update the item's position as the user moves it
        itemRef.current.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released the item, so reset the item's position
        itemRef.current.setValue({ x: 0, y: 0 });
      },
    }),
  ).current;

  return(
    
    <View style={styles.item}>
       <Animated.View
       style={{
               transform: [{ translateX: pan.x }, { translateY: pan.y }]
             }}
       {...panResponder.panHandlers}
       >
         <View style={styles.absoluteCell}>
           <Text style={styles.absoluteCellText}>DELETE</Text>
         </View>
         <View style={styles.innerCell}>
           <Text>{props.title}</Text>
         </View>
       </Animated.View>
     </View>
   )
 
 }
 
 const styles = StyleSheet.create({
   item: {
     height: 80,
     marginLeft: -100,
     justifyContent: 'center',
     backgroundColor: 'red',
    //  width: Layout.width
   },
   title: {
     fontSize: 32,
   },
   absoluteCell: {
     position: 'absolute',
     top: 0,
     bottom: 0,
     left: 0,
     width: 100,
     flexDirection: 'row',
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
   innerCell: {
     height: 80,
     marginLeft: 100,
     backgroundColor: 'yellow',
     justifyContent: 'center',
     alignItems: 'center',
   }
 });