import {ImageHeader,Images} from '../../../assets'
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import { faCamera, faVideo, faPlusCircle, faTrash, faUndo,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, ScrollView, StyleSheet, View, Image, Text,Dimensions, TouchableOpacity } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import Button from '../../../component/Button';
import API from '../../../service';
import { colors, Distance } from '../../../utils';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import ScreenLoading from '../../loading/ScreenLoading'
import Select2 from 'react-native-select-two';
import { Txt, TxtArea } from '../../../component';



const Approve = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [page,setPage] = useState("1");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState([]);
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [lastPage, setLastPage] = useState([]);
  const [totalPage, settotalPage] = useState([]);
  const [todos, setTodos] = useState([{'id' : '2','name' : 'Medium'},{'id' : '3','name' : 'High'}])

 const [dataShow, setDataShow] = useState({'nomorrekening' : '', 'namapelanggan' : '', 'alamat' : '', 'idgol' : '',
'nomorhp' : '', 'tglentry' : '', 'wmnomor' : '', 'wmukuran' : ''
});
const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.4922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const [pag, setPag] = useState(1);
  DropDownPicker.setListMode("SCROLLVIEW");
  const TOKEN = useSelector((state) => state.TokenReducer);
  const [loading, setLoading] = useState(true)

  const [statusInput, setStatusInput] = useState(null)

  var defaultLoc = {};
  const USER = useSelector((state) => state.UserReducer);
  const USER_ID = useSelector((state) => state.UserReducer.id);
  const id = route.params.id;

  // form
  const [form, setForm] = useState({
      id : route.params.id,
      memo : route.params.memo,
      subdapertement_id : '', 
      priority : route.params.priority
  })

  // check priority
  const handleForm1 = (id) => {
    let newArray = [...todos];
    let oldArray = [];
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].checked = false
      console.log(i)
    }
    console.log(newArray)
    newArray[id - 2].checked = true
    console.log(newArray);
    setTodos(
      newArray);
    // setStatusSM(newArray[id - 1].value)
    console.log('llll', todos);
  }

  useEffect(() => {
      if(isFocused){

        handleForm1(route.params.priority)
      console.log('test')
      // ShowDetail();
      // requestLocationPermission()
      ShowDetail(id)
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
          ok: "YES",
          cancel: "NO",
      })
         }
  }, [isFocused])

const ShowDetail = (id) => {
  console.log(id)
  setLoading(true)
  API.approveWm(id,TOKEN).then((result) => {
    console.log(result.data)
      setDataShow(result.data)
      setForm({...form, subdapertement_id : result.subdapertement})
      setLoading(false)
  }).catch((e) => {
      console.log(e.request);
      setLoading(false)
  })
}

const handlerActionA = () =>{
  Alert.alert('Usulan Disetujui', 'Anda Yakin ?',
  [
    {
        text: 'Yakin',
        onPress: () => {  
          if(form.priority != "" && form.id != "" && form.memo != "")
        {
           setLoading(true)
      let data={
priority : form.priority,
id : form.id,
subdapertement_id : form.subdapertement_id,
memo : form.memo,
status : "active"
      }
        
        API.approveProses(data, TOKEN).then((result)=>{
          navigation.goBack()
          setLoading(false)
            if(result.message.constructor === Array){
                alert( result.message.toString())
            }else{
                alert(result.message)
                actionStaffListsAPi();
            }
            
          
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })

      
      }
      else{
        alert("lengkapi data terlebih dahulu")
      }
      }
    },
    {
        text: 'Tidak',
    }
]
  )
}

const handlerActionR = () =>{
  Alert.alert('Usulan Disetujui', 'Anda Yakin ?',
  [
    {
        text: 'Yakin',
        onPress: () => {  
          let data={
            id : form.id,
            status : "reject",
            subdapertement_id : form.subdapertement_id,
                  }
           setLoading(true)
      
           
        
        API.approveProses(data, TOKEN).then((result)=>{
          navigation.goBack()
            if(result.message.constructor === Array){
                alert( result.message.toString())
            }else{
                alert(result.message)
                actionStaffListsAPi();
            }
            setLoading(false)
          
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })

      
      
      }
    },
    {
        text: 'Tidak',
    }
]
  )
}

const handleSearch = (value) => {
    setForm({...form, priority : value})
 
    console.log('1', value);
    console.log(todos);
}

  return (
    <View style={styles.container}>
<View style={styles.content}>
  <View style={styles.top}>
      <Text style={[styles.label4, {textAlign:"center"}]}>{new Date().getDate() + "-"+ parseInt(new Date().getMonth()+1) +"-"+new Date().getFullYear()}</Text>
      </View>
      <View style={styles.top}>
      <Text style={styles.label1}>PERUMDA TIRTA AMERTHA BUANA TABANAN</Text>
      </View>
      <View style={styles.top}>
      <Text style={{  fontSize: 16, color : "#000000", fontWeight : "bold" }}>Data Pelanggan</Text>
      </View>
      <ScrollView style={styles.formData}>
{loading &&
<ScreenLoading/>
}
{!loading &&
<View>
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
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Status WM</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.status_wm}</Text>
    </View>
  </View>
  </View>


  <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi' value = {form.memo} onChangeText={item => setForm({...form, memo : item})} />   
                                    <Txt title='Pilih Prioritas'/>
  {!loading && todos && 
                                        <Select2
                                        
                                            searchPlaceHolderText='Cari Status'
                                            title='Status'
                                            
                                            isSelectSingle
                                            style={{  
                                                borderRadius: 0,
                                                borderColor: '#000000',
                                                borderWidth: 1,
                                                height:50
                                            }}
                                            buttonStyle={{ 
                                                backgroundColor:'#0C5CBF',
                                                height:45,
                                                borderRadius:0
                                            }}
                                            buttonTextStyle={{
                                                color:'#FFFFFF'                                        
                                            }}
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Pilih Status'
                                            data={todos}
                                            onSelect={data => {
                                                handleSearch(data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleSearch(data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                      
                                        />
                                    } 

<TouchableOpacity style={styles.button} onPress={()=>handlerActionA()}>
 <Text style={styles.label2white}>Setuju</Text>
</TouchableOpacity>

  <TouchableOpacity   style={[styles.button,{backgroundColor : '#ff0000'}]} onPress={()=>handlerActionR()} >
 <Text style={styles.label2white}>Tolak</Text>
</TouchableOpacity>     

        <Text style={ [styles.label3,{fontWeight:"bold", textAlign :"center"}]}>Operator : {USER.name}</Text>  
              
        <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
          <Text style={styles.label2white}>BATAL</Text>
        </TouchableOpacity>
        </View>
}
      </ScrollView>

      
      </View>


      </View>
 
  )
}

export default Approve


const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;

const styles = StyleSheet.create({
  listSeal : {
    marginHorizontal : windowWidht*0.0,
   
width : windowWidht*0.9,
    // height : windowHeight*0.1,
    // backgroundColor : "blue",
  },
  colom : {
width : windowWidht*0.3,
borderWidth : 1,
  },
  colomGroup : {
    width : windowWidht*0.9,
    flexDirection : "row",
      },
      colomGroupH : {
        width : windowWidht*0.9,
        flexDirection : "row",
        backgroundColor: '#F0F8FF',
          },
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
    scrollV:{

height : windowHeight*0.89
    },
  container:
  {
    flex: 1,

  },
  formField:{
flexDirection : "row",
paddingVertical : windowHeight*0.015,
  },
  data : {
    marginTop : windowHeight*0.02,
    width: windowWidht*0.95,
    marginHorizontal : windowWidht*0.005,
    height : windowHeight*0.52,
    backgroundColor : '#FFFFFF',
  },
  top : {
    marginTop : windowHeight*0.01,
  },

  formData : {
    marginTop : windowHeight*0.02,
    width: windowWidht*0.95,
    marginHorizontal : windowWidht*0.005,
    height : windowHeight*0.70,
    backgroundColor : '#FFFFFF',
  },
  data1 : {
    flexDirection : "row",
   marginHorizontal : windowWidht*0.05,
    width :windowWidht*0.9,
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
    width :windowWidht*0.14,
  },

  col21 : {
    width :windowWidht*0.3,
  },
  col22 : {
    width :windowWidht*0.645,
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
    width: windowHeight*0.36,
    height:  windowHeight*0.36,
    marginRight:10,
    borderRadius : 150/2,
    marginTop:windowHeight*0.01,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  
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
    marginHorizontal : windowWidht*0.01,
    marginTop : windowHeight*0.01,
    width: windowWidht*0.95,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'#1DA0E0',
    alignItems : "center",
  },
  buttonRed:{
    marginHorizontal : windowWidht*0.01,
    marginTop : windowHeight*0.01,
    width: windowWidht*0.95,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'red',
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
  },
})