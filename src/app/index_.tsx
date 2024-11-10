import { Link, Redirect, router, useNavigation } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Page() {
  console.log("Page")
  // const navigation = useNavigation();
  return (

    <Redirect href="/login" />

    // <View style={{ margin: 30 }}>
    //   <Link href="/(tabs)">go tabs</Link>
    //   <Link href="/content?n=10">go content</Link>
    //   <Pressable
    //     onPress={() => {
    //       router.push("/(tabs)/settings");
    //     }}
    //   >
    //     <Text>dao settings</Text>
    //   </Pressable>
    //   <Link href="/modal">Present modal</Link>
    //   <Pressable
    //     onPress={() => {
    //       const name = Math.random() * 1000 + 1000 + "";
    //       router.push(`/user/${name}?n=999&m=10`);
    //     }}
    //   >
    //     <Text>user details</Text>
    //   </Pressable>
    // </View>
  );
}
