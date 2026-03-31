import { View, Text, ScrollView } from "react-native";
import React from "react";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "../hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProgressStat from "@/components/ProgressStat";
import { SafeAreaView } from "react-native-safe-area-context";
import Preferences from "@/components/Preferences";

const Settings = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const settingsStyle = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyle.container}
    >
      <SafeAreaView>
        {/* Header */}
        <View style={settingsStyle.header}>
          <View style={settingsStyle.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyle.iconContainer}
            >
              <Ionicons name="settings" size={28} color={"#ffff"} />
            </LinearGradient>
            <Text style={settingsStyle.title}>Settings</Text>
          </View>
        </View>
        {/* scroll view */}
        <ScrollView
          // style={settingsStyle.scrollView}
          contentContainerStyle={settingsStyle.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStat />
          <Preferences />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
