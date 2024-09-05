import { View, Text, FlatList, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text>Diretor: {item.director}</Text>
              <Text>Data de Lançamento: {item.release_date}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Carregando filmes...</Text>
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
