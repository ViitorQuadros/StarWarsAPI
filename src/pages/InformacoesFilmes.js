import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function InformacoesFilmes({ route }) {
  const { films } = route.params;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const movieRequests = films.map(url => axios.get(url));
      const responses = await Promise.all(movieRequests);
      const moviesData = responses.map(response => response.data);
      setMovies(moviesData);
    }

    if (films.length > 0) {
      fetchMovies();
    }
  }, [films]);

  return (
    <ImageBackground
    source={{ uri: 'https://i.pinimg.com/originals/44/ac/f0/44acf0c89a96f3cd5e3aaaa6c7c61dfc.jpg' }}
    style={styles.background}
  >
    
    <View style={styles.container}>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.DetalhesTextoRetorno}>Diretor: {item.director}</Text>
              <Text style={styles.DetalhesTextoRetorno}>Data de Lançamento: {item.release_date}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Carregando filmes...</Text>
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
