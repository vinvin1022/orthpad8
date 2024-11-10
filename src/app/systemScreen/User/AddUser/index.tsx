import React, { useState } from "react";
import type { FC } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import { roles } from "~/utils/index";
import { Picker } from "@react-native-picker/picker";

type TProps = {
  addUser: (params: API.UserData) => void;
};

const MyComponent: FC<TProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("2");
  const handleConfirm = () => {
    // 处理确认逻辑
    const userReq = {
      username: username,
      password: password,
      name: name,
      roleid: role,
    };
    console.log("addUser", userReq);
    props.addUser(userReq);
    // 关闭弹窗
    setIsVisible(false);
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[styles.btn]} onPress={() => setIsVisible(true)}>
        <Text style={[styles.btnText]}>新增</Text>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.titleBox}>
              <Text style={styles.titleText}>新建用户</Text>
              <Text
                style={styles.closeText}
                onPress={() => setIsVisible(false)}
              >
                x
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
                style={styles.input}
                placeholder="请输入帐号"
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
            <View style={styles.btnBox}>
              <TouchableOpacity style={[styles.btn2]} onPress={handleConfirm}>
                <Text style={[styles.btnText2]}>确认</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyComponent;
