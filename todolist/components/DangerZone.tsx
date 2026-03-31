import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useTheme from "@/app/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const DangerZone = () => {
  const { colors } = useTheme();
  const settingStyles = createSettingsStyles(colors);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const handleResetApp = () => {
    Alert.alert(
      "Reset App",
      "⚠️ This will delete ALL todos permanently. this action cannot not be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearAllTodos();
              Alert.alert(
                "App Reset",
                `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"} `,
              );
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Filed to reset app");
            }
          },
        },
      ],
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyles.section}
    >
      <Text style={settingStyles.sectionTitleDanger}>DangerZone</Text>
      <TouchableOpacity
        style={[settingStyles.actionButton, { borderBottomWidth: 0 }]}
        onPress={handleResetApp}
        activeOpacity={0.7}
      >
        <View style={settingStyles.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingStyles.actionIcon}
          >
            <Ionicons name="trash" size={18} color={"#fff"} />
          </LinearGradient>
          <Text style={settingStyles.actionTextDanger}>Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
