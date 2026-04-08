import { View, Text } from "react-native";
import {
  useSafeAreaInsets,
  UsesafeAreaInsets,
} from "react-native-safe-area-context";
import React from "react";
import { COLORS } from "../constant/colors";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
