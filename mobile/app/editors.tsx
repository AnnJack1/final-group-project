import { ScrollView, Text, View, StyleSheet } from "react-native";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../constants/tmdb";
import { Movie } from "../types/Movie";


export default function Screen() {
  const [movies, setMovies] = useState<Movie[]>([]);


  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Editor's Choice</Text>
      <View style={styles.grid}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
