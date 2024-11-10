import React from 'react';
import type { FC } from 'react';
import {
    View,
    ActivityIndicator,
    Modal,
} from 'react-native';
import styles from './styles';

type TProps = {
    show: boolean;
}


const App: FC<TProps> = ({ show }) => {
    return (
        <View>
            {
                show &&
                <Modal
                    visible={show}
                    animationType="none"
                    transparent={true}
                >
                    <View style={styles.fullStyle} >

                        <View >

                            <ActivityIndicator size="large" />
                        </View>
                    </View >

                </Modal>



            }

        </View>
    );
}



export default App;
