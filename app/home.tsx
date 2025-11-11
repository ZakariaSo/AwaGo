import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur AwaGo 🚕</Text>
      {/* <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace("/login")}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", color: "#023047", marginBottom: 30 },
  logoutButton: {
    backgroundColor: "#FB8500",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
