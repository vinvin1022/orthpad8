import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: pxToDp(40),
    marginBottom: 0,
    padding: pxToDp(32),
    borderRadius: pxToDp(16),
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
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
    fontSize: pxToDp(36),
    flex: 1,
    textAlign: 'center',
    padding: 12,
  },
  tableItem: {
    borderColor:'#A3ABB0',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    fontSize: pxToDp(32),
    flex: 1,
    textAlign: 'center',
    padding: 12,
    paddingTop: 8,
    paddingBottom: 2,
  },
  imgText:{
    textDecorationLine: 'underline',
    color: "#45A6F3",
    padding: pxToDp(6),
  },
  content:{
    borderColor:'#A3ABB0',
    flexDirection: 'row',
    borderLeftWidth: 1,
  },

  type:{
    width: pxToDp(56),
    height: pxToDp(56),
    borderRadius: pxToDp(56),
  },
  typeText: {
    fontSize: pxToDp(26),
    lineHeight: pxToDp(56),
    textAlign: 'center',
    color: "#fff",
  },
});
export default styles;
