import React, { useState } from "react";
import type { FC } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import EditUser from "../EditUser";

type TProps = {
  userData: API.UserData[];
  putUser: (params: API.UserData) => void;
};

const tableColumns = [
  {
    title: "序号",
    dataIndex: "index",
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "帐号",
    dataIndex: "username",
    flex: 2,
  },
  {
    title: "密码",
    dataIndex: "password",
  },
  {
    title: "权限",
    dataIndex: "role",
  },
  {
    title: "状态",
    dataIndex: "is_active",
  },
  {
    title: "操作",
    dataIndex: "operate",
    flex: 2,
  },
];

const App: FC<TProps> = ({ userData, putUser }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [itemUserData, setItemUserData] = useState<API.UserData>({});

  const handleConfirm = () => {
    // 关闭弹窗
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {tableColumns?.map((i) => {
          return (
            <Text
              key={i.title}
              style={[styles.headerItem, { flex: i?.flex || 1 }]}
            >
              {i.title}{" "}
            </Text>
          );
        })}
      </View>

      {userData?.map((i: any, d) => {
        return (
          <View style={styles.content} key={i.id}>
            {tableColumns?.map((ii) => {
              return (
                <Text
                  key={ii.title}
                  style={[styles.tableItem, { flex: ii?.flex || 1 }]}
                >
                  {ii.dataIndex === "password" ? (
                    `******`
                  ) : ii.dataIndex === "is_active" ? (
                    i?.is_active ? (
                      "正常"
                    ) : (
                      "停用"
                    )
                  ) : ii.dataIndex === "operate" ? (
                    <View style={styles.btnBox}>
                      <TouchableOpacity>
                        <Text
                          style={[styles.editBtnText]}
                          onPress={() => {
                            setItemUserData(i);
                            setEditModal(true);
                          }}
                        >
                          编辑
                        </Text>
                      </TouchableOpacity>
                      <Text style={[styles.textLine]}> </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setItemUserData(i);
                          setIsVisible(true);
                        }}
                      >
                        <Text style={[styles.deleteBtnText]}>删除</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    i?.[ii.dataIndex] || d + 1
                  )}{" "}
                </Text>
              );
            })}
          </View>
        );
      })}
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text>
                你确定要删除帐号为{itemUserData.username || "--"}的用户吗？
              </Text>
            </View>

            <View style={styles.modalBtnBox}>
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => setIsVisible(false)}
              >
                <Text style={[styles.btnText]}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn]} onPress={handleConfirm}>
                <Text style={[styles.btnText]}>确认</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <EditUser
        itemUserData={itemUserData}
        editModal={editModal}
        setEditModal={setEditModal}
        putUser={putUser}
      />
    </View>
  );
};

export default App;
