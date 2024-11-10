import React from "react";
import type { FC } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";

type TProps = {
  show: boolean;
  setShow: (bol: boolean) => void;
};

const App: FC<TProps> = ({ show, setShow }) => {
  return (
    <View>
      {show && (
        <Modal
          visible={show}
          animationType="none"
          transparent={true}
          onRequestClose={() => setShow(false)}
        >
          <TouchableOpacity
            style={styles.fullStyle}
            onPress={() => {
              setShow(false);
            }}
          >
            <View style={styles.textBox}>
              <Text style={styles.text}>请进行正位定位</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default App;
