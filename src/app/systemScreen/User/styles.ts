import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  container: {
    padding: pxToDp(40),
    height: pxToDp(1280),
    width: pxToDp(2210),
    backgroundColor: '#fff',
    borderRadius: pxToDp(12)
  },
 
  bottomBox:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: pxToDp(40),
    marginLeft: pxToDp(40),
    marginRight: pxToDp(40),
    borderBottomRightRadius: pxToDp(16),
    borderBottomLeftRadius: pxToDp(16),
  },
  bottomBtnBox:{
    flexDirection: 'row',
  },
  pageNumber:{
    marginLeft: pxToDp(56),
    marginRight: pxToDp(56),
  },

  disabledBtn: {
    // 禁用按钮样式
    opacity: 0.5, // 设置透明度为半透明，表示按钮不可点击
  },
 
});
export default styles;
