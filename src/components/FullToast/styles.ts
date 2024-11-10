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
  headerBox:{
    width: "100%",
    position:'relative',
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: pxToDp(20),
    padding: pxToDp(20),
    paddingBottom: pxToDp(8),
  },
  closeBtnTitle:{
    color: "red",
    fontSize: pxToDp(42),
  },
  closeBtnBox:{
    position: 'absolute',
    right: pxToDp(20),
    top: pxToDp(-2),
    padding: pxToDp(10),
  },
  closeBtn:{
    fontSize: pxToDp(50),
  }, 
  textBox:{
    width: pxToDp(500),
    minHeight: pxToDp(100),
    borderRadius: pxToDp(20),
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff", 
    position: 'relative',
    left: pxToDp(-200),
    paddingBottom: pxToDp(30),
  },
  text:{
    textAlign: 'center',
    fontSize: pxToDp(38),
    lineHeight: pxToDp(60),
  }
 
});
export default styles;
