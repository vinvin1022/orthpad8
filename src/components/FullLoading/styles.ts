import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"

const styles = StyleSheet.create({
  fullStyle: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: "#cccccc40", 
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});
export default styles;
