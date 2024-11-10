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
  positionLockId: any;
  setPositionLockId: React.Dispatch<React.SetStateAction<string>>;
  setSelectPoint: (data: number[]) => void;
};

const App: FC<TProps> = ({
  dataSoure,
  hasSelectPoint,
  setSelectPoint,
  setPositionLockId,
  positionLockId,
}) => {
  const setPoint = (id: number) => {
    setPositionLockId("");
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
      {dataSoure?.map((i, d) => {
        const hasSelect = hasSelectPoint.includes(i.id);
        return (
          <View
            style={[
              styles.itemBox,
              { backgroundColor: positionLockId == i.name ? "red" : "#fff" },
            ]}
            key={d}
          >
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
              <TouchableOpacity
                onPress={() =>
                  setPositionLockId((val: string) => {
                    if (val === i.name) {
                      return "";
                    } else {
                      return i.name;
                    }
                  })
                }
              >
                <Text style={styles.btnLock}>锁定</Text>
              </TouchableOpacity>
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
