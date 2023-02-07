import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lista from "./components/Lista";
import { useState, useEffect, Component}from 'react';
import StorageManager from "./Model/StorageManager";

import {myContext} from "./Context"
import UtenteNavigator from "./components/UtenteNavigator"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profilo from "./components/Profilo";
//import Seguiti from "./components/Seguiti";
import CommunicationController from './Model/cc';
import BachecaSeguiti from './components/BachecaSeguiti'
import AddTwok from './components/AddTwok';
import StackBacheca from './components/bachecanavigator';
import StackSeguiti from './components/Seguitinavigation';





function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate(BachecaSeguiti)} />
    </View>
  );
}









const Tab = createBottomTabNavigator();
//AsyncStorage.setItem("sid",'')

export default function App() {

 
 
   let [sid,setSid] = useState(null)
   let [load,setLoaded] = useState(false)
   let [lista,setLista] = useState({})
   let [namep,setNamep] = useState("");
   let [imagep,setImagep] = useState(null);
   var nome
   
    function addFollower(lista,profilo){
    var x ={
      uid:profilo.uid,
      name:profilo.name,
      pversion:profilo.pversion
    }
   var  listatmp = lista
    listatmp.push(x)
    //list.push(x)
    return listatmp
   }

   
   
   
  useEffect(() => {
    StorageManager.checkFirstRun().then( ris => setSid(ris))
   
  }, []);

   async function requestFollower(){
    let list = []
    await CommunicationController.getFollowed(sid).then(ris =>{
    
       // list.push(ris)
        setLista(ris)
       
      
      
    })
    //return list
   }


   async function requestProfile(){
    await CommunicationController.getProfile(sid).then(ris =>{
      console.log(JSON.stringify(ris)+"risultato")
      // list.push(ris)
       setNamep(ris.name)
       setImagep(ris.picture)
       nome = ris.name
       console.log(ris.name+"/"+nome+"/"+namep)
      
     
     
   })

   }
   console.log("RICARICOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
 if(sid == null){
   return(<View><Text> sto caricando</Text></View>)
 }else{
 // requestFollower()

  return (
    
    <myContext.Provider value={{sid:sid,requestFollower:requestFollower,lista:lista,requestProfile:requestProfile,namep:namep,imagep:imagep}}>
<NavigationContainer>
    
       <Tab.Navigator>
        <Tab.Screen name="Bacheca" component={StackBacheca} />
        <Tab.Screen name="BachecaSeguiti" component={StackSeguiti}/>
        <Tab.Screen name="Add Twok" component={AddTwok} />
        <Tab.Screen name="Utente" component={UtenteNavigator} />
        
      </Tab.Navigator>
      
      
    </NavigationContainer>
    </myContext.Provider>
    
  );
 }
  
}

/*
navigation.navigate('Root', {
  screen: 'Settings',
  params: {
    screen: 'Sound',
    params: {
      screen: 'Media',
    },
  },
});




 navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}


function DetailsScreen({ route, navigation }) {
 const { itemId, otherParam } = route.params;


<Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
*/
