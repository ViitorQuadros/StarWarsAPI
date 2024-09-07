import { View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function DetalhesPersonagens({ route, navigation }) {
  const [tableData, setTableData] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { characterName } = route.params; 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await swapiGet("people/");
        setTableData(response.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (tableData.length > 0) {
      const character = tableData.find(person => person.name === characterName);
      setSelectedCharacter(character);
    }
  }, [tableData, characterName]);

  const irParaNaves = () => {
    if (selectedCharacter) {
      navigation.navigate("InformacoesNaves", { starships: selectedCharacter.starships });
    }
  };
  
  const irParaFilmes = () => {
    if (selectedCharacter) {
      navigation.navigate("InformacoesFilmes", { films: selectedCharacter.films });
    }
  };
  

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/44/ac/f0/44acf0c89a96f3cd5e3aaaa6c7c61dfc.jpg' }}
      style={styles.background}
    >
    
    
    <View style={styles.container}>
      {selectedCharacter ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeader}>{selectedCharacter.name}</Text>
          <Text style={styles.DetalhesTextoRetorno}> Altura: {selectedCharacter.height}</Text>
          <Text style={styles.DetalhesTextoRetorno}> Peso: {selectedCharacter.mass}</Text>
          <Text style={styles.DetalhesTextoRetorno}> Cor do cabelo: {selectedCharacter.hair_color}</Text>
          <Text style={styles.DetalhesTextoRetorno}> Cor da pele: {selectedCharacter.skin_color}</Text>
          <Text style={styles.DetalhesTextoRetorno}> Cor dos olhos: {selectedCharacter.eye_color}</Text>
          <Text style={styles.DetalhesTextoRetorno}> Gênero: {selectedCharacter.gender}</Text>
        </View>
      ) : (
        <Text>Carregando...</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={irParaNaves}>
        <Text style={styles.buttonText}>Naves utilizadas </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irParaFilmes}>
        <Text style={styles.buttonText}>Filmes relacionados</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

async function swapiGet(param) {
  try {
    const response = await axios.get(`https://swapi.dev/api/${param}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
  },
  DetalhesRetornoAPI:{
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  detailsContainer: {
    alignItems: "center",
    marginBottom: 20,
    color: "white",
  },
  
  },
  detailsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  DetalhesTextoRetorno: {
    fontSize: 16,
    color: "white",

  },


  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 60,
    marginBottom: 10,
    
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});
