import { View, Text, StyleSheet, Platform } from 'react-native';
import MovieCard from './MovieCard';

export default function MovieSection({ title, movies }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.cardGrid}>
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}-${title}`} movie={movie} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f172a',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: Platform.OS === 'web' ? 'space-between' : 'center',
  },
});