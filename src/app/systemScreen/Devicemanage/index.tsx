import React from "react";
import type { FC } from "react";
import { View } from "react-native";
import styles from "./styles";
import Table from "./Table";

type TProps = {};

const App: FC<TProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Table />
    </View>
  );
};

export default App;
