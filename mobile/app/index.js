import { ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

import Navbar from '../components/Navbar';
import MovieSection from '../components/MovieSection';
import { getTopRated, getTrending, getNowPlaying, getPopular } from './api';

export default function HomeScreen() {
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [editorPicks, setEditorPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const [topRatedData, trendingData, latestData, popularData] = await Promise.all([
          getTopRated(),
          getTrending(),
          getNowPlaying(),
          getPopular(),
        ]);

        setTopRated(topRatedData.results || []);
        setTrending(trendingData.results || []);
        setLatest(latestData.results || []);
        setEditorPicks(popularData.results || []);
      } catch (error) {
        console.warn('Failed to load movies', error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={[styles.content, Platform.OS === 'web' && styles.webContent]}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Movie website</Text>
          <Text style={styles.heroSubtitle}>Find all of your favorite movies here! Powered by TMDB.</Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.themoviedb.org/')} style={styles.ctaButton}>
              <Text style={styles.ctaText}>TMDB</Text>
            </TouchableOpacity>
            <Link href="/search" style={styles.ctaButtonSecondary}>
              <Text style={styles.ctaSecondaryText}>Search</Text>
            </Link>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0b69ff" style={styles.loader} />
        ) : (
          <>
            <MovieSection title="Top-Rated" movies={topRated.slice(0, 8)} />
            <MovieSection title="Trending" movies={trending.slice(0, 8)} />
            <MovieSection title="Latest Releases" movies={latest.slice(0, 8)} />
            <MovieSection title="Editor's Picks" movies={editorPicks.slice(0, 8)} />
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
  hero: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f172a',
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
    color: '#475569',
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ctaButton: {
    minWidth: 120,
    backgroundColor: '#0b69ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 10,
  },
  ctaText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  ctaButtonSecondary: {
    minWidth: 120,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0b69ff',
    marginBottom: 10,
  },
  ctaSecondaryText: {
    color: '#0b69ff',
    fontWeight: '700',
  },
  loader: {
    marginTop: 40,
  },
});