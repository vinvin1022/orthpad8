import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"

export const ballWidth = pxToDp(60)

//点击球的padding大小，兼容手势的触摸大小
export const ballPadding = pxToDp(80)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#45A6F3",
    height: "100%",
  },
  showBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(40),
    paddingRight: pxToDp(40),
  },
  showBoxLeft: {
    width: pxToDp(1900),
    height: pxToDp(1060),
    borderWidth: 1,
    borderRadius: 3,
    position: 'relative',
  },
  activityIndicator:{
    position: 'absolute',
    left: pxToDp(1900/2),
    top: pxToDp(1060/2),
    zIndex: 10,
  },
  showBoxRight: {
    width: pxToDp(560),
    height: pxToDp(1060),
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  positionLogTitle:{
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#B0B7BF",
    paddingTop: pxToDp(32),
    paddingBottom: pxToDp(32),
    fontSize: pxToDp(36),
    fontWeight: 'bold',
  },

  btnFlexBox:{
    flexDirection:'row',
    justifyContent: 'center',
  },

  btnBox:{
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: pxToDp(25),
    paddingLeft: pxToDp(120), 
    paddingRight: pxToDp(120), 
    width: pxToDp(2480),
    height: pxToDp(220),
    marginTop: pxToDp(30),
    borderRadius: pxToDp(8),
    backgroundColor: '#fff',
  },
  
 
  btn:{
    width: pxToDp(170),
  },

  btnImgBox:{
    width: pxToDp(120),
    height: pxToDp(120),
    backgroundColor: '#4B5155',
    borderRadius: pxToDp(60),
    padding: pxToDp(20),
    paddingLeft: pxToDp(22),
    marginLeft: pxToDp(20),
    marginBottom: pxToDp(10),
  },
  btnImg:{
    width: pxToDp(80),
    height: pxToDp(80),
  },
  buttonText:{
    color: '#4B5155',
    fontSize: pxToDp(32),
    textAlign: "center",
  },


  video: {
    width: '100%',
    height: '100%',
  },
  leftImgSty: {
    position: 'absolute',
    width: "100%",
    height: "100%",
  },
  editBox: {
    position: 'absolute',
    width: "100%",
    height: "100%",
  },
  pointBox: {
    position: 'absolute',
    width: ballWidth + 2*ballPadding,
    height: ballWidth + 2*ballPadding,
    zIndex: 10,
    padding: ballPadding,
  },
  point: {
    width: ballWidth,
    height: ballWidth,
    backgroundColor: 'green',
    borderRadius: pxToDp(90),
  },
  point2:{
    backgroundColor: 'red',
  },
  ballText:{
    textAlign:"center",
    fontSize: pxToDp(30),
    lineHeight: ballWidth,
  },
  line: {
    position: 'absolute',
    paddingTop:3,
    paddingBottom: 3,
  },


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    borderWidth: 1,

  },
  modalBtnBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn:{
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 3,
    marginRight: 12,
    marginLeft: 12,
    padding: 2,
    paddingLeft: 6,
    paddingRight: 6,
  },


  triangleContainer: {
    width: 0,
    height: 0,
    transform: [{ rotate: `-45deg` }],
    position: "absolute",
    borderLeftWidth: ballWidth, // 设置底边宽度
    borderBottomWidth: ballWidth, // 设置高度
    borderLeftColor: 'transparent', // 底边透明，这里我们只需要垂直边
    borderBottomColor: 'green', // 根据需要更改颜色
  },


  disabledBtn: {
    // 禁用按钮样式
    opacity: 0.5, // 设置透明度为半透明，表示按钮不可点击
  },

  selectPicBox:{
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },

  containerPic: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  showPicBox:{
    position: 'absolute',
    left: pxToDp(12),
    top: pxToDp(12),
    flexDirection: 'row',
  },
  containerVideoLogo:{
    color: '#fff',
    position:'relative',
    top: pxToDp(8),
    left: pxToDp(8),
    zIndex:10,
  },
  seletImage:{
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red'
  },


 
});
export default styles;
