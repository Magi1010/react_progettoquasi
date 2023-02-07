import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity,ActivityIndicator,Platform, ScrollView,Dimensions, SafeAreaView,TextInput, StatusBar, StyleSheet, Switch, Text, TouchableWithoutFeedback, View, Button} from "react-native";
import CommunicationController from "../Model/cc";
import {myContext} from "../Context"
import { createContext, useContext } from 'react';



import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



 var cont=0
function Utente({navigation}){
    let[image,setImage]=useState(null)
    let[name,setName]=useState("")
  
    const v = useContext(myContext)
    const sid = v.sid
    React.useEffect(() =>{v.requestProfile(sid).then(ris=>{
      console.log("funziona almeno?"+v.namep,v.imagep)
      isLoading(false)

    })});

    const [loading, isLoading] = useState(true);
    
    


      
      async  function richiesta(){
        setImage(v.imagep)
        setName(v.namep)
        console.log(name,image+"provopna")
       
        


      }

      
      if(loading){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      );
    }else{  
        
        if(v.imagep == null){
          return (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <View style={{ position: 'relative' }}>
                <Image
                       source={require("../Image/placeholder.jpg")}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'purple',
                  }}
                  onPress={() => navigation.navigate('AnotherPage')}
                >
                  <Text style={{ color: 'purple', fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 20, marginTop: 20 }}>Nome profilo</Text>
            </View>
          );
            
        }else{
          return (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <View style={{ position: 'relative' }}>
                <Image
                   source={{uri:'data:image/png;base64,' + (v.imagep)}}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: 10,
                    borderRadius: 5,
                    
                    
                  }}
                  onPress={() => navigation.navigate('Modifica')}
                >
                  <Text style={{ color: 'purple', fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 20, marginTop: 20 }}>{v.namep}</Text>
            </View>
          );
        }

        
      };
    }
     
      
    


export default Utente;