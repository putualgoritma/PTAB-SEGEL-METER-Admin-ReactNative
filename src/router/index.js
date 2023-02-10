import React from 'react'
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Home from '../page/home';
import SealStart from '../page/seal/SealStart.js';
import Seal from '../page/seal/Seal';
import Logout from '../page/login/Logout';
import History from '../page/history';
import Login from '../page/login/Login';
import Map from '../page/map';
import BillList from '../page/Bill/BillList';
import Bill from '../page/Bill';
import BillScan from '../page/Bill/Scan';
import SplashScreen from '../page/SplashScreen';
import Wm from '../page/Wm';
import LoadingWM from '../page/Wm/Loading.js';
import PreWork from '../page/Wm/PreWork.js';
import Done from '../page/Wm/Done.js';
import Reject from '../page/Wm/Reject.js';
import ShowWM from '../page/Wm/Show';
import ApproveWm from '../page/Wm/Approve';
import ActionWm from '../page/Wm/Action';
import HistoryShowWM from '../page/Wm/HistoryShow.js';
import HistoryCreate from '../page/history/HistoryCreate';
import AddStaff from '../page/Wm/Staff/AddStaff.js';
import AddStaffIndex from '../page/Wm/Staff/index.js';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        /> */}
        {/* <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate(Logout)}
        /> */}
    </DrawerContentScrollView>
  );
}

function MainApp() {
  const USER = useSelector((state) => state.UserReducer);
  if(USER.subdapertement_id != 9 ){
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >

      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Daftar Segel" component={Seal} options={{ headerShown: false }} />
      <Drawer.Screen name="History Segel" component={History} options={{ headerShown: false }} />
      <Drawer.Screen name="Mapping Pelanggan" component={Map} options={{ headerShown: false }} />
      <Drawer.Screen name="Tagihan Pelanggan" component={Bill} options={{ headerShown: false }} />
      <Drawer.Screen name="Wm" component={Wm}   options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }} />
    
      <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )}
  else{
    return (
      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
         <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Drawer.Screen name="Wm" component={Wm}   options={{
            headerStyle: {
              backgroundColor: '#2675AD',
            }, headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, title: 'Water Meter'
          }} />
      
        <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
      </Drawer.Navigator>
    )
  }

}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
        
      <Stack.Screen name="SplashScreen" component={gestureHandlerRootHOC(SplashScreen)} options={{ headerShown: false }} />
      <Stack.Screen name="Mapping Pelanggan" component={gestureHandlerRootHOC(Map)} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={gestureHandlerRootHOC(Home)} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={gestureHandlerRootHOC(Login)} options={{ headerShown: false }} />
      <Stack.Screen name="Tagihan Pelanggan" component={gestureHandlerRootHOC(Bill)} options={{ headerShown: false }} />
      <Stack.Screen name="BillList" component={gestureHandlerRootHOC(BillList)} options={{ headerShown: false }} />
      <Stack.Screen name="BillScan" component={gestureHandlerRootHOC(BillScan)} options={{ headerShown: false }} />

      <Stack.Screen name="Daftar Segel" component={gestureHandlerRootHOC(Seal)} options={{ headerShown: false }} />
      <Stack.Screen name="History Segel" component={gestureHandlerRootHOC(History)} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryCreate" component={gestureHandlerRootHOC(HistoryCreate)} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={gestureHandlerRootHOC(MainApp)} options={{ headerShown: false }} />

      {/* <Stack.Screen name="Wm" component={gestureHandlerRootHOC(Wm)} /> */}

      <Stack.Screen
        name="Wm"
        component={Wm}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

<Stack.Screen name="LoadingWM" component={LoadingWM} options={{ headerShown: false }} />

<Stack.Screen name="PreWork" component={PreWork} options={{ headerShown: false }} />
<Stack.Screen name="Done" component={Done} options={{ headerShown: false }} />

<Stack.Screen
        name="ShowWM"
        component={ShowWM}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

<Stack.Screen
        name="ApproveWm"
        component={ApproveWm}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

<Stack.Screen
        name="HistoryShowWM"
        component={HistoryShowWM}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

<Stack.Screen
        name="AddStaffIndex"
        component={AddStaffIndex}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

<Stack.Screen
        name="AddStaff"
        component={AddStaff}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

<Stack.Screen
        name="ActionWm"
        component={ActionWm}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

<Stack.Screen
        name="Reject"
        component={Reject}
        options={{
          headerStyle: {
            backgroundColor: '#2675AD',
          }, headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'Water Meter'
        }}
      />

    </Stack.Navigator>

    
  )

}
export default Router