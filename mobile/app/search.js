import { ScrollView, StyleSheet, Text, Platform, View, TextInput, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { searchMovies } from './api';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const trimmed = query.trim();
    if (!trimmed) {
      setMovies([]);
      setError('');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchMovies(trimmed);
        setMovies(data.results || []);
      } catch (err) {
        console.warn('Search failed', err);
        setError('Could not load search results. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={[styles.content, Platform.OS === 'web' && styles.webContent]}>
        <Text style={styles.title}>Search Movies</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies, actors, or keywords"
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {loading && <ActivityIndicator size="large" color="#0b69ff" style={styles.loader} />}
        {!loading && error ? <Text style={styles.errorText}>{error}</Text> : null}
        {!loading && !query.trim() ? (
          <Text style={styles.description}>Type a movie name to search TMDB and tap a result to view details.</Text>
        ) : null}
        {!loading && query.trim() && movies.length === 0 && !error ? (
          <Text style={styles.description}>No movies found for “{query}”. Try another search term.</Text>
        ) : null}
        {movies.length > 0 ? (
          <View style={styles.cardGrid}>
            {movies.slice(0, 20).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </View>
        ) : null}
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
    backgroundColor: '#ffffff',
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
  searchInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: Platform.OS === 'web' ? 'space-between' : 'center',
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
    marginVertical: 20,
  },
});