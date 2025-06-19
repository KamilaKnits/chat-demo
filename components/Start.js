import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import { getAuth, signInAnonymously } from "firebase/auth";


const Start = ({ navigation }) => {
  const auth = getAuth();

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState();
  const ColorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE']

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat",
          {
            userID: result.user.uid,
            backgroundColor: selectedColor,
            name: name
          });
        Alert.alert("Signed in successfully!");
      }).catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      })
  }


  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/BackgroundImage.png")}
      resizeMode="cover"
    >
      <Text style={styles.title}>Chat App</Text>

      <View style={styles.container}>
        {/* main container of the page holding the TextInput, color background
         and start chatting button */}
        <View >
          {/* <Img source={require("../assets/icon.svg")} ></Img> */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name">
          </TextInput>
        </View>

        <View style={styles.colorContainer}>
          {/* this container holds the color buttons to select background color of chat screen */}

          <Text style={styles.colorText}>Choose your Background Color:</Text>
          <View style={styles.colorButtonsContainer}>
            {ColorOptions.map((color) => (


              <TouchableOpacity
                key={`color-button__${color}`}
                title="Go to Chat"
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && {
                    borderWidth: 2,
                    borderColor: "757083",
                  },
                ]}
                onPress={() => setSelectedColor(color)}
              ></TouchableOpacity>
            ))}
          </View>
        </View>

        <View >
          {/* touchableOpacity is used instead of button; much easier to customize */}
          <TouchableOpacity
            style={styles.chatButton}
            onPress={signInUser}
          >
            <Text style={styles.chatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
        {/* stops the keyboard from obstructing view input field as you type */}
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}

      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
    height: "40%"
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "88%",
    height: "44%",
    backgroundColor: "white"
  },

  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757803",
    opacity: 1,
    width: "300",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },

  colorContainer: {
    flex: 4,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
  },

  colorButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },

  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginBottom: 20,
  },

  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  chatButton: {
    padding: 15,
    backgroundColor: "#757083",
    width: "300",
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 15
  },

  chatButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white"

  }

});

export default Start;





