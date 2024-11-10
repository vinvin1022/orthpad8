import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: pxToDp(40),
    paddingTop: pxToDp(136),
    height: pxToDp(1280),
    backgroundColor: '#fff',
    borderRadius: pxToDp(12)
  },
});
export default styles;
