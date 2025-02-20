import { getAuthState } from "app/store/auth";
import { FC, useEffect } from "react";
import { View, StyleSheet, Text, } from "react-native";
import { useSelector } from "react-redux";

interface Props { }

const Home: FC<Props> = (props) => {
    // const authState = useSelector(getAuthState);
    // const loggedIn = !!authState.profile;

    // useEffect(() => {
    //     console.log("Logged in:", loggedIn);
    // }, [loggedIn]);
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default Home;