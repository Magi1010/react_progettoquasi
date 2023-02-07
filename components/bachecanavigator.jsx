import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Lista from './Lista';
import Profilo from './Profilo';
import Mappa from './Mappa'


const Bacheca = createNativeStackNavigator()

export default function StackBacheca(){

    return(
    <Bacheca.Navigator >
  
  <Bacheca.Screen
          name="Lista"
          component={Lista}
          options={{ headerShown: false }}
          
        />
     
       < Bacheca.Screen
          name="Profilo"
          component={Profilo}
          options={{ headerShown: true }}
        />
        < Bacheca.Screen
          name="Mappa"
          component={Mappa}
          options={{ headerShown: true }}
        />

        
        
      </Bacheca.Navigator>
    );
}