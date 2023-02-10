

import {ImageHeader,Images,logo512,history, mapping,lock} from '../../assets'

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text,TextInput, ImageBackground, Dimensions, Image,Pressable, TouchableOpacity,Modal, BackHandler, Alert, StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useDispatch } from 'react-redux';
import { Header, In, Inpt, Spinner, Txt } from '../../component';
import { SET_DATA_PERMISSION, SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
import API from '../../service';
import { Distance } from '../../utils';
import { useIsFocused } from '@react-navigation/native';
import ScreenLoading from '../loading/ScreenLoading';
// const date = new Date();

// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds();
// const time = hours+':'+minutes+':'+seconds;
const Login = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
      email : null,
      password : null,
      _id_onesignal : null
  })
  const [loading, setLoading]= useState(true)
  
  useEffect(() => {
      if(isFocused){
         signupOnesignal().then((result) => {
              // alert(result);
              console.log('update onesignal',result);
              setForm({...form, _id_onesignal : result})
              setLoading(false)
         }).catch(e => {
             console.log(e);
              alert(e)
             setLoading(false)
         }) 
      }

      return () => {
         setForm({
             password : null,
             _id_onesignal : null,
             email : null
         })
      }
  }, [isFocused])

  const signupOnesignal = async () => {
    OneSignal.setAppId("282dff1a-c5b2-4c3d-81dd-9e0c2b82114b")
    OneSignal.setLogLevel(6, 0)
    OneSignal.setRequiresUserPrivacyConsent(false)
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response)
    })
  
      try {
        console.log('THE RESPONSE AS BELOW')
            // dispatch(token_api_one_signal(device['userId']))
      const device = await OneSignal.getDeviceState();
      console.log('test9 '+device.userId);
      return device.userId;
      } catch (e) {
        console.log(e)
      }
 
  }

  const storeDataUser = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@LocalUser', jsonValue)
      } catch (e) {
        console.log('no save')
      }
  }

  const storeDataToken = async (value) => {
      try {
        await AsyncStorage.setItem('@LocalToken', value)
      } catch (e) {
        console.log('TOken not Save ')
      }
  }

  const storeDataPermission = async (value) => {
      try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@LocalPermission', jsonValue)
      } catch (e) {
      console.log('no save', e)
      }
  }

  const handleAction =  () => {

      setLoading(true)
      const user  ={
          email : form.email,
          password : form.password,
          _id_onesignal : form._id_onesignal
      }
      
      console.log('1'+form.email+"2"+form._id_onesignal);
      
      if(!user._id_onesignal){
          signupOnesignal().then((result) => {
              // alert(result);
              console.log('val1');
              console.log('update onesignal',result);
              user._id_onesignal =  result
              if(user._id_onesignal){
                console.log('val2');
                  handleLogin(user);
              }
              else{
                const user  ={
                  email : form.email,
                  password : form.password,
                  _id_onesignal : form._id_onesignal
              }
                handleLogin(user);
              }
          }).catch(e => {
            console.log('val3');
              handleLogin(user)
              console.log(e);
          }) 
      }else{
        console.log('val4');
          handleLogin(user)
      }
      console.log('val5');
     
  }

  const handleLogin = (user) => {
    console.log('testing12');
      if(user.email != null && user.password !=null && user._id_onesignal ){
        console.log('API');
          API.login(user).then((result) => {
              if(result.success){
                  result.data['password'] = result.password;
                  console.log('password');
                  // dispatch(SET_DATA_USER(result.data))
                  // dispatch(SET_DATA_TOKEN(result.token))
                  // dispatch(SET_DATA_PERMISSION(result.permission))
                  // storeDataToken(result.token)
                  // storeDataUser(result.data)
                  // storeDataPermission(result.permission)
                  // navigation.replace('Home')
                  Promise.all([storeDataPermission(result.permission),storeDataUser(result.data),storeDataToken(result.token)]).then((success)=>{
                      dispatch(SET_DATA_USER(result.data))
                      dispatch(SET_DATA_TOKEN(result.token))
                      dispatch(SET_DATA_PERMISSION(result.permission))
                      navigation.replace('MainApp')
                  }).catch(e => console.log(e)).finally(f => setLoading(false))
              }else{
                  alert(result.message)
                  setLoading(false)
              }
          });
      }else{
          alert('mohon lengkapi data')
      }
  }

  return (
    <View style={styles.container} >
    {loading &&
<ScreenLoading/>
}
{!loading &&
      <ImageBackground style={[{alignItems : "center", },styles.imgBg]} source={ImageHeader}>
      <Text style={styles.labelTitle}></Text>
      <Text style={styles.label3white}></Text>
      <View><Image source={logo512} style={styles.images}/></View>
      <Text style={[styles.label1, {color : "#FFFFFF"}]}>Login</Text>
<View style={styles.floatingScreen}>

  <Text style={styles.label3}>Nama/Mobile</Text>

    

    
    <TextInput style={styles.formInput} placeholder='Masukan Email' onChangeText={(item) => setForm({...form, email : item})} />

<Text style={styles.label3}>Kata Sandi</Text>

<TextInput style={styles.formInput} placeholder='Masukan Password' secureTextEntry={true}  onChangeText={(item) =>  setForm({...form, password : item})}  />
                         
</View>
<TouchableOpacity style = {styles.button} onPress={()=> handleAction()}>
    <Text style={[styles.label2,{color : "#FFFFFF"}]}>Masuk</Text>
</TouchableOpacity>
      </ImageBackground>

}
      </View>


  
  )
}

export default Login

const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;

const styles = StyleSheet.create({

    formInput : {
borderBottomWidth : 1,
width : windowWidht*0.8,
borderBottomColor : "grey",
marginHorizontal : windowWidht*0.04,
    },
    imgBg:{
height : windowHeight*0.4
    },
  container:
  {
    flex: 1,
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
    height:  windowWidht*0.4,
    borderRadius: 6,
    alignItems : "center",
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
    fontSize: 35,
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
    height:  windowWidht*0.3,
    width: windowWidht*0.3,
    marginTop : windowWidht*0.05,
    marginHorizontal : windowWidht*0.1,
    backgroundColor : "#FFFFFF",

  },
  icon:{
    marginVertical : windowHeight*0.01,
    width: windowWidht*0.26,
    height:  windowWidht*0.26,
    borderWidth: 5,
    borderColor: "red",

  },
  images :{
    width: windowHeight*0.12,
    height:  windowHeight*0.12,
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
  //dari react native
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF3131",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft : "auto"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})