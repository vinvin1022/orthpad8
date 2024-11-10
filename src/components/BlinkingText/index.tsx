import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { Text, Animated, StyleSheet } from "react-native";
import { pxToDp } from "~/utils";

type TProps = {
  shouldBlink: boolean;
  text: string;
  color?: string;
};

const BlinkingText: FC<TProps> = ({ shouldBlink, text, color }) => {
  const [opacity] = useState(new Animated.Value(0)); // 初始化动画值

  useEffect(() => {
    let blinkingAnimation: any;

    if (shouldBlink) {
      blinkingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      blinkingAnimation.start(); // 启动动画
    } else {
      opacity.setValue(0); // 重置透明度
      blinkingAnimation && blinkingAnimation.stop(); // 停止动画
    }

    return () => blinkingAnimation && blinkingAnimation.stop(); // 清理动画
  }, [opacity, shouldBlink]);

  return (
    <Animated.View style={[{ opacity, zIndex: 10 }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: pxToDp(42),
  },
});

export default BlinkingText;
