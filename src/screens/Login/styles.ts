import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    width: pxToDp(2560),
    height: pxToDp(1460),
    paddingLeft: pxToDp(358),
    paddingRight: pxToDp(358),
    paddingTop: pxToDp(110),
  },
  contentBox: {
    width: pxToDp(1845),
    height: pxToDp(1048),
    paddingLeft: pxToDp(1070),
    paddingTop: pxToDp(228),

  },
  title: {
    textAlign: 'center',
    fontSize: pxToDp(60),
    color: "#143C5C",
    fontWeight: 'bold',
    marginBottom: pxToDp(88),
  },
  logingContainer: {
    width: pxToDp(790),
  },
  inputContainer: {
    width: '100%',
    marginBottom: pxToDp(44),
    marginLeft: pxToDp(120),
    flexDirection: 'row',
    position: "relative",
  },
  icon: {
    width: pxToDp(40),
    height: pxToDp(40),
    position: 'absolute',
    top: pxToDp(22),
    left: pxToDp(24),

  },
  pickerBox: {
    width: pxToDp(540),
    height: pxToDp(74),
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 3,
    position: "relative",
  },
  picker: {
    position: 'absolute',
    left: pxToDp(60),
    // top:  pxToDp(-36),
    top: -10,
    width: pxToDp(480),
  },
  pickerItem: {
    color: "#808C95",
    fontSize: pxToDp(33),
  },
  input: {
    width: pxToDp(540),
    height: pxToDp(74),
    padding: 0,
    paddingLeft: pxToDp(80),
    paddingTop: pxToDp(6),
    borderColor: '#666',
    borderWidth: 1,
    fontSize: pxToDp(33),
    borderRadius: 3,
  },
  btnLogin: {
    width: pxToDp(540),
    height: pxToDp(80),
    borderRadius: pxToDp(4),
    backgroundColor: '#1467A8',
    borderColor: '#1467A8',
    color: "#fff",
    marginLeft: pxToDp(120),
    textAlign: "center",
    lineHeight: pxToDp(78),
    borderWidth: 1,
    fontSize: pxToDp(40),
  },
  disabledBtn: {
    opacity: 0.5, // 设置透明度为半透明，表示按钮不可点击
  },


  modalLayer: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: pxToDp(550),
  },
  modalContainer: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: pxToDp(48),
    width: pxToDp(1800),
    // height: pxToDp(600),

  },

  modalButtonStyle: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: 'row',
  },

  modalButton1: {
    marginRight: pxToDp(24),
  },
  modalButton2: {
    backgroundColor: "#fff",
  },

  ipHostInput: {
    borderWidth: pxToDp(1),
    borderColor: "#ccc",
    borderRadius: pxToDp(4),
    // marginTop: pxToDp(16),
    marginBottom: pxToDp(26),
    paddingTop: pxToDp(6),
    paddingBottom: pxToDp(6),
    // position: 'absolute',
    top: pxToDp(-16),
    left: pxToDp(16),
    width: pxToDp(450),
  },
  inputWidth2:{
    width: pxToDp(1200),
  },

  modalInputContainer:{
    flexDirection: 'row',
    position: 'relative',
    width: "50%"
  },
  modalTitle:{
    width: pxToDp(400),
    textAlign:"right"
  }

});

export default styles;
