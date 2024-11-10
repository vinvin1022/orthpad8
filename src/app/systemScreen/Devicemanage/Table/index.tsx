import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { Text, View, Switch, TouchableOpacity } from "react-native";
import styles from "./styles";
import { changeCanMoveByLocation } from "~/services/host";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tableColumns = [
  {
    title: "序号",
    dataIndex: "index",
  },
  {
    title: "设备名称",
    dataIndex: "name",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];

const dataSource = [
  {
    key: "1",
    name: "设备名称",
    status: "1",
    picture: "",
  },
  {
    key: "2",
    name: "设备名称2",
    status: "2",
    picture: "",
  },
  {
    key: "3",
    name: "设备名称3",
    status: "1",
    picture: "",
  },
  {
    key: "4",
    name: "定位后是否直接移动",
    status: "1",
    picture: "",
  },
];

const App: FC = ({}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const init = async () => {
    const value =
      (await AsyncStorage.getItem("canMoveByLocation")) === "true"
        ? true
        : false;
    setIsEnabled(value);
  };

  useEffect(() => {
    init();
  }, []);

  const toggleSwitch = async () => {
    setIsEnabled(!isEnabled);
    const val = !isEnabled ? "true" : "false";
    await AsyncStorage.setItem("canMoveByLocation", val);
    changeCanMoveByLocation(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {tableColumns?.map((i) => {
          return (
            <Text key={i.title} style={[styles.headerItem]}>
              {i.title}{" "}
            </Text>
          );
        })}
      </View>

      {dataSource?.map((i: any, d) => {
        return (
          <View style={styles.content} key={i.key}>
            {tableColumns?.map((ii) => {
              return (
                <Text key={ii.title} style={[styles.tableItem]}>
                  {ii.dataIndex === "operate" ? (
                    i?.name === "定位后是否直接移动" ? (
                      <Switch
                        trackColor={{ false: "#ccc", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#ccc" : "#81b0ff"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    ) : (
                      <TouchableOpacity>
                        <Text style={[styles.btnText]}>重置</Text>
                      </TouchableOpacity>
                    )
                  ) : (
                    i?.[ii.dataIndex] || d + 1
                  )}{" "}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default App;
