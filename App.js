import { StyleSheet, Text, View, } from 'react-native';
//import the screens
import Start from './components/Start';
import Chat from './components/Chat';


import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { Alert } from 'react-native';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



//firebase setup
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//app's main chat component that renders the chat UI
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

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

  //initialize Firebase Storage handler
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => <Chat
            {...props}
            db={db}
            storage={storage}
            isConnected={connectionStatus.isConnected}
          />}
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