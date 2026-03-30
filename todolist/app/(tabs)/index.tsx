import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useTheme from "../hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
      </SafeAreaView>
    </LinearGradient>
  );
}
