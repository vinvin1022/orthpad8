import React, { useState } from 'react';
import type { FC } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from './styles';
import ImageModal from "~/components/ImageModal";


type TProps = {
    positionData: API.GetPosResultData[];
}

const tableColumns = [{
    title: '序号',
    dataIndex: 'index',
}, {
    title: '操作人',
    dataIndex: 'role',
}, {
    title: '定位坐标',
    dataIndex: 'name',
}, {
    title: '定位类型',
    dataIndex: 'type',
}, {
    title: '图片预览',
    dataIndex: 'img',
    flex: 3,
}]



const App: FC<TProps> = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [imgUrl, setImgUrl] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    tableColumns?.map(i => {
                        return <Text key={i.title} style={[styles.headerItem, { flex: i?.flex || 1 }]}>{i.title} </Text>
                    })
                }


            </View>

            {
                props?.positionData?.map((i: any, d) => {
                    return <View style={styles.content} key={i.id}>
                        {
                            tableColumns?.map((ii) => {
                                return <Text key={ii.title} style={[styles.tableItem, { flex: ii?.flex || 1 }]}>{
                                    ii.dataIndex === "type" ?
                                        <View style={[styles.type, { backgroundColor: i.type === "face" ? "red" : "green" }]}>
                                            <Text style={styles.typeText}>
                                                {i.type === "face" ? "面" : i.type === "line" ? "线" : "--"}
                                            </Text>
                                        </View>

                                        :
                                        ii.dataIndex === "img" ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setImgUrl(i.img)
                                                    setModalVisible(true)
                                                }}>
                                                <Text style={styles.imgText} >图片详情</Text>
                                            </TouchableOpacity>
                                            :
                                            i?.[ii.dataIndex] || d + 1
                                } </Text>
                            })
                        }
                    </View>

                })
            }
            <ImageModal
                visible={modalVisible}
                imageURL={imgUrl}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}



export default App;
