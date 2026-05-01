import { Platform, StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Top Rated', href: '/top-rated' },
  { label: 'Trending', href: '/trending' },
  { label: 'Latest', href: '/latest' },
  { label: "Editor's Picks", href: '/editor-picks' },
  { label: 'Search', href: '/search' },
];

export default function Navbar() {
  return (
    <View style={[styles.navbar, Platform.OS === 'web' && styles.sticky]}>
      <View style={styles.brandContainer}>
        <Text style={styles.brand}>Brand</Text>
      </View>
      <View style={styles.linkRow}>
        {NAV_LINKS.map((item) => (
          <Link key={item.href} href={item.href} style={styles.link}>
            <Text style={styles.linkText}>{item.label}</Text>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sticky: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  brandContainer: {
    marginBottom: 8,
  },
  brand: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  link: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#111827',
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 14,
  },
});