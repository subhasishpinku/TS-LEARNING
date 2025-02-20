import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@utils/colors';
import { FC, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState, Profile, updateAuthState } from 'app/store/auth';
import client from 'app/api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { runAxiosAsync } from 'app/api/runAxiosAsync';
import LoadingSpinner from '@ui/LoadingSpinner';
import useAuth from 'app/hooks/useAuth';
import TabNavigator from './TabNavigator';
import useClient from 'app/hooks/useClient';
import asyncStorage, { Keys } from '@utils/asyncStorage';
interface Props { }
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white
    // primary: 'rgb(255,45,85)',
  }
}
// const Navigator: FC<Props> = (props) => {
//   const authState = useSelector(getAuthState)

//   const dispatch = useDispatch()
//   const loggedIn = authState.profile ? true : false;
//   // const loggedIn = !!authState.profile; // Checks if profile exists
//   console.log(loggedIn)
//   const fetchAuthState = async () => {
//     const token = await AsyncStorage.getItem('access-token')

//     if (token) {
//       dispatch(updateAuthState({pending: true, profile: null}))
//       const res = await runAxiosAsync<{ profile: Profile }>(client.get('/auth/profile', {
//         headers: {
//           Authorization: "Bearer" + token,
//         },

//       }));
//       if(res){
//         dispatch(updateAuthState({pending: false, profile: res.profile}))
//         console.log("ok")
//       }else{
//         dispatch(updateAuthState({pending: false, profile: null}))
//         console.log("Notok")


//       }
//     }
//   }

//   useEffect(() => {
//     fetchAuthState();
//   }, [])
//   console.log(authState);
const Navigator: FC<Props> = () => {
  // const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  //const loggedIn = !!authState.profile; // Simplified boolean check
  const {loggedIn, authState} = useAuth()
  const {authClient} = useClient();
  const fetchAuthState = async () => {
    try {
      //const token = await AsyncStorage.getItem('access-token');
      const token = await asyncStorage.get(Keys.AUTH_TOKEN);
      if (token) {
        dispatch(updateAuthState({ pending: true, profile: null }));
        const res = await runAxiosAsync<{ profile: Profile }>(
          // client.get('/auth/profile', {
          //   headers: {
          //     Authorization: "Bearer " + token, // Correct space added
          //   },
          // })
          authClient.get('/auth/profile', {
            headers: {
              Authorization: "Bearer " + token, // Correct space added
            },
          })
        );

        if (res) {
          dispatch(updateAuthState({ pending: false, profile: res.profile }));
        } else {
          dispatch(updateAuthState({ pending: false, profile: null }));
        }
      }
    } catch (error) {
      console.error("Error fetching auth state:", error);
      dispatch(updateAuthState({ pending: false, profile: null }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        await fetchAuthState();
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    //   <NavigationContainer
    //     theme={MyTheme}>
    //       <LoadingSpinner visible={authState.pending}/>
    //     {!loggedIn ? <AuthNavigator /> : <AppNavigator />}
    //   </NavigationContainer>
    // );

    <NavigationContainer theme={MyTheme}>
      <LoadingSpinner visible={authState.pending} />
      {/* {!loggedIn ? <AuthNavigator /> : <AppNavigator />} */}
      {!loggedIn ? <AuthNavigator /> : <TabNavigator />}

    </NavigationContainer>);
};

const styles = StyleSheet.create({
  container: {},
});

export default Navigator;