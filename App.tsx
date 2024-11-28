import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignIn from '@views/SignIn';
import React, { FC } from "react";
import { Platform, StatusBar as RNStatusBar } from "react-native";
import SignUp from '@views/SignUp';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPassword from '@views/ForgetPassword';
import colors from '@utils/colors';
import Navigator from 'app/navigator';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from 'app/store';
const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors :{
    ...DefaultTheme.colors,
    background : colors.white
    // primary: 'rgb(255,45,85)',
  }
}
export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      {/* <NavigationContainer
       theme={MyTheme}>
        <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
        </Stack.Navigator>
      </NavigationContainer> */}
      <Navigator/>
      <FlashMessage position="top"/>
      
    </SafeAreaView>
    </Provider>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0

  },
});
