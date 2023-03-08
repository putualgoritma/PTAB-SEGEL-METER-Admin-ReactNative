import {ImageHeader,Images} from '../../assets'
import { TextInput } from 'react-native-gesture-handler';
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
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import { Btn, Txt,TxtArea,Title } from '../../component';
import Button from '../../component/Button';
import VideoPlayer from '../../component/Video';
import API from '../../service';
import { colors, Distance } from '../../utils';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import ScreenLoading from '../loading/ScreenLoading'
import MapView, { Callout, Marker } from 'react-native-maps';
import ImageMarker from "react-native-image-marker"
import Marker1 from 'react-native-image-marker';

const ButtonImage = (props) => {
  const [qty, setQty] = useState(1)
  const [show, setShow] = useState(true)
  const isFocused = useIsFocused();

  
  var myloop = [];
  for (let index = 0; index < qty; index++) {
      myloop.push(
          <View key={index} >
              <View style={{ marginVertical: 10, height: 200, alignItems: 'center' }}>
                  <Image
                      style={{ width: '90%', height: 200 }}
                      source={props.dataImage[index] == null ? require('../../assets/img/ImageFoto.png') : { uri: 'file://'+props.dataImage[index].uri }}
                  />
              </View>
              <View style={{ alignItems: 'center' }}>
                  <Button
                      // onPress={() => {props.Image(); props.dataImage ? setShow(false) : null}}
                      onPress={() => {
                        Alert.alert(
                          'Bukti Foto',
                          `Galery atau Camera? `,
                          [
                              {
                                  text: 'Galery',
                                  onPress: () => props.ImageGalery(props.dataImage[index] ? index: null)
                              },
                              {
                                  text: 'Camera',
                                  onPress: () => props.Image(props.dataImage[index] ? index: null)
                              }
                          ]
                      );
                          props.dataImage ? setShow(false) : null

                      }}
                      title="Ambil Foto"
                      width="80%"
                      backgroundColor='#1DA0E0'
                      icon={<FontAwesomeIcon icon={faCamera} color='#ffffff' />}
                  />
              </View>
              <Distance distanceV={5} />
              {/* {props.dataImage[index]==null &&
                  <View style={{alignItems : 'center'}}>
                      <Button
                          onPress={() => {props.Image(); props.dataImage ? setShow(false) : null}}
                          title="Ambil Foto"
                          width="80%"
                          backgroundColor='#1DA0E0'
                          icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                      />
                  </View>
              } */}
          </View>
      )
  }

  return (

      <View >

          {myloop}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginVertical: 10 }}>
              {(props.dataImage[qty - 1] != null) &&
                  <TouchableOpacity style={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.success, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => { setQty(qty + 1); setShow(true) }}>
                      <FontAwesomeIcon icon={faPlusCircle} size={20} color={'#FFFFFF'} />
                      <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Tambah</Text>
                  </TouchableOpacity>
              }
              <View style={{ marginHorizontal: 3 }} />
              <TouchableOpacity style={{ backgroundColor: colors.delete, flexDirection: 'row', paddingHorizontal: 10, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { qty > 1 ?  Alert.alert(
          'Peringatan',
          `Anda Yakin Menghapus Foto ? `,
          [
              {
                  text: 'Tidak',
                  // onPress : () => console.log('tidak')
              },
              {
                  text: 'Ya',
                  // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                  onPress: () =>
                  {
                    setQty(qty - 1)
                    props.deleteImage()
                  }

              }
            ]
        ) : alert('data tidak boleh dihapus'); }}>
                  <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
                  <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Delete </Text>
              </TouchableOpacity>
              <View style={{ marginHorizontal: 3 }} />
              <TouchableOpacity style={{ backgroundColor: colors.detail, flexDirection: 'row', paddingHorizontal: 10, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { setQty(1); props.resetImage() }}>
                  <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'} />
                  <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Reset</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}



const Seal = ({ navigation, route }) => {
  const [tesy,setTesy] = useState(null);
  const [search, setSearch] = useState('');
  const [page,setPage] = useState("1");
  const [img, setImg] = useState(null);
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [statusName, setStatusName] = useState('');
  const [currentPage, setCurrentPage] = useState([]);
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [lastPage, setLastPage] = useState([]);
  const [totalPage, settotalPage] = useState([]);
  const [todos, setTodos] = useState([{'id' : 'Segel','name' : 'Segel'},{'id' : 'Cabut','name' : 'Cabut'}])
 const [dataShow, setDataShow] = useState({'nomorrekening' : '', 'namapelanggan' : '', 'alamat' : '', 'idgol' : '',
'nomorhp' : '', 'tglentry' : '', 'wmnomor' : '', 'wmukuran' : ''
});
const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.4922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const [pag, setPag] = useState(1);
  const imageBg = require('../../assets/img/BackgroundInput.png')
  DropDownPicker.setListMode("SCROLLVIEW");
  const TOKEN = useSelector((state) => state.TokenReducer);
  const [checked, setChecked] = useState('customer');
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(null)
  const [listPayment,setListPayment] = useState([])
  const [totalPayment,setTotalPayment] = useState([])
  const [statusInput, setStatusInput] = useState(null)
  const [customers, setCustomers] = useState(null)
  const [selectVisibleCustomer, setSelectVisibleCustomer] = useState(false)
  var defaultLoc = {};
  const USER = useSelector((state) => state.UserReducer);
  const USER_ID = useSelector((state) => state.UserReducer.id);
  const formParams = route.params ? route.params.ticket : ''
  const [statusGps, setStatusGps] = useState('disabled')
  const [defcustomer_id, setDefcustomer_id] = useState('')
  // form
  const [form, setForm] = useState({
      customer_id: '',
      dapertement_id: USER.dapertement_id,
      memo : '',
      lat: '',
      lng: '',
      type : '',
      staff_id : USER_ID,
      todo : ''
  })

  const [image, setImage] = useState({
      name: null,
      filename: null,
      data: null
  })
  const [video, setVideo] = useState(null)
  const [response, setResponse] = useState(null)
  const [responses, setResponses] = useState([]);
  const isFocused = useIsFocused()
  const [actions, setActions] = useState([])

  const handleChecked = (key, value, cust) => {
      setChecked(cust)
      handleForm(key, value)
  }

  const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera Permission",
                message:
                    "needs access to your camera " +
                    "so you can take pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
        } else {
            console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

  useEffect(() => {

    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
  }).then(function (success) {
      Promise.all([requestLocationPermission()]).then((res) => {
          // console.log('corrrrrr',res);
          if(res){
          Geolocation.getCurrentPosition(
              (position) => {
                  // console.log('posisi',position);
                  // defaultLoc = {
                  //     latitude: position.coords.latitude,
                  //     longitude: position.coords.longitude,
                  // }
                  // positionNew = position
                  console.log('posisiisii ', (position.coords.latitude));
                  setForm({
                      ...form,
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  })
                //  alert(position.coords.latitude)
              },
              (error) => {
                  console.log(error);
                  setLoading(false)
              },
              { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, accuracy: 'high' },
          );
            }
            
      }).catch((e) => {
          console.log(e);
          setLoading(false)
      })
  }).catch((error) => {
      console.log(error.message); // error.message => "disabled"
      //   navigation.navigate('Register')
      setLoading(false)
  });
      // ShowDetail();
      actionStaffListsAPi();

      //    }
  }, [])


  const AddPag = (val)=>{
    console.log(pag);
    if(val === 0){
      if(currentPage > 1){
        console.log(previousPage)
        setLoading(true)
        API.customersSearch(USER_ID+'?page='+previousPage+'&status='+status+'&search='+search, TOKEN).then((result) => {
            // setStaffs(result.data)
            console.log('staff',result)
            console.log('staff1',result.message)
            console.log('staff2',result.data.current_page)
            setData(result.data.data)
            setCurrentPage(result.data.current_page)
            setLastPage(result.data.last_page)
            settotalPage(result.data.total)
            setPreviousPage(result.data.current_page-1)
            setNextPage(result.data.current_page+1)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
      }
      else{

      }
    }
    else{
      if(currentPage < lastPage){
        console.log('test',nextPage)
        setLoading(true)
        API.customersSearch(USER_ID+'?page='+nextPage+'&status='+status+'&search='+search,TOKEN).then((result) => {
            // setStaffs(result.data)
            console.log('staff',result)
            console.log('staff1',result.message)
            console.log('staff2',result.data.current_page)
            setData(result.data.data)
            setCurrentPage(result.data.current_page)
            setLastPage(result.data.last_page)
            settotalPage(result.data.total)
            setPreviousPage(result.data.current_page-1)
            setNextPage(result.data.current_page+1)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
      }
      else{
        // actionStaffListsAPi();
      }
    }

  }
  const actionStaffListsAPi = () => {
    console.log(String(pag))
    setLoading(true)
    API.customersSearch(USER_ID+'?page='+pag+'&status='+status+'&search='+search,TOKEN).then((result) => {
        // setStaffs(result.data)
        console.log('staff',result)
        console.log('staff1',result.message)
        console.log('staff2',result.data.current_page)
        setData(result.data.data)
        setCurrentPage(result.data.current_page)
        setLastPage(result.data.last_page)
        settotalPage(result.data.total)
        setPreviousPage(result.data.current_page-1)
        setNextPage(result.data.current_page+1)
        setLoading(false)
    }).catch((e) => {
        console.log(e.request);
        setLoading(false)
    })
}

const searchBy = () => {
  setPag(1);
  actionStaffListsAPi();
}


const ShowDetail = (customer_id) => {
  console.log(customer_id)
  setPage('2')
   setForm({
                    ...form,
                    customer_id: '',
                    dapertement_id: USER.dapertement_id,
                    memo : '',
                    type : '',
                    staff_id : USER_ID,
                    todo : ''})
  setResponses([])
  setLoading(true)
  API.sealShow(customer_id,TOKEN).then((result) => {
    if(result.status_paid_this_month === 1){
      alert('Tagihan Ini Sudah Lunas Tidak Perlu Lagi Melakukan Tindakan Segel')
      setPage('1');
    }
      setDataShow(result.data)
      setListPayment(result.data2)
      setTotalPayment(result.data3)   
      setStatusInput(result.data5.inputStatus)
      setForm({
        ...form,
        customer_id : result.data.nomorrekening
    })

    // //set actions
    // let arrAction = [];

    // for (let i = 1; i < 3; i++) {
    //   let objAction = {
    //   id: i,
    //   name: 'Hambatan Segel'+i
    //   };
    //   arrAction.push(objAction);
    //   }
      
    // setActions(arrAction)

    setActions(result.data6)

      setLoading(false)
  }).catch((e) => {
      console.log(e.request);
      setLoading(false)
  })
}
const handleForm = (key, value) => {
  setForm({
      ...form,
      [key] :value
  })
}

const handleProcess = () => {
  if(form.type !=''){
    setPage('3')
  }else{
  alert('Tindakan belum dipilih !')
  }
}

  const handleSearch = (value, name) => {
    if(value == "Cabut"){
      setStatus(4)
    }else{
      setStatus(2)
     }
      setStatusName(name)
      console.log('1', name);
  }


  const reset = () => {
    setStatus('');
    setSearch('');
    setTodos([{'id' : 'Segel','name' : 'Segel'},{'id' : 'Cabut','name' : 'Cabut'}]);
    setLoading(true)
    API.customersSearch(USER_ID+'?page=1'+'&status='+''+'&search='+'',TOKEN).then((result) => {
        // setStaffs(result.data)
        console.log('staff',result)
        console.log('staff1',result.message)
        console.log('staff2',result.data.current_page)
        setData(result.data.data)
        setCurrentPage(result.data.current_page)
        setLastPage(result.data.last_page)
        settotalPage(result.data.total)
        setPreviousPage(result.data.current_page-1)
        setNextPage(result.data.current_page+1)
        setLoading(false)
    }).catch((e) => {
        console.log(e.request);
        setLoading(false)
    })
  }
  // get image 


  const getImageGalery = (n) => {
      launchImageLibrary(
          {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 500,
              maxWidth: 500,
          },
          (response) => {
            if (response.assets) {
              if(n != null){
                  let dataImage = [...responses];
                 dataImage[n] = response.assets[0]
              // console.log('nn'+dataImage)
              setResponses(dataImage)
              //    alert('brha')
               
              }
              else{
              let dataImage = response.assets[0];
              setResponses([...responses, dataImage])
              // alert('gaga')
              }
          }
          }
      )
  }
  const [loading1, setLoading1] = useState(true);
  const [markResult, setMarkResult] = useState()
  const getImage = (n) => {
    requestCameraPermission()
    const date = new Date()
    const nm = date.getDate()+date.getMonth()+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds();
    launchCamera(
        {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 500,
            maxWidth: 500,
        },
        (response) => {
          if(response.assets){
      console.log("the path 00"+response.assets[0].base64)
const d = new Date()
Marker1.markText({
  src: response.assets[0],
  text: 'tanggal : '+ d+'  lng : '+form.lng +', '+'lat : '+form.lat, 
  // X: 30,
  // Y: 30, 
  color: '#FFFFFF', // '#ff0000aa' '#f0aa'
  fontName: 'Arial-BoldItalicMT',
  fontSize: 14,
  position : 'bottomCenter',
  textBackgroundStyle: {
        paddingX: 1,
        paddingY: 1,
      color: '#00000090' // '#0f0a'
  },
  scale: 1, 
  quality: 100,
  filename: nm.toString(),
  saveFormat: 'jpg',

}).then((res) => {
  console.log("the path is"+ res)
setTesy(res)
console.log('tesy' + tesy)
  
  // let result = FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
  let result = res[0]
  
  // launchImageLibraryAsync({
  //   // mediaTypes: res.MediaTypeOptions.Images,
  //   allowsEditing: true,
  //   aspect: [4, 4],
  //   quality: 1,
  //   base64:true
  // });


  console.log("the path 1"+ result)
  
  RNFS.readFile( res, 'base64').then(res1 => { 
    if(n != null){
      let dataImage = [...responses];
     dataImage[n] = {"filename":nm.toString(), 'base64' : res1, uri : res}
  console.log('nn'+dataImage)
  setResponses(dataImage)
  //    alert('brha')
   
  }
  else{
  let dataImage = {"filename":nm.toString(), 'base64' : res1, uri : res};
  console.log('nmm'+dataImage)
  setResponses([...responses, dataImage])
  // alert('gaga')
  }
    console.log('ddffff'+res)
    console.log('ddffff'+res1) });
  
   setLoading1(false)
  setMarkResult(res)
  
}).catch((err) => {
  console.log(err)
  setLoading1(false)
})
          }
          else{
            setLoading1(false)
          }


          
        }
    )
}


  const getVideo = () => {
      launchCamera(
          {
              mediaType: 'video',
              quality: 1,
              videoQuality: 'high'
              // includeBase64: true 
          },
          (response) => {
              if (response.assets) {
                  setVideo(response.assets[0]);
                  setForm({
                      ...form,
                      video: response.assets[0].fileName
                  })
                  // console.log(response.assets[0]);
              }
          })
  }
  const getVideoGalery = () => {
      launchImageLibrary(
          {
              mediaType: 'video',
              quality: 1,
              videoQuality: 'high'
          },
          (response) => {
              if (response.assets) {
                  setVideo(response.assets[0]);
                  setForm({
                      ...form,
                      video: response.assets[0].fileName
                  })
                  // console.log(response.assets[0]);
              }
          }
      )
  }


  const deleteImage = () => {
      if (responses.length > 1) {
                    const lastIndex = responses.length - 1;
                    setResponses(responses.filter((item, index) => index !== lastIndex));
                


         
      }
  }

  const resetImage = () => {
      if (responses.length > 0) {
          setResponses([]);
      }
  }


  const handleData = (position = null) => {
   
      console.log('formm', form);
      let dataUpload = [];
      let data = form;
      if (position != null) {
          data.lat = position.coords.latitude
          data.lng = position.coords.longitude
      }
      console.log('position', data.lat + ' ' + data.lng);

      let message = 'Mohon lengkapi data';
      let send = false;
      
      if (responses.length >0 && responses.length <= 5) {
          dataUpload =
              [
                  // name: image adalah nama properti dari api kita
                  {
                      name: 'qtyImage',
                      data: JSON.stringify(responses.length)
                  },
                  {
                      name: 'form',
                      data: JSON.stringify(form)
                  },
              ];
          send = true;

      }
      const date = new Date()
      const nm = date.getDate()+date.getMonth()+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds();
      let dataQtyImage = 1;
      for (let index = 0; index < responses.length; index++) {
          dataUpload.push(
              {
                  'name': 'image' + dataQtyImage,
                  'filename': responses[index].filename ? responses[index].filename : form.customer_id+dataQtyImage+nm.toString() ,
                  'data': responses[index].base64
              }
          )
          dataQtyImage++;
      }


      console.log('dataUpload',dataUpload)
      console.log('defcustomer_id',defcustomer_id)

      if (responses.length <= 1) {
        alert('Min upload 2 gambar')
        setLoading(false)
    }

      else if (video == null && responses.length >= 6) {
        alert('Max upload 5 gambar')
        setLoading(false)
    }
      else if (form.memo != '' && form.customer_id != '' && form.lat != '' && form.lng != '') {

      console.log('401')
         if (send) {
              setLoading(true)
              RNFetchBlob.fetch(
                  'POST',
                  'https://simpletabadmin.ptab-vps.com/api/close/staff/seal/store',
                  {
                      Authorization: `Bearer ${TOKEN}`,
                      otherHeader: 'foo',
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data',
                  },
                  dataUpload
                 ,
              ).then((result) => {
               
                if(result){
                  setLoading(false)
                  
                  let data = JSON.parse(result.data);
                  console.log('404')
                  console.log('data post12',data.data.id)
                  console.log('405')
                  console.log('data post',data)
                  console.log('406')
                  alert(data.message)
                  setPage('1')
                  navigation.navigate('HistoryCreate',{lock_id : data.data.id})
                }
                else{
                  console.log('412')
                }
                  // setForm({
                  //   ...form,
                  //   lat: formParams.lat ? formParams.lat : '',
                  //   lng: formParams.lng ? formParams.lng : '',
                  //   customer_id: '',
                  //   dapertement_id: USER.dapertement_id,
                  //   memo : '',
                  //   type : '',
                  //   staff_id : USER_ID,
                  //   todo : ''});
              }).catch((e) => {
                console.log('402')
                  //    console.log(e);
                  setLoading(false)
              })
          } else {
            console.log('403')
              // if (video != null && responses.length < 1) {
              //     message = 'mohon gambar diisi min 1'
              // }
              // if (video == null && responses.length <= 2) {
              //     message = 'Mohon isi gambar min 2 jika tidak tersedia video'
              // }
              if (video == null && responses.length >= 6) {
                  message = 'Max upload 5 gambar'
              }

              alert(message)
              setLoading(false)
          }
      } else {
          setLoading(false)
          alert('Mohon Lengkapi data')
      }
  }

  // action
  const handleAction = () => {

      // setLoading(true)
      if (statusGps != 'disabled') {
          handleData()
      } else {
          LocationServicesDialogBox.checkLocationServicesIsEnabled({
              message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
              ok: "YES",
              cancel: "NO",
          }).then(function (success) {
              setStatusGps(success.status)
              Promise.all([requestLocationPermission()]).then((res) => {
                  // console.log('corrrrrr',res);
                  if(res){
                  Geolocation.getCurrentPosition(
                      (position) => {
                          // console.log('posisi',position);
                          // defaultLoc = {
                          //     latitude: position.coords.latitude,
                          //     longitude: position.coords.longitude,
                          // }
                          // positionNew = position
                          console.log('posisiisii ', (position.coords.latitude));
                          setForm({
                              ...form,
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                          })
                          handleData(position)
                      },
                      (error) => {
                          console.log(error);
                          setLoading(false)
                      },
                      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, accuracy: 'high' },
                  );
                    }
                    
              }).catch((e) => {
                  console.log(e);
                  setLoading(false)
              })
          }).catch((error) => {
              console.log(error.message); // error.message => "disabled"
              //   navigation.navigate('Register')
              setStatusGps(error.message)
              setLoading(false)
          });
      }

      // alert(JSON.stringify(form))

  }

  const requestLocationPermission = async () => {
      let info = '';
      try {
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                  'title': 'Location Permission',
                  'message': 'MyMapApp needs access to your location'
              }
          )

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //   setEnableLocation(true)
          } else {
              //   setEnableLocation(false)
          }
      } catch (err) {
          info=1
      }
  }



  // real
  function toRupiah(amount){
    const rupiah = String(amount)
     .replace(/\B(?=(\d{3})+(?!\d))/g, '.')+',00';
     return rupiah;
   }

  function uploadImg(){
    const options = {};
   launchCamera(options, response=>{
      // console.log('hhh', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      }
      else if(response.assets[0].uri){
        setImg(response.assets[0])
        // console.log('hhh', img.fileName);
      }
    })
    
  }
  function addImage(){
let addAmount = 1;
    if(amount>1){
      console.log('berhasil');
    }
    if(amount<1){
      console.log('gagal');
    }
addAmount = addAmount+amount;
    
    console.log(amount);
    setAmount(addAmount)

  }

  function getUploadImage() {
    if(img !== null){
      return (
        <Image source={{uri : img.uri}} style={styles.icon}/>
      )
    }
    else{
      return (
      <Image source={Images} style={styles.icon}/>
      )
    }
  }
  return (
    <View style={styles.container}>
      
{page == "1" &&<View style={styles.content}>
<View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}><Text style={styles.label1H}>Meter Segel</Text></View>

<Txt title='Pilih Status:'/>

{loading &&
  <View style = {{borderColor: '#000000', borderWidth: 1, height:50,fontSize : 14,borderRadius:0, }}>
<Text style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>{statusName}</Text>
</View>
}


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
                                                handleSearch(data[0], data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleSearch(data[0], data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                      
                                        />
                                    } 
      <Text style={styles.label4}>No. SBG/Nama</Text>
      {loading &&
 <View style={styles.searchGroup}>
 <TextInput
  style={styles.search}
     placeholder="No. SBG/Nama"
     editable={false}
     value={search}
     onChangeText ={(value)=>  setSearch(value)}
 ></TextInput>
 <View style={{ flexDirection :"row" }}>
<TouchableOpacity style={styles.button2} disabled={true}>
   <Text style={styles.label2white}>Reset</Text>
 </TouchableOpacity>
 <TouchableOpacity style={styles.button2} disabled={true}>
   <Text style={styles.label2white}>Cari</Text>
 </TouchableOpacity>
</View>
</View>
      }
        {!loading &&
 <View style={styles.searchGroup}>
 <TextInput
  style={styles.search}
     placeholder="No. SBG/Nama"
     value={search}
     onChangeText ={(value)=>  setSearch(value)}
 ></TextInput>

<View style={{ flexDirection :"row" }}>
<TouchableOpacity style={styles.button2} onPress={()=> reset()}>
   <Text style={styles.label2white}>Reset</Text>
 </TouchableOpacity>
<TouchableOpacity style={styles.button2} onPress={()=> searchBy()}>
   <Text style={styles.label2white}>Cari</Text>
 </TouchableOpacity>
</View>
</View>
      }
     
      <ScrollView style={styles.data}>
        {loading &&
<ScreenLoading/>
        }
{!loading && data.map((item, key)=>{return<View key={key} style={styles.data1}>
  <View style={styles.col1}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>{key + 1+(10*(currentPage-1))}). {item.nomorrekening}</Text>
    <Text style={styles.label3}>{item.namapelanggan}</Text>
    <Text style={styles.label3}>{item.alamat}</Text>
    <Text style={styles.label3}>Jumlah Tunggakan : {item.jumlahtunggakan}</Text>
  </View>
  <View style={styles.col2}>
    <TouchableOpacity onPress={()=> ShowDetail(item.nomorrekening)}>
<Text>Buka <Icon name='chevron-forward-outline' size={12}/></Text>
</TouchableOpacity>
  </View>
</View>

})}
      </ScrollView>




{loading &&
  <View style ={styles.footer}> 
<View style={styles.paginate}>
<Text>{currentPage} of {lastPage} from {totalPage} data</Text>
<TouchableOpacity disabled={true}>
<Icon name='chevron-back-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
<TouchableOpacity disabled={true}>
<Icon name='chevron-forward-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
</View>
</View>
}
{!loading &&
  <View style ={styles.footer}> 
<View style={styles.paginate}>
<Text>{currentPage} of {lastPage} from {totalPage} data</Text>
<TouchableOpacity onPress={()=>AddPag(0)}>
<Icon name='chevron-back-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
<TouchableOpacity onPress={()=>AddPag(1)}>
<Icon name='chevron-forward-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
</View>
</View>
}


      </View>
    }

{page == "2" && <View style={styles.content}>
<View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}>
  <TouchableOpacity onPress={()=> setPage('1')}><Text style={{ color : "rgb(255,0,0)" }}><Icon name='chevron-back-outline' size={12} color = {"rgb(255,0,0)"}/>BACK</Text></TouchableOpacity>
  <Text style={styles.label1H}>Meter Segel</Text></View>
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

<ScrollView  style={styles.listSeal}  horizontal={true}>
<View>
<View style={styles.colomGroupH}>
  <View style = {styles.colom}><Text style={styles.label3}>Periode</Text></View>
  {/* <View style = {styles.colom}><Text style={styles.label3}>Tgl</Text></View>
  <View style = {styles.colom}><Text style={styles.label3}>M3</Text></View> */}
  <View style = {styles.colom}><Text style={styles.label3}>Wajib Dibayar</Text></View>
  {/* <View style = {styles.colom}><Text style={styles.label3}>Terbayar</Text></View>
  <View style = {styles.colom}><Text style={styles.label3}>Denda</Text></View> */}
  <View style = {styles.colom}><Text style={styles.label3}>Sisa</Text></View>
  
  </View>
  {listPayment.map((item, key)=>{
   return <View style={styles.colomGroup} key={key}>
  <View style = {styles.colom}><Text style={styles.label3}>{item.periode}</Text></View>
  {/* <View style = {styles.colom}><Text style={styles.label3}>{item.tanggal}</Text></View>
  <View style = {styles.colom}><Text style={styles.label3}>{item.m3}</Text></View> */}
  <View style = {styles.colom}><Text style={styles.label3}>Rp.{item.wajibdibaya != null && toRupiah(item.wajibdibayar)}</Text></View>
  {/* <View style = {styles.colom}><Text style={styles.label3}>Rp.{item.sudahdibayar != null && toRupiah(item.sudahdibayar)}</Text></View>
  <View style = {styles.colom}><Text style={styles.label3}>Rp.{item.denda != null && toRupiah(item.denda)}</Text></View> */}
  <View style = {styles.colom}><Text style={styles.label3}>Rp.{item.sisa != null && toRupiah(item.sisa)}</Text></View>
  </View>
  })
  }
  </View>

</ScrollView>
<View style={styles.totalPayment}>
<View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Tagihan Air</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    Rp.{totalPayment.tagihan != null && toRupiah(totalPayment.tagihan)}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Denda</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    Rp.{totalPayment.denda != null && toRupiah(totalPayment.denda)}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Total</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    Rp.{totalPayment.total != null && toRupiah(totalPayment.total)}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Tunggakan</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {totalPayment.tunggakan}</Text>
    </View>
  </View>
  </View>

  

</View>
  {/* <TouchableOpacity style={styles.button} onPress={()=>setPage('3')}>
          <Text style={styles.label2white}>Penyampaian Surat</Text>
        </TouchableOpacity> */}
        

        <View style = {{ height : 300 }}>
     
      
 <MapView style ={{ flex : 1 }} //window pake Dimensions
      region={{
         latitude: dataShow.lat ? dataShow.lat : -8.459556,
         longitude: dataShow.lng ? dataShow.lng : 115.046600,
         latitudeDelta: 0.005,
         longitudeDelta: 0.005
      }} >
 <Marker

 coordinate={{
   latitude: dataShow.lat ? dataShow.lat : 0.000000,
   longitude: dataShow.lng ? dataShow.lng : 0.000000,
}}
 onPress={() => console.log('berhasil')}
// draggable
>
  

 <Callout style={styles.plainView}>
   <View>
     <Text>{dataShow.nomorrekening}-{dataShow.namapelanggan}</Text>
   </View>
 </Callout>
</Marker>
     
   </MapView>
   
   </View>

   <View style={styles.formGroup}>
  <View style={styles.formField}>
  <Select2
                                        
                                        searchPlaceHolderText='Pilih Tindakan'
                                        title='Pilih Tindakan'
                                        
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
                                        data={actions}
                                        onSelect={data => {
                                          handleForm('type', data[0])
                                        }}
                                        onRemoveItem={data => {
                                          handleForm('type', data[0])
                                        }} 
                                        selectButtonText ='Simpan'
                                        cancelButtonText='Batal'
                                  
                                    />
</View>
  </View>


          {/* <View style = {{borderColor: '#000000', borderWidth: 1, height:50,fontSize : 14,borderRadius:0, }}>
          {form.type == 'notice' &&
<View>
<Text  style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Penyampaian Surat</Text>
</View>
  }
  {form.type == 'lock' &&
<View>
<Text  style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Penyegelan</Text>
</View>
  }
   {form.type == 'notice2' &&
<View>
<Text  style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Kunjungan</Text>
</View>
  }
   {form.type == 'unplug' &&
<View>
<Text  style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Cabutan</Text>
</View>
  }
</View> */}

{statusInput == "sudah" &&
  <TouchableOpacity style={styles.buttonRed} disabled={true}>
  <Text style={styles.label2white}>Sudah Diinput</Text>
</TouchableOpacity>
}
{statusInput != "sudah" &&
 <TouchableOpacity style={styles.button} onPress={()=>handleProcess()}>
 <Text style={styles.label2white}>PROSES</Text>
</TouchableOpacity>
}
       

        <Text style={ [styles.label3,{fontWeight:"bold", textAlign :"center"}]}>Operator : {USER.name}</Text>        
        <TouchableOpacity style={styles.button} onPress={()=>setPage('1')}>
          <Text style={styles.label2white}>BATAL</Text>
        </TouchableOpacity>
        </View>
}
      </ScrollView>

      
      </View>
    }


{/* {page == "4" && <View style={styles.content}>
<View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}>
  <TouchableOpacity onPress={()=> setPage('2')}><Text style={{ color : "rgb(255,0,0)" }}><Icon name='chevron-back-outline' size={12} color = {"rgb(255,0,0)"}/>BACK</Text></TouchableOpacity>
  <Text style={styles.label1H}>Meter Segel</Text></View>
  <View style={styles.top}>
      <Text style={[styles.label4, {textAlign:"center"}]}>{new Date().toLocaleString()}</Text>
      </View>
      <View style={styles.top}>
      <Text style={styles.label1}>PERUMDA TIRTA AMERTHA BUANA TABANAN</Text>
      </View>
      <View style={styles.top}>
      <Text style={{  fontSize: 16, color : "#000000", fontWeight : "bold" }}>Data Pelanggan</Text>
      </View>
      <ScrollView style={styles.formData}>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>No. SBG</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    45582</Text>
    </View>
  </View>
  
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Nama</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    I MADE SUARTA</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Alamat</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    PERUM PERDANA LESTARI 2</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Golongan</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    C6</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>No Telp</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    08123456789</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Tgl Pasang</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    2012-01-09</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>No. WM</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    080416141</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Diameter WM</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    111</Text>
    </View>
  </View>
  </View>

      </ScrollView>
<Text style ={styles.label1}>Penyampaian Surat</Text>
<View style={{ flexDirection : "row" }}>
      <Image source={Images} style={styles.imageSend}/>
      <Image source={Images} style={styles.imageSend}/>
      </View>
      </View>
    } */}

{page == "3" && 
<View style={styles.content}>
<View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}>
  <TouchableOpacity onPress={()=> setPage('2')}><Text style={{ color : "rgb(255,0,0)" }}><Icon name='chevron-back-outline' size={12} color = {"rgb(255,0,0)"}/>BACK</Text></TouchableOpacity>
  <Text style={styles.label1H}>Meter Segel</Text></View>
  {loading &&
<ScreenLoading/>
        }
        {!loading &&

                <ScrollView style={styles.scrollV}>
                    {/* <HeaderInput /> */}
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: '100%' }}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                <Title title='Tambah Tindakan' paddingVertical={5}/>
                                <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi' onChangeText={item => handleForm('memo', item)} />   

                                    {/* <Title title='Tambah Tiket' paddingVertical={5} /> */}
                                    <Txt title='Ambil Gambar' />
                                    <ButtonImage tesy ={tesy} Image={getImage} ImageGalery={getImageGalery} dataImage={responses} deleteImage={() => deleteImage()} resetImage={() => resetImage()} />


                                    {/* <Txt title='Ambil Video' />
                                    <View style={{ paddingVertical: 10, height: 220 }}>
                                        {video == null && (
                                            <View style={{ alignItems: 'center' }}>
                                                <Image source={require('../../assets/img/ImageVideo.png')} style={{ width: '90%', height: 150 }} />
                                            </View>
                                        )}
                                        {video && (
                                            <VideoPlayer
                                                src={{ uri: video.uri }}
                                            />

                                        )}
                                    </View> */}


                                    {/* <View style={{ alignItems: 'center' }}>
                                        <Button
                                            title="Ambil Video"
                                            width="80%"
                                            backgroundColor='#1DA0E0'
                                            icon={<FontAwesomeIcon icon={faVideo} color='#ffffff' />}
                                            onPress={() => (
                                                Alert.alert(
                                                    'Peringatan',
                                                    `Video tidak boleh lebih besar dari 5mb ! `,
                                                    [
                                                        {
                                                            text: 'Tidak',
                                                            // onPress : () => console.log('tidak')
                                                        },
                                                        {
                                                            text: 'Ya',
                                                            // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                                                            onPress: () =>

                                                                launchCamera(
                                                                    {
                                                                        mediaType: 'video',
                                                                        quality: 1,
                                                                        videoQuality: 'high'
                                                                        // includeBase64: true 
                                                                    },
                                                                    (response) => {
                                                                        if (response.assets) {
                                                                            setVideo(response.assets[0]);
                                                                            setForm({
                                                                                ...form,
                                                                                video: response.assets[0].fileName
                                                                            })
                                                                            // console.log(response.assets[0]);
                                                                        }
                                                                    })

                                                            // Alert.alert(
                                                            //     'Bukti Video',
                                                            //     `Galery atau Camera? `,
                                                            //     [
                                                            //         {
                                                            //             text : 'Galery',
                                                            //             onPress : () => getVideoGalery()
                                                            //         },
                                                            //         {
                                                            //             text : 'Camera',
                                                            //             onPress : () => getVideo()
                                                            //         }
                                                            //     ]
                                                            // )
                                                        }
                                                    ]
                                                )
                                            )}
                                        />
                                    </View> */}



                                    <View style={{ alignItems: 'center' }}>
                                        <Distance distanceV={10} />
                                        <Btn title='Simpan' onPress={handleAction} />
                                        {/* <Btn title='Simpan' onPress={()=>alert(JSON.stringify(form))} /> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                
        }
        </View>
      
    }

      </View>
 
  )
}

export default Seal


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
    height : windowHeight*0.75,
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