import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from 'react-native-maps';
import CustomActions from './CustomActions.js';


const Chat = ({ route, navigation, db, isConnected, storage }) => {
    const { name, backgroundColor, userID } = route.params;
    const [messages, setMessages] = useState([]);

    let unsubMessages;

    useEffect(() => {

        //sets the navigation bar to the user's name
        navigation.setOptions({ title: name });
        //code to execute when component mounted or updated
        if (isConnected === true) {
            //unregister current onSnapshot() listener to avoid registering multiple 
            //listeners when useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push(
                        {
                        _id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                });
                cacheMessages(newMessages)
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        //clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }

    }, [isConnected]);

    const loadCachedMessages = async () => {
		try {
			const cachedMessages = await AsyncStorage.getItem('messages');
			if (cachedMessages) {
				setMessages(JSON.parse(cachedMessages));
			}
		} catch (error) {
			console.error('Failed to load messages from AsyncStorage', error);
		}
	};

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSend = async (newMessages) => {
        
        try {
            await addDoc(collection(db, "messages"), newMessages[0]);
        console.log("Message sent to Firestore successfully");
        } catch (error) {
            console.error('Error sending message to Firestore', error);
            //displays error message to the user
        }  
    }

    const renderInputToolbar = (props) => {
        if (isConnected === true) 
            return <InputToolbar {...props} />;
        else return null;
    }

    //creates a speech bubble for sender's messages in black and receivers in white
    const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
      }

      const renderCustomActions = (props) => {
        return <CustomActions userID={userID} storage={storage} {...props} />;
      };

      const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return(
                <MapView
                style={{width: 150,
                    height: 100,
                    borderRadius: 13,
                    margin: 3
                }}
                region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                >
                </MapView>
            );
        }
        return null;
      }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID,
                    name
                }}
            />
            {/* stops the keyboard from obstructing view input field as you type */}
            
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

export default Chat;

