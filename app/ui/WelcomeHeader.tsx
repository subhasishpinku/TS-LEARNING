import React, { FC } from "react";
import { StyleSheet,Text, Image, SafeAreaView, Platform, StatusBar as RNStatusBar, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "@utils/colors";
interface Props{}
const heading = "Online Marketing for Used Goods";
const subHedding = "Buy or sell used goods with trust. Chat directly with sellers, ensuring a seam"
const WelcomeHeader: FC<Props> = (props) => {
    return   <View style={styles.container}>
    <Image 
        source={require('../../assets/hero.png')} 
        style={styles.image}
        resizeMode="contain"
        resizeMethod="resize"
    />
     <Text style={styles.heading}>{heading}</Text>
     <Text style={styles.subHeading}>{subHedding}</Text>
</View>
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        // justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0
    },
    image: {
        width: 250,
        height: 250,
    },
    heading:{
        fontWeight:'600',
        fontSize: 20,
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 5,
        color: colors.primary
    },
    subHeading:{
        fontSize: 12,
        textAlign: 'center',
        paddingLeft: 7,
        paddingRight: 7,
        marginBottom: 5,
        letterSpacing: 0.5,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        justifyContent: 'center',
        lineHeight: 14,
        color: colors.primary
    }
});

export default WelcomeHeader;
