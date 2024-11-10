import React from "react";
import type { FC } from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";

type TProps = {
  navigation: any;
};

const App: FC<TProps> = ({ navigation }) => {
  const router = useRouter()
  const toOtherPage = (path: string) => {
    // navigation.navigate(path);
    router.push(path)
  };

  return (
    <ImageBackground
      source={require("~/assets/bg.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.btnBox}>
        <View>
          <TouchableOpacity
            style={styles.boxLeftTop}
            onPress={() => toOtherPage("locationFastScreen")}
          >
            <Image
              source={require("~/assets/homeScreen/locationScreen.png")}
              resizeMode="cover"
              style={styles.boxLeftImg}
            />
            <Text style={styles.boxLeftText}>快速定位</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boxLeftBottom}
            onPress={() => toOtherPage("locationScreen")}
          >
            <Text style={styles.boxLeftText}>定位</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.boxRightTop}
            onPress={() => toOtherPage("queryScreen")}
          >
            <Image
              source={require("~/assets/homeScreen/queryScreen.png")}
              resizeMode="cover"
              style={styles.boxRightImg}
            />
            <Text style={styles.boxRightText}>查询</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxRightBottom}
            onPress={() => toOtherPage("systemScreen")}
          >
            <Image
              source={require("~/assets/homeScreen/systemScreen.png")}
              resizeMode="cover"
              style={styles.boxRightImg}
            />
            <Text style={styles.boxRightText}>系统设置</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default App;
