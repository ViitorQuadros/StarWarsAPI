import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
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
    <ImageBackground
    source={{ uri: 'https://i.pinimg.com/originals/44/ac/f0/44acf0c89a96f3cd5e3aaaa6c7c61dfc.jpg' }}
    style={styles.background}
    
  >
     
    
    
    
    <View style={styles.container}>
      {ships.length > 0 ? (
        <FlatList
          data={ships}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.DetalhesTextoRetorno}>Modelo: {item.model}</Text>
              <Text style={styles.DetalhesTextoRetorno}>Fabricante: {item.manufacturer}</Text>
              <Text style={styles.DetalhesTextoRetorno}>Comprimento: {item.length}</Text>
              <Text style={styles.DetalhesTextoRetorno}>Capacidade de Carga: {item.cargo_capacity}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.DetalhesTextoRetorno}>Esse personagem não tem naves...</Text>
      )}
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    resizeMode: "cover",
  },
  
  container: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  itemContainer: {
    
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "white",
  },
  DetalhesTextoRetorno:{
    color:"white",
    fontSize: 17,
    
  },

});
