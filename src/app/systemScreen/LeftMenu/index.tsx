import React from "react";
import type { FC } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

type TProps = {
  activePath: string;
  setAtivePath: (val: string) => void;
};

const leftMenuArr = [
  {
    name: "用户设置",
    value: "user",
    iconPath: require("~/assets/systemScreen/user.png"),
  },
  {
    name: "机械臂设置",
    value: "armsetting",
    iconPath: require("~/assets/systemScreen/armsetting.png"),
  },
  {
    name: "系统重置",
    value: "systemreset",
    iconPath: require("~/assets/systemScreen/systemreset.png"),
  },
  {
    name: "设备管理",
    value: "devicemanage",
    iconPath: require("~/assets/systemScreen/devicemanage.png"),
  },
];

const App: FC<TProps> = ({ activePath, setAtivePath }) => {
  return (
    <View style={styles.container}>
      {leftMenuArr?.map((i, d) => {
        return (
          <TouchableOpacity
            key={i.name}
            style={[styles.btn]}
            onPress={() => setAtivePath(i.value)}
          >
            <View
              style={[
                styles.btnImgBox,
                {
                  backgroundColor: activePath === i.value ? "#45A6F3" : "#333",
                },
              ]}
            >
              <Image
                source={i.iconPath}
                style={styles.btnImg}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles.buttonText,
                {
                  color: activePath === i.value ? "#45A6F3" : "#4B5155",
                },
              ]}
            >
              {i.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default App;
