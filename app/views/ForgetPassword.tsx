import React, { FC } from "react";
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import WelcomeHeader from "@ui/WelcomeHeader";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormInput from "@ui/Forminput";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/AuthNavigator";

interface Props { }



const ForgetPassword: FC<Props> = (props) => {
    const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>()

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
        //      placeholder="Email"
        //      keyboardType="email-address"
        //      autoCapitalize="none"
        //     />
        //     <AppButton  title="Request Link"/>
        //     <FormDivider height={2} />
        //     <FormNavigator 
        //                     leftTitle="Sign Up"
        //                     rightTitle="Sign in" 
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
                        autoCapitalize="none"
                    />
                    <AppButton title="Request Link" />
                    <FormDivider height={2} />
                    <FormNavigator
                    onLeftPress={()=> navigate('SignUp')}
                    onRightPress={()=> navigate('SignIn')}
                        leftTitle="Sign Up"
                        rightTitle="Sign in"
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

export default ForgetPassword;
