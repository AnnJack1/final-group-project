import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Linking } from "react-native";
import { API_KEY, BASE_URL, IMAGE_URL } from "../../constants/tmdb";
import { Movie } from "../../types/Movie";

export default function Details() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, []);

  if (!movie) return <Text>Loading...</Text>;

  const trailer = movie.videos?.results?.find(
  (v) => v.type === "Trailer"
);


  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: IMAGE_URL + movie.poster_path }} style={styles.poster} />

      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      <Text
        style={styles.link}
        onPress={() => Linking.openURL(`https://www.themoviedb.org/movie/${id}`)}
      >
        View on TMDB
      </Text>

      {trailer && (
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(`https://youtube.com/watch?v=${trailer.key}`)}
        >
          Watch Trailer
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  poster: { width: "100%", height: 400, borderRadius: 8 },
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 12 },
  overview: { fontSize: 16, marginBottom: 20 },
  link: { color: "blue", marginBottom: 10, fontSize: 18 },
});
