import React, { useState } from "react";
import type { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

type TProps = {
  number: number;
};

const App: FC<TProps> = ({ number }) => {
  const [values, setValues] = useState([25, 75]);

  return (
    <View style={styles.container}>
      <View style={styles.showText}>
        <Text>{number > 1 ? "" : "最小值"}</Text>
        <Text>-360°~-360°</Text>
        <Text>最大值</Text>
      </View>
      <View style={styles.showText}>
        <Text>J{number}</Text>
        <Text>-360°~-360°</Text>
        <Text>最大值</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MultiSlider
          values={values}
          onValuesChange={(values) => setValues(values)}
          sliderLength={200}
          min={0}
          max={100}
          step={1}
          onValuesChangeFinish={() => console.log(values)}
        />
        <Text>Slider 1: {values[0]}</Text>
        <Text>Slider 2: {values[1]}</Text>
      </View>
    </View>
  );
};

export default App;
