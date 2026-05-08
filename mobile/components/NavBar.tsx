import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function NavBar() {
  return (
    <View style={styles.nav}>
      <Link href="/" asChild>
        <TouchableOpacity><Text style={styles.link}>Home</Text></TouchableOpacity>
      </Link>

      <Link href="/top-rated" asChild>
        <TouchableOpacity><Text style={styles.link}>Top Rated</Text></TouchableOpacity>
      </Link>

      <Link href="/trending" asChild>
        <TouchableOpacity><Text style={styles.link}>Trending</Text></TouchableOpacity>
      </Link>

      <Link href="/latest" asChild>
        <TouchableOpacity><Text style={styles.link}>Latest</Text></TouchableOpacity>
      </Link>

      <Link href="/editors" asChild>
        <TouchableOpacity><Text style={styles.link}>Editors</Text></TouchableOpacity>
      </Link>

      <Link href="/search" asChild>
        <TouchableOpacity><Text style={styles.link}>Search</Text></TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#222",
  },
  link: {
    color: "white",
    fontSize: 14,
    paddingHorizontal: 6,
  },
});
