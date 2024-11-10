import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: pxToDp(40),
    height: pxToDp(1280),
    backgroundColor: '#fff',
    borderRadius: pxToDp(12)
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    marginTop: pxToDp(460),
    height: pxToDp(152),
    width: pxToDp(629),
    backgroundColor: "#45A6F3",
    borderRadius: pxToDp(8)
  },
  btnText: {
    textAlign: "center",
    fontSize: pxToDp(40),
    lineHeight: pxToDp(152),
    color: "#fff",
  },
});
export default styles; 
