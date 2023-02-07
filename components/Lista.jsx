import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Dimensions,Button} from 'react-native';
import TwokRow from './TwokRow';
import TwokViewModel from '../ViewModel/TwokViewModel'
import { useState, useEffect, Component}from 'react';
import StorageManager from "../Model/StorageManager"
import {myContext} from "../Context"
import { createContext, useContext } from 'react';
import { NavigationHelpersContext } from '@react-navigation/native';
import CommunicationController from '../Model/cc';


export default function Lista({navigation}) {
  const v = useContext(myContext)
  const sid = v.sid
  var followed = v.list

 

    let[list, setList] = useState(null);

    let vm = new TwokViewModel()
    useEffect(() => {request()}, []);

    async function request(){
        await vm.createList(sid).then(result =>{setList(list = result)})
        console.log(JSON.stringify(list[0])+"listaaaaaa")
    }

    async function requestOne(){
        await vm.addOneTwok(list,sid).then(result =>{
    
      
        })
    }
    var x
    async function vai(){
      await CommunicationController.getFollowed(sid).then(ris => { x = ris})
    }
    vai().then(ris=> console.log("fatto"))

    function goToProfile(uid){
   
      
      navigation.navigate('Profilo',{
        sid: sid,
        uid: uid,
        pagina:0
      
      
      
      })
      
    }
   
    
     function goToMappa(lat,lon){
   
      
      navigation.navigate('Mappa',{
       lat:lat,
       lon:lon,
   
      
      
      
      })
      
    }
    
   
    

    

    

    return (
      
      
        <SafeAreaView style={styles.container}>
        
        <FlatList style={styles.listStyle} data={list}
          renderItem={(twok)=>{{}return <TwokRow data={twok} page={0}  navigazione={()=>goToMappa(twok.item.lat,twok.item.lon)}handlepress={()=>{goToProfile(twok.item.uid)}}/>}}
         keyExtractor={(twok)=>twok.index} 
          snapToInterval={Dimensions.get('window').height}
          snapToAlignment="start"
          decelerationRate="slow"
          
          onScrollEndDrag={requestOne}
          onEndReachedThreshold={3}
          />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listStyle: {
      width: "100%"
    }
  });