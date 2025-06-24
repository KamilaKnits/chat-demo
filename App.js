import { StyleSheet, Text, View, } from 'react-native';
//import the screens
import Start from './components/Start';
import Chat from './components/Chat';
//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
 //app's amin chat component that renders the chat UI

 //firebase setup
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyC1DXBK-kMlbBl2lzh2xkvugtOq644Oo_0",
    authDomain: "chat-demo-f9769.firebaseapp.com",
    projectId: "chat-demo-f9769",
    storageBucket: "chat-demo-f9769.firebasestorage.app",
    messagingSenderId: "349449516798",
    appId: "1:349449516798:web:f3668fa0eb6a163c0797af"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
        >
        {props => <Chat db={db} {...props} />}
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