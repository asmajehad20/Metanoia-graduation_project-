import {ScrollView, SafeAreaView, View,Button, Text , StyleSheet,Image} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../conts/colors'
import App2, {schedulePushNotification} from '../Notification';
import * as ImagePicker from 'expo-image-picker';
import ViewMoreText from 'react-native-view-more-text';


const NotificationPage = ({ navigation }) => {
  let v =2;
  const [ddd, setddd] = useState('hiigfij'+2 +v)

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    
  };

  return (
    <ScrollView style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>
      
            <View style={styles.logo}>
              <Image
                
                source={require('../assets/butterfly_104.png')} 
                style={styles.image}/>
                
              <View style={{alignSelf:'center', marginStart:-5}}>
                <Text style={{fontWeight:'bold', fontSize:30}}>Metanoia</Text> 
                {/* <Text style={{ fontSize:12, marginTop:-10}}>One day at a time </Text>  */}
              </View>
              
            </View>

            <Text>Notification Page</Text>
            <Button
              title="Press to schedule a notification"
              onPress={async () => {await schedulePushNotification(ddd);}}
            />

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {/* {console.log("image", image)} */}
      {/* file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMetanoia-65157b01-9b7e-4fb5-81b2-dbc42b3f7388/ImagePicker/44dc6b16-9298-494b-9cda-e85ee46a8195.jpeg */}
  

      {/* <ScrollView style={{width:'100%', height:110, backgroundColor:'#ddd', marginStart:5}}>
                  <Text style={{flex: 1, flexWrap: 'wrap', padding:5, marginRight:2}} numberOfLines={50} ellipsizeMode='tail'> You miss guguhuhu huh y gu jok jugt f yni nyf rdr de sr vyh ij ug tfr df yh ub gv rd ctb un h bg cd xd fvh bnj n nnnnnnnnnnnnnnugggg g ggggggggggggggggggggg rrrrrrrrrrrrrr ttttttttttttttttt uuuuuuuuuuuuuuuuuu ooooooooooooo  fdddddd mmmmmmmmmmjjjhh ll  jjj jj j plpdso k sinioemfnkefnfknefncin cj  nfkemf j  jmk jrun km kew npjon nojm hiuhggcm kijm ou ygu ;kjolk;l; jhyk po0ijk uy6578u gyghiu67 hgtdch jh75fvbn  You miss fdd</Text>
                  </ScrollView> */}
      <ScrollView style={{width:'100%', height:110, backgroundColor:'#ddd', marginStart:5}}>
      <ViewMoreText
          numberOfLines={3}
          // renderViewMore={this.renderViewMore}
          // renderViewLess={this.renderViewLess}
          // textStyle={{textAlign: 'center'}}
        >
          <Text>
            Lorem ipsujjkkjkjjjjjjjjjjjjjj jjjjjjjjjjj jlkklkl lkjijmlkokkkkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkk jjjjjjjjjjjjjjjjjjjjjjjj uuuuuuuuuuuuuuuuuuuuuuuuuu yyyyyyyyyyyyyyyjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjm dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
          </Text>
        </ViewMoreText>
        </ScrollView>
        
      </SafeAreaView>
      </ScrollView>
  )
}
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
      contentContainer:{
        paddingTop: 50, 
        paddingHorizontal: 20,
      },

      container: {
        height: "100%",
        flex: 1,
        backgroundColor: COLORS.A_white,
      },
  
      image: {
        width: 50,
        height: 50,
        marginRight:3,
        marginLeft:-10
      },

      logo:{
        flexDirection: 'row',
        flex:1,
        // marginStart:
        // marginTop:"60%"
      },

    });
  
export default NotificationPage