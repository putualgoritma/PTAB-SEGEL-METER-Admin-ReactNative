import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View,Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Footer1, Header1, In, Input, Out, Spinner, TextInput, Title } from '../../component2';
import Distance from '../../utils/distance';
import { useSelector } from 'react-redux';
import API from '../../service';
import { useIsFocused } from '@react-navigation/native';

const Bill = ({ navigation, route }) => {
    const USER = useSelector((state) => state.UserReducer);
    const [form, setForm] = useState({
        code: USER.code,
    })
    const [loading, setLoading]= useState(false)
    const isFocused = useIsFocused();


    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            let code = route.params ? (route.params.code ? route.params.code : null) : null;
            // alert(code)
            if (code !== null) {
                setLoading(true)
                API.scanCode({ code: code }).then((result) => {
                    console.log(result);
                    handleForm('code', result.data.code)
                    setLoading(false)
                }).catch((e) => {
                    console.log(e.request);
                    // alert('data tidak ada')
                    setLoading(false)
                })
            }
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            {/* {loading && <Spinner/>} */}
            <View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}><Text style={styles.label1H}>Cek Tagihan</Text></View>

            <ScrollView style={styles.scroll}>
                <View style={{ alignItems: 'center' }}>
        

                    <Distance distanceV={10} />
                    <TouchableOpacity onPress={() => navigation.navigate('BillScan')}>
                        <Image source={require('../../assets/icon/iconQR.png')} style={{ width: 113, height: 129 }} />
                    </TouchableOpacity>
                    <TextInput
                        title="ID Pelanggan"
                    />
                    <Input
                        placeholder="Masukan ID Pelanggan"
                        value={form.code}
                        onChangeText={(value) => handleForm('code', value)}
                    />
                    <Distance distanceV={5} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <In
                            title="Masuk"
                            onPress={() => navigation.navigate('BillList', { form: form })}
                        />
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop : windowHeight*0.02,
        paddingHorizontal : windowWidht*0.02,
    },
    label1H :{
        width : windowWidht*0.8,
        fontSize: 20,
        color : "#000000",
        textAlign: "center",
        fontWeight : "bold"
      },
      label4 :{
        color:"#000000",
        fontSize: 12,
    
      },
      scroll : {
        flex : 1,
        marginTop : windowHeight*0.2,
      }
});
export default Bill