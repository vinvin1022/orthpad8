import React from "react";
import type { FC } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";

type TProps = {
  stepData: number;
};

const App: FC<TProps> = ({ stepData }) => {
  return (
    <View style={styles.step}>
      <View style={styles.stepBox}>
        {[
          {
            step: 1,
            name: "正位定位",
          },
          {
            step: 2,
            name: "侧位定位",
          },
          {
            step: 3,
            name: `    导向`,
          },
        ]?.map((i) => {
          return (
            <View style={styles.stepBoxItem} key={i.step}>
              {(stepData || 0) > i.step ? (
                <Text
                  style={[styles.stepNumber, { backgroundColor: "#0ED1D6" }]}
                >
                  {i.step}
                </Text>
              ) : (stepData || 0) == i.step ? (
                <View
                  style={[styles.stepNumber, { backgroundColor: "#0ED1D6" }]}
                >
                  <Image
                    source={require("./img/stepIcon.png")}
                    style={styles.stepIcon}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <Text
                  style={[styles.stepNumber, { backgroundColor: "#8CA8F7" }]}
                >
                  {i.step}
                </Text>
              )}
              <Text style={styles.stepName}>{i.name}</Text>
            </View>
          );
        })}
      </View>
      <View
        style={[
          styles.stepBar,
          styles.stepBar1,
          { backgroundColor: (stepData || 0) > 1 ? "#0ED1D6" : "#96B0F3" },
        ]}
      ></View>
      <View
        style={[
          styles.stepBar,
          styles.stepBar2,
          { backgroundColor: (stepData || 0) > 2 ? "#0ED1D6" : "#96B0F3" },
        ]}
      ></View>
    </View>
  );
};

export default App;
