import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  content: {
    backgroundColor:"#fff",
    height:pxToDp(160),
  },
  content2: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    padding: pxToDp(18),
    paddingLeft: pxToDp(36),
    paddingTop: pxToDp(56),
  },
  dateText:{
    fontSize: pxToDp(42),
    fontWeight: "bold",
    color: "#fff",
  },
  icon:{
    width: pxToDp(48),
    height: pxToDp(48),
    // marginRight: pxToDp(12),
    // marginLeft: pxToDp(16),
    position: 'relative',
    // top: pxToDp(8),
  },

  rightIcon:{
    color: '#fff',
    flexDirection: 'row',
    marginRight: pxToDp(70),
  },
  rightIconText:{
    color: "#fff",
    fontSize: pxToDp(36),
  },

});
export default styles;
