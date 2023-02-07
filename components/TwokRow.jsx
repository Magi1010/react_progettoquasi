import React, { Component } from 'react';
import { StyleSheet, Text, View,Dimensions,Image, Button,TouchableOpacity, Alert} from 'react-native';
import { useState, useEffect}from 'react';
import StorageManager from "../Model/StorageManager";
import {myContext} from "../Context"
import { createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CommunicationController from '../Model/cc';




var cont = 0;
function TwokRow(props) {
  const fontStyles = ["normal", "italic"];
const fontSizes = [
    "15","20","30","40"
 
];
const textAlignments = ["auto", "left", "right", "center", "justify"];
const textAlignmentsVertical = ["auto", "flex-start", "flex-end", "center"];

  var te
    
    const v = useContext(myContext)
    const sid = v.sid
    
    let sm = new StorageManager()
    let [image,setImage] = useState(null)
    useEffect(() => {richiesta()}, [])
    var twok = props.data.item
    var textcolor = twok.fontcol;
    const bgcolor = twok.bgcol;
    const fontsize = twok.fontSize
    const halign = twok.halign;
    const valign = twok.valign;

   var imag;
   

    async function richiesta(){
     
        sm.getUserPicture(twok.uid,
            result => setImage(result.picture),
            error => console.log(error)
        )
    

      console.log(twok.uid+"log")
      console.log(Dimensions.get('window').height)
    
      }
      
      /*

      return (
        <View style={styles.container}>
          <View style={styles.nameAndImageContainer}>
            <Text style={styles.nameText}>nome</Text>
            <Image  source={require("../Image/placeholder.jpg")} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>TESTOOOO</Text>
          </View>
        </View>
      );
      */
  if(props.page == 0){
    console.log(textAlignments[twok.halign])

    if(image == null){
        if(twok.lat != null && twok.lon != null){
          return (
            <View style={[styles.container]}>
              <View style={styles.nameAndImageContainer}>
                <Text style={styles.nameText}>{twok.name}</Text>
                <TouchableOpacity onPress={props.handlepress} >
                <Image  source={require("../Image/placeholder.jpg")} style={styles.image} />
                </TouchableOpacity>
               </View>
               <TouchableOpacity onPress={props.navigazione} >
           <Image source={require("../Image/mapicon.png")} style={styles.mapImage} />
           </TouchableOpacity>
              <View style={[styles.textContainer,{ backgroundColor: "#"+bgcolor},{ justifyContent :textAlignmentsVertical[twok.valign]}]}>
              <Text style={[styles.text, {color: "#"+textcolor},{fontSize:fontSizes[twok.fontsize]},{textAlign:textAlignments[twok.halign]}]}>{twok.text}</Text>
             </View>
           </View>
            );
        }else{
          return (
            <View style={[styles.container]}>
              <View style={styles.nameAndImageContainer}>
                <Text style={styles.nameText}>{twok.name}</Text>
                <TouchableOpacity onPress={props.handlepress} >
                <Image  source={require("../Image/placeholder.jpg")} style={styles.image} />
                </TouchableOpacity>
               </View>
              <View style={[styles.textContainer,{ backgroundColor: "#"+bgcolor},{ justifyContent :textAlignmentsVertical[twok.valign]}]}>
              <Text style={[styles.text, {color: "#"+textcolor},{fontSize:fontSizes[twok.fontsize]},{textAlign:textAlignments[twok.halign]}]}>{twok.text}</Text>
             </View>
           </View>
            );
        }
      

    }else{
      if(twok.lat != null && twok.lon != null){
        return (
          <View style={styles.container}>
            <View style={styles.nameAndImageContainer}>
              <Text style={styles.nameText}>{twok.name}</Text>
              
              <TouchableOpacity onPress={props.handlepress} >
              <Image source={{uri: 'data:image/png;base64,' + (image)}} style={styles.image}/>
              </TouchableOpacity>
             
       
             </View>
             <TouchableOpacity onPress={props.navigazione} >
             <Image source={require("../Image/mapicon.png")} style={styles.mapImage} />
             </TouchableOpacity>
             <View style={[styles.textContainer,{ backgroundColor: "#"+bgcolor},{ justifyContent :textAlignmentsVertical[twok.valign]}]}>
            <Text style={[styles.text, {color: "#"+textcolor},{fontSize:fontSizes[twok.fontsize]},{textAlign:textAlignments[twok.halign]}]}>{twok.text}</Text>
           </View>
         </View>
          );
      }else{
        return (
          <View style={styles.container}>
            <View style={styles.nameAndImageContainer}>
              <Text style={styles.nameText}>{twok.name}</Text>
              
              <TouchableOpacity onPress={props.handlepress} >
              <Image source={{uri: 'data:image/png;base64,' + (image)}} style={styles.image}/>
              </TouchableOpacity>
             
       
             </View>
             <TouchableOpacity onPress={props.navigazione} >
             </TouchableOpacity>
             <View style={[styles.textContainer,{ backgroundColor: "#"+bgcolor},{ justifyContent :textAlignmentsVertical[twok.valign]}]}>
            <Text style={[styles.text, {color: "#"+textcolor},{fontSize:fontSizes[twok.fontsize]},{textAlign:textAlignments[twok.halign]}]}>{twok.text}</Text>
           </View>
         </View>
          );
      }
     
    }  
  }else{
    return (
      <View style={[styles.containeru]}>
    <View style={[styles.uidcontainer,{ backgroundColor: "#"+bgcolor},{ justifyContent :textAlignmentsVertical[twok.valign]}]}>
     
     <Text style={[styles.textUid, {color: "#"+textcolor},{fontSize:fontSizes[twok.fontsize]},{textAlign:textAlignments[twok.halign]}]}>{twok.text}</Text>



            
  </View>
  </View> );
}

  
}

    /*
    








  

    
    

    
        return (<View style={ {
            width: "100%",
            height: Dimensions.get('window').height,
            width:Dimensions.get('window').width,
          backgroundColor: "#"+twok.bgcol, 
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          
         <TouchableOpacity 
         onPress={props.handlepress}
            
          >
        <Image
                    source={{uri:
                    'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                    />
                   
    
    </TouchableOpacity>
           
            <Text style={{
            fontSize: twok.fontsize +40 , 
            fontSize:40,
            fontWeight: "700",
          color: "#"+twok.fontcol
        }}>{twok.text}</Text>
        <View style={{}}><Button title="mappa" onPress={props.navigazione}></Button></View>
        
   
    
                  
        </View> );
    }else{
        return (<View style={ {
            width: "100%",
            height: Dimensions.get('window').height,
            width:Dimensions.get('window').width,
          backgroundColor: "#"+twok.bgcol, 
            alignItems: 'center',
            justifyContent: 'center',
        }}>
           
            <Text style={{
            fontSize: twok.fontsize +40 , 
            fontSize:40,
            fontWeight: "700",
          color: "#"+twok.fontcol
        }}>{twok.text}</Text>

    
    
                  
        </View> );
    }
    


}
*/
/*
const styles = StyleSheet.create({
   
    twokStyle: {
        width: "100%",
        height: Dimensions.get('window').height,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 40,
        fontWeight: "700"
    }
  });
  */

  const styles = StyleSheet.create({
    containeru:{
        flex:1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width  

    },



    container: {
      flex: 1,
      
      
      height: Dimensions.get('window').height 
    },
    nameAndImageContainer: {
      
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10
    },
    nameText: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    image: {
      width: 50,
      height: 50
    },
    textContainer: {
  
  // height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 44 : 0),
   
     
      flex: 1,
      padding: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    
    marginBottom: 175
    },
    text: {
      fontSize: 16,

    },
    mapImage: {
      width: 30,
      height: 30,
      alignSelf: "left",
      marginTop: 0,
      marginLeft:15
    },

    uidcontainer:{
      
      
      flex: 1,
      padding: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom:100
    
   
    
  },
     
      textUid:{
      
      fontWeight: "700",
     
  }
  });

 //fontcol fontSize, fonttype, hslign, vslign

export default TwokRow;