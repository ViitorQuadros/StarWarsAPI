import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function InformacoesNaves({ route }) {
  const { starships } = route.params;
  const [ships, setShips] = useState([]);

  useEffect(() => {
    async function fetchShips() {
      const shipRequests = starships.map(url => axios.get(url));
      const responses = await Promise.all(shipRequests);
      const shipsData = responses.map(response => response.data);
      setShips(shipsData);
    }

    if (starships.length > 0) {
      fetchShips();
    }
  }, [starships]);

  return (
    <View style={styles.container}>
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
        <Text>Esse personagem não tem naves...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    marginBottom: 15,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#363636',
  },
});
