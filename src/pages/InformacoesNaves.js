import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function InformacoesNaves({ route }){
  const { starships } = route.params;
  const [ships, setShips] = useState([]);

  useEffect(() => {
    async function fetchShips() {
      try {
        const shipRequests = starships.map(url => axios.get(url));
        const responses = await Promise.all(shipRequests);
        const shipsData = responses.map(response => response.data);
        setShips(shipsData);
      } catch (error) {
        console.error(error);
      }
    }

    if (starships.length > 0) {
      fetchShips();
    }
  }, [starships]);

    return (
      <View style={styles.container}>
      <Text style={styles.header}>Naves do Personagem</Text>
      {ships.length > 0 ? (
        <FlatList
          data={ships}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Modelo: {item.model}</Text>
              <Text>Fabricante: {item.manufacturer}</Text>
              <Text>Comprimento: {item.length}</Text>
              <Text>Capacidade de Carga: {item.cargo_capacity}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Carregando naves...</Text>
      )}
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
