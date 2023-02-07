import React, { useState } from "react";
import { FlatList, Platform,Alert, ScrollView,Dimensions, SafeAreaView,TextInput,StatusBar, StyleSheet, Switch, Text, TouchableWithoutFeedback, View, Button} from "react-native";
import CommunicationController from "../Model/cc";
import {myContext} from "../Context"
import * as Location from 'expo-location';

import { createContext, useContext } from 'react';
const fontStyles = ["normal", "italic","bold"];
const fontSizes = [
    "15","20","30","40"
 
];
const textAlignments = ["auto", "left", "right", "center", "justify"];
const textAlignmentsVertical = ["auto", "flex-start", "flex-end", "center"];

import BouncyCheckbox from "react-native-bouncy-checkbox";
var lat,lon
function AddTwok(){
    const v = useContext(myContext)
    const sid = v.sid
    
    const [text, onChangeText] = React.useState("");
    const [backgroundColor,setBackgroundColor] = React.useState("")
    const [fontColor,setFontColor] = React.useState("")
   // const [fontSize, setFontSize] = useState("")
    const [fontSizeIdx, setFontSizeIdx] = useState(0);
   // const [alignH, setAlignH] = useState("");
    //const [alignV, setAlignV] = useState("");
    const [alignHIdx, setAlignHIdx] = useState(0);
    const [alignVIdx, setAlignVIdx] = useState(0);

    const [fontStyleIdx, setFontStyleIdx] = useState(0);
    const [number, onChangeNumber] = React.useState(null);
    const [checkboxState, setCheckboxState] = React.useState(false);
    const handleTextChange = (newText) => {
      onChangeText(newText)
      if (newText.length > 100) {
        Alert.alert('Attenzione', 'Non puoi inserire più di 100 caratteri');
        onChangeText("")
      }
    };
    const isValidHexColor = (color) => {
      const hexColorPattern = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexColorPattern.test(color);
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


    const onBackgroundColorChange = (bgcol) => {
      const lowerCaseBgCol = bgcol.toLowerCase();
      setBackgroundColor(lowerCaseBgCol);
      if (lowerCaseBgCol.length == 6) {
        
        if (isValidHexColor(lowerCaseBgCol)) {
          setBackgroundColor(lowerCaseBgCol);
        } else {
          
          setBackgroundColor('');
          showError('Il colore non esiste');
         
        }
      } else if (lowerCaseBgCol.length > 6) {
        Alert.alert('Attenzione', 'Non puoi inserire più di 6 caratteri');
        setBackgroundColor('');
      }
    };

    const onFontColorChange = (fontcol) => {
      const lowerCaseFontCol = fontcol.toLowerCase();
      setBackgroundColor(lowerCaseFontCol);
      if (lowerCaseFontCol.length == 6) {
        
        if (isValidHexColor(lowerCaseFontCol)) {
          setBackgroundColor(lowerCaseFontCol);
        } else {
          
          setBackgroundColor('');
          showError('Il colore non esiste');
         
        }
      } else if (lowerCaseFontCol.length > 6) {
        Alert.alert('Attenzione', 'Non puoi inserire più di 6 caratteri');
        setBackgroundColor('');
      }
    };



   
    async function locationPermissionAsync() {
      let canUseLocation = false;
      const grantedPermission = await Location.getForegroundPermissionsAsync()
      if (grantedPermission.status === "granted") {
      canUseLocation = true;
      } else {
      const permissionResponse = await Location.requestForegroundPermissionsAsync()
      if (permissionResponse.status === "granted") {
      canUseLocation = true;
      }
      }
      if (canUseLocation) {
        const location = await Location.getCurrentPositionAsync()
        console.log("received location:", location);
        lat= location.coords.latitude
        lon = location.coords.longitude;
        await CommunicationController.addTwok(sid,text,backgroundColor,fontColor,fontSizeIdx,fontStyleIdx,alignHIdx,alignVIdx,lat,lon)
    
        
      }
      }
    async function inserisci(){
        console.log(fontSizeIdx)
        if(checkboxState){
          locationPermissionAsync()
        }else{
          
          await CommunicationController.addTwok(sid,text,backgroundColor,fontColor,fontSizeIdx,fontStyleIdx,alignHIdx,alignVIdx,0,0).then(ris=> console.log(ris))
          
         console.log("questo è lo sfondo"+backgroundColor)
        }
        
    
   }
    return (
      <SafeAreaView>
        
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={text}
          placeholder="inserisci testo"
         
        />
        <TextInput
          style={styles.input}
          onChangeText={onBackgroundColorChange}
          value={backgroundColor}
          placeholder="inserisci colore di sfondo"
         
        />
        <TextInput
          style={styles.input}
          onChangeText={onFontColorChange}
          value={fontColor}
          placeholder="inserisci colore del testo"
         
        />
        
        <CustomPicker
            label="Font Style"
            data={fontStyles}
            currentIndex={fontStyleIdx}
            onSelected={setFontStyleIdx}
            
          />
          <CustomPicker
            label="Font Size"
            data={fontSizes}
            currentIndex={fontSizeIdx}
            onSelected={setFontSizeIdx}
            
          />
          <CustomPicker
            label="Allineamento orizzontale"
            data={textAlignments}
            currentIndex={alignHIdx}
            onSelected={setAlignHIdx}
            
          />
          <CustomPicker
            label="Allineamento verticale"
            data={textAlignmentsVertical}
            currentIndex={alignVIdx}
            onSelected={setAlignVIdx}
            
          />
         
          <BouncyCheckbox
  size={25}
  fillColor="red"
  unfillColor="#FFFFFF"
  text="Posizione"
  iconStyle={{ borderColor: "red" }}
  innerIconStyle={{ borderWidth: 2 }}
  
  onPress={() => {setCheckboxState(!checkboxState)}}
/>
   

          <Button title={"Inserisci"} onPress={inserisci}></Button>




        <View style={{
            backgroundColor: "#"+backgroundColor,
            height: 200,
            width:Dimensions.get('window').width,
            justifyContent: textAlignmentsVertical[alignVIdx],
        }}>
            <Text style={{
                color: "#"+fontColor,
                fontStyle:fontStyles[fontStyleIdx],
                fontSize:fontSizes[fontSizeIdx],
                textAlign: textAlignments[alignHIdx],
               
               

            }}>{text}</Text>
        </View>
        
      </SafeAreaView>




    );
  };
  const CustomPicker = ({ label, data, currentIndex, onSelected }) => {
    return (
      <>
        <Text style={styles.title}>{label}</Text>
        <View style={styles.wrapperHorizontal}>
          <FlatList
            bounces
            horizontal
            data={data}
            keyExtractor={(item, idx) => String(item)}
            renderItem={({ item, index }) => {
              const selected = index === currentIndex;
              return (
                <TouchableWithoutFeedback onPress={() => onSelected(index)}>
                  <View
                    style={[
                      styles.itemStyleHorizontal,
                      selected && styles.itemSelectedStyleHorizontal
                    ]}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: selected ? "black" : "grey",
                        fontWeight: selected ? "bold" : "normal"
                      }}
                    >
                      {item + ""}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      </>
    );
  }
  
  


  const styles = StyleSheet.create({

    input: {
        height: 35,
        margin: 5,
        borderWidth: 1,
        padding: 10,
      },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "#ecf0f1",
      padding: 8
    },
    paragraph: {
      color: "black",
      textDecorationColor: "yellow",
      textShadowColor: "red",
      textShadowRadius: 1,
      margin: 24
    },
    wrapperHorizontal: {
      height: 35,
      justifyContent: "center",
      color: "black",
      marginBottom: 12
    },
    itemStyleHorizontal: {
      marginRight: 10,
      height: 35,
      padding: 8,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 25,
      textAlign: "center",
      justifyContent: "center"
    },
    itemSelectedStyleHorizontal: {
      borderWidth: 2,
      borderColor: "#DAA520"
    },
    platformContainer: {
      marginTop: 4,
      borderTopWidth: 1
    },
    platformContainerTitle: {
      marginTop: 4
    },
    title: {
      fontWeight: "bold",
      marginVertical: 2
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });

export default AddTwok;