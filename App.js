import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Router from './src/router';
import { LogBox } from 'react-native';
import {store} from './src/redux'
import {Provider} from 'react-redux'


function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}



export default function App() {
    LogBox.ignoreLogs(['Setting a timer', 'Animated: `useNativeDriver`'])
    return(
      <Provider store = {store}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </Provider>
    )
  
}


