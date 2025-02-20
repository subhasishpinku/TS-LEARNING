import React, { FC } from "react";
import { FlatList, Image, TouchableOpacity, View, StyleSheet } from "react-native";

interface HorizontalImageListProps {
  images: string[]; // Array of image URLs
  onLongPress: (img: string) => void;
}

const HorizontalImageList: FC<HorizontalImageListProps> = ({ images, onLongPress }) => {
  return (
    <FlatList
      data={images}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onLongPress={() => onLongPress(item)} style={styles.imageContainer}>
          <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default HorizontalImageList; // Ensure default export
