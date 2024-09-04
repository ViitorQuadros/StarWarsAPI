import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
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

  const irParaNaves = () => navigation.navigate("InformacoesNaves");
  const irParaFilmes = () => navigation.navigate("InformacoesFilmes");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Personagem</Text>
      {selectedCharacter ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeader}>{selectedCharacter.name}</Text>
          <Text>Altura: {selectedCharacter.height}</Text>
          <Text>Massa: {selectedCharacter.mass}</Text>
          <Text>Cor do cabelo: {selectedCharacter.hair_color}</Text>
          <Text>Cor da pele: {selectedCharacter.skin_color}</Text>
          <Text>Cor dos olhos: {selectedCharacter.eye_color}</Text>
          <Text>Ano de nascimento: {selectedCharacter.birth_year}</Text>
          <Text>Gênero: {selectedCharacter.gender}</Text>
        </View>
      ) : (
        <Text>Carregando...</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={irParaNaves}>
        <Text style={styles.buttonText}>Nave</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irParaFilmes}>
        <Text style={styles.buttonText}>Filmes</Text>
      </TouchableOpacity>
    </View>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  detailsContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  detailsHeader: {
    fontSize: 22,
    fontWeight: "bold",
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
