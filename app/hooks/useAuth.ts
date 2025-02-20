import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage, { Keys } from "@utils/asyncStorage";
import client from "app/api/client";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { getAuthState, updateAuthState } from "app/store/auth";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

export interface SignInRes {
  message: string;
  profile: {
    id: string,
    name: string,
    email: string,
    verified: boolean,
    avatar?: string;

  };
  tokens: {
    refresh: string;
    acess: string;
  };
}
type userInfo = {
  email: string;
  password: string;
}
const useAuth1 = () => {
  const dispatch = useDispatch();

  const signIn = async (userInfo: userInfo) => {
    try {
      dispatch(updateAuthState({ profile: null, pending: true }));
      const res = await runAxiosAsync<SignInRes>(
        client.post("/auth/sign-in", userInfo)
      );

      if (res) {
        await AsyncStorage.setItem("access-token", res.tokens.acess);
        await AsyncStorage.setItem("refresh-token", res.tokens.refresh);
        dispatch(updateAuthState({ profile: {...res.profile, accessToken: res.tokens.acess}, pending: false }));
      } else {
        showMessage({ message: "Invalid credentials.", type: "danger" });
        dispatch(updateAuthState({ profile: null, pending: false }));
      }
    } catch (error) {
      console.error(error);
      showMessage({ message: "Sign-in failed.", type: "danger" });
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  };

  return { signIn };
};

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const signIn = async (userInfo: userInfo) => {
    dispatch(updateAuthState({ profile: null, pending: true }))
    const res = await runAxiosAsync<SignInRes>(
      client.post("/auth/sign-in", userInfo)
    );
    if (res) {
      console.log(res.tokens.acess);
      await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.acess)
      await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh)
      // await AsyncStorage.setItem("access-token", res.tokens.acess)
      // await AsyncStorage.setItem("refresh-token", res.tokens.refresh)

      dispatch(updateAuthState({ profile: {...res.profile, accessToken: res.tokens.acess}, pending: false }));
    } else {
      dispatch(updateAuthState({ profile: null, pending: false }))
    }
  };
  const loggedIn = authState.profile ? true : false;
  return { signIn , authState, loggedIn};
};



export default useAuth

