import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';


const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState();
  const ColorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE']

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/BackgroundImage.png")}
      resizeMode="cover"
    >
      <Text style={styles.title}>Chat App</Text>

      <View style={styles.container}>

        <View>
          <TextInput
            style={styles.textInput}
            source={require("../assets/icon.svg")}
            value={name}
            onChangeText={setName}
            placeholder="Your Name">
          </TextInput>
        </View>

        <View style={styles.colorContainer}>
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
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => navigation.navigate('Chat', { name: name })}
          >
            <Text style={styles.chatButtonText}>Start Chatting</Text>

          </TouchableOpacity>
        </View>

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
    width: "80%",
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
    width: "88%",
    borderWidth: 1,
    marginBottom: 15,
  },

  chatButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white"

  }

});

export default Start;





