import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    StyleSheet,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import BouncyCheckbox from 'react-native-bouncy-checkbox';
  import Slider from '@react-native-community/slider';
  import RNDateTimePicker from '@react-native-community/datetimepicker';
 
  
  export default function DailyPage() {
    const intialState = {
      id: 0,
      title: '',
      description: '',
      completed: false,
      dueTime: null,
      priority: 0,
    };
  
    const [todo, setTodo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTodo, setNewTodo] = useState(intialState);
    const [priority, setPriority] = useState(0);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [time, setTime] = useState(new Date())
    const [value, setValue] = useState(0);

    const handleTimePicker = (event, selectedTime) => {
        setShowTimePicker(false);
         // on cancel set date value to previous date
         if (event?.type === 'dismissed') {
          setTime(time);
          return;
      }
      setTime(selectedTime);
      };
      


  
    const getTodos = async () => {
      const todos = await AsyncStorage.getItem('todo');
      setTodo(JSON.parse(todos) ? JSON.parse(todos) : []);
    };
  
    useEffect(() => {
      getTodos();
    }, []);
  
    const handleChange = (title, value) => {
      if (title === 'dueTime') {
        setNewTodo({...newTodo, [title]: new Date(value)});
      } else {
        setNewTodo({...newTodo, [title]: value});
      }
    };
  
    const clear = () => setNewTodo(intialState);
  
    const addTodo = () => {
        if (!newTodo.title || !newTodo.description ) {
          alert('Please enter all the values.');
          return;
        }
      
        newTodo.id = todo.length + 1;
        const updatedTodo = [newTodo, ...todo];
        setTodo(updatedTodo);
        AsyncStorage.setItem('todo', JSON.stringify(updatedTodo));
        clear();
        setShowModal(false);
      };
  
    const updateTodo = item => {
        const itemToBeUpdated = todo.filter(todoItem => todoItem.id == item.id);
        itemToBeUpdated[0].completed = !itemToBeUpdated[0].completed;
      
        const remainingTodos = todo.filter(todoItem => todoItem.id != item.id);
        const updatedTodo = itemToBeUpdated.concat(remainingTodos).map(todoItem => ({
          ...todoItem,
          key: todoItem.id.toString(),
        }));
      
        setTodo(updatedTodo);
        AsyncStorage.setItem('todo', JSON.stringify(updatedTodo));
      };
  
      const displayTodo = item => (
        <TouchableOpacity
          key={item.id.toString()}
          style={{
            backgroundColor: '#FFF',
            padding: 15,
            borderRadius: 7,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingVertical: 16,
            marginBottom: 20,
          }}
          onPress={() =>
            Alert.alert(
              `${item.title}`,
              `${item.description}\nDue Time: ${
                item.dueTime ? item.dueTime.toLocaleString() : 'Not set'
              }`,
              [
                {
                  text: item.completed ? 'Mark InProgress' : 'Mark Completed',
                  onPress: () => updateTodo(item),
                },
                {
                  text: 'Ok',
                  style: 'cancel',
                },
              ],
            )
          }>
          <BouncyCheckbox
            isChecked={item.completed ? true : false}
            fillColor='#0078AA' 
            onPress={() => updateTodo(item)}
          />
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}>
              {item.title}
            </Text>
            {item.dueTime && (
              <Text style={{fontSize: 12, color: 'gray'}}>
                Due time: {item.dueTime.toLocaleString()}
              </Text>
            )}
            <Text style={{ fontSize: 16 }}>Priority: {priority}</Text>

          </View>
          </TouchableOpacity>
      );

      
      
   
    return (
      <View style={{paddingHorizontal: 20,marginTop: 17}}>
        <View
          style={{
            paddingVertical: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* <View>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 28}}>
              Hey, again 
            </Text>
            <Text style={{fontSize: 16}}>
              {todo.length} {todo.length == 1 ? 'task' : 'tasks'} for you
            </Text>
          </View> */}
          {/* <Image
            source={require('./assets/SGCodes.jpg')}
            style={{height: 50, width: 50, borderRadius: 10}}
          /> */}
        </View>
  
        <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold'}}>
          Today Task's
        </Text>
        <ScrollView>
          <View style={{height: 250}}>
            {todo.map(item => (!item.completed ? displayTodo(item) : null))}
          </View>
        </ScrollView>
  
        <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold'}}>
          Completed
        </Text>
        <ScrollView>
          <View style={{height: 250}}>
            {todo.map(item => (item.coampleted ? displayTodo(item) : null))}
          </View>
          
        </ScrollView>
  
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{
              backgroundColor: '#0078AA',
              borderRadius: 100,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
            }}>
            <Text style={{fontSize: 46}}>+</Text>
          </TouchableOpacity>
        </View>
  
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                paddingVertical: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
               <View>
                {/* <Text style={{color: '#000', fontWeight: 'bold', fontSize: 28}}>
                  Hey, again 👋
                </Text> */}
                {/* <Text style={{fontSize: 16}}>
                  {todo.length} {todo.length == 1 ? 'task' : 'tasks'} for you
                </Text> */}
              </View>  
              {/* <Image
                source={require('./assets/SGCodes.jpg')}
                style={{height: 50, width: 50, borderRadius: 10}}
              /> */}
            </View>
  
            <Text
              style={{
                color: '#000',
                fontSize: 28,
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              What would you like to do?
            </Text>
            
            <View style={{marginTop: 20}}>
             <Text style={{fontSize: 18, marginBottom: 5}}>Title:</Text>
            <TextInput
              value={newTodo.title}
              onChangeText={title => handleChange('title', title)}
              style={{
                backgroundColor: 'rgb(240, 240, 240)',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
            </View>
     <View style={{ }}>
        <Text style={{fontSize: 18, marginBottom: 5}}>Due time:</Text> 
       
    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
  <Text style={{ backgroundColor: 'rgb(240, 240, 240)',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
                fontSize:16}}>
     {newTodo.dueTime ? newTodo.dueTime.toLocaleString() : 'Not set'}
  </Text>
</TouchableOpacity>
{showTimePicker && (
        <RNDateTimePicker>
            testID="dateTimePicker"
           value={newTodo.dueTime}
          mode="datetime"
         is24Hour={true}
        display="default"
        onChange={handleTimePicker}
            </RNDateTimePicker> 
        )}

</View>
<View style={{marginTop: 20}}>
  <Text style={{fontSize: 18, marginBottom: 5}}>Priority:</Text>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Text style={{fontSize: 14}}>1</Text>
    <Slider
      style={{flex: 1, marginHorizontal: 10 }}
      minimumValue={1}
      maximumValue={5}
      step={1}
      value={newTodo.priority}
      minimumTrackTintColor='#0078AA' // Change the color of the track before the thumb
      maximumTrackTintColor="#000000"
      thumbTintColor='#0078AA'
      onValueChange={(value) => handleChange('priority', value)}
    />
    <Text style={{fontSize: 14}}>5</Text>
  </View>
</View>


  
<View style={{marginTop: 20}}>
             <Text style={{fontSize: 18, marginBottom: 5}}>Description:</Text>
             <TextInput
              value={newTodo.description}
              onChangeText={desc => handleChange('description', desc)}
              style={{
                backgroundColor: 'rgb(240, 240, 240)',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}
              multiline={true}
              numberOfLines={6}
            />
             </View>
  
            <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity
                onPress={addTodo}
                style={{
                  backgroundColor: '#0078AA',
                  width: 100,
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{fontSize: 22, color: '#fff'}}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
    
  }