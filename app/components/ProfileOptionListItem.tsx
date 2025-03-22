import React, { FC } from "react";
import { View, StyleSheet, Pressable, Text, ViewStyle, StyleProp } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import colors from "@utils/colors";

interface Props {
  antIconName: string;
  title: string;
  style?: StyleProp<ViewStyle>
  active?: boolean
  onPress?(): void;

}

const ProfileOptionListItem: FC<Props> = ({ style , antIconName, title, active, onPress }) => {
  return <Pressable onPress={onPress} style={[styles.container  , style]}>
    <View style={styles.buttonContainer}>
      <AntDesign name={antIconName as any} size={24} />
      <Text style={styles.title}>{title}</Text>
    </View>

    {active && <View style={styles.indicator} />}
  </Pressable>
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
   // backgroundColor: "red"
  },
  title: {
    fontSize: 20,
    paddingLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.active
  }
});

export default ProfileOptionListItem;