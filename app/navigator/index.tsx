import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@utils/colors';
import { FC } from 'react'
import { StyleSheet } from 'react-native'
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useSelector } from 'react-redux';
import { getAuthState } from 'app/store/auth';
interface Props { }
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white
    // primary: 'rgb(255,45,85)',
  }
}
const Navigator: FC<Props> = (props) => {
  const authState =  useSelector(getAuthState)
  console.log(authState);
   const loggedIn = true;
  return (
    <NavigationContainer
      theme={MyTheme}>
      {!loggedIn ?  <AuthNavigator /> : <AppNavigator/>}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Navigator;