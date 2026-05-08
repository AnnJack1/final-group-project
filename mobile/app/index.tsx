import { ScrollView, Text, View, StyleSheet } from "react-native";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../constants/tmdb";
import { Movie } from "../types/Movie";

export default function Home() {
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [latest, setLatest] = useState<Movie[]>([]);
  const [editors, setEditors] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setTopRated(data.results));

    fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setTrending(data.results));

    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setLatest(data.results));

    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setEditors(data.results));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Top Rated</Text>
      <View style={styles.grid}>
        {topRated.slice(0, 6).map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </View>

      <Text style={styles.header}>Trending</Text>
      <View style={styles.grid}>
        {trending.slice(0, 6).map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </View>

      <Text style={styles.header}>Latest Releases</Text>
      <View style={styles.grid}>
        {latest.slice(0, 6).map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </View>

      <Text style={styles.header}>Editor's Picks</Text>
      <View style={styles.grid}>
        {editors.slice(0, 6).map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginVertical: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
