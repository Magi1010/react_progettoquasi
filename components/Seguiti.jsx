import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,ActivityIndicator, Image, View, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import TwokRow from './TwokRow';
import { createContext, useContext } from 'react';
import { useState, useEffect, Component}from 'react';
import CommunicationController from '../Model/cc';
import TwokViewModel from '../ViewModel/TwokViewModel'
import {myContext} from "../Context"
import StorageManager from '../Model/StorageManager';
  
function Seguiti(props){
    var twok = props.data.item
    const v = useContext(myContext)
    const sid = v.sid
    //console.log(twok +"QUESTOOO")
    let sm = new StorageManager()
    let [picture,setPicture] = useState(null)
    let[name,setName] = useState(null)
    
     useEffect(()=>{richiesta()},[])
    console.log("questo twok dioat non esiste"+twok.uid)
    const [loading, isLoading] = useState(false);


    


    async function richiesta(){
        
        isLoading(false);
        await CommunicationController.getPicture(sid, twok.uid)
        .then(ris => { 
        
           setPicture(ris.picture)
           
        })
      
    }
    async function handleGetPicture(){
        sm.getUserPicture(twok.uid,
            result => console.log("L'immagine nella row:", (result.picture)),
            error => console.log(error)
        )
    }

    

   
  
  

  
    
  

    
   
        if(picture != null){

    
            return(
                <View>
        
                        <Text  style={{
                        textAlign: "center",
                        fontSize: 30, 
        
                        }
                        }>{twok.name}</Text>
        
        
                         <TouchableOpacity 
                 onPress={props.handlepress}
                    
                  >
                <Image
                            source={{uri:
                            'data:image/png;base64,' + (picture)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                            />
            
            </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
                     </View>    
                     );
        }else{
            return( 
                <View>
        
                        <Text  style={{
                        textAlign: "center",
                        fontSize: 30, 
        
                        }
                        }>{twok.name}</Text>
        
        
                         <TouchableOpacity 
                 onPress={props.handlepress}
                    
                  >
                <Image
                            source={require('../Image/placeholder.jpg')} style={{width: 100, height:50, resizeMode: 'contain'}}
                            />
            
            </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
                        </View>   );
        }
    }
    
            
    
        
        

        



export default Seguiti