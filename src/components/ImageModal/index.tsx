import React, { useState } from "react";
import type { FC } from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

type TProps = {
  visible: boolean;
  imageURL: string;
  onClose: () => void;
};

const ImageModal: FC<TProps> = ({ visible, imageURL, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: imageURL }}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 半透明黑色背景
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 280,
    height: 280,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
  },
});

export default ImageModal;
