import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SET_DATA_PERMISSION, SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
import API from '../../service';
import ScreenLoading from '../loading/ScreenLoading';

  const SplashScreen=({navigation})=>{
      const image =require('../../assets/img/SplashScreen.png')
      const dispatch = useDispatch();
      useEffect(() => {
            let isAmounted = false
           if(!isAmounted){
                  Promise.all([getDataUser(), getDataToken(), getDataPermission()])
                  .then(response => {
                        if(response[0] !== null && response !== response[1]){
                              let user = response[0]
                              API.login({email:user.email, password : user.password, _id_onesignal : user._id_onesignal}).then((result) => {
                                    console.log('sudah login',result);
                                    result.data['password'] = result.password;
                                    dispatch(SET_DATA_USER(result.data))
                                    dispatch(SET_DATA_TOKEN(result.token))
                                    dispatch(SET_DATA_PERMISSION(result.permission))
                                    storeDataToken(result.token)
                                    storeDataUser(result.data)
                                    storeDataPermission(result.permission)
                                    console.log('sudah login2',result);
                                    navigation.replace('MainApp')
                                    //navigation.replace('Login')
                              }).catch((e) => {
                                    console.log(e);
                                    navigation.replace('Login')
                              })
                        }else{
                              setTimeout(() => {
                                    navigation.replace('Login')
                              }, 2000);
                        }
                  }).catch((e) => {
                        setTimeout(() => {
                              navigation.replace('Login')
                        }, 2000);
                        console.log('data local tidak dibaca');
                  })
           }
            return () => {
                  isAmounted= true
            }
      }, [])


      
      const getDataUser = async () => {
            try {
            const jsonValue = await AsyncStorage.getItem('@LocalUser')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            // console.log('local user',jsonValue);
            } catch(e) {
            // error reading value
            }
      }
      
      const getDataToken = async () => {
            try {
              const value = await AsyncStorage.getItem('@LocalToken')
              if(value !== null) {
                  return value
              }
            } catch(e) {
              // error reading value
            }
      }

      const getDataPermission = async () => {
            try {
                  const jsonValue = await AsyncStorage.getItem('@LocalPermission')
                  return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch(e) {
              // error reading value
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
    
      return (
            //<View></View>
            <ScreenLoading/>
      )
  }
  
  const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
  })
  export default SplashScreen