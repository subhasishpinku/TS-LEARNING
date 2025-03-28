import colors from "@utils/colors";
import React, { FC } from "react";
import {StyleSheet, Text, Pressable, View, DimensionValue, ColorValue } from "react-native";

interface Props{
  width?: DimensionValue;
  height: DimensionValue;
  backgroundColor?: ColorValue;
}

const FormDivider: FC<Props> = ({
    width = '50%',
    height = 2,
    backgroundColor = colors.deActive,
  
}) => {
    return <View style={[styles.container,{width, height, backgroundColor}]}/>
}
const styles = StyleSheet.create({
  container:{
    alignSelf: 'center',
    marginVertical: 30
  }
});

export default FormDivider;