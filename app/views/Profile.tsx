import { FC, useEffect } from "react";
import { View, StyleSheet, Text, } from "react-native";

interface Props { }

const Profile: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default Profile;