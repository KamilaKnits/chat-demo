import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ route, navigation, db, isConnected }) => {
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
            if (unsubShoppinglists) unsubShoppinglists();
            unsubShoppinglists = null;

            const q = query(collection(db, "messages"), orderBy("createAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
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
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
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
        >
        </Bubble>
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    uid: userID,
                    name: name
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

