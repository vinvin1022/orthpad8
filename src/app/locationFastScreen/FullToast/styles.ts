import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"

const styles = StyleSheet.create({
  fullStyle: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: "#cccccc80", 
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox:{
    width: pxToDp(500),
    height: pxToDp(200),
    borderRadius: pxToDp(20),
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff", 
    position: 'relative',
    left: pxToDp(-200),
  },
  text:{
    textAlign: 'center',
    fontSize: pxToDp(38),
    lineHeight: pxToDp(180),
  }
 
});
export default styles;
