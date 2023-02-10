import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect,useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { ButtonIcon, DateMonth, Footer, Header2, Title, DataView, Spinner } from '../../component2';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Distance from '../../utils/distance';
import Rp, { Rupiah } from '../../utils/Rp';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import API from '../../service';
import ScreenLoading from '../loading/ScreenLoading';

const BillList = ({ navigation, route }) => {
    const data = route.params.form
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused();
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableData, setTableData] = useState([])
    const tableHead = ['No', 'Nomor REK', 'Periode', 'Tanggal', 'M3', 'Wajib Dibayar(Rp)', 'Terbayar(Rp)', 'Denda(Rp)', 'Sisa(Rp)'];
    const widthArr = [40, 60, 100, 100, 60, 140, 140, 100, 100]

    const [customer, setCustomer] = useState({})
    const [recap, setRecap] = useState({
        tagihan :0,
        denda :  0,
        total :  0,
        tunggakan: 0 
    })
   
    const num = 1000; 

    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            ctmPayAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const ctmPayAPi = () => {
        Promise.all([API.ctmpay(data.code, TOKEN), API.ctmcustomer(data.code, TOKEN)]).then((result) => {
            let data = []
            var tunggakan = 0
            var tagihan = 0
            var denda = 0  
            var total = 0          
            result[0].data.map((item, index) => {
                let m3 = item.bulanini - item.bulanlalu
                let sisa = item.wajibdibayar - item.sudahdibayar
                tagihan =tagihan + sisa
                //check if == curent month
                let month_now = result[0].month_next - 1
                let ctm_lock = 0
                if(month_now==item.bulanrekening && result[0].ctm_lock==1){
                    ctm_lock = 1
                }
                if(sisa>0 && ctm_lock==0){
                    tunggakan =tunggakan + 1
                }
                data[index] = [
                    index + 1,
                    item.nomorrekening,
                    item.tahunrekening + '-' + item.bulanrekening,
                    item.tglbayarterakhir,
                    m3,
                    Rupiah(item.wajibdibayar),
                    Rupiah(item.sudahdibayar),
                    Rupiah(item.denda),
                    Rupiah(sisa),
                ]
            })
            total = tagihan
            if(tunggakan>0 && tunggakan<2){
                denda = 10000
                total += denda
                denda = Rupiah(denda);
            }
            if(tunggakan>1 && tunggakan<4){
                denda = 50000
                total += denda
                denda = Rupiah(denda);
            }
            if(tunggakan>3){
                denda = 'SSB (Sanksi Denda Setara Sambungan Baru)'
            }
            
            tagihan = Rupiah(tagihan);            
            total = Rupiah(total);
            setTableData(data)
            setCustomer(result[1].data)
            setRecap({
                tagihan:tagihan,
                denda:denda,
                total:total,
                tunggakan:tunggakan
            })
            setLoading(false)
            console.log('result', result)
            console.log('customer', result[1].data)
        }).catch((e) => {
            console.log('error', e);
            setLoading(false)
        })

    };

    return (
        <View style={styles.container}>
            {loading && <ScreenLoading/> }

{!loading &&
<View>
            <View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}><Text style={styles.label1H}>Tagihan Pelanggan</Text></View>
            <ScrollView style = {styles.scroll}>
                <View style={{ paddingLeft: 10, flex: 1 }}>
                    <DataView title='Tahun Pembayaran' txt={customer.year} />
                    <DataView title='Nomor Sambungan' txt={customer.nomorrekening} />
                    <DataView title='Nama Pelanggan' txt={customer.namapelanggan} />
                    <DataView title='Alamat' txt={customer.alamat} />
                    <DataView title='Gol. Tarif' txt={customer.idgol} />
                    <DataView title='Areal' txt={customer.idareal} />
                    <DataView title='Status' txt={customer.status == 1 ? 'Aktif' : 'Pasif'} />
                    <Distance distanceV={10} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <ScrollView horizontal={true} style={{ width: '95%' }}>
                        <View>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#000000' }}>
                                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#000000' }}>
                                    {
                                        tableData.map((rowData, index) => (
                                            <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={widthArr}
                                                style={[styles.row]}
                                                textStyle={styles.text}
                                            />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
                <Distance distanceV={10} />
                <View style={{ paddingLeft: 10 }} >
                    <Text style={{ fontSize: 19, color: '#696969', fontWeight: 'bold' }}>Jumlah Tagihan</Text>
                    <Distance distanceV={5} />
                    <DataView title='1. Tagihan Air' txt={recap.tagihan} />
                    <DataView title='2. Denda' txt={recap.denda} />
                    <DataView title='Total' txt={recap.total} />
                </View>
              
                <Distance distanceV={10} />
            </ScrollView>
            </View>
            
}
            {/* <Footer
                focus="Menu"
                navigation={navigation}
            /> */}
            
        </View>
    )
}

const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop : windowHeight*0.02,
        paddingHorizontal : windowWidht*0.02,
    },
    header: {
        height: 50,
        backgroundColor: '#F0F8FF'
    },
    text: {
        textAlign: 'center',
        fontWeight: '100',
        color : '#000000',
        fontWeight : "bold"
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 45,
        backgroundColor: '#FFFFFF'
    },
    label1H :{
        width : windowWidht*0.8,
        fontSize: 20,
        color : "#000000",
        textAlign: "center",
        fontWeight : "bold"
      },
      scroll : {
        marginHorizontal : windowWidht*0.02,
        marginTop : windowHeight*0.002,
        height : windowHeight*0.9,
        backgroundColor : "#FFFFFF",
      },
});
export default BillList