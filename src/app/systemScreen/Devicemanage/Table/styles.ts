import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  container: {
  },
  header: {
    borderColor:'#A3ABB0',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    width: "100%",
  },
  headerItem: {
    borderColor:'#A3ABB0',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor:'#ccc',
    flex: 1,
    textAlign: 'center',
    fontSize: pxToDp(36),
    paddingTop: pxToDp(18),
    paddingBottom: pxToDp(18),
  },
  tableItem: {
    borderColor:'#A3ABB0',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
    textAlign: 'center',
    paddingTop: pxToDp(18),
    paddingBottom: pxToDp(18),
    fontSize: pxToDp(32),
  },
  content:{
    borderColor:'#A3ABB0',
    flexDirection: 'row',
    borderLeftWidth: 1,
  },

  btnText:{
    fontSize: pxToDp(28),
    color: "#45A6F3",
  },


  
});
export default styles;
