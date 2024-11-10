import React, { useState } from 'react';
import type { FC } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
    ToastAndroid,
    Modal,
} from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { roles } from "~/utils/index";
import services9125 from '~/services/services9125';
import {
    changeServerHost,
    changevideoApi,
    changePointMoveSet,
    changePicSize,
    changeAlgorithmMode,
    changeArmSpeed,
    changePositioningDeviation,
    changeSurfaceArr,
    changelockMoveDistance,
    changellockMoveAngle,
} from '~/services/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TProps = {
    navigation: any;
}

let nowPressTime = 0

const App: FC<TProps> = ({ navigation }) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [ipHost, setIpHost] = useState("")
    const [videoApi, setVideoApi] = useState("")
    const [pointMoveSet, setPointMoveSet] = useState("")
    const [picSize, setPicSize] = useState("")
    const [algorithmMode, setAlgorithmMode] = useState("")
    const [armSpeed, setArmSpeed] = useState("")
    const [positioningDeviation, setPositioningDeviation] = useState("[]")
    const [surfaceArr, setSurfaceArr] = useState("[]")
    const [clickCount, setClickCount] = useState(0);
    const [lockMoveDistance, setlockMoveDistance] = useState("")
    const [lockMoveAngle, setlockMoveAngle] = useState("")
    const handleLogin = async () => {
        // navigation.navigate("homePage")
        // return
        if (!username) {
            ToastAndroid.show("请输入用户名", ToastAndroid.SHORT);
            return
        }
        if (!password) {
            ToastAndroid.show("请输入密码", ToastAndroid.SHORT);
            return
        }
        setLoading(true)
   
        // 处理登录逻辑
        const res = await services9125.loginApi({
            "username": username,
            "password": password,
        })
        if (res.code === 0) {
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            navigation.navigate("homePage")
        } else {
            ToastAndroid.show(res.message || "登录失败", ToastAndroid.SHORT);
        }
        console.log('login:', role, password, username);
        setLoading(false)
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const setIpHostData = async () => {
        const time = new Date().getTime()
        // 一秒内触发的
        if (time - nowPressTime < 1000) {
            if (clickCount === 4) {
                const value = await AsyncStorage.getItem("serverHost") || ipHost;
                setIpHost(value)
                const value2 = await AsyncStorage.getItem("videoApi") || videoApi;
                setVideoApi(value2)
                const value3 = await AsyncStorage.getItem("pointMoveSet") || pointMoveSet;
                setPointMoveSet(value3)
                const value4 = await AsyncStorage.getItem("picSize") || picSize;
                setPicSize(value4)
                const value5 = await AsyncStorage.getItem("algorithmMode") || algorithmMode;
                setAlgorithmMode(value5)
                const value6 = await AsyncStorage.getItem("armSpeed") || armSpeed;
                setArmSpeed(value6)
                const value7 = await AsyncStorage.getItem("positioningDeviation") || positioningDeviation;
                setPositioningDeviation(value7)
                const value8 = await AsyncStorage.getItem("surfaceArr") || surfaceArr;
                setSurfaceArr(value8)
                const value9 = await AsyncStorage.getItem("lockMoveDistance") || lockMoveDistance;
                setlockMoveDistance(value9)
                const value10 = await AsyncStorage.getItem("lockMoveAngle") || lockMoveAngle;
                setlockMoveAngle(value10)

                setModalVisible(true);

            } else {
                setClickCount(clickCount + 1);
            }
        } else {
            setClickCount(0);
        }
        nowPressTime = time
    }


    const handleSubmit = async () => {
        await AsyncStorage.setItem("serverHost", ipHost);
        await AsyncStorage.setItem("videoApi", videoApi);
        await AsyncStorage.setItem("pointMoveSet", pointMoveSet);
        await AsyncStorage.setItem("picSize", picSize);
        await AsyncStorage.setItem("algorithmMode", algorithmMode);
        await AsyncStorage.setItem("armSpeed", armSpeed);
        await AsyncStorage.setItem("positioningDeviation", positioningDeviation);
        await AsyncStorage.setItem("surfaceArr", surfaceArr);
        await AsyncStorage.setItem("lockMoveDistance", lockMoveDistance);
        await AsyncStorage.setItem("lockMoveAngle", lockMoveAngle);
        changeServerHost(ipHost)

        changevideoApi(videoApi)

        changePointMoveSet(pointMoveSet)

        changePicSize(picSize)

        changeAlgorithmMode(algorithmMode)

        changeArmSpeed(armSpeed)

        changePositioningDeviation(positioningDeviation)

        changeSurfaceArr(surfaceArr)
        changelockMoveDistance(lockMoveDistance)
        changellockMoveAngle(lockMoveAngle)

        handleCloseModal();
    };


    return (
        <SafeAreaView>
            <ImageBackground source={require("~/assets/login/bg.png")} resizeMode="cover" style={styles.container}>
                <ImageBackground source={require("~/assets/login/contentBg.png")} resizeMode="cover" style={styles.contentBox}>
                    <Text style={styles.title} onPress={setIpHostData}>骨科手术定位机器人</Text>
                    <View style={styles.logingContainer}>
                        <View style={styles.inputContainer}>
                            <Image
                                source={require('~/assets/login/authority.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="请输入帐号"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Image
                                source={require('~/assets/login/password.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="请输入密码"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Image
                                source={require('~/assets/login/permission.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                            <View style={styles.pickerBox}>

                                <Picker
                                    selectedValue={role}
                                    style={styles.picker}
                                    onValueChange={(e) => setRole(e)}>
                                    {
                                        // 设置选项
                                        roles.map((data, index) =>
                                            <Picker.Item style={styles.pickerItem} key={index} label={data.label} value={data.value} />
                                        )
                                    }

                                </Picker>
                            </View>

                        </View>
                        <TouchableOpacity onPress={handleLogin} disabled={loading}>
                            <Text style={[styles.btnLogin, { opacity: loading ? 0.3 : 1 }]}>登录</Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>

            </ImageBackground>

            <Modal
                animationType='fade' // 指定了 modal 的动画类型。类型：slide 从底部滑入滑出|fade 淡入淡出|none 没有动画
                transparent={true} // 背景是否透明，默认为白色，当为true时表示背景为透明。
                visible={modalVisible} // 是否显示 modal 窗口
                onRequestClose={handleCloseModal} // 回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。请务必注意本属性在 Android 平台上为必填，且会在 modal 处于开启状态时阻止BackHandler事件
            >
                <View style={styles.modalLayer}>
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalInputContainer,{ width: "100%" }]}>
                            <Text style={styles.modalTitle}>服务相关请求IP地址:</Text>
                            <TextInput
                                value={ipHost}
                                onChangeText={setIpHost}
                                style={[styles.ipHostInput, styles.inputWidth2]}
                            />
                        </View>
                        <View style={[styles.modalInputContainer, ,{ width: "100%" }]}>
                            <Text style={styles.modalTitle}>视频远程地址:</Text>
                            <TextInput
                                value={videoApi}
                                onChangeText={setVideoApi}
                                style={[styles.ipHostInput, styles.inputWidth2]}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>截取图片位置:</Text>
                            <TextInput
                                value={picSize}
                                onChangeText={setPicSize}
                                style={styles.ipHostInput}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>算法模式:</Text>
                            <TextInput
                                value={algorithmMode}
                                onChangeText={setAlgorithmMode}
                                style={styles.ipHostInput}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>机械臂速度:</Text>
                            <TextInput
                                value={armSpeed}
                                onChangeText={setArmSpeed}
                                style={styles.ipHostInput}
                            />
                        </View>
                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>定位偏差值:</Text>
                            <TextInput
                                value={positioningDeviation}
                                onChangeText={setPositioningDeviation}
                                style={styles.ipHostInput}
                            />
                        </View>
                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>一键导向的两个surface值:</Text>
                            <TextInput
                                value={surfaceArr}
                                onChangeText={setSurfaceArr}
                                style={styles.ipHostInput}
                            />
                        </View>
                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>图片标记点是否可到非黑色:</Text>
                            <TextInput
                                value={pointMoveSet}
                                onChangeText={setPointMoveSet}
                                style={styles.ipHostInput}
                            />
                        </View>
                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>锁定移动距离:</Text>
                            <TextInput
                                value={lockMoveDistance}
                                onChangeText={setlockMoveDistance}
                                style={styles.ipHostInput}
                            />
                        </View>
                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalTitle}>锁定旋转:</Text>
                            <TextInput
                                value={lockMoveAngle}
                                onChangeText={setlockMoveAngle}
                                style={styles.ipHostInput}
                            />
                        </View>



                        <View style={[styles.modalButtonStyle,{ width: "100%" }]}>
                            <TouchableOpacity
                                onPress={handleCloseModal}
                                style={styles.modalButton1}
                            ><Text>取消</Text></TouchableOpacity >
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={styles.modalButton2}
                            ><Text>确定</Text></TouchableOpacity >
                        </View>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}



export default App;

