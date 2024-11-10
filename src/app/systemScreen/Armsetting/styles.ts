import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: pxToDp(40),
    paddingTop: pxToDp(38),
    height: pxToDp(1280),
    backgroundColor: '#fff',
    borderRadius: pxToDp(12),
    flexDirection: 'row',
  },
  left:{
    width: pxToDp(1600),
  },
  leftContent:{
    backgroundColor: '#F1F5F8',
    borderRightWidth: pxToDp(1),
    borderRightColor: '#ccc',
  },
  sBox:{
    height: pxToDp(170),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#ccc',
    paddingTop: pxToDp(32),
    paddingLeft: pxToDp(100),

  },
  multiSliderTextBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(140),
    paddingRight: pxToDp(220),
    marginBottom: pxToDp(20),
  },
  multiSliderText:{
    fontSize: pxToDp(26),
  },
  multiSliderText2:{
    fontSize: pxToDp(32),
    color: '#61676D',
  },
  multiSliderBox:{
    flexDirection: 'row',
  },
  multiSlider:{
    position: 'relative',
    // top: pxToDp(-50),
    top: -16,
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
  },
  right:{
    flex: 1,
  },
  title:{
    textAlign: 'center',
    fontWeight: '500',
    fontSize: pxToDp(36),
    marginBottom: pxToDp(32),
  },

  rightContent:{
    backgroundColor: '#F1F5F8',
  },

  input: {
    width: pxToDp(200),
    height: pxToDp(50),
    padding: 0,
    borderColor: '#666',
    borderWidth: pxToDp(1),
    fontSize: pxToDp(28),
    borderRadius:pxToDp(6),
    paddingLeft: pxToDp(75),
    marginLeft: pxToDp(32),
    marginRight: pxToDp(32),
  },
  rightItem:{
    flexDirection: 'row',
    height: pxToDp(170),
    paddingLeft: pxToDp(100),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#ccc',
    paddingTop: pxToDp(80),
  },

});
export default styles; 
