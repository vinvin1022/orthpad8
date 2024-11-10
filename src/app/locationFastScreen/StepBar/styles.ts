import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"

const styles = StyleSheet.create({
  step: {
    position: "relative",
  },

  stepBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepBoxItem: {
    flex: 1,
  },

  stepBar: {
    width: pxToDp(900),
    height: pxToDp(10),
    // backgroundColor: "#96B0F3",
    position: "absolute",
    top: pxToDp(30),
  },
  stepBar1: {
    left: pxToDp(150),
  },
  stepBar2: {
    left: pxToDp(920),
  },
  stepNumber: {
    width: pxToDp(60),
    height: pxToDp(60),
    lineHeight: pxToDp(60),
    borderRadius: pxToDp(40),
    color: "#fff",
    marginLeft: pxToDp(100),
    marginRight: pxToDp(100),
    fontWeight: "400",
    fontSize: pxToDp(38),
    textAlign: "center",
    zIndex: 2,
  },

  stepIcon:{
    width: pxToDp(30),
    height: pxToDp(30),
    marginLeft: pxToDp(15),
    marginTop: pxToDp(15),
  },

  stepName: {
    fontSize: pxToDp(30),
    color: "#fff",
    width: "100%",
    marginLeft: pxToDp(80),
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
  },

});
export default styles;
