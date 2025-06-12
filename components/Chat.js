import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params;
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Helo developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
        ]);
    }, []);

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    return (
        <GiftedChat
        messages={messages}
        onSend={messages=> onSend(messages)}
        user={{_id: 1}}/>
    )

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, {backgroundColor} ]} >
            <Text>Let's Chat!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Chat;