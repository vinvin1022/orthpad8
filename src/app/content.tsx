import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useGlobalSearchParams } from "expo-router";

const LogoTitle: React.FC<{
  children: string;
  tintColor?: string;
}> = () => {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://rn.nodejs.cn/img/tiny_logo.png" }}
    />
  );
};

export default function Content() {
  const [count, setCount] = useState<number>(0);
  const router = useRouter();
  const params = useLocalSearchParams<{ name: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.name,
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => setCount((c) => c + 1)}
              title="Update count"
            />
          ),
        }}
      />
      <Text
        onPress={() => {
          router.setParams({ name: "Updated" });
        }}
      >
        content
      </Text>
      <Text>Count: {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
