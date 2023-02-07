import React from 'react';
import MapView, { Marker } from 'react-native-maps';;
import { StyleSheet, View,Text} from 'react-native';
import * as Location from 'expo-location';


export default function Mappa(props) {
    const lat = props.route.params.lat;
    const lon = props.route.params.lon;

    var posizione = {
        latitude: lat,
        longitude:lon 
        
      };
      
    

    if(lat != null || lon !=null){
      
      
   
  return (
    <View style={styles.container}>
      <MapView style={styles.map} >
      <Marker coordinate={posizione}/>
</MapView>
    </View>
  );
}else{
  return(
  <View><Text style={{fontSize:40}}>niente mappa</Text></View>)
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});