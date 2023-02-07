import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BachecaSeguiti from './BachecaSeguiti';
import Profilo from './Profilo';


const Seguiti = createNativeStackNavigator()

export default function StackSeguiti(){

    return(
        <Seguiti.Navigator>
  
        <Seguiti.Screen
                name="Seguiti"
                component={BachecaSeguiti}
                options={{ headerShown: false }}
                />
             < Seguiti.Screen
                name="ProfiloUtente"
                component={Profilo}
                options={{ headerShown: true }}
              />
      
              
             
           
             
              
              
            </Seguiti.Navigator>
    );
}