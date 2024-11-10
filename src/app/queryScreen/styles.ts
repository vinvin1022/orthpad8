import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  container: {
    width: pxToDp(2560),
    height: pxToDp(1440),
  },
  headerItem: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    width: pxToDp(2480),
    height: pxToDp(160),
    borderRadius: pxToDp(12),
    paddingTop: pxToDp(48),
    paddingLeft: pxToDp(48),
    marginLeft: pxToDp(40),

  },
  inputContainer: {
    width: pxToDp(560),
    marginBottom: pxToDp(22),
    flexDirection: 'row',
    marginRight: pxToDp(12),
  },
  inputLabel: {
    fontSize: pxToDp(28),
    marginLeft: pxToDp(12),
    marginRight: pxToDp(12),
    position: "relative",
    top: pxToDp(10),
    color: "#4B5155",
  },
  pickerBox: {
    width: pxToDp(380),
    height: pxToDp(56),
    borderWidth: 1,
    borderColor: '#666',
    borderRadius:3,
    position:"relative",
  },
  picker: {
    position:'absolute',
    left: pxToDp(0),
    top:  -13,
    width: pxToDp(380),
  },
  pickerItem:{
    color: "#808C95",
    fontSize: pxToDp(28),
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: pxToDp(12),
    flexDirection: 'row',
    width: pxToDp(420),
    height: pxToDp(56),
    paddingLeft: pxToDp(56),
    paddingTop: pxToDp(6),
  },
  datePickerText:{
    fontSize: pxToDp(28),
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: '#fff',
    padding: pxToDp(40),
    paddingTop: pxToDp(20),
    marginLeft: pxToDp(40),
    marginRight: pxToDp(40),
    borderBottomRightRadius: pxToDp(16),
    borderBottomLeftRadius: pxToDp(16),
  },
  bottomBtnBox: {
    flexDirection: 'row',
    paddingLeft: pxToDp(56),
  },
  pageNumber: {
    marginLeft: pxToDp(56),
    marginRight: pxToDp(56),
  },
  exportBtn: {
    width: pxToDp(232),
    height: pxToDp(56),
    backgroundColor: '#45A6F3',
    borderRadius: pxToDp(8),
  },
  exportBtnText:{
    textAlign: 'center',
    fontSize:  pxToDp(28),
    lineHeight: pxToDp(56),
    color: '#fff',
  },
  disabledBtn: {
    // 禁用按钮样式
    opacity: 0.5, // 设置透明度为半透明，表示按钮不可点击
  },
  totalNumberText:{
    marginLeft: pxToDp(56),
  },
});
export default styles;
