import { ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

import Navbar from '../components/Navbar';
import MovieSection from '../components/MovieSection';
import { getPopular } from './api';

export default function EditorPicksScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopular();
        setMovies(data.results || []);
      } catch (error) {
        console.warn('Failed to load editor picks', error);
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
        <Text style={styles.title}>Editor's Picks</Text>
        <Text style={styles.subtitle}>This screen uses the Editor's Picks layout from the frontend files.</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0b69ff" style={styles.loader} />
        ) : (
          <MovieSection title="Editor's Picks" movies={movies.slice(0, 12)} />
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