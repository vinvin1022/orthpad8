import { ToastAndroid } from 'react-native';
import http from '~/utils/http';
import {
  serverHost as host,
  picSize,
} from "../host";

// let host = "http://10.55.23.49:9125/apis/v1/"

// promise的封装操作
function to(promise: Promise<any>) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

const httpApi = {
  imgUrl: host?.split("/apis")?.[0] + "/static/orthopedic/portrait.jpg",
  // 登录
  async loginApi(params: API.Login) {
    const url = host + 'login';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  // 切换到图像页
  async getImg() {
    const url = host + 'videocard/getimg/?' + picSize;
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      // ToastAndroid.show("error! " + url , ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  async getPos(params: API.GetresultReq) {
    const url = host + 'polarization/getresult';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  // 定位
  async toPolarization(params: API.P1p2) {
    const url = host + 'polarization';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  async savePos(params: API.SavePosData) {
    const url = host + 'polarization/savepos';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  // 确认拍照
  async determineResult(params: API.P1p2) {
    const url = host + 'polarization/determineResult';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  async endMoveTask(params: API.EndMoveTaskReq) {
    const url = host + 'movecontinue/';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  async cancelMoveTask() {
    const url = host + 'movecontinue/moveContinueStop';
    const [err, res] = await to(http.post(url, {}));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  async getImgtoarr() {
    const url = host + 'videocard/imgtoarr';
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  async getImgtoarrByFilename(fName: string) {

    const url = host + 'videocard/imgtoarr/' + fName;
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  // 设备状态  GET # "status": 1未开始连接，2连接中，3所有连接成功 4连接失败
  async getConnectStatus() {
    const url = host + 'check_equipments/getConnectStatus';
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  // 连接检测设备  POST
  async checkLinkcheck2() {
    const url = host + 'check_equipments/linkcheck2';
    const [err, res] = await to(http.post(url, {}));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  //  准备中 = 20000  空闲中 = 20001 工作中 = 30001  发生异常 = 50001
  async getSystemStatus() {
    const url = host + 'heck_equipments/getSystemStatus';
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  // 获取视频分辨率
  async getresolution() {
    const url = host + 'videocard/getresolution';
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  // 获取用户
  async getManagemenu() {
    const url = host + 'managemenu';
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  // 修改用户
  async putManagemenu(params: API.UserData) {
    const url = host + 'managemenu';
    const [err, res] = await to(http.put(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },
  // 添加用户
  async postManagemenu(params: API.UserData) {
    const url = host + 'managemenu';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  //一键导向
  async polarizationDaoxiang(params: API.DaoxiangData) {
    const url = host + 'polarization/daoxiang';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  //获取一键导向真实点位
  async movecontinueBestpoints(params: {
    end_pos: API.EndPos
  }) {
    const url = host + 'movecontinue/bestpoints';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  // POST
  async lockMoveApi(params: any) {
    const url = host + 'displacementrotation';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },


  async lockRotateApi(params: any) {
    const url = host + 'displacementrotation/rotate';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },


  async lockBeafterMoveApi(params: any) {
    const url = host + 'displacementrotation/beafterMove';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  // 急停
  async emergencyStopApi() {
    const url = host + 'emergencyStop';
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },

  // 轨迹运动
  async movecontinuePathmove2(params: any) {
    const url = host + 'movecontinue/pathmove2';
    const [err, res] = await to(http.post(url, params));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },



   // 零力示教
   async gravityteaching(flag: number) {
    const url = host + `gravityteaching/${flag}`;
    const [err, res] = await to(http.get(url));
    if (err) {
      //请求失败
      ToastAndroid.show("error! " + url, ToastAndroid.SHORT);
      return Object.assign(
        err,
        {
          status: '406',
          description: err.errMsg,
        },
        true,
      );
    }
    return res;
  },


};
export default httpApi;
