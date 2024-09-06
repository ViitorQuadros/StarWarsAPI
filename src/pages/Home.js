import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import React from "react";

export default function Home({ navigation }) {
  const irParaDetalhesPersonagens = (name) => {
    navigation.navigate("DetalhesPersonagens", { characterName: name });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/44/ac/f0/44acf0c89a96f3cd5e3aaaa6c7c61dfc.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        {["Luke Skywalker", "Darth Vader", "Leia Organa", "R2-D2", "Obi-Wan Kenobi"].map((name) => (
          <TouchableOpacity 
            key={name} 
            style={styles.button} 
            onPress={() => irParaDetalhesPersonagens(name)}
          >
            <Text style={styles.buttonText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 60,
    
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#989898",
  },
});
