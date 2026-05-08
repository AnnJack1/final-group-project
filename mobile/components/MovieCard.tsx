import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { IMAGE_URL } from "../constants/tmdb";
import { router } from "expo-router";
import { Movie } from "../types/Movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/movie/[id]" as const,
          params: { id: movie.id.toString() },
        } as any)
      }
    >
      <Image
        source={{ uri: IMAGE_URL + movie.poster_path }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
  },
  poster: {
    width: "100%",
    height: 220,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginTop: 6,
  },
  rating: {
    color: "gold",
  },
});
