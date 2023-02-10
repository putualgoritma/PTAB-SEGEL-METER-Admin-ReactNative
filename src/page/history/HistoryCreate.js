import {ImageHeader,Images} from '../../assets'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, View, Image, Text,Dimensions, Button,TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../../service';
import { Btn, Txt,TxtArea,Title } from '../../component';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import ScreenLoading from '../loading/ScreenLoading';


const HistoryCreate = ({ navigation, route }) => {
const lock_id = route.params.lock_id ? route.params.lock_id : '';
  const TOKEN = useSelector((state) => state.TokenReducer);
  const [search, setSearch] = useState("");
  const [img, setImg] = useState([]);
  const [amount, setAmount] = useState(0);
  const [statusName, setStatusName] = useState('');
  const [todos, setTodos] = useState([{'id' : 'notice','name' : 'Penyampaian Surat'},{'id' : 'lock','name' : 'Penyegelan'},{'id' : 'notice2','name' : 'Kunjungan'},{'id' : 'unplug','name' : 'Cabutan'}])
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState({'nomorrekening' : '', 'namapelanggan' : '', 'alamat' : '', 'idgol' : '',
  'nomorhp' : '', 'tglentry' : '', 'wmnomor' : '', 'wmukuran' : ''
  });
  const [date, setDate] = useState("0000-00-00");
  const [loading, setLoading] = useState(true)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [status, setStatus] = useState('');
  let number = [];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 const handleConfirm = (date) => {
    // setLoading(true);
    const dated = date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + (date.getDate())).slice(-2);
    console.log('ssssssaa',dated)
    // Axios.get(API_URL+'installment/installmentCreatesearch/'+contact_id+'/'+dated,
    // {
    //   headers :{
    // otherHeader : "foo",
    //     Authorization: (`Bearer ${token}`),
    //     'Accept' : 'application/json'
    //   }
    // }
    // )
    //   .then(res => {
    //     // console.log('ssssddd',res.data.data)
    //     setData(res.data.data);

    //   }).catch(err => console.log('err: ', err))
    //   .finally(() => {
    //     setLoading(false);
    //   })
    setDate(dated);
    hideDatePicker();
  
  };


  // real
  function toRupiah(amount){
    const rupiah = String(amount)
     .replace(/\B(?=(\d{3})+(?!\d))/g, '.')+',00';
     return rupiah;
   }

  

const ShowDetail = () => {
  console.log(lock_id)
  setLoading(true)
  API.sealHistoryShow(lock_id,TOKEN).then((result) => {
      setDataShow(result.data)
      console.log('data',result.data)
      // console.log('rrr',result.data.image);
      // console.log('rrr',number);
      // number = result.data.image;
      setImg(result.data2)
      // console.log('ss',img);
      // setListPayment(result.data2)
      // setTotalPayment(result.data3)
      setLoading(false)
  }).catch((e) => {
      console.log(e.request);
      setLoading(false)
  })
}

const handleSearch = (value) => {
   setStatus(value)
    console.log('1', value);
}

const searchBy = () => {
  actionStaffListsAPi();
}


  

useEffect(() => {
  // if(isFocused){
  console.log('test')
  // ShowDetail();
  // ShowDetail(6);
  ShowDetail()
  //    }
}, [])


  return (
    <View style={styles.container}> 
        <View style ={{ marginLeft : 10 }}>
    <View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}>
    <TouchableOpacity onPress={()=> navigation.replace('History Segel')}><Text style={{ color : "rgb(255,0,0)" }}><Icon name='chevron-back-outline' size={12} color = {"rgb(255,0,0)"}/>BACK</Text></TouchableOpacity>
    <Text style={styles.label1H}>Histori Penyegelan</Text></View>
   
    <View style={styles.top}>
        <Text style={[styles.label4, {textAlign:"center"}]}>{new Date().getDate() + "-"+ parseInt(new Date().getMonth()+1) +"-"+new Date().getFullYear()}</Text>
        </View>
        <View style={styles.top}>
        <Text style={styles.label1}>PERUMDA TIRTA AMERTHA BUANA TABANAN</Text>
        </View>
        <View style={styles.top}>
        <Text style={{  fontSize: 16, color : "#000000", fontWeight : "bold" }}>Data Pelanggan</Text>
        </View>
        {loading &&
          <ScreenLoading/>
          }
            {!loading &&
      
        <ScrollView style={styles.formData}>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>No. SBG</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.nomorrekening}</Text>
      </View>
    </View>
    
    </View>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>Nama</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.namapelanggan}</Text>
      </View>
    </View>
    </View>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>Alamat</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.alamat}</Text>
      </View>
    </View>
    </View>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>Golongan</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.idgol}</Text>
      </View>
    </View>
    </View>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>No Telp</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.nomorhp}</Text>
      </View>
    </View>
    </View>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>Tgl Pasang</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.tglentry}</Text>
      </View>
    </View>
    </View>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>No. WM</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.wmnomor}</Text>
      </View>
    </View>
    </View>
  
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>Diameter WM</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.wmukuran}</Text>
      </View>
    </View>
    </View>
    <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>Catatan</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.memo}</Text>
      </View>
    </View>
    </View>
    {dataShow.type == 'notice' &&
  <View>
  <Text style ={styles.label1}>Penyampaian Surat</Text>
  </View>
    }
    {dataShow.type == 'lock' &&
  <View>
  <Text style ={styles.label1}>Penyegelan</Text>
  </View>
    }
     {dataShow.type == 'notice2' &&
  <View>
  <Text style ={styles.label1}>Kunjungan</Text>
  </View>
    }
     {dataShow.type == 'unplug' &&
  <View>
  <Text style ={styles.label1}>Cabutan</Text>
  </View>
    }
  
    {!loading &&
    console.log('ksksk'+dataShow.image)}
    {
     
     img && img.map((item, key)=>{
      return <View key={key}>
        {/* <Text>{item}</Text> */}
         <Image source={{uri : (`https://simpletabadmin.ptab-vps.com${item}`)}} style={styles.images}/>
      </View>
    })
    }
        </ScrollView>
       
  }
   </View>
        </View>
 
  )
}

export default HistoryCreate


const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;

const styles = StyleSheet.create({

  footer : {
    windowWidht : windowWidht*0.8,
    marginTop : windowHeight*0.01,
    padding : windowWidht*0.02,
    margin : "auto",
    borderWidth : 1,
    backgroundColor : "#FFFFFF",
    },
      paginate : {
        flexDirection : "row",
    marginLeft : "auto",
      },
  container:
  {
    flex: 1,
    paddingTop : windowHeight*0.02,
    paddingHorizontal : windowWidht*0.02,

  },
  date: {
    width : windowWidht*0.9,
    height : windowHeight*0.03,
    borderWidth : 1,
    marginHorizontal : windowWidht*0.04,
color : "#000000",
backgroundColor : "#FFFFFF",
  },
  formField:{
flexDirection : "row",
paddingVertical : windowHeight*0.015,
  },
  data : {
    marginTop : windowHeight*0.02,
    width: windowWidht*1,
    height : windowHeight*0.44,
    backgroundColor : '#FFFFFF',
  },
  dataCollom : {
    flexDirection : "row",
    marginTop : windowHeight*0.05,
    width: windowWidht*0.9,
    marginHorizontal : windowWidht*0.025,
    backgroundColor : '#FFFFFF',
  },
  top : {
    marginTop : windowHeight*0.01,
  },

  formData : {
    marginTop : windowHeight*0.02,
    width: windowWidht*0.95,
    marginHorizontal : windowWidht*0.005,
    height : windowHeight*0.75,
    backgroundColor : '#FFFFFF',
  },
  data1 : {
    flexDirection : "row",
   marginHorizontal : windowWidht*0.01,
    width :windowWidht*1,
    // paddingBottom : windowHeight*0.03,
borderBottomWidth : 1,
  },
  formGroup : {
    width :windowWidht*0.8,
  },
  col1 : {
    width :windowWidht*0.68,
  },
  col2 : {
    marginVertical : windowHeight*0.05,
    width :windowWidht*0.3,
  },
  col3 : {
    width :windowWidht*0.3,
  },
  col4 : {
    width :windowWidht*0.3,
  },

  col21 : {
    width :windowWidht*0.3,
  },
  col22 : {
    width :windowWidht*0.64,
  },
  content : {
    paddingTop : windowHeight*0.02,
    paddingHorizontal : windowWidht*0.02,
  },
  loadingImg :{ 
    alignItems : "center", 
    paddingTop:  windowHeight*0.04,
},
loading :{ 
  alignItems : "center", 
},
historyDay :{
  backgroundColor : "#FFFFFF",
height:  windowHeight*0.18,
width:  windowWidht*0.9,
borderWidth: 1,
borderColor: "rgba(0,0,0,0.5)",
},
  floatingScreen :{
    marginTop : windowHeight*0.02,
    width : windowWidht *0.9,
    height:  windowWidht*0.12,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor : "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",

  },
  labelTitle :{
    fontSize: 30,
    color : "#FFFFFF",
    marginBottom : windowHeight*0.03,
    textAlign: "center",
    fontWeight : "bold"
  },
  label1 :{
    fontSize: 14,
    color : "#000000",
    textAlign: "center",
    fontWeight : "bold"
  },

  label1H :{
    width : windowWidht*0.8,
    fontSize: 20,
    color : "#000000",
    textAlign: "center",
    fontWeight : "bold"
  },
  label2 :{
    fontSize: 20,
  },
  label2white :{
    color:'#FFFFFF',
    fontSize: 20,
  },
  label2whitecenter :{
    textAlign : "center",
    color:'#FFFFFF',
    fontSize: 20,
  },
  label3 :{
    color:"#000000",
    fontSize: 16,

  },
  label4 :{
    color:"#000000",
    fontSize: 12,

  },
  label3white :{
    color:'#FFFFFF',
    fontSize: 16,
  },
  label2blue :{
    fontSize: 20,
    color:'rgba(0,0,255,1)',
  },
  center : {
    // marginTop: windowHeight*0.1,
    alignItems: 'center',
  },
  header:{
    alignItems: 'center',
  },

  iconGroup:{
    flexDirection: 'row',
  },

  square:{
    alignItems : "center",
    height:  windowWidht*0.22,
    width: windowWidht*0.22,
    marginTop : windowWidht*0.05,
    marginHorizontal : windowWidht*0.1,
    backgroundColor : "rgba(0,191,255,0.1)",
    borderRadius : 2,
    borderWidth: 0.5,
    borderColor : "rgba(0,191,255,0.01)",

  },

  iconBack:{
    alignItems : "center",
    height:  windowWidht*0.6,
    width: windowWidht*0.8,
    marginVertical : windowWidht*0.1,
    marginHorizontal : windowWidht*0.1,
    backgroundColor : "#FFFFFF",

  },
  imageSend:{
    marginVertical : windowHeight*0.01,
    marginHorizontal : windowWidht*0.022,
    width: windowWidht*0.4,
    height:  windowWidht*0.2,
    borderWidth: 5,
    borderColor: "red",

  },

  icon:{
    marginVertical : windowHeight*0.01,
    width: windowWidht*0.78,
    height:  windowWidht*0.58,
    borderWidth: 5,
    borderColor: "red",

  },
  images :{
    width: windowHeight*0.42,
    height:  windowHeight*0.36,
    marginHorizontal : windowHeight*0.02,
    marginTop:windowHeight*0.01,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "red",
  
  },
  imagesLoading :{
    width: windowHeight*0.12,
    height:  windowHeight*0.12,
    marginRight:10,
    // borderRadius : 150/2,
    marginTop:windowHeight*0.01,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  
  },
 

  centerModal : {
    marginTop: windowHeight*0.19,

    alignItems: 'center',
  },
  marginH : {
    marginHorizontal : windowWidht*0.04,
    marginTop : windowHeight*0.02,
  },
  leftButton : {
    width:  windowWidht*0.9,
  },
  marginTop : {
    marginTop : windowHeight*0.05,
  },
  search:{
    width: windowWidht*0.95,
    borderRadius: 1,
    borderBottomWidth: 0.5,
    color:'#000000',
    borderColor: "rgba(0,0,0,0.5)",
    backgroundColor : "#FFFFFF",
    marginHorizontal: windowWidht*0.05,
    marginVertical : windowHeight*0.01
  },
  searchGroup:{
   alignItems : "center",
  },
  button:{
    marginHorizontal : windowWidht*0.05,
    marginTop : windowHeight*0.01,
    width: windowWidht*0.87,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'#1DA0E0',
    alignItems : "center",
  },
  button2:{
    marginHorizontal : windowWidht*0.05,
    marginTop : windowHeight*0.01,
    width: windowWidht*0.4,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'#1DA0E0',
    alignItems : "center",
  }
})