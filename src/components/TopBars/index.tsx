import React, { useEffect, useState } from "react";
import type { FC } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import services9125 from "~/services/services9125";
import BlinkingText from "../BlinkingText";
import { usePathname } from "expo-router";

type TProps = {};

// connectStatus
// const connectStatusDist = {
//     1: "未开始连接",
//     2: "连接中",
//     3: "所有连接成功",
//     4: "连接失败",
// }

const TopBars: FC<TProps> = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isFirstImagePressed, setIsFirstImagePressed] = useState(false);
  const [isSecondImagePressed, setIsSecondImagePressed] = useState(false);
  // const [showIcon, setShowIcon] = useState(false);
  const [user, setUser] = useState<API.LoginReq>();
  const [connectStatus, setConnectStatus] = useState(1);
  const [systemStatus, setSystemStatus] = useState(20001);

  const navigation: any = useNavigation();

  // 格式化时间函数
  const formatTime = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    hours = hours; // 将小时转换为12小时制
    return `${hours}:${addZero(minutes)}:${addZero(seconds)}`;
  };

  // 在数字前添加零，保证两位数显示
  const addZero = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  useEffect(() => {
    // 定时器，每秒钟更新一次时间和日期
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(formatTime(now));
      // getDeviceSystemStatus()
    }, 1000);

    // 在组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  const getDeviceConnectStatus = async () => {
    const res = await services9125.getConnectStatus();
    setConnectStatus(res?.data?.status);
  };

  const getDeviceSystemStatus = async () => {
    const res = await services9125.getSystemStatus();
    setSystemStatus(res?.data?.status);
  };
  const pathname = usePathname()
  // console.log(`pathname1: ${pathname}`)
  const showIcon = pathname !== "/login"
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     const currentRouteName = navigation?.getCurrentRoute()?.name;
  //     console.log(`currentRouteName: ${currentRouteName}`)
  //     let show = true;
  //     if (["login"].includes(currentRouteName)) {
  //       show = false;
  //     } else {
  //       getUserInfo();
  //       getDeviceConnectStatus();
  //     }
  //     setShowIcon(show);
  //   });

  //   // 清除副作用
  //   return unsubscribe;
  // }, []);

  const handleFirstImagePressIn = () => {
    setIsFirstImagePressed(true);
    checkBothImagesPressed();
  };

  const handleFirstImagePressOut = () => {
    setIsFirstImagePressed(false);
    checkBothImagesPressed();
  };

  const handleSecondImagePressIn = () => {
    setIsSecondImagePressed(true);
    checkBothImagesPressed();
  };

  const handleSecondImagePressOut = () => {
    setIsSecondImagePressed(false);
    checkBothImagesPressed();
  };

  const checkBothImagesPressed = () => {
    if (isFirstImagePressed && isSecondImagePressed) {
      console.log(
        "Both Images Clicked!",
        "You clicked both images simultaneously."
      );
    }
  };

  const onConnect = async () => {
    const res = await services9125.checkLinkcheck2();
    if (res?.code === 0) {
      getDeviceConnectStatus();
      ToastAndroid.show(res.message || "连接成功", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(res.message || "连接失败", ToastAndroid.SHORT);
    }
    console.log("onConnect.", res);
  };

  const emergencyStop = async () => {
    const res = await services9125.emergencyStopApi();
    if (res?.code === 0) {
      ToastAndroid.show(res.message || "急停成功", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(res.message || "急停失败", ToastAndroid.SHORT);
    }
  };
  const zeroForce = async (flag: number) => {
    const res = await services9125.gravityteaching(flag);
    if (res?.code === 0) {
      ToastAndroid.show(
        res.message || `${flag === 1 ? "开启" : "关闭"}零力示教成功`,
        ToastAndroid.SHORT
      );
    } else {
      ToastAndroid.show(
        res.message || `${flag === 1 ? "开启" : "关闭"}零力示教失败`,
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View>
      <ImageBackground
        source={showIcon ? require("./img/bg.png") : require("./img/bg2.png")}
        resizeMode="cover"
        style={styles.content}
      >
        {showIcon && (
          <View style={styles.content2}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("~/assets/topBars/icon.png")}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.dateText}>骨科手术定位机器人</Text>
              {/* <TouchableOpacity
                                onPressIn={handleFirstImagePressIn}
                                onPressOut={handleFirstImagePressOut}
                                delayPressOut={200} // 设置延迟以允许用户同时点击两张图片
                            >
                                <Image
                                    source={require('~/assets/topBars/stop.png')}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity> */}
            </View>
            <Text style={styles.dateText}>
              {currentDate + " " + currentTime}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.rightIcon}
                onPress={() => zeroForce(1)}
              >
                <Text style={styles.rightIconText}>开启零力示教</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rightIcon}
                onPress={() => zeroForce(0)}
              >
                <Text style={styles.rightIconText}>关闭零力示教</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPressIn={handleSecondImagePressIn}
                // onPressOut={handleSecondImagePressOut}
                style={styles.rightIcon}
                onPress={emergencyStop}
                //delayPressOut={200} // 设置延迟以允许用户同时点击两张图片
              >
                <Image
                  source={require("~/assets/topBars/stop.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.rightIconText}>急停</Text>
              </TouchableOpacity>
              <View style={styles.rightIcon}>
                <Image
                  source={require("~/assets/topBars/arm.png")}
                  style={[styles.icon]}
                  resizeMode="contain"
                />
                {systemStatus === 20001 ? (
                  <Text style={styles.rightIconText}>空闲中</Text>
                ) : (
                  <BlinkingText
                    shouldBlink={true}
                    color={
                      systemStatus === 30001
                        ? "green"
                        : systemStatus === 50001
                        ? "red"
                        : "#fff"
                    }
                    text={
                      systemStatus === 30001
                        ? "工作中"
                        : systemStatus === 50001
                        ? "发生异常"
                        : "--"
                    }
                  />
                )}
              </View>

              {connectStatus === 3 ? (
                <TouchableOpacity onPress={onConnect} style={styles.rightIcon}>
                  <Image
                    source={require("~/assets/topBars/connect.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <Text style={styles.rightIconText}>已连接</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={onConnect} style={styles.rightIcon}>
                  <Image
                    source={require("~/assets/topBars/disconnect.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <Text style={styles.rightIconText}>未连接</Text>
                </TouchableOpacity>
              )}

              <View style={styles.rightIcon}>
                <Image
                  source={require("~/assets/topBars/user.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.rightIconText}>
                  {user?.username || "--"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.rightIcon}
              >
                <Image
                  source={require("~/assets/topBars/bac.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default TopBars;
