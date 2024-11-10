import { StyleSheet } from 'react-native';
import { pxToDp } from "~/utils"

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  itemBox:{
    flexDirection: 'row',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#B0B7BF",
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    paddingLeft: pxToDp(24),
    paddingRight: pxToDp(24),
  },
  itemFlex:{
    flexDirection: 'row',
  },

  statusIcon:{
    width: 22,
    height: 22,
    lineHeight: 20,
    textAlign: "center",
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#666',
    color: "#fff",
    fontSize: 12,
  },
  btnLock:{
    fontSize: pxToDp(28),
    color: '#DFA849',
  },
  line:{
    width: pxToDp(1),
    height: pxToDp(24),
    marginLeft: pxToDp(12),
    marginRight: pxToDp(12),
    backgroundColor: '#B0B7BF',
    position: 'relative',
    top: pxToDp(8), 
  },
  btnMove:{
    color: '#45A6F3',
    fontSize: pxToDp(28),
  },

  select:{
    borderWidth: 1,
    borderColor: "#949DA3",
    borderRadius:1,
    width: pxToDp(28),
    height: pxToDp(28),
    position: 'relative',
    top: pxToDp(4), 
  },
  hasselect:{
    fontSize: pxToDp(20),
    lineHeight: pxToDp(28),
    backgroundColor: '#45A6F3',
    color: '#fff',
    textAlign: 'center',
  },

  type:{
    fontSize: pxToDp(28),
  },
  title:{
    marginLeft: pxToDp(12),
    marginRight: pxToDp(12),
    fontSize: pxToDp(28),
    width: pxToDp(230),
  },
 
});
export default styles;
