import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ToastAndroid } from "react-native";
import styles from "./styles";
import Table from "./Table";
import AddUser from "./AddUser";
import services9125 from "~/services/services9125";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [pageNow, setPageNow] = useState(1);

  useEffect(() => {
    getUserData();
  }, []);

  // 获取用户
  const getUserData = async () => {
    const res = await services9125.getManagemenu();
    if (res.code === 0) {
      setUserData(res.data);
    } else {
      ToastAndroid.show("获取用户列表失败" + res?.message, ToastAndroid.SHORT);
    }
  };

  const addUser = async (params: API.UserData) => {
    const res = await services9125.postManagemenu(params);
    if (res.code === 0) {
      getUserData();
    } else {
      ToastAndroid.show("添加用户失败", ToastAndroid.SHORT);
    }
  };

  // 修改用户
  const putUser = async (params: API.UserData) => {
    const res = await services9125.putManagemenu(params);
    if (res.code === 0) {
      getUserData();
    } else {
      ToastAndroid.show("修改用户失败", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <AddUser addUser={addUser} />
      <Table
        userData={userData.slice((pageNow - 1) * 10, pageNow * 10)}
        putUser={putUser}
      />
      <View style={styles.bottomBox}>
        <View style={styles.bottomBtnBox}>
          <TouchableOpacity
            disabled={pageNow === 1}
            style={[pageNow === 1 && styles.disabledBtn]}
            onPress={() => {
              setPageNow(pageNow - 1);
            }}
          >
            <Text>上一页</Text>
          </TouchableOpacity>
          <Text style={styles.pageNumber}>
            {pageNow}/{Math.ceil((userData.length || 0) / 10)}
          </Text>
          <TouchableOpacity
            disabled={Math.ceil((userData.length || 0) / 10) <= pageNow}
            style={[
              Math.ceil((userData.length || 0) / 10) <= pageNow &&
                styles.disabledBtn,
            ]}
            onPress={() => {
              setPageNow(pageNow + 1);
            }}
          >
            <Text>下一页</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;
