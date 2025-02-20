import React, { FC, useState } from "react";
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import WelcomeHeader from "@ui/WelcomeHeader";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormInput from "@ui/Forminput";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/AuthNavigator";
import * as Yup from 'yup';
import axios from "axios";
import { yupValidate } from "@utils/Validator";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { showMessage } from "react-native-flash-message";
import client from "app/api/client";
import { SignInRes } from "./SignIn";
import useAuth from "app/hooks/useAuth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
Yup.addMethod(Yup.string, 'email', function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

const nameAndEmailValidation = {
  email: Yup.string().email("Invalid email!").required("Email is missing"),
  // ...password
  password: Yup
    .string()
    .required("Password is missing")
    .min(8, "Password should be at least 8 chars long")
    .matches(passwordRegex, "Password is too simple")
}
export const newUserSchema = Yup.object({
  name: Yup.string().required("Name is missing"),
  ...nameAndEmailValidation,
  // email: Yup.string().email("Invalid email!").required("Email is missing"),
  // // ...password
  // password: Yup
  //   .string()
  //   .required("Password is missing")
  //   .min(8, "Password should be at least 8 chars long")
  //   .matches(passwordRegex, "Password is too simple")
});
export const signInSchema = Yup.object({
  ...nameAndEmailValidation,
});

interface Props { }
const SignUp: FC<Props> = (props) => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '', });
  const [busy, setBusy] = useState(false)
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
  const {signIn} = useAuth()
  const handleChange = (name: string) => (text: string) => {
    setUserInfo({ ...userInfo, [name]: text });
  }
  // const handleSubmit = async () => {
  //   // console.log(userInfo);

  //   try {
  //     // const info = await newUserSchema.validate(userInfo);
  //     const { values, error } = await yupValidate(newUserSchema, userInfo);
  //     if(error){
  //       console.log(error);
  //     }
  //     if (values) {
  //       const { data } = await axios.post('https://smart-cycle-marketmos.glitch.me//auth/sign-up', values)
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     if (error instanceof Yup.ValidationError) {
  //       console.log('Invalid form: ', error.message)
  //     }
  //     if (error instanceof axios.AxiosError) {
  //       const response = error.response
  //       if (response) {
  //         console.log('Invalid form: ', response.data.message)
  //       }
  //     }
  //     console.log((error as any).message);
  //   }

  // }

  const handleSubmit = async () => {
    const { values, error } = await yupValidate(newUserSchema, userInfo);
    if (error) return showMessage({ message: error, type: 'danger' });
    setBusy(true)

    const res = await runAxiosAsync<{ message: string }>(
      client.post("/auth/sign-up", values)
    );

    console.log(res)
    if (res?.message) {
      showMessage({ message: res.message, type: 'success' });
      // const signInRes = await runAxiosAsync<SignInRes>(
      //   client.post("/auth/sign-in", values));
      // console.log(signInRes)
      signIn(values!)
    }
    setBusy(false)
  };

  const { email, name, password } = userInfo
  return (
    // <KeyboardAvoidingView
    //  behavior={Platform.OS=='ios'? 'padding' : 'height'}
    //  style={styles.container}
    //  keyboardVerticalOffset={50}
    //  >  
    //  <ScrollView>

    // <View style={styles.innerContainer}>
    //     <WelcomeHeader />
    //     <View style={styles.forContainer}>
    //     {/* <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.primary}/> 
    //     */}
    //     <FormInput
    //      placeholder="Name"
    //     />
    //     <FormInput
    //      placeholder="Email"
    //      keyboardType="email-address"
    //      autoCapitalize="none"
    //     />
    //     <FormInput
    //      placeholder="Password"
    //      secureTextEntry
    //     />
    //     <AppButton  title="Sign Up"/>
    //     <FormDivider height={2} />
    //     <FormNavigator 
    //                     leftTitle="Forget Password"
    //                     rightTitle="Sign In" 
    //                     onLeftPress={function (): void {
    //                         throw new Error("Function not implemented.");
    //                     } } onRightPress={function (): void {
    //                         throw new Error("Function not implemented.");
    //                     } }            />
    //     </View>
    // </View>
    // </ScrollView> 
    // </KeyboardAvoidingView>

    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader />
        <View style={styles.forContainer}>
          {/* <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.primary}/> 
            */}
          <FormInput
            placeholder="Name"
            value={name}
            onChangeText={handleChange("name")}

          />
          <FormInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleChange("email")}
          />
          <FormInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={handleChange("password")}
          />
          <AppButton active={!busy} title="Sign Up" onPress={handleSubmit} />
          <FormDivider height={2} />
          <FormNavigator
            onLeftPress={() => navigate('ForgetPassword')}
            onRightPress={() => navigate('SignIn')}
            leftTitle="Forget Password"
            rightTitle="Sign In"
          />
        </View>
      </View>
    </CustomKeyAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 15,
    flex: 1
  },
  forContainer: {
    marginTop: 30,
  }

});

export default SignUp;
