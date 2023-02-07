import React, { useEffect, useState } from "react";
import { FlatList,Alert, Platform, ScrollView,Dimensions, SafeAreaView,TextInput, StatusBar, StyleSheet, Switch, Text, TouchableWithoutFeedback, View, Button} from "react-native";
import CommunicationController from "../Model/cc";
import {myContext} from "../Context"
import { createContext, useContext } from 'react';




import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';




function Modifica({navigation}){
  var base64
    const v = useContext(myContext)
    const sid = v.sid
    let [image,setImage]=useState(null)
    let [image64,setImage64]=useState(null)
    let[name,setName]=useState(null)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        console.log(result);

        if (!result.canceled) {

          base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
          setImage(result.assets[0].uri);
          
          setImage64(base64);
          
          console.log(image+"dovrebbe essere base 64")
        }

       // richiesta()
      };
      const showError = (error) => {
        Alert.alert(
          'Errore',
          error,
          [
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false },
        );
      };

     async function richiesta(){
        if(image64!= null){
          if(image64.length <= 137000){

           await CommunicationController.setProfile(sid,name,image64).then(ris=> console.log(ris))
            v.requestProfile(sid).then(ris => console.log(ris+"rissssssssssssssssssssssssssssssssssss"))
            navigation.navigate("Utente")
          }else{
            showError('L\'immagine è troppo grande');
  
          }
        }

          if(name != null){
            if(name <=20){
              await CommunicationController.setProfile(sid,name,image64).then(ris=> console.log(ris))
              console.log(name+"nome")
              v.requestProfile(sid).then(ris => console.log(ris+"rissssssssssssssssssssssssssssssssssssu"))
              navigation.navigate("Utente")
            }else{
              setName("")
              showError('il nome utente supera i 20 caratteri');
            }
           

          }else if(image64 == null){

          
            showError('I campi non possono essere tutte e due vuoti');
          }
        }
       
        
      
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Enter your name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setName(text)}
            value={name}
          />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button title="Select Image" onPress={pickImage} />
          

          <Button title="Submit" onPress={richiesta} />
        </View>
      );
      
      
    
      
      // Mostra il messaggio di errore
      
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});


export default Modifica;


