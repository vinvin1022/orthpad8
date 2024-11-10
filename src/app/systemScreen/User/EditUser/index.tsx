import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import { roles } from "~/utils/index";
import { Picker } from "@react-native-picker/picker";

type TProps = {
  editModal: boolean;
  itemUserData: API.UserData;
  setEditModal: (val: boolean) => void;
  putUser: (params: API.UserData) => void;
};

const MyComponent: FC<TProps> = ({
  editModal,
  setEditModal,
  itemUserData,
  putUser,
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(false);
  const handleConfirm = () => {
    // 处理确认逻辑
    const userReq = {
      username: username,
      password: password,
      name: name,
      roleid: role + "",
      is_active: status,
    };
    console.log("putUser", userReq);
    putUser(userReq);
    // 关闭弹窗
    setEditModal(false);
  };

  useEffect(() => {
    setName(itemUserData.name || "");
    setUsername(itemUserData.username || "");
    setPassword(itemUserData.password || "");
    setRole(itemUserData.roleid || "");
    setStatus(itemUserData.is_active || false);
  }, [itemUserData]);

  return (
    <Modal
      visible={editModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>编辑用户</Text>
            <Text style={styles.titleText} onPress={() => setEditModal(false)}>
              X
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>权限</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(e) => setRole(e)}
              >
                {
                  // 设置选项
                  roles.map((data, index) => (
                    <Picker.Item
                      key={index}
                      label={data.label}
                      value={data.value}
                    />
                  ))
                }
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>姓名</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入姓名"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>帐号</Text>
            <TextInput
              style={[styles.input, { opacity: 0.5, backgroundColor: "#ccc" }]}
              placeholder="请输入帐号"
              editable={false}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>密码</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入密码"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>状态</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={status}
                style={styles.picker}
                onValueChange={(e) => setStatus(e)}
              >
                {
                  // 设置选项
                  [
                    {
                      label: "正常",
                      value: true,
                    },
                    {
                      label: "停用",
                      value: false,
                    },
                  ].map((data, index) => (
                    <Picker.Item
                      key={index}
                      label={data.label}
                      value={data.value}
                    />
                  ))
                }
              </Picker>
            </View>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity style={[styles.btn]} onPress={handleConfirm}>
              <Text style={[styles.btnText]}>确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyComponent;
