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
  btnBox:{
    flexDirection: 'row',
  },
  btn:{
    borderWidth: 1,
    padding: pxToDp(4),
    paddingLeft: pxToDp(18),
    paddingRight:pxToDp(18),
    marginLeft: pxToDp(26),
    borderRadius:3,
    borderColor: '#666',
  },
  editBtnText:{
    fontSize: pxToDp(28),
    color: "#45A6F3",
  },
  textLine:{
    height: pxToDp(28),
    width: 1,
    backgroundColor: '#ccc',
    marginLeft: pxToDp(26),
    marginRight: pxToDp(26),
    position: 'relative',
    top: pxToDp(6),
  },
  deleteBtnText:{
    fontSize: pxToDp(28),
    color: "#F36945",
  },
  btnText:{
    textAlign:"center",
    fontSize: pxToDp(28),
  },


  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent:{
    backgroundColor: 'white', 
    borderRadius: 10,
    width: pxToDp(600),
    padding: pxToDp(40),
  },
 
  modalBtnBox:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: pxToDp(10),
    marginTop: 30,
  },
});
export default styles;
