import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Utente from "./Utente"
import Modifica from './Modifica';


const Bacheca = createNativeStackNavigator()

export default function StackBacheca(){

    return(
    <Bacheca.Navigator >
  
  <Bacheca.Screen
          name="Utente"
          component={Utente}
          options={{ headerShown: false }}
          
        />
  <Bacheca.Screen
    name="Modifica"
    component={Modifica}
    options={{ headerShown: true }}
    
  />

     
       

        
        
      </Bacheca.Navigator>
    );
}