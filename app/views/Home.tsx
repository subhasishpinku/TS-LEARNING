import {FC} from "react";
import {View, StyleSheet, Text, } from "react-native";

interface Props {}

const Home: FC<Props> = (props) =>{
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