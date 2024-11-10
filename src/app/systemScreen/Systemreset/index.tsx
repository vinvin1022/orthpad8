import React from "react";
import type { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

type TProps = {};

const App: FC<TProps> = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnBox}>
        <TouchableOpacity style={styles.btn}>
          <Text style={[styles.btnText]}>系统重置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
