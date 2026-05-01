import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import { getMovieDetails, imageUrl } from './api';

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const id = params?.id?.toString?.() || '';
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      if (!id) return;
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.warn('Failed to load movie details', error);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  const openTmdb = () => {
    if (!id) return;
    Linking.openURL(`https://www.themoviedb.org/movie/${id}`);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={[styles.content, Platform.OS === 'web' && styles.webContent]}>
        {loading ? (
          <ActivityIndicator size="large" color="#0b69ff" style={styles.loader} />
        ) : (
          <>
            <Text style={styles.title}>{movie?.title || movie?.name || 'Movie Details'}</Text>
            <Text style={styles.subtitle}>{movie?.tagline || movie?.release_date}</Text>
            <View style={styles.detailCard}>
              <Image source={{ uri: imageUrl(movie?.poster_path) }} style={styles.poster} resizeMode="contain" />
              <Text style={styles.detailHeading}>Overview</Text>
              <Text style={styles.paragraph}>{movie?.overview || 'No description available.'}</Text>
              <View style={styles.statsRow}>
                <Text style={styles.stat}>⭐ {movie?.vote_average?.toFixed(1) || 'N/A'}</Text>
                <Text style={styles.stat}>{movie?.release_date || 'Unknown release'}</Text>
                <Text style={styles.stat}>{movie?.runtime ? `${movie.runtime} min` : 'Runtime unknown'}</Text>
              </View>
              <Text style={styles.detailHeading}>Links</Text>
              <TouchableOpacity onPress={openTmdb} style={styles.externalLink}>
                <Text style={styles.externalLinkText}>Open TMDB</Text>
              </TouchableOpacity>
              <Link href="/" style={styles.backLink}>
                <Text style={styles.linkText}>Back to Home</Text>
              </Link>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingTop: 20,
  },
  webContent: {
    paddingTop: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#475569',
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  poster: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 820 : 240,
    alignSelf: 'center',
    height: undefined,
    aspectRatio: 0.67,
    borderRadius: 14,
    marginBottom: 18,
    backgroundColor: '#cbd5e1',
  },
  detailHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  stat: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 12,
  },
  externalLink: {
    paddingVertical: 12,
    marginBottom: 10,
  },
  externalLinkText: {
    color: '#0b69ff',
    fontWeight: '700',
  },
  backLink: {
    paddingVertical: 12,
  },
  linkText: {
    color: '#0b69ff',
    fontWeight: '700',
  },
  loader: {
    marginTop: 40,
  },
});