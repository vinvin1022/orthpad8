import React from 'react';
import type { FC } from 'react';
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';

type TProps = {
    text: string;
    show: boolean;
    setShow: (bol: boolean) => void;
}


const App: FC<TProps> = ({ show, setShow, text }) => {
    return (
        <View>
            {
                show &&
                <Modal
                    visible={show}
                    animationType="none"
                    transparent={true}
                    onRequestClose={() => setShow(false)}
                >
                    <View style={styles.fullStyle} >
                        <View style={styles.textBox}>
                            <View style={styles.headerBox}>
                                <Text style={styles.closeBtnTitle}>错误提示</Text>
                                <TouchableOpacity style={styles.closeBtnBox} onPress={() => {
                                    setShow(false)
                                }}>
                                    <Text style={styles.closeBtn}>x</Text>
                                </TouchableOpacity>
                            </View>


                            <Text style={styles.text}>{text}</Text>
                        </View>
                    </View >

                </Modal>

            }

        </View>
    );
}



export default App;
