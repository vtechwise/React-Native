import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { ThemeProvider } from "./hooks/useTheme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Home", headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
