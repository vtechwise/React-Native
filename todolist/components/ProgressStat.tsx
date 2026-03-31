import { View, Text } from "react-native";
import React from "react";
import useTheme from "@/app/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ProgressStat = () => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos?.length : 0;
  const completedTodos = todos
    ? todos?.filter((todo) => todo.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitle}>Progress stats</Text>
      <View style={settingsStyle.statsContainer}>
        {/* total todos  */}

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyle.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingsStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyle.statIcon}
            >
              <Ionicons name="list" size={20} color={"#fff"} />
            </LinearGradient>
          </View>
          <View style={settingsStyle.statInfo}>
            <Text style={settingsStyle.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyle.statLabel}>Total Todos </Text>
          </View>
        </LinearGradient>
        {/* completed  todos  */}

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyle.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingsStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={settingsStyle.statIcon}
            >
              <Ionicons name="checkmark-circle" size={20} color={"#fff"} />
            </LinearGradient>
          </View>
          <View style={settingsStyle.statInfo}>
            <Text style={settingsStyle.statNumber}>{completedTodos}</Text>
            <Text style={settingsStyle.statLabel}>Completed Todos </Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyle.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingsStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={settingsStyle.statIcon}
            >
              <Ionicons name="time" size={20} color={"#fff"} />
            </LinearGradient>
          </View>
          <View style={settingsStyle.statInfo}>
            <Text style={settingsStyle.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyle.statLabel}>Active Todos </Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStat;
