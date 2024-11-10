import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  container: {
    width: pxToDp(240),
    height: pxToDp(1280),
    backgroundColor: '#fff',
    paddingTop: pxToDp(159),
    borderRadius: pxToDp(12),
    marginRight: pxToDp(24),
  },
  btn:{
    width: pxToDp(240),
    marginBottom: pxToDp(120),
  },
 
  btnImgBox:{
    width: pxToDp(72),
    height: pxToDp(72),
    backgroundColor: '#4B5155',
    borderRadius: pxToDp(6),
    padding: pxToDp(10),
    marginLeft: pxToDp(80),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: pxToDp(18),
  },
  btnImg:{
    width: pxToDp(52),
    height: pxToDp(52),
  },
  buttonText:{
    color: '#4B5155',
    fontSize: pxToDp(32),
    textAlign: "center",
  },
});
export default styles;
