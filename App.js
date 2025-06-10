import { StyleSheet, Text, View, } from 'react-native';
//import the screens
import Start from './components/Start';
import Chat from './components/Chat';
//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
 //app's amin chat component that renders the chat UI
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Start"
      >
        <Stack.Screen
        name="Start"
        component={Start}>
        </Stack.Screen>
        <Stack.Screen
        name="Chat"
        component={Chat}>
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default App;