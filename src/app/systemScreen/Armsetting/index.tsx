import React, { useState } from "react";
import type { FC } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { pxToDp } from "~/utils";

type TProps = {};

type ArmText = "J1" | "J2" | "J3" | "J4" | "J5" | "J6";

const arr: ArmText[] = ["J1", "J2", "J3", "J4", "J5", "J6"];

const App: FC<TProps> = ({}) => {
  const [values, setValues] = useState([-125, 75]);
  const [armValue, setArmValue] = useState({
    J1: {
      min: 0,
      max: 0,
      angle: 0,
    },
    J2: {
      min: 0,
      max: 0,
      angle: 0,
    },
    J3: {
      min: 0,
      max: 0,
      angle: 0,
    },
    J4: {
      min: 0,
      max: 0,
      angle: 0,
    },
    J5: {
      min: 0,
      max: 0,
      angle: 0,
    },
    J6: {
      min: 0,
      max: 0,
      angle: 0,
    },
  });

  const setArmValueFun = (
    vlaue: string,
    i: ArmText,
    type: "min" | "max" | "angle"
  ) => {
    armValue[i][type] = Number(vlaue);
    setArmValue({
      ...armValue,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>关节范围</Text>
        <View style={styles.leftContent}>
          {arr?.map((i) => {
            return (
              <View key={i} style={styles.sBox}>
                <View style={styles.multiSliderTextBox}>
                  <Text style={styles.multiSliderText}>最小值</Text>
                  <Text style={styles.multiSliderText}>最大值</Text>
                </View>
                <View style={styles.multiSliderBox}>
                  <Text style={styles.multiSliderText2}>{i}:</Text>
                  <TextInput
                    value={String(armValue[i].min)}
                    style={styles.input}
                    onChangeText={(val) => setArmValueFun(val, i, "min")}
                  />
                  <Text style={styles.multiSliderText2}>-360º</Text>
                  <View style={styles.multiSlider}>
                    <MultiSlider
                      values={[armValue[i].min, armValue[i].max]}
                      sliderLength={pxToDp(600)}
                      min={-360}
                      max={360}
                      step={1}
                      selectedStyle={{
                        backgroundColor: "#45A6F3", // 更改滑动条被选中部分的背景色
                      }}
                      markerStyle={{
                        backgroundColor: "#fff", // 更改滑动条两端圆圈的颜色
                        borderColor: "#666",
                        borderWidth: pxToDp(1),
                      }}
                      onValuesChangeFinish={(val) => {
                        setArmValueFun(String(val[0]), i, "min");
                        setArmValueFun(String(val[1]), i, "max");
                      }}
                    />
                  </View>

                  <Text style={styles.multiSliderText2}>360º</Text>
                  <TextInput
                    value={String(armValue[i].max)}
                    style={styles.input}
                    onChangeText={(val) => setArmValueFun(val, i, "max")}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.title}>关节速度</Text>
        <View style={styles.rightContent}>
          {arr?.map((i) => {
            return (
              <View key={i} style={styles.rightItem}>
                <TextInput
                  value={String(armValue[i].angle)}
                  style={styles.input}
                  onChangeText={(val) => setArmValueFun(val, i, "angle")}
                />
                <Text style={styles.multiSliderText2}>º/s</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default App;
