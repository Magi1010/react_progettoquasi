import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image,Alert, View, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import TwokRow from './TwokRow';
import { createContext, useContext } from 'react';
import { useState, useEffect, Component}from 'react';
import CommunicationController from '../Model/cc';
import TwokViewModel from '../ViewModel/TwokViewModel'
import {myContext} from "../Context"
var cont = 0
var follower=[]   
function Profilo(props){
 
  var con = 0
  vm = new TwokViewModel()
 
  const v = useContext(myContext)
  const sid = v.sid
 
  /*
  
   v.requestFollower().then(ris => 
    {
      console.log(JSON.stringify(ris)+"problemaa")
      follower=ris
      console.log(ris+"dfdf"+follower[0].length)
    }
    )
    */

    
  
  

    const follower = v.lista

  

    const uid = props.route.params.uid;
    const pagina = props.route.params.pagina
   


   
    let[list, setList] = useState(null);
    let [titolo,setTitolo] = useState("")
    useEffect(()=>{richiesta().then(ris=>console.log("finito"))},[])
    var [name,setName] = useState("")
    var [picture,setPicture] = useState("")
    var [pversion,setPversion]=useState(null)
    let vm = new TwokViewModel()
  
    async function richiesta(){
        await CommunicationController.getPicture(sid, uid)
        .then(ris => { 
           setName(ris.name)
           setPicture(ris.picture)
           //setPversion(ris.pversion)
           
        })
        vm.createUidList(sid,uid).then(ris => setList(ris))
      if(con == 0){
        controllo()
      }
     
    }
  
    async function requestUidOne(){
      await vm.addOneUidTwok(list,sid,uid).then(result =>{
         
    
      })
  }
   

    function controllo(){
      /*
      v.requestFollower().then(ris => 
        {
           follower = []
          follower.push(ris)
        }
        )
        */
   

    con = 1 
   // console.log(JSON.stringify(follower[0][0]) )

    for (let index = 0; index < follower.length; index++) {
     
      if(follower[index].uid == uid){
        
        setTitolo("Unfollow")
        return
  
      }
      
      
    }
    setTitolo("Follow")
  }
  


  


 
   async function segui(){

    
    //console.log(follower+"SEGUITI")
    

    if(titolo == "Follow"){
      var profile
      con=0;
      cont=1;
      
      await CommunicationController.follow(sid,uid).then(ris=> console.log(ris))
      
      Alert.alert("L'utente è stato followato")
      setTitolo("Unfollow")
    }else{
      con=0;  
      await CommunicationController.unfollow(sid,uid).then(ris => console.log(ris)) 
      Alert.alert("L'utente è stato unfollowato")
      setTitolo("Follow")
    }

    v.requestFollower().then(ris => console.log(ris))

   
    
    
    //navigation.navigate('BachecaSeguiti')
   }
   
    if(picture!=null){

    
 return(<View>
  


    <Text  style={{
        textAlign: "center",
        fontSize: 30, 
        
    }
    }>{name}</Text>
    <Image style={{
            justifyContent:'center',
            height: 100,
            width: 100,
        
          }}
    
    source={{uri:
    'data:image/png;base64,' + (picture)}} 

    />
    <TouchableOpacity
      onPress={segui}
    >
      <Text style = {{fontSize: 20,color:'blue'}}>{titolo}</Text>
    </TouchableOpacity>
    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
    <SafeAreaView style={styles.container}>
  
          
          <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{{}return <TwokRow data={twok} page={1} handlepress={()=>{console.log("tocca")}}/>}}
           keyExtractor={(twok)=>twok.index} 
            snapToInterval={Dimensions.get('window').height}
            snapToAlignment="start"
            decelerationRate="fast"
            
            onScrollEndDrag={requestUidOne}
            onEndReachedThreshold={1}
            />
          <StatusBar style="auto" />
        </SafeAreaView>

    
    </View>)
}else{
 
  return(<View>
  


    <Text  style={{
        textAlign: "center",
        fontSize: 30, 
        
    }
    }>{name}</Text>
    <Image style={{
            justifyContent:'center',
            height: 100,
            width: 100,
        
          }}
    
          source={require('../Image/placeholder.jpg')}
    />
   
    <TouchableOpacity
      onPress={segui}
    >
      <Text style = {{fontSize: 20,color:'blue'}}>{titolo}</Text>
    </TouchableOpacity>
    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
    <SafeAreaView style={styles.container}>
  
          
          <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{{}return <TwokRow data={twok} page={1} handlepress={()=>{console.log("tocca")}}/>}}
           keyExtractor={(twok)=>twok.index} 
            snapToInterval={Dimensions.get('window').height}
            snapToAlignment="start"
            decelerationRate="fast"
            
            onScrollEndDrag={requestUidOne}
            onEndReachedThreshold={1}
            />
          <StatusBar style="auto" />
        </SafeAreaView>

    
    </View>)

}
}

const styles = StyleSheet.create({
   

        container: {
          display: "flex",
          flexDirection: "vertical",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          textAlign: "center"
        }
      });

export default Profilo