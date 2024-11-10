import React, { useState } from "react";
import type { FC } from "react";
import { ImageBackground, Text, View } from "react-native";
import styles from "./styles";
import LeftMenu from "./LeftMenu";
import User from "./User";
import Systemreset from "./Systemreset";
import Armsetting from "./Armsetting";
import Devicemanage from "./Devicemanage";

type TProps = {};

const App: FC<TProps> = ({}) => {
  const [activePath, setAtivePath] = useState("user");

  return (
    <ImageBackground
      source={require("~/assets/bg.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <LeftMenu activePath={activePath} setAtivePath={setAtivePath} />
      {activePath === "user" ? (
        <User />
      ) : activePath === "armsetting" ? (
        <Armsetting />
      ) : activePath === "systemreset" ? (
        <Systemreset />
      ) : activePath === "devicemanage" ? (
        <Devicemanage />
      ) : (
        <Text>error path</Text>
      )}
    </ImageBackground>
  );
};

export default App;
