import React, { useEffect, useState } from "react";
import type { FC } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  Image,
  Modal,
  ToastAndroid,
  ActivityIndicator,
  ImageBackground,
  Animated,
  Button,
} from "react-native";
import PointPosition from "./PointPosition";
import styles, { ballWidth, ballPadding } from "./styles";
// import { VLCPlayer } from "react-native-vlc-media-player";
import services9125 from "~/services/services9125";
import {
  serverHost as host,
  videoApi,
  pointMoveSet,
  armSpeed,
  positioningDeviation,
  surfaceArr,
  lockMoveDistance,
  lockMoveAngle,
  canMoveByLocation,
  algorithmMode,
  changelockMoveDistance,
} from "~/services/host";
import { pxToDp } from "~/utils";
import BlinkingText from "~/components/BlinkingText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FullToast from "~/components/FullToast";
import FullLoading from "~/components/FullLoading";

type TProps = {};

type LeftShowType = "video" | "videoAgain" | "picture" | "editPicture";

let pressTimer: string | number | NodeJS.Timeout | undefined;

const leftImg = {
  width: pxToDp(1900),
  height: pxToDp(1100),
};

const App: FC<TProps> = () => {
  const [leftShowType, setLeftShowType] = useState<LeftShowType>("video");
  const [pointOne, setPointOne] = useState({ x: 0, y: 0 });
  const [pointTwo, setPointTwo] = useState({ x: 120, y: 0 });
  const [showLockModal, setShowLockModal] = useState(false);
  const [guideModal, setGuideModal] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [canMove, setCanMove] = useState(false);
  const [lockPonitPosition, setLockPonitPosition] = useState(false);
  const [showPositionSaveModal, setShowPositionSaveModal] = useState(false);
  const [positionData, setPositionData] = useState<API.GetPosResultData[]>([]);
  const [hasSelectPoint, setHasSelectPoint] = useState<number[]>([]);
  const [canEdit, setCanEdit] = useState(false);
  const [picName, setPicName] = useState("");
  const [loadingStatus, setLoadingStatus] = useState({
    picLoading: false,
    locationLoading: false,
    moveLoading: false,
    guideLoading: false,
  });
  const [videoResolving, setVideoResolving] = useState({
    rwidth: 0,
    rheight: 0,
  });

  const [confirmPositon, setConfirmPositon] = useState(false);
  const [polarizationPose, setPolarizationPose] = useState<any[]>([]);
  const [polarizationPoints, setPolarizationPoints] = useState([]);
  const [fullToastShow, setFullToastShow] = useState(false);
  const [errorTipText, setErrorTipText] = useState("");
  const [positionLockId, setPositionLockId] = useState("");
  const [moveDistance, setMoveDistance] = useState(lockMoveDistance);
  const [imgColorData, setImgColorData] = useState({
    width: 0,
    height: 0,
    ia: [],
    picBit: 1,
    leftPadding: 0,
    topPadding: 0,
  });

  const [rightImgSize, setRightImgSize] = useState<any[]>([
    { width: 0, height: 0 },
    { width: 0, height: 0 },
  ]);

  // 标记编辑点1移动前位置
  const [pointOnePosition, setPointOnePosition] = useState({ x: 0, y: 0 });
  // 标记编辑点1移动前位置
  const [pointTwoPosition, setPointwoPosition] = useState({ x: 0, y: 0 });

  const [user, setUser] = useState<API.LoginReq>();

  // 获取已经记录的图片位置
  const getPositionData = async (role_id?: number) => {
    const res = await services9125.getPos({
      user: Number(role_id || user?.role_id),
      page: 1,
      per_page: 15,
    });
    if (res.code === 0) {
      setPositionData(res.data);
    } else {
      ToastAndroid.show("获取位置列表失败" + res?.message, ToastAndroid.SHORT);
    }
  };

  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user");
      if (userInfo) {
        const uData = JSON.parse(userInfo);
        setUser(uData);
        getPositionData(uData.role_id);
      }
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    videoConnection();
  }, []);

  useEffect(() => {
    if (errorTipText) {
      setFullToastShow(true);
    }
  }, [errorTipText]);
  const videoConnection = async () => {
    console.log("视频卡连接功能");
    setLeftShowType("video");
    // 视频卡连接获取视频分辨率显示在页面
    const res = await services9125.getresolution();
    if (res.code === 0) {
      setVideoResolving(res.data);
    } else {
      ToastAndroid.show("获取视频分辨率失败", ToastAndroid.SHORT);
    }
  };

  // 页面记录的都是显示的点位位置，图片经过了大小和位置转换，所以给后端接口时要先转会实际位置
  const getRealPosition = (point: { x: number; y: number }) => {
    // 加上一半球的宽度
    const x = Math.round(
      (point.x + ballWidth / 2 + imgColorData.leftPadding) * imgColorData.picBit
    );
    // 加上一半球的高度
    const y = Math.round(
      (point.y + ballWidth / 2 + imgColorData.topPadding) * imgColorData.picBit
    );
    return { x, y };
  };

  const getPicture = async () => {
    setLoadingStatus({
      ...loadingStatus,
      picLoading: true,
    });
    const res = await services9125.getImg();
    let fName;

    if (res.code == 0) {
      if (res?.data?.url) {
        fName = res?.data?.url?.split("orthopedic/")?.[1] || "";
        setPicName(fName);
        const currentTimeStamp = new Date().getTime();
        const newImgUrl = res.data?.url + "?" + currentTimeStamp;
        setImgUrl(newImgUrl);
      }
      setLeftShowType("picture");

      if (pointMoveSet === "true") {
        Image.getSize(
          res?.data?.url,
          (width, height) => {
            const picBit1 = (width || 0) / leftImg.width;
            const picBit2 = (height || 0) / leftImg.height;
            const picBit = picBit1 > picBit2 ? picBit1 : picBit2;
            const leftPadding = (width / picBit - leftImg.width) / 2;
            const topPadding = (height / picBit - leftImg.height) / 2;
            const te = {
              width: width || 0,
              height: height || 0,
              ia: [],
              picBit,
              leftPadding,
              topPadding,
            };
            setImgColorData(te);
            setCanEdit(true);
          },
          (error) => {
            console.error("Error getting image size:", error);
          }
        );
      } else {
        services9125.getImgtoarrByFilename(fName).then((res2) => {
          if (res2.code == 0) {
            let ia = [];
            try {
              ia = JSON.parse(res2.data.ia);
            } catch (error) {
              console.log(error, "image ia data error");
            }
            const width = res2.data?.width || 0;
            const height = res2.data?.height || 0;

            const picBit1 = (width || 0) / leftImg.width;
            const picBit2 = (height || 0) / leftImg.height;
            const picBit = picBit1 > picBit2 ? picBit1 : picBit2;
            const leftPadding = (width / picBit - leftImg.width) / 2;
            const topPadding = (height / picBit - leftImg.height) / 2;
            const te = {
              width: res2.data?.width || 0,
              height: res2.data?.height || 0,
              ia: ia,
              picBit,
              leftPadding,
              topPadding,
            };
            setImgColorData(te);
            setCanEdit(true);
          } else {
            ToastAndroid.show("获取图片失败，切换失败 ", ToastAndroid.SHORT);
            setLoadingStatus({
              ...loadingStatus,
              picLoading: false,
            });
          }
        });
      }
    } else {
      ToastAndroid.show("获取图片失败，切换失败 ", ToastAndroid.SHORT);
      setLoadingStatus({
        ...loadingStatus,
        picLoading: false,
      });
      return;
    }
    // 如果本来是视频卡链接状态，那么就是第一次连接
    // if (leftShowType === "video") {
    // 暂时改为不需要二次确定流程
    if (true) {
    } else {
      // 否则再次点击是确认拍照状态
      const realPoint1 = getRealPosition(pointOne);
      const realPoint2 = getRealPosition(pointTwo);
      const req = {
        p1: {
          x: Math.round(realPoint1.x),
          y: Math.round(realPoint1.y),
        },
        p2: {
          x: Math.round(realPoint2.x),
          y: Math.round(realPoint2.y),
        },
        filename: fName,
        mode: Number(algorithmMode),
      };
      console.log(req, "req-确定定位");
      const res = await services9125.determineResult(req);
      if (res.code == 0 && res?.data?.pose) {
        const newPolarizationPose = res?.data?.pose;
        const positioningDeviationData = JSON.parse(positioningDeviation);
        if (
          (polarizationPose[0][0] - positioningDeviationData[0] <
            newPolarizationPose[0][0] ||
            polarizationPose[0][0] + positioningDeviationData[0] >
              newPolarizationPose[0][0]) &&
          (polarizationPose[0][1] - positioningDeviationData[1] <
            newPolarizationPose[0][1] ||
            polarizationPose[0][1] + positioningDeviationData[1] >
              newPolarizationPose[0][1]) &&
          (polarizationPose[0][2] - positioningDeviationData[2] <
            newPolarizationPose[0][2] ||
            polarizationPose[0][2] + positioningDeviationData[2] >
              newPolarizationPose[0][2]) &&
          (polarizationPose[1][0] - positioningDeviationData[3] <
            newPolarizationPose[1][0] ||
            polarizationPose[1][0] + positioningDeviationData[3] >
              newPolarizationPose[1][0]) &&
          (polarizationPose[1][1] - positioningDeviationData[4] <
            newPolarizationPose[1][1] ||
            polarizationPose[1][1] + positioningDeviationData[4] >
              newPolarizationPose[1][1]) &&
          (polarizationPose[1][2] - positioningDeviationData[5] <
            newPolarizationPose[1][2] ||
            polarizationPose[1][2] + positioningDeviationData[5] >
              newPolarizationPose[1][2])
        ) {
          ToastAndroid.show("位置确定成功 ", ToastAndroid.SHORT);
          setConfirmPositon(true);
        } else {
          // ToastAndroid.show(`请继续定位,原定位：${polarizationPose}, 新定位：${newPolarizationPose}`, ToastAndroid.SHORT);
          setErrorTipText(
            `请继续定位,原定位：${polarizationPose}, 新定位：${newPolarizationPose}`
          );
          setConfirmPositon(false);
        }
      } else {
        // ToastAndroid.show("定位失败:" + JSON.stringify(res) + "req" + req, ToastAndroid.SHORT);
        setErrorTipText("定位失败:" + JSON.stringify(res) + "req" + req);
      }

      setLeftShowType("editPicture");
    }
    setLoadingStatus({
      ...loadingStatus,
      picLoading: false,
    });
  };

  let hasToasLock = false;
  // 数字2是PointOne
  const movePointOne = (_: any, gesture: { dx: number; dy: number }) => {
    if (lockPonitPosition) {
      if (!hasToasLock) {
        ToastAndroid.show("位置已锁定，请先解锁", ToastAndroid.SHORT);
        hasToasLock = true;
        setTimeout(() => {
          hasToasLock = false;
        }, 1000);
      }
      return;
    }

    const newX = Math.max(
      0,
      Math.min(leftImg.width - ballWidth, pointOne.x + gesture.dx)
    );
    const newY = Math.max(
      0,
      Math.min(leftImg.height - ballWidth, pointOne.y + gesture.dy)
    );
    setPointOne({ x: newX, y: newY });
  };

  const movePointTwo = (_: any, gesture: { dx: number; dy: number }) => {
    if (lockPonitPosition) {
      if (!hasToasLock) {
        ToastAndroid.show("位置已锁定，请先解锁", ToastAndroid.SHORT);
        hasToasLock = true;
        setTimeout(() => {
          hasToasLock = false;
        }, 1000);
      }
      return;
    }

    const newX = Math.max(
      0,
      Math.min(leftImg.width - ballWidth, pointTwo.x + gesture.dx)
    );
    const newY = Math.max(
      0,
      Math.min(leftImg.height - ballWidth, pointTwo.y + gesture.dy)
    );
    setPointTwo({ x: newX, y: newY });
  };

  const moveLine = (_: any, gesture: { dx: number; dy: number }) => {
    movePointOne(_, gesture);
    movePointTwo(_, gesture);
  };

  // 处理长按事件开始
  const handlePressIn = () => {
    // 设置一个定时器，延时一定时间后触发长按事件
    pressTimer = setTimeout(() => {
      setShowLockModal(true);
    }, 1000); // 1000毫秒即1秒，你可以根据需要调整长按时间
  };

  // 处理长按事件结束
  const handlePressOut = () => {
    // 清除定时器
    clearTimeout(pressTimer);
  };

  const renderLine = (p1 = pointOne, p2 = pointTwo, hasAction = true) => {
    const lineLength = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    const angleInRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const lineAngle = angleInRadians * (180 / Math.PI);

    // 计算垂直边长度  y
    const verticalSide = (Math.sin(angleInRadians) * lineLength) / 2;

    // 计算底边长度
    const baseSide = (Math.cos(angleInRadians) * lineLength) / 2;

    return (
      <View
        style={[
          styles.line,
          {
            left: p1.x - lineLength / 2 + ballWidth / 2 + baseSide,
            // 3 为padding大小，所以减3
            top: p1.y + ballWidth / 2 + verticalSide - 3,
            width: lineLength,
            transform: [{ rotate: `${lineAngle}deg` }],
          },
        ]}
        {...PanResponder.create(
          hasAction
            ? {
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: moveLine,
                onPanResponderGrant: () => {
                  setPointOnePosition(pointOne);
                  setPointwoPosition(pointTwo);
                },
                onPanResponderRelease: () => {
                  if (!checkIfCanMove(pointOne) || !checkIfCanMove(pointTwo)) {
                    setPointOne(pointOnePosition);
                    setPointTwo(pointTwoPosition);
                  }
                },
              }
            : {}
        ).panHandlers}
      >
        <View
          style={{
            width: lineLength,
            height: 1,
            backgroundColor: lockPonitPosition && hasAction ? "red" : "green",
          }}
        />
        <TouchableOpacity
          // 添加长按事件处理
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.triangleContainer,
            {
              borderBottomColor:
                lockPonitPosition && hasAction ? "red" : "green",
              left: lineLength / 2 - pxToDp(38),
              top: -ballWidth / 2 + 3,
            },
          ]}
        ></TouchableOpacity>
      </View>
    );
  };

  const savePosition = async (type: "face" | "line") => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 获取月份时要加1，然后保证两位数
    const day = currentDate.getDate().toString().padStart(2, "0"); // 保证日期为两位数
    const hours = currentDate.getHours().toString().padStart(2, "0"); // 保证小时为两位数
    const minutes = currentDate.getMinutes().toString().padStart(2, "0"); // 保证分钟为两位数
    const seconds = currentDate.getSeconds().toString().padStart(2, "0"); // 保证秒钟为两位数

    const dateTimeNumber = `${year}${month}${day}${hours}${minutes}${seconds}`;

    const realPoint1 = getRealPosition(pointOne);
    const realPoint2 = getRealPosition(pointTwo);
    if (polarizationPose.length < 1 || polarizationPoints.length < 1) {
      ToastAndroid.show("获取定位数据错误，保存失败", ToastAndroid.SHORT);
      return;
    }
    const resData = {
      type: type,
      name: dateTimeNumber,
      pos: {
        x: polarizationPose[0][0],
        y: polarizationPose[0][1],
        z: polarizationPose[0][2],
        rx: polarizationPose[1][0],
        ry: polarizationPose[1][1],
        rz: polarizationPose[1][2],
      },
      p1p2: {
        p1: {
          x: Math.round(realPoint1.x),
          y: Math.round(realPoint1.y),
        },
        p2: {
          x: Math.round(realPoint2.x),
          y: Math.round(realPoint2.y),
        },
      },
      realp1p2: {
        p1: {
          x: polarizationPoints[0],
          y: polarizationPoints[1],
          z: polarizationPoints[2],
        },
        p2: {
          x: polarizationPoints[3],
          y: polarizationPoints[4],
          z: polarizationPoints[5],
        },
        camera: {
          x: polarizationPoints[6] || 0,
          y: polarizationPoints[7] || 0,
          z: polarizationPoints[8] || 0,
        },
      },
      filename: picName,
      role_id: Number(user?.role_id),
    };

    const res = await services9125.savePos(resData);
    console.log(res, "res");

    if (res.code === 0) {
      getPositionData();
      setConfirmPositon(false);
    } else {
      // ToastAndroid.show("保存失败:" + res.message || "保存失败", ToastAndroid.SHORT);
      setErrorTipText(
        "保存失败:" +
          JSON.stringify(res) +
          "请求数据：" +
          JSON.stringify(resData)
      );
    }
  };

  const setSelectPoint = (oData: number[]) => {
    setHasSelectPoint(oData);
    const length = oData.length;

    oData?.map((i, d) => {
      const data = positionData.filter((item) => item.id == i)?.[0];
      const p1p2 = JSON.parse(data.p1p2);
      const iUrl = data?.img as unknown as string;
      if (!iUrl) {
        return;
      }
      const p1x = p1p2?.p1?.x;
      const p1y = p1p2?.p1?.y;
      const p2x = p1p2?.p2?.x;
      const p2y = p1p2?.p2?.y;

      let newX = 0,
        newY = 0,
        newX2 = 0,
        newY2 = 0;
      // 获取图片尺寸
      Image.getSize(
        iUrl,
        (width, height) => {
          // 将获取到的宽高保存到状态中
          const picBit1 = (width || 0) / leftImg.width;
          const picBit2 = (height || 0) / leftImg.height;
          const picBit = picBit1 > picBit2 ? picBit1 : picBit2;
          const leftPadding = (width / picBit - leftImg.width) / 2;
          const topPadding = (height / picBit - leftImg.height) / 2;
          newX = Math.round(
            (p1x / picBit - leftPadding) / length - ballWidth / 2
          );
          newY = Math.round(
            (p1y / picBit - topPadding) / length - ballWidth / 2
          );

          newX2 = Math.round(
            (p2x / picBit - leftPadding) / length - ballWidth / 2
          );
          newY2 = Math.round(
            (p2y / picBit - topPadding) / length - ballWidth / 2
          );
          rightImgSize[d] = {
            width,
            height,
            iUrl,
            newX,
            newY,
            newX2,
            newY2,
          };
          setRightImgSize([...rightImgSize]);
          // console.log([...rightImgSize], '[...rightImgSize]');
        },
        (error) => {
          console.error("Failed to get image size", error);
        }
      );
    });
  };

  const move = async (pose = polarizationPose) => {
    const req = {
      speed: armSpeed ? Number(armSpeed) : 0.1,
      end_pos: {
        x: pose[0][0],
        y: pose[0][1],
        z: pose[0][2],
        rx: pose[1][0],
        ry: pose[1][1],
        rz: pose[1][2],
      },
    };
    console.log(req, "req-endMoveTask");
    setLoadingStatus({
      ...loadingStatus,
      moveLoading: true,
    });
    const res = await services9125.endMoveTask(req);
    setLoadingStatus({
      ...loadingStatus,
      moveLoading: false,
    });
    if (res.code != 0) {
      //ToastAndroid.show("移动失败:" + JSON.stringify(res), ToastAndroid.SHORT);
      setErrorTipText("移动失败:" + JSON.stringify(res));
    }
  };

  const cancelMove = async () => {
    const res = await services9125.cancelMoveTask();
    if (res.code != 0) {
      // ToastAndroid.show("停止移动失败:" + JSON.stringify(res), ToastAndroid.SHORT);
      setErrorTipText("停止移动失败:" + JSON.stringify(res));
    }
    setCanMove(true);
  };

  const btnFun = async (type = "") => {
    setCanMove(false);
    setPositionLockId("");
    if (type === "getpicture") {
      setHasSelectPoint([]);
      getPicture();
    } else if (type === "edit") {
      setLockPonitPosition(false);
      setLeftShowType("editPicture");
    } else if (type === "location") {
      setCanMove(true);
      const realPoint1 = getRealPosition(pointOne);
      const realPoint2 = getRealPosition(pointTwo);
      const req = {
        p1: {
          x: Math.round(realPoint1.x),
          y: Math.round(realPoint1.y),
        },
        p2: {
          x: Math.round(realPoint2.x),
          y: Math.round(realPoint2.y),
        },
        filename: picName,
        mode: Number(algorithmMode),
      };
      console.log(req, "req-定位");
      setLoadingStatus({
        ...loadingStatus,
        locationLoading: true,
        picLoading: true,
      });
      const res = await services9125.toPolarization(req);
      setLoadingStatus({
        ...loadingStatus,
        locationLoading: false,
        picLoading: false,
      });
      console.log(res, "res-定位");
      if (res.code == 0 && res?.data?.pose) {
        setPolarizationPose(res?.data?.pose);
        setPolarizationPoints(res?.data?.points);
        setLeftShowType("videoAgain");
        if (canMoveByLocation === "true") {
          move(res?.data?.pose);
        }
        ToastAndroid.show("定位成功:可移动", ToastAndroid.SHORT);

        // ps 暂时改成一次定位后就可以保存位置，不需要而且确认
        setConfirmPositon(true);
      } else {
        // ToastAndroid.show("定位失败:" + JSON.stringify(res?.data), ToastAndroid.SHORT);
        setErrorTipText(JSON.stringify(res?.data));
      }
    } else if (type === "guide") {
      setGuideModal(true);
    } else if (type === "move") {
      move();
    } else if (type === "cancelMove") {
      cancelMove();
    } else if (type === "save") {
      setShowPositionSaveModal(true);
    } else if (type === "connect") {
      // 重置点位，重置状态
      setConfirmPositon(false);
      setPointOne({ x: 0, y: 0 });
      setPointTwo({ x: 120, y: 0 });
      setHasSelectPoint([]);
      setCanEdit(false);
      videoConnection();
      setLockPonitPosition(false);
    }
  };

  const checkIfCanMove = (point: { x: number; y: number }) => {
    // 如果pointMoveSet 为true 则忽略判断，那里都可以移动
    if (pointMoveSet === "true") {
      return true;
    }

    const x = Math.round(
      (point.x + imgColorData.leftPadding) * imgColorData.picBit
    );
    // 加上球的宽度
    const xEnd = Math.round(
      (point.x + ballWidth + imgColorData.leftPadding) * imgColorData.picBit
    );

    const y = Math.round(
      (point.y + imgColorData.topPadding) * imgColorData.picBit
    );
    // 加上球的高度
    const yEnd = Math.round(
      (point.y + ballWidth + imgColorData.topPadding) * imgColorData.picBit
    );
    // 如果是0就是黑色
    let ifBlack = true;

    for (var i = x; i < xEnd; i++) {
      for (var j = y; j < yEnd; j++) {
        if ((imgColorData?.ia?.[j]?.[i] || 0) !== 0) {
          ifBlack = false;
        }
      }
    }

    if (ifBlack) {
      return true;
    } else {
      ToastAndroid.show("只能移动到黑色位置 ", ToastAndroid.SHORT);
      return false;
    }
  };

  const guideFun = async () => {
    setGuideModal(false);
    const surfaceArrData = surfaceArr.split(",");
    const req: any = {
      plane1: "",
      plane2: "",
      p1: {},
      p2: {},
      surface1: surfaceArrData[0],
      surface2: surfaceArrData[1],
      linep1: {},
      linep2: {},
      camerapos: {},
    };
    hasSelectPoint?.map((i, d) => {
      const data = positionData.filter((item) => item.id == i)?.[0];
      if (d === 0) {
        req.plane1 = data?.name;
        try {
          req.p1 = JSON.parse(data?.pos);
          const realp1p2 = JSON.parse(data?.realp1p2);
          req.linep1 = realp1p2.p1;
          req.linep2 = realp1p2.p2;
          req.camerapos = {
            x: 0,
            y: 0,
            z: 0,
            rx: 0,
            ry: 0,
            rz: 0,
            ...realp1p2?.camera,
          };
        } catch (error) {
          ToastAndroid.show("数据解析失败", ToastAndroid.SHORT);
        }
      } else if (d === 1) {
        req.plane2 = data?.name;
        try {
          req.p2 = JSON.parse(data?.pos);
        } catch (error) {
          ToastAndroid.show("数据解析失败", ToastAndroid.SHORT);
        }
      }
    });
    console.log(req, "req");
    setLoadingStatus({
      ...loadingStatus,
      guideLoading: true,
    });
    const res = await services9125.polarizationDaoxiang(req);
    console.log(res, "res");
    setLoadingStatus({
      ...loadingStatus,
      guideLoading: false,
    });
    if (res.code != 0) {
      // ToastAndroid.show("一键导向失败:" + JSON.stringify(res), ToastAndroid.SHORT);
      setErrorTipText(JSON.stringify(res));
    } else {
      const foot_C = res?.data?.foot_C || [];
      const res2 = await services9125.movecontinueBestpoints({
        end_pos: {
          x: foot_C[0],
          y: foot_C[1],
          z: foot_C[2],
          rx: foot_C[3],
          ry: foot_C[4],
          rz: foot_C[5],
        },
      });
      if (res2.code != 0) {
        setErrorTipText(JSON.stringify(res2));
      } else {
        ToastAndroid.show("一键导向成功", ToastAndroid.SHORT);
        const realData = res2?.data?.[0] || {};
        // console.log([[realData.x, realData.y, realData.z], [realData.rx, realData.ry, realData.rz]], '111', foot_C);
        setPolarizationPose([
          [realData.x, realData.y, realData.z],
          [realData.rx, realData.ry, realData.rz],
        ]);
        setCanMove(true);
      }
    }
  };

  // lockMove
  const lockMove = async (obrpath: number) => {
    const selectArr = positionData?.filter((i) =>
      hasSelectPoint.includes(i.id)
    );
    let nextname = "";
    selectArr?.forEach((i) => {
      if (i.name !== positionLockId) {
        nextname = i.name;
      }
    });

    const res = await services9125.lockMoveApi({
      name: positionLockId,
      nextname: nextname,
      distance: moveDistance ? Number(moveDistance) : 0.01,
      obrpath,
      speed: armSpeed ? Number(armSpeed) : 0.1,
    });
    if (res.code != 0) {
      setErrorTipText("失败:" + JSON.stringify(res));
    }
  };

  const lockRotate = async (obrangle: number) => {
    const res = await services9125.lockRotateApi({
      name: positionLockId,
      angle: lockMoveAngle ? Number(lockMoveAngle) : 1,
      obrangle,
      speed: armSpeed ? Number(armSpeed) : 0.1,
    });
    if (res.code != 0) {
      setErrorTipText("失败:" + JSON.stringify(res));
    }
  };

  const lockBeafter = async (obrpath: number) => {
    const res = await services9125.lockBeafterMoveApi({
      name: positionLockId,
      distance: moveDistance ? Number(moveDistance) : 0.01,
      obrpath,
      speed: armSpeed ? Number(armSpeed) : 0.1,
    });
    if (res.code != 0) {
      setErrorTipText("失败:" + JSON.stringify(res));
    }
  };

  const changeMoveDistance = async (lockMoveDistance: string) => {
    await AsyncStorage.setItem("lockMoveDistance", lockMoveDistance);
    changelockMoveDistance(lockMoveDistance);
    setMoveDistance(lockMoveDistance);
  };
  console.log(moveDistance, "moveDistance");

  const pathmove2 = async () => {
    const res = await services9125.movecontinuePathmove2({
      end_pos: {
        x: polarizationPose?.[0]?.[0] || 0,
        y: polarizationPose?.[0]?.[1] || 0,
        z: polarizationPose?.[0]?.[2] || 0,
        rx: polarizationPose?.[1]?.[0] || 0,
        ry: polarizationPose?.[1]?.[1] || 0,
        rz: polarizationPose?.[1]?.[2] || 0,
      },
      ctrl_param: 0,
      speedPercentage: armSpeed ? Number(armSpeed) : 0.1,
    });
    if (res.code == 0) {
      ToastAndroid.show("轨迹运动成功", ToastAndroid.SHORT);
    } else {
      setErrorTipText("轨迹运动失败:" + JSON.stringify(res));
    }
  };
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("~/assets/bg.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <FullToast
          show={fullToastShow}
          setShow={(bol) => {
            setFullToastShow(bol);
            setErrorTipText("");
          }}
          text={errorTipText}
        />
        <FullLoading show={loadingStatus.guideLoading} />

        <View style={styles.showBox}>
          <View style={styles.showBoxLeft}>
            {loadingStatus.picLoading && (
              <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" />
              </View>
            )}
            {positionLockId ? (
              <View style={styles.positionLockView}>
                <View style={styles.distanceBox}>
                  <Text style={styles.distanceBoxText}>单次移动距离：</Text>
                  {["0.01", "0.03", "0.05", "0.07", "0.09"]?.map((i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.distanceBtn,
                          {
                            backgroundColor:
                              lockMoveDistance === i ? "red" : "#4B5155",
                          },
                        ]}
                        onPress={() => changeMoveDistance(i)}
                      >
                        <Text style={{ color: "#fff" }}>{i}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <ImageBackground
                  source={require("./img/u57.png")}
                  resizeMode="cover"
                  style={styles.positionLockBox}
                >
                  {/* <Text>{positionLockId}</Text> */}
                  <TouchableOpacity
                    onPress={() => lockMove(1)}
                    style={[styles.btn1, { top: 0 }]}
                  >
                    <Text>上</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => lockMove(-1)}
                    style={[styles.btn1, { top: pxToDp(200) }]}
                  >
                    <Text>下</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => lockRotate(1)}
                    style={[styles.btn2, { left: 0 }]}
                  >
                    <Text>左</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => lockRotate(-1)}
                    style={[styles.btn2, { left: pxToDp(330) }]}
                  >
                    <Text>右</Text>
                  </TouchableOpacity>
                </ImageBackground>
                <TouchableOpacity
                  onPress={() => lockBeafter(1)}
                  style={[styles.btn3, { left: pxToDp(0), top: pxToDp(90) }]}
                >
                  <Text style={{ color: "#fff" }}>前进</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => lockBeafter(-1)}
                  style={[styles.btn3, { left: pxToDp(330) }]}
                >
                  <Text style={{ color: "#fff" }}>后退</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => pathmove2()} style={[styles.btn3, styles.movePathBtn]}>
                                        <Text style={{ color: "#fff" }}>轨迹运动</Text>
                                    </TouchableOpacity> */}
              </View>
            ) : hasSelectPoint.length > 0 ? (
              <View style={styles.selectPicBox}>
                {hasSelectPoint?.map((i, d) => {
                  const { iUrl, newX, newY, newX2, newY2 } = rightImgSize[d];
                  const length = hasSelectPoint.length;
                  if (!iUrl) {
                    return;
                  }
                  return (
                    <View style={styles.containerPic} key={i}>
                      <Image
                        source={{ uri: iUrl }}
                        style={[
                          styles.seletImage,
                          { height: `${100 / length}%` },
                        ]}
                        resizeMode="contain"
                      />
                      {
                        <View style={styles.editBox}>
                          <View
                            style={[styles.point, { left: newX, top: newY }]}
                          >
                            <Text style={styles.ballText}>1</Text>
                          </View>
                          <View
                            style={[
                              styles.point,
                              {
                                left: newX2,
                                top: newY2 - (ballPadding / 2) * 1.5,
                              },
                            ]}
                          >
                            <Text style={styles.ballText}>2</Text>
                          </View>
                          {rightImgSize[d]?.width && rightImgSize[d]?.height ? (
                            renderLine(
                              {
                                x: newX,
                                y: newY,
                              },
                              {
                                x: newX2,
                                y: newY2,
                              },
                              false
                            )
                          ) : (
                            <Text> </Text>
                          )}
                        </View>
                      }
                    </View>
                  );
                })}
              </View>
            ) : leftShowType === "video" || leftShowType === "videoAgain" ? (
              <View style={styles.containerPic}>
                <View style={styles.showPicBox}>
                  <BlinkingText shouldBlink={true} color={"#fff"} text={"●"} />
                  <Text style={styles.containerVideoLogo}>
                    视频分辨率：
                    {`${videoResolving.rwidth} * ${videoResolving.rheight}`}
                  </Text>
                </View>

                {/* <VLCPlayer
                  style={[styles.video]}
                  // videoAspectRatio="16:9"
                  source={{ uri: host + videoApi }}
                /> */}
              </View>
            ) : (
              <View style={styles.containerPic}>
                <View style={styles.showPicBox}>
                  <Text style={styles.containerVideoLogo}>
                    图片分辨率：
                    {`${imgColorData.width} * ${imgColorData.height}`}
                  </Text>
                </View>
                <Image
                  source={{ uri: imgUrl }}
                  style={styles.leftImgSty}
                  resizeMode="contain"
                />

                {["editPicture"].includes(leftShowType) && (
                  <View style={styles.editBox}>
                    <Animated.View
                      style={[
                        styles.pointBox,
                        {
                          left: pointOne.x - ballPadding,
                          top: pointOne.y - ballPadding,
                        },
                      ]}
                      {...PanResponder.create({
                        onStartShouldSetPanResponder: () => true,
                        onMoveShouldSetPanResponder: () => true,
                        onPanResponderMove: movePointOne,
                        onPanResponderGrant: () => {
                          setPointOnePosition(pointOne);
                        },
                        onPanResponderRelease: () => {
                          if (!checkIfCanMove(pointOne)) {
                            setPointOne(pointOnePosition);
                          }
                        },
                      }).panHandlers}
                    >
                      <View
                        style={[
                          styles.point,
                          lockPonitPosition && styles.point2,
                        ]}
                      >
                        <Text style={styles.ballText}>1</Text>
                      </View>
                    </Animated.View>

                    <Animated.View
                      style={[
                        styles.pointBox,
                        {
                          left: pointTwo.x - ballPadding,
                          top: pointTwo.y - ballPadding,
                        },
                      ]}
                      {...PanResponder.create({
                        onStartShouldSetPanResponder: () => true,
                        onMoveShouldSetPanResponder: () => true,
                        onPanResponderMove: movePointTwo,
                        onPanResponderGrant: () => {
                          setPointwoPosition(pointTwo);
                        },
                        onPanResponderRelease: () => {
                          if (!checkIfCanMove(pointTwo)) {
                            setPointTwo(pointTwoPosition);
                          }
                        },
                      }).panHandlers}
                    >
                      <View
                        style={[
                          styles.point,
                          lockPonitPosition && styles.point2,
                        ]}
                      >
                        <Text style={styles.ballText}>2</Text>
                      </View>
                    </Animated.View>
                    {renderLine()}
                  </View>
                )}
              </View>
            )}
          </View>
          <View style={styles.showBoxRight}>
            <Text style={styles.positionLogTitle}>位置记录</Text>
            <PointPosition
              dataSoure={positionData}
              hasSelectPoint={hasSelectPoint}
              setSelectPoint={setSelectPoint}
              positionLockId={positionLockId}
              setPositionLockId={setPositionLockId}
            />
          </View>
        </View>
        <View style={styles.btnFlexBox}>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={[
                styles.btn,
                (loadingStatus.picLoading ||
                  !["video", "videoAgain"].includes(leftShowType)) &&
                  styles.disabledBtn,
              ]}
              disabled={
                loadingStatus.picLoading ||
                !["video", "videoAgain"].includes(leftShowType)
              }
              onPress={() => {
                btnFun("getpicture");
              }}
            >
              <View style={[styles.btnImgBox]}>
                <Image
                  source={require("./img/getpicture.png")}
                  style={styles.btnImg}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.buttonText}>获取图像</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, !canEdit && styles.disabledBtn]}
              disabled={!canEdit}
              onPress={() => btnFun("edit")}
            >
              <View style={styles.btnImgBox}>
                <Image
                  source={require("./img/edit.png")}
                  style={[styles.btnImg]}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonText}>编辑</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn,
                !(leftShowType === "editPicture") && styles.disabledBtn,
              ]}
              disabled={!(leftShowType === "editPicture")}
              onPress={() => {
                setShowLockModal(true);
              }}
            >
              <View style={styles.btnImgBox}>
                <Image
                  source={require("./img/connect.png")}
                  style={[styles.btnImg]}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonText}>
                {lockPonitPosition ? "解锁定位线" : "锁定定位线"}{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn,
                (loadingStatus.locationLoading || !lockPonitPosition) &&
                  styles.disabledBtn,
              ]}
              disabled={loadingStatus.locationLoading || !lockPonitPosition}
              onPress={() => btnFun("location")}
            >
              <View style={[styles.btnImgBox]}>
                <Image
                  source={require("./img/location.png")}
                  style={[styles.btnImg]}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.buttonText}>定位</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn,
                (loadingStatus.guideLoading || hasSelectPoint.length !== 2) &&
                  styles.disabledBtn,
              ]}
              disabled={
                loadingStatus.guideLoading || hasSelectPoint.length !== 2
              }
              onPress={() => btnFun("guide")}
            >
              <View style={styles.btnImgBox}>
                <Image
                  source={require("./img/guide.png")}
                  style={styles.btnImg}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.buttonText}>一键导向</Text>
            </TouchableOpacity>

            {canMoveByLocation !== "true" && (
              <TouchableOpacity
                style={[
                  styles.btn,
                  (loadingStatus.moveLoading ||
                    !canMove ||
                    loadingStatus.locationLoading) &&
                    styles.disabledBtn,
                ]}
                disabled={
                  loadingStatus.moveLoading ||
                  !canMove ||
                  loadingStatus.locationLoading
                }
                onPressIn={() => btnFun("move")}
                onPressOut={() => btnFun("cancelMove")}
              >
                <View style={[styles.btnImgBox]}>
                  <Image
                    source={require("./img/operate.png")}
                    style={[styles.btnImg]}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.buttonText}>移动</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => pathmove2()}>
              <View style={[styles.btnImgBox]}>
                <Image
                  source={require("./img/operate.png")}
                  style={[styles.btnImg]}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonText}>轨迹运动</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, !confirmPositon && styles.disabledBtn]}
              disabled={!confirmPositon}
              onPress={() => btnFun("save")}
            >
              <View style={styles.btnImgBox}>
                <Image
                  source={require("./img/save.png")}
                  style={styles.btnImg}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.buttonText}>位置保存</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => btnFun("connect")}
            >
              <View style={styles.btnImgBox}>
                <Image
                  source={require("./img/connect.png")}
                  style={styles.btnImg}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.buttonText}>视频卡连接</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {/* 锁定弹窗 */}
      <Modal visible={showLockModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>是否{lockPonitPosition ? "解锁" : "锁定"}？</Text>
            <View style={styles.modalBtnBox}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setShowLockModal(false);
                }}
              >
                <Text>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // 在这里处理锁定逻辑
                  setShowLockModal(false);
                  setLockPonitPosition(!lockPonitPosition);
                }}
              >
                <Text>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showPositionSaveModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>位置坐标分类</Text>
            <View style={styles.modalBtnBox}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setShowPositionSaveModal(false);
                  savePosition("face");
                }}
              >
                <Text>定位面</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setShowPositionSaveModal(false);
                  savePosition("line");
                }}
              >
                <Text>定位线</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={guideModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>
              请再次确认所选定位平面并确保已手动将机械臂位移至手术一侧
            </Text>
            <View style={styles.modalBtnBox}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setGuideModal(false);
                }}
              >
                <Text>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={guideFun}>
                <Text>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
