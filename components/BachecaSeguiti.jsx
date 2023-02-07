import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,ActivityIndicator, Image, View, Alert,FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import TwokRow from './TwokRow';
import { createContext, useContext } from 'react';
import { useState, useEffect, Component}from 'react';
import CommunicationController from '../Model/cc';
import TwokViewModel from '../ViewModel/TwokViewModel'
import Seguiti from './Seguiti';
import {myContext} from "../Context"
var cont = 0;

function BachecaSeguiti({navigation}){
 
  let[follower,setFollower]=useState([])
 
const v = useContext(myContext)
useEffect(() => {v.requestFollower().then(ris => {console.log(ris),isLoading(false)})}, [])
const [loading, isLoading] = useState(true);

/*
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      v.requestFollower().then(ris => 
        {
          if(cont == 0){
            
            setFollower(ris)
            console.log(JSON.stringify(follower)+"followwww")
           // cont=1;
            /*
          }else{
            console.log(JSON.stringify(ris[0]),JSON.stringify(follower[0])+"piluuuuuu")
            if(ris[0].length != follower[0].length){
              setFollower(ris)
            
            }
          
          }
        
          
           }
        
        )
    });
    return focusHandler;
}, [navigation]);

    */

  
    console.log("ENTROOOO")
  
    const sid = v.sid
    console.log(sid)
    console.log(JSON.stringify(v.lista))

   
    
    


   
    
/*
    
      if(cont == 0){
        v.requestFollower().then(ris => 
          {
            
         
           setFollower(ris)
           cont=1
           
          }
          
          )
      }
      */

      

     // console.log(JSON.stringify(follower[0].length)+"funge?")
      
        
        

    
  
     
      
    
        
    function goToProfile(uid){
   
      
      navigation.navigate('ProfiloUtente',{
        sid: sid,
        uid: uid,
        pagina:1
      
      
      })
      
    }
    if(loading){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      );
    }else{
      return( 

        <SafeAreaView style={styles.container}>
            
          <FlatList
            data={v.lista}
            renderItem={(twok)=>{{console.log(JSON.stringify(twok)+"TWOK")}return <Seguiti data={twok}  handlepress={()=>{goToProfile(twok.item.uid)}}></Seguiti>}}
            keyExtractor={twok => twok.uid}
          />
        </SafeAreaView>
      );
    }
   
          
     



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default BachecaSeguiti