import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/Taxi.jpg")}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>AwaGo</Text>
      <Text style={styles.subtitle}>Agharass , Agharass 🚖</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000ff",
  },
  logo: {
    width:300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    color: "#fed05cff",
    fontSize: 34,
    fontWeight: "700",
  },
  subtitle: {
    color: "#8ECAE6",
    fontSize: 16,
    marginTop: 8,
    fontWeight: "400"

  },
});
