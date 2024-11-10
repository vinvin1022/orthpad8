import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
    ImageBackground,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Table from "./Table";
import moment from 'moment';
import services9125 from '~/services/services9125';

type TProps = {
}

let roles = [
    { label: '全部', value: 0 },
    { label: '管理员', value: 1 },
    { label: '操作员', value: 2 },
]
const App: FC<TProps> = ({ }) => {
    const [role, setRole] = useState(0)
    const [cycle, setCycle] = useState("7")
    const [dealWay, setDealWay] = useState("")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateType, setDataType] = useState("")
    const [positionData, setPositionData] = useState<API.GetPosResultData[]>([]);
    const [pageNow, setPageNow] = useState(1)
    const [pagination, setPagination] = useState({
        total: 10,
        page: 1
    })

    const [startDate, setStartDate] = useState({
        name: "",
        value: 0,
    });
    const [endDate, setEndDate] = useState({
        name: "",
        value: 0,
    });


    // 获取已经记录的图片位置
    const getPositionData = async (params?: API.GetresultReq) => {
        
        const res = await services9125.getPos({
            page: pageNow,
            per_page: 10,
            user: role,
            cycle,
            way: dealWay,
            start: startDate.value && endDate.value ? moment(startDate.value).format('YYYY-MM-DD') + " 00:00:00" : undefined,
            end: startDate.value && endDate.value ? moment(endDate.value).format('YYYY-MM-DD') + " 23:59:59" : undefined,
            ...params,
        })
        if (res.code === 0) {
            setPositionData(res.data)
            setPagination(res.pagination)
        }else {
            ToastAndroid.show("获取位置列表失败" + res?.message , ToastAndroid.SHORT);
        }
    }


    useEffect(() => {
        getPositionData()
    }, [role, startDate, endDate, cycle, dealWay, pageNow])

    const showDatePicker = (type: 'start' | 'end') => {
        setDatePickerVisibility(true);
        setDataType(type)
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        const formattedDate = moment(date).format('YYYY/MM/DD')
        const dateValue = moment(date)?.valueOf()
        const newStartDate = dateType === 'start' ? {
            name: formattedDate,
            value: dateValue,
        } : startDate
        const newEndDate = dateType === 'end' ? {
            name: formattedDate,
            value: dateValue
        } : endDate
        if (newEndDate.value > 0 && newStartDate.value > newEndDate.value) {
            setStartDate(newEndDate);
            setEndDate(newStartDate);
        } else {
            setStartDate(newStartDate);
            setEndDate(newEndDate);
        }
        hideDatePicker();
    };

    
    return (
        <ImageBackground source={require("~/assets/bg.png")} resizeMode="cover" style={styles.container}>
            <View style={styles.headerItem}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>按用户筛选</Text>
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={role}
                            style={styles.picker}
                            onValueChange={(e) => {
                                setRole(e)
                            }}>
                            {
                                // 设置选项
                                roles.map((data, index) =>
                                    <Picker.Item style={styles.pickerItem} key={index} label={data.label} value={data.value} />
                                )
                            }
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>时间筛选</Text>
                    <View style={styles.datePicker}>
                        <Text onPress={() => showDatePicker("start")} style={styles.datePickerText}>{startDate.name || "开始时间"} - </Text>
                        <Text onPress={() => showDatePicker("end")} style={styles.datePickerText}>{endDate.name || "结束时间"}</Text>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>

                <View style={[styles.inputContainer]}>
                    <Text style={styles.inputLabel}>数据保存周期</Text>
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={cycle}
                            style={styles.picker}
                            onValueChange={(e) => setCycle(e)}>
                            {
                                [{
                                    name: "7天",
                                    value: "7",
                                }, {
                                    name: "30天",
                                    value: "30",
                                }].map((data, index) =>
                                    <Picker.Item key={index} style={styles.pickerItem} label={data.name} value={data.value} />
                                )
                            }
                        </Picker>
                    </View>
                </View>



                <View style={[styles.inputContainer]}>
                    <Text style={styles.inputLabel}>数据处理方式</Text>

                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={dealWay}
                            style={styles.picker}
                            onValueChange={(e) => setDealWay(e)}>
                            {
                                [{
                                    name: "到期删除",
                                    value: "到期删除",
                                }, {
                                    name: "到期导出",
                                    value: "到期导出",
                                }].map((data, index) =>
                                    <Picker.Item key={index} style={styles.pickerItem} label={data.name} value={data.value} />
                                )
                            }
                        </Picker>
                    </View>
                </View>

            </View>
            <Table positionData={positionData} />
            <View style={styles.bottomBox}>
                <Text>
                </Text>
                <View style={styles.bottomBtnBox}>
                    <TouchableOpacity
                        disabled={pageNow === 1}
                        style={[pageNow === 1 && styles.disabledBtn]}
                        onPress={() => { setPageNow(pageNow - 1) }}
                    >
                        <Text>上一页</Text>
                    </TouchableOpacity>
                    <Text style={styles.pageNumber}>{pagination.page}/{Math.ceil(pagination.total / 10)} </Text>
                    <TouchableOpacity
                        disabled={Math.ceil(pagination.total / 10) <= pageNow}
                        style={[Math.ceil(pagination.total / 10) <= pageNow && styles.disabledBtn]}
                        onPress={() => { setPageNow(pageNow + 1) }}
                    >
                        <Text>下一页</Text>
                    </TouchableOpacity>
                    <Text style={styles.totalNumberText}>总条数({pagination.total})</Text>
                    
                </View>
                <TouchableOpacity style={styles.exportBtn} >
                    <Text style={styles.exportBtnText}>数据导出</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}



export default App;
