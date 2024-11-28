import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@views/Home'
import SignIn from '@views/SignIn'
import { FC } from 'react'
import {  StyleSheet} from 'react-native'

export type AuthStackParamList = {
  Home: undefined;
}
const Stack = createNativeStackNavigator<AuthStackParamList>();

interface Props {}

const AuthNavigator: FC<Props> = (props) => {
  return   <Stack.Navigator  screenOptions={{headerShown: false}}>
  <Stack.Screen name="Home" component={Home}/>
  </Stack.Navigator>
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthNavigator;