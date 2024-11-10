import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils/index"


const styles = StyleSheet.create({
  container: {
   backgroundColor:"#fff",
   width:pxToDp(2560),
   height: pxToDp(1460),
  },
 
  btnBox:{
    flexDirection: 'row',
    justifyContent: "center",
    marginLeft: "50%",
    position:"relative",
    right: pxToDp(600),
    marginTop: pxToDp(60),
  },
  boxLeftTop:{
    width:pxToDp(860),
    height:pxToDp(800),
    borderRadius:pxToDp(24),
    marginRight:pxToDp(52),
    textAlign: "center",
    backgroundColor: '#fff',
    paddingLeft: pxToDp(150),
    paddingRight: pxToDp(150),
    paddingTop: pxToDp(88),
    marginBottom: 20,
  },
  boxLeftBottom:{
    width:pxToDp(860),
    height:pxToDp(228),
    borderRadius:pxToDp(24),
    marginRight:pxToDp(52),
    textAlign: "center",
    backgroundColor: '#fff',
    paddingTop: pxToDp(50),
  },
  boxLeftImg:{
    width:pxToDp(500),
    height:pxToDp(500),
  },
  boxRightImg:{
    width:pxToDp(368),
    height:pxToDp(368),
  },
  boxLeftText:{
    fontSize: pxToDp(68),
    textAlign: 'center',
    marginTop: pxToDp(12),
    fontWeight: 'bold',
  },

  boxRightTop:{
    width:pxToDp(703),
    height:pxToDp(514),
    backgroundColor: '#fff',
    borderRadius:pxToDp(24),
    paddingLeft: pxToDp(178),
    paddingRight: pxToDp(178),
    marginBottom: 20,
  },
  boxRightText:{
    fontSize: pxToDp(48),
    textAlign: 'center',
    marginTop: pxToDp(12),
    fontWeight: 'bold',
  },
  boxRightBottom:{
    width:pxToDp(703),
    height:pxToDp(514),
    backgroundColor: '#fff',
    borderRadius:pxToDp(24),
    paddingLeft: pxToDp(178),
    paddingRight: pxToDp(178),
  },
});
export default styles;
