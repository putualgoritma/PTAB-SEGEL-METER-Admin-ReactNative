import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import { faCamera, faVideo, faPlusCircle, faTrash, faUndo,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, ScrollView, StyleSheet, View, Image, Text,Dimensions, TouchableOpacity, TextInput } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { Btn, Txt,TxtArea,Title } from '../../component';
import Button from '../../component/Button';
import API from '../../service';
import { colors, Distance } from '../../utils';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import ScreenLoading from '../loading/ScreenLoading'
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
           {console.log('ggfggg', qty)}
              {(props.dataImage[qty - 1] != null) && qty < 2 &&
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



const Reject = ({ navigation, route }) => {
 console.log(route.params.id)

  DropDownPicker.setListMode("SCROLLVIEW");
  const TOKEN = useSelector((state) => state.TokenReducer);
  const [loading, setLoading] = useState(true)
  const [loading1, setLoading1] = useState(true)
  var defaultLoc = {};
  const USER = useSelector((state) => state.UserReducer);
  const USER_ID = useSelector((state) => state.UserReducer.id);
  // const formParams = route.params ? route.params.ticket : ''
  const [statusGps, setStatusGps] = useState('disabled')
  const [defcustomer_id, setDefcustomer_id] = useState('')
  // form
  const [form, setForm] = useState({
      // lat: formParams.lat ? formParams.lat : '',
      // lng: formParams.lng ? formParams.lng : '',
      // customer_id: '',
      // dapertement_id: USER.dapertement_id,
      id : route.params.id,
      status : 'reject',
      memo : '',
      lat : '',
      lng : '',
  })

  const [image, setImage] = useState({
      name: null,
      filename: null,
      data: null
  })
  const [responsesDone, setResponsesDone] = useState([]);
  const isFocused = useIsFocused()



//   const requestCameraPermission = async () => {
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             {
//                 title: "Camera Permission",
//                 message:
//                     "needs access to your camera " +
//                     "so you can take pictures.",
//                 buttonNeutral: "Ask Me Later",
//                 buttonNegative: "Cancel",
//                 buttonPositive: "OK"
//             }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log("You can use the camera");
//         } else {
//             console.log("Camera permission denied");
//         }
//     } catch (err) {
//         console.warn(err);
//     }
// };

  useEffect(() => {
    requestLocationPermission()
      // if(isFocused){
      console.log('test')
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
    }).then(function (success) {
       
        setStatusGps(success.status)
        // Promise.all([API.categories(TOKEN), API.defcustomer(TOKEN), requestLocationPermission()]).then((res) => {
            // console.log('corrrrrr', res);
            // setCategories(res[0].data)
            // setDefcustomer_id(res[1].data)
            Geolocation.getCurrentPosition(
                (position) => {
                    // console.log('posisi',position);
                    defaultLoc = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                    // positionNew = position
                    console.log('posisiisii ', (position.coords.latitude));
                    setForm({
                        ...form,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    setLoading(false)
                },
                (error) => {
                  alert(error.message)
                    console.log(error);
                    setLoading(false)
                },
                { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, accuracy: 'high' },
            );
        // }).catch((e) => {
        //     // console.log(e);
        //     setLoading(false)
        // })
    }).catch((error) => {
  
        API.categories(TOKEN).then((result) => {
            setCategories(result.data)
        }).catch(e => {
            alert('categories error')
            console.log(e);
        }).finally(f => { setStatusGps(error.message); setLoading(false) })
    });
  }, [])

const handleForm = (key, value) => {
  setForm({
      ...form,
      [key] :value
  })
}


  // get image 
  const [loading2, setLoading2] = useState(false);
  const [markResult, setMarkResult] = useState()

// foto alat start
const getImageGaleryDone = (n) => {
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
              let dataImage = [...responsesDone];
             dataImage[n] = response.assets[0]
          // console.log('nn'+dataImage)
          setResponsesDone(dataImage)
          //    alert('brha')
           
          }
          else{
          let dataImage = response.assets[0];
          setResponsesDone([...responsesDone, dataImage])
          // alert('gaga')
          }
      }
      }
  )
}

const getImageDone = (n) => {
let date = new Date();
const nm = 'doneimage'+form.id+date.getHours()+date.getMinutes()+date.getSeconds();
setLoading2(true)
launchCamera(
    {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 500,
        maxWidth: 500,
    },
    (response) => {
      console.log('hfcdxd',response);
if(response.assets){
// const d = new Date()
Marker1.markText({
src: response.assets[0],
text: 'tanggal : '+ date+'  lng : '+form.lng +', '+'lat : '+form.lat, 
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
// console.log("the path is"+ res)


// let result = FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
// let result = res[0]

// launchImageLibraryAsync({
//   // mediaTypes: res.MediaTypeOptions.Images,
//   allowsEditing: true,
//   aspect: [4, 4],
//   quality: 1,
//   base64:true
// });


// console.log("the path 1"+ result)

RNFS.readFile( res, 'base64').then(res1 => { 
if(n != null){
  let dataImage = [...responsesDone];
 dataImage[n] = {"filename":nm.toString(), 'base64' : res1, uri : res}
// console.log('nn'+dataImage)
setResponsesDone(dataImage)
//    alert('brha')

}
else{
let dataImage = {"filename":nm.toString(), 'base64' : res1, uri : res};
// console.log('nmm'+dataImage)
setResponsesDone([...responsesDone, dataImage])
// alert('gaga')
}
// console.log('ddffff'+res)
// console.log('ddffff'+res1)
});

// setMarkResult(res)
setLoading2(false)


}).catch((err) => {
console.log(err)
setLoading2(false)
})
      }

      else{
        setLoading2(false)
      }


      
    }
)
}


  const deleteImage = () => {
    


         
      
  }

  const resetImage = () => {
  
  }


  const handleData = (position = null) => {
    setLoading(true);
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
      
      if (responsesDone.length >0 && responsesDone.length <= 5) {
        dataUpload =
            [
                // name: image adalah nama properti dari api kita
                {
                  name: 'qtyImageDone',
                  data: JSON.stringify(responsesDone.length)
              },
                {
                    name: 'form',
                    data: JSON.stringify(form)
                },
            ];
        send = true;

    }


    let date = new Date();
      let dataQtyImageDone = 1;
      for (let index = 0; index < responsesDone.length; index++) {
          dataUpload.push(
              {
                  'name': 'imageDone' + dataQtyImageDone,
                  'filename': 'doneimage'+form.id+date.getHours()+date.getMinutes()+date.getSeconds()+dataQtyImageDone,
                  'data': responsesDone[index].base64
              }
          )
          dataQtyImageDone++;
      }

      console.log('dataUpload',dataUpload)
      console.log('defcustomer_id',defcustomer_id)

      if (form.memo != '') {
      
         if (send) {
              setLoading(true)
              RNFetchBlob.fetch(
                  'POST',
                  'https://simpletabadmin.ptab-vps.com/api/close/staff/watermeter/actionWmdoneImageUpdate',
                  {
                      Authorization: `Bearer ${TOKEN}`,
                      otherHeader: 'foo',
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data',
                  },
                  dataUpload
                 ,
              ).then((result) => {
                  setLoading(false)
                  let data = JSON.parse(result.data);
                  // console.log('data post12',data.data.id)
                  console.log('data post',data)
                  alert(data.message)
                  navigation.pop(2)
                  // setPage('1')
                  // navigation.navigate('HistoryCreate',{lock_id : data.data.id})
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
                  //    console.log(e);
                  alert(e)
                  setLoading(false)
              })
          } else {

              if (responsesDone.length > 1) {
                  message = 'Max upload 1 gambar per pekerjaan'
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
                  Geolocation.getCurrentPosition(
                      (position) => {
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
              }).catch((e) => {
                alert(error.message)
                  console.log(e);
                  setLoading(false)
              })
          }).catch((error) => {
              //   navigation.navigate('Register')
              setStatusGps(error.message)
              setLoading(false)
          });
      }

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
          info = 1
      }
  }

  
  return (
 
    <View style={styles.container}>
        
{/* <View style={styles.content}> */}
{/* <View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}>
  <Text style={styles.label1H}>Pergantian WM</Text></View> */}
 
        {/* {loading && */}
   {/* <View style={{ flex : 1 }}> */}
   {loading &&
   <ScreenLoading/>

   }
   {!loading &&
                <ScrollView style={styles.scrollV}>
                    {/* <HeaderInput /> */}
                    <View style={{ alignItems: 'center', marginHorizontal : windowWidht*0.05, }}>
                        <View style={{ width: '100%' }}>
                            <View style={styles.baseBoxShadow} >
                             

                                 
                                    <View style={styles.boxShadow} >
                                <Title title={route.params.category} paddingVertical={5}/>
                                <Txt title='memo'/>
                                    <TxtArea placeholder='Masukan memo' onChangeText={item => handleForm('memo', item)} />   

                                  
                                    <Txt title='Ambil Gambar Selesai'/>
                                    {/* {loading2 &&
                              <View style={{ marginVertical: 10, height: 200, alignItems: 'center' }}>
                              <Image
                                  style={{ width: '90%', height: 200 }}
                                  source={require('../../assets/img/ImageLoading.gif')}
                              />
                          </View>
}
{!loading2 && */}
                                    <ButtonImage Image={getImageDone} ImageGalery={getImageGaleryDone} dataImage={responsesDone} deleteImage={() => deleteImage()} resetImage={() => resetImage()} />

                                      </View>
                                  
                          
                                
                            </View>
                        </View>
                    </View>
                </ScrollView>
                }

                {loading2 &&
                          <View style={{ alignItems: 'center', marginBottom : 5 }}>
                          <Distance distanceV={10} />
                          <Btn title='Simpan' onPress={console.log('tool')} />
                      </View>
}
  {!loading2 && !loading &&
                          <View style={{ alignItems: 'center', marginBottom : 5 }}>
                          <Distance distanceV={10} />
                          <Btn title='Simpan' onPress={handleAction} />
                      </View>
}
                       {/* </View> */}
                
        {/* } */}
        {/* </View> */}

      </View>
      
 
  )
}

export default Reject


const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;

const styles = StyleSheet.create({
  listSeal : {
    marginHorizontal : windowWidht*0.0,
    width : windowWidht*0.9,
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
      // marginHorizontal : windowWidht*0.05,
// height : windowHeight*0.6
    },
  container:
  {
    flex: 1,
    // marginHorizontal : windowWidht*0.05,

  },
  formField:{
flexDirection : "row",
paddingVertical : windowHeight*0.015,
  },
  data : {
    marginTop : windowHeight*0.02,
    width: windowWidht*0.95,
    marginHorizontal : windowWidht*0.003,
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