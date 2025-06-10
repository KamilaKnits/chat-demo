import { useEffect } from 'react';
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
    const { name } = route.params;
    const { color} = route.params.backgoundColor;

    useEffect(() => {
        navigation.setOptions({ title: name }, { backgroundColor: color });
    }, []);

    return (
        <View style={styles.container} >
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