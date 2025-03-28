import colors from "@utils/colors";
import { FC, useEffect } from "react";
import { View, StyleSheet, Text, } from "react-native";

interface Props {
    icon: JSX.Element
    name: string
}

const CategoryOption: FC<Props> = ({ icon, name }) => {
    return (
        <View style={styles.container}>
            {typeof icon === 'string' ? <Text>{icon}</Text> : icon}
            <Text style={styles.category}>{name}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', alignItems: 'center',
    },
    icon: {
        transform: [{ scale: 0.4 }],
    },
    category: {
        color: colors.primary,
        paddingVertical: 10
    }

});

export default CategoryOption;


