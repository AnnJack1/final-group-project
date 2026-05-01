import { ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

import Navbar from '../components/Navbar';
import MovieSection from '../components/MovieSection';
import { getTopRated } from './api';

export default function TopRatedScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getTopRated();
        setMovies(data.results || []);
      } catch (error) {
        console.warn('Failed to load top rated movies', error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={[styles.content, Platform.OS === 'web' && styles.webContent]}>
        <Text style={styles.title}>Top-Rated</Text>
        <Text style={styles.subtitle}>Browse the top-rated picks from the frontend layout.</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0b69ff" style={styles.loader} />
        ) : (
          <MovieSection title="Top-Rated Movies" movies={movies.slice(0, 12)} />
        )}
        <Link href="/" style={styles.backLink}>
          <Text style={styles.linkText}>Back to Home</Text>
        </Link>
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
    marginBottom: 10,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#475569',
  },
  backLink: {
    marginTop: 20,
    paddingVertical: 12,
  },
  linkText: {
    color: '#0b69ff',
    fontWeight: '700',
  },
  loader: {
    marginVertical: 40,
  },
});