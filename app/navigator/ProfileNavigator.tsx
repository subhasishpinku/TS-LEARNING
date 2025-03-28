import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '@views/Profile';
import { FC } from 'react'
import {  StyleSheet} from 'react-native'


const Stack = createNativeStackNavigator();

interface Props {}

const ProfileNavigator: FC<Props> = (props) => {
  return   <Stack.Navigator  screenOptions={{headerShown: false}}>
  <Stack.Screen name="Profile" component={Profile}/>
  </Stack.Navigator>
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileNavigator;