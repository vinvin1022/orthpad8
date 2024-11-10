import React from "react";
import type { FC } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import styles from "./styles";

type TProps = {
  dataSoure: API.GetPosResultData[];
  hasSelectPoint: number[];
  setSelectPoint: (data: number[]) => void;
};

const App: FC<TProps> = ({ dataSoure, hasSelectPoint, setSelectPoint }) => {
  const setPoint = (id: number) => {
    if (hasSelectPoint.includes(id)) {
      setSelectPoint(hasSelectPoint.filter((i) => i !== id));
    } else if (hasSelectPoint.length >= 2) {
      ToastAndroid.show("最多选择两项，请先取消一个再勾选", ToastAndroid.SHORT);
    } else {
      setSelectPoint([...hasSelectPoint, id]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {dataSoure?.map((i) => {
        const hasSelect = hasSelectPoint.includes(i.id);
        return (
          <View style={styles.itemBox} key={i.id}>
            <TouchableOpacity
              style={styles.itemFlex}
              onPress={() => setPoint(i.id)}
            >
              <Text style={[styles.select, hasSelect && styles.hasselect]}>
                {hasSelect ? "√" : ""}
              </Text>
              <Text style={styles.title}>{i.name}</Text>
              <Text
                style={[
                  styles.type,
                  { color: i.type === "face" ? "red" : "green" },
                ]}
              >
                {i.type === "face" ? "面" : i.type === "line" ? "线" : "--"}
              </Text>
            </TouchableOpacity>

            {/* <Text style={[styles.statusIcon, {
                            backgroundColor: i.type === "face" ? "red" : "green"
                        }]}>{i.type === "face" ? "面" : i.type === "line" ? "线" : "--"}</Text> */}
            <View style={styles.itemFlex}>
              <View>
                <Text style={styles.btnLock}>锁定</Text>
              </View>
              <Text style={styles.line}> </Text>
              <View>
                <Text style={styles.btnMove}>位移</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default App;
