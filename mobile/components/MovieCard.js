import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { imageUrl } from '../app/api';

function truncate(text, maxLength = 100) {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export default function MovieCard({ movie }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl(movie.poster_path) }} style={styles.image} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{movie.title || movie.name}</Text>
        <Text style={styles.cardRating}>⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</Text>
        <Text style={styles.cardText}>{truncate(movie.overview || movie.description, 120)}</Text>
        <Link href={`/details?id=${movie.id}`} style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 260,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#cbd5e1',
  },
  cardBody: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#0f172a',
  },
  cardRating: {
    color: '#f59e0b',
    marginBottom: 8,
    fontWeight: '700',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: '#0b69ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});