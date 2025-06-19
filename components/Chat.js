import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';



const Chat = ({ route, navigation, db }) => {
    const { name, backgroundColor, userID } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        //sets the navigation bar to the user's name
        navigation.setOptions({ title: name });
        //code to execute when component mounted or updated

        const q = query(collection(db, "messages"), orderBy("createAt", "desc"));

        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages);
        })

        //clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }

    }, []);

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
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

