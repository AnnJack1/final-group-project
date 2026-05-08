import { useState } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import MovieCard from "../components/MovieCard";
import { API_KEY, BASE_URL } from "../constants/tmdb";
import { Movie } from "../types/Movie";


export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);


  function searchMovies() {
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
      .then(res => res.json())
      .then(data => setResults(data.results));
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchMovies} />

      <View style={styles.grid}>
        {results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
