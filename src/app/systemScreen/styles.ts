import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  container: {
    width: pxToDp(2560),
    height: pxToDp(1440),
    flexDirection: 'row',
    paddingLeft:  pxToDp(40),
    paddingRight:  pxToDp(40),
    justifyContent: 'space-between',
  },

});
export default styles;
