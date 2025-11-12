import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"  options={{animation:"slide_from_right"}}/>   
      <Stack.Screen name="home"  options={{animation:"slide_from_bottom"}}/>  
      <Stack.Screen name="BookingScreen"/>
      <Stack.Screen name="login" />
    </Stack>
  );
}
