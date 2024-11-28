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
import { yupValidate } from "@utils/Validator";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { newUserSchema, signInSchema } from "./SignUp";
import client from "app/api/client";

interface Props { }
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
        access: string;
    };
}
const SignIn: FC<Props> = (props) => {
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '', });
    const [busy, setBusy] = useState(false)
    const { email, password } = userInfo


    const handleSubmit = async () => {
        const { values, error } = await yupValidate(signInSchema, userInfo);
        if (error) return showMessage({ message: error, type: 'danger' });
        setBusy(true)

        const res = await runAxiosAsync<SignInRes>(
            client.post("/auth/sign-in", values)
        );

        // console.log(res)
        // if (res?.message) 
        //     showMessage({ message: res.message, type: 'success' });
        if (res) {
            showMessage({ message: "Sign-in successful!", type: 'success' });
            console.log("Signed in profile:", res.profile);
            console.log("Access token:", res.tokens.access);
            // Handle navigation or token storage here
        } else {
            showMessage({ message: "Sign-in failed. Please try again.", type: 'danger' });
        }

        setBusy(false)
    };
    const handleChange = (name: string) => (text: string) => {
        setUserInfo({ ...userInfo, [name]: text });
        const { email, password } = userInfo
    }
    return (
        // <KeyboardAvoidingView
        //  behavior={Platform.OS=='ios'? 'padding' : 'height'}
        //  style={styles.container}>  
        //  <ScrollView>

        // <View style={styles.innerContainer}>
        //     <WelcomeHeader />
        //     <View style={styles.forContainer}>
        //     {/* <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.primary}/> 
        //     */}
        //     <FormInput
        //      placeholder="Email"
        //      keyboardType="email-address"
        //      autoCapitalize="none"
        //     />
        //     <FormInput
        //      placeholder="Password"
        //      secureTextEntry
        //     />
        //     <AppButton  title="Sign in"/>
        //     <FormDivider height={2} />
        //     <FormNavigator 
        //                     leftTitle="Forget Password"
        //                     rightTitle="Sign Up" 
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
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none" value={email}
                        onChangeText={handleChange("email")}
                    />
                    <FormInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={handleChange("password")}
                    />
                    <AppButton active={!busy} title="Sign In" onPress={handleSubmit} />
                    <FormDivider height={2} />
                    <FormNavigator
                        onLeftPress={() => navigate('ForgetPassword')}
                        onRightPress={() => navigate('SignUp')}
                        leftTitle="Forget Password"
                        rightTitle="Sign Up"

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

export default SignIn;
