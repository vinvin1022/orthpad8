import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row-reverse',
  },
  btn: {
    borderRadius: pxToDp(8),
    width: pxToDp(232),
    height: pxToDp(56),
    marginBottom: pxToDp(48),
    backgroundColor: '#45A6F3',
  },
  btnText: {
    textAlign: "center",
    color:"#fff",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(56),
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
    width: pxToDp(1100),
  },
  titleBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingBottom: 2,
    marginBottom: 16,
  },
  titleText:{
    fontSize: pxToDp(56),
  },
  closeText:{
    fontSize: pxToDp(70),
    position:"relative",
    top: pxToDp(-14),
  },
  inputContainer: {
    width: '100%',
    marginBottom: 22,
    flexDirection: 'row',
    paddingLeft: 20, 
    paddingRight: 20, 
  },
  inputLabel: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 12,
    position:"relative",
    top: 4,
  },
  input: {
    width: pxToDp(800),
    height: 38,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius:3,
    paddingHorizontal: 10,
  },
  pickerBox:{
    width: pxToDp(800),
    borderWidth: 1,
    borderColor: '#666',
    borderRadius:3,
    height: 38,
  },
  picker:{
    position:"relative",
    top: -8,
  },
  btnBox:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: pxToDp(80),
  },
  btn2: {
    borderRadius: pxToDp(8),
    width: pxToDp(232),
    height: pxToDp(76),
    marginBottom: pxToDp(48),
    backgroundColor: '#45A6F3',
  },
  btnText2: {
    textAlign: "center",
    color:"#fff",
    fontSize: pxToDp(32),
    lineHeight: pxToDp(76),
  },
});

export default styles;
