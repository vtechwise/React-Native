import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      {/* remote image */}
      {/* <Image source={{uri:'/images.png'}}/> */}
      <View style={{ paddingVertical: 50 }}>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
    </View>
  );
}
