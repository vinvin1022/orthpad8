import { Dimensions } from "react-native";

// 设备屏幕的dp
const deviceWidthDp = Dimensions.get("window").width;
// const deviceHeightDp = Dimensions.get('window').height;

// console.log(deviceWidthDp,deviceHeightDp,'deviceWidthDp');

// UI 默认给图是 2560
const uiWidthPx = 2560;

export function pxToDp(uiElementPx: number) {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}

export const roles = [
  { label: "用户", value: "2" },
  { label: "管理员", value: "1" },
];
