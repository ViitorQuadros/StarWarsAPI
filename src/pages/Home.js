import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Home({ navigation }) {
  const irParaDetalhesPersonagens = (name) => {
    navigation.navigate("DetalhesPersonagens", { characterName: name });
  };

  return (
    <View style={styles.container}>
      {["Luke Skywalker", "Darth Vader", "C-3PO", "R2-D2", "Obi-Wan Kenobi"].map((name) => (
        <TouchableOpacity 
          key={name} 
          style={styles.button} 
          onPress={() => irParaDetalhesPersonagens(name)}
        >
          <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f58733",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "600",
  },
});
