import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { ThemeProvider } from "./hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: "Home", headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
