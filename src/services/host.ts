import AsyncStorage from '@react-native-async-storage/async-storage';

const initIp = "http://10.55.20.118:9125"

// export let serverHost =  "http://10.55.23.49:9125/apis/v1/"
// export let serverHost =  'http://10.55.23.47:9125/apis/v1/'
// export let serverHost =  'http://10.55.23.26:9125/apis/v1/'
// export let serverHost = 'http://10.55.25.24:9125/apis/v1/'

export let serverHost = initIp  +  '/apis/v1/'

// 服务地址
export const changeServerHost = (newApi: string) => {
    serverHost = newApi  +  '/apis/v1/'
}

export let videoApi = "videocard/?p1=0,0&p2=1280,720"

export let picSize = "p1=0,0&p2=1920,1080"


export let armSpeed = "0.5"

export let pointMoveSet = "true"

export let surfaceArr = "xz,xz"

// 算法模式
export let algorithmMode = "0"

// 定位偏差
export let positioningDeviation = "[5,5,5,5,5,5]"

export let canMoveByLocation = "false"

export let lockMoveDistance = "0.03"

export let lockMoveAngle = "1"


export const changelockMoveDistance = (val: string) => {
    lockMoveDistance = val
}

export const changellockMoveAngle = (val: string) => {
    lockMoveAngle = val
}


// 更改算法模式
export const changeAlgorithmMode = (val: string) => {
    algorithmMode = val
}


// 视频地址
export const changevideoApi = (newApi: string) => {
    videoApi = newApi
}

// 图片标记点是否可到非黑色
export const changePointMoveSet = (val: string) => {
    pointMoveSet = val
}

// 截取图片位置
export const changePicSize = (val: string) => {
    picSize = val
}


// 机械臂速度
export const changeArmSpeed = (val: string) => {
    armSpeed = val
}

// 定位偏差值
export const changePositioningDeviation = (val: string) => {
    positioningDeviation = val
}

// 定位偏差值
export const changeSurfaceArr = (val: string) => {
    surfaceArr = val
}

// 定位后是否直接移动
export const changeCanMoveByLocation = (val: string) => {
    canMoveByLocation = val
}

const init = async () => {
    const value = await AsyncStorage.getItem("serverHost");
    const newVideoApi = await AsyncStorage.getItem("videoApi");
    const newPointMoveSet = await AsyncStorage.getItem("pointMoveSet");
    const newPicSize = await AsyncStorage.getItem("picSize");
    const newArmSpeed = await AsyncStorage.getItem("armSpeed");
    const newPositioningDeviation = await AsyncStorage.getItem("positioningDeviation");
    const newSurfaceArr = await AsyncStorage.getItem("surfaceArr");
    const newCanMoveByLocation = await AsyncStorage.getItem("canMoveByLocation");
    const newAlgorithmMode = await AsyncStorage.getItem("algorithmMode");
    const newlockMoveDistance = await AsyncStorage.getItem("lockMoveDistance");
    const newlockMoveAngle = await AsyncStorage.getItem("lockMoveAngle");

    if (newlockMoveDistance) {
        changeAlgorithmMode(newlockMoveDistance)
    } else {
        await AsyncStorage.setItem("lockMoveDistance", lockMoveDistance);
    }
    if (newlockMoveAngle) {
        changeAlgorithmMode(newlockMoveAngle)
    } else {
        await AsyncStorage.setItem("lockMoveAngle", lockMoveAngle);
    }
    if (value) {
        changeServerHost(value)
    } else {
        await AsyncStorage.setItem("serverHost", initIp);
    }
    if (newVideoApi) {
        changevideoApi(newVideoApi)
    } else {
        await AsyncStorage.setItem("videoApi", videoApi);
    }
    if (newPointMoveSet) {
        changePointMoveSet(newPointMoveSet)
    } else {
        await AsyncStorage.setItem("pointMoveSet", pointMoveSet);
    }
    if (newPicSize) {
        changePicSize(newPicSize)
    } else {
        await AsyncStorage.setItem("picSize", picSize);
    }

    if (newArmSpeed) {
        changeArmSpeed(newArmSpeed)
    } else {
        await AsyncStorage.setItem("armSpeed", armSpeed);
    }
    if (newPositioningDeviation) {
        changePositioningDeviation(newPositioningDeviation)
    } else {
        await AsyncStorage.setItem("positioningDeviation", positioningDeviation);
    }
    if (newSurfaceArr) {
        changeSurfaceArr(newSurfaceArr)
    } else {
        await AsyncStorage.setItem("surfaceArr", surfaceArr);
    }
    if (newCanMoveByLocation) {
        changeCanMoveByLocation(newCanMoveByLocation)
    } else {
        await AsyncStorage.setItem("canMoveByLocation", canMoveByLocation);
    }

    if (newAlgorithmMode) {
        changeAlgorithmMode(newAlgorithmMode)
    } else {
        await AsyncStorage.setItem("algorithmMode", algorithmMode);
    }
}

init()
