import { View, Text, Switch } from "react-native";
import React, { useState } from "react";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/app/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Preferences = () => {
  const { colors, toggleDarkMode, isDarkMode } = useTheme();
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnabled, setIsNotficationEnabled] = useState(true);

  const settingsStyles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitle}>Preferences</Text>
      {/* dark mode */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingsStyles.settingIcon}
          >
            <Ionicons name="moon" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.primary }}
          ios_backgroundColor={colors.border}
        />
      </View>
      {/* notifications */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={settingsStyles.settingIcon}
          >
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setIsNotficationEnabled(!isNotificationEnabled)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.warning }}
          ios_backgroundColor={colors.border}
        />
      </View>
      {/*  Auto sync */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.success}
            style={settingsStyles.settingIcon}
          >
            <Ionicons name="sync" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.success }}
          ios_backgroundColor={colors.border}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;
