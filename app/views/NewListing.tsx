import FormInput from "@ui/Forminput";
import { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, } from "react-native";
import { FlatList, Image } from "react-native";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import colors from "@utils/colors";
import DatePicker from "@ui/DatePicker";
import OptionModal from "@components/OptionModal";
import categories from "@utils/categories";
import CategoryOption from "@ui/CategoryOption";
import { AntDesign } from "@expo/vector-icons";
import AppButton from "@ui/AppButton";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import { date } from "yup";
import * as ImagePicker from 'expo-image-picker'
import { showMessage } from "react-native-flash-message";
import HorizontalImageList from "@views/HorizontalImageList";
import { yupValidate } from "@utils/Validator";
import { newUserSchema } from "./SignUp";
interface Props { }

const defaultInfo = {
    name: "",
    description: "",
    category: "",
    price: "",
    purchasingDate: new Date(),
}

const imageOptions = [{ value: "Remove Image", id: 'remove' }]

const NewListing: FC<Props> = (props) => {
    const [productInfo, setProductInfo] = useState({ ...defaultInfo })
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(false);

    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImages] = useState('');

    const { category, description, name, price, purchasingDate } = productInfo;

    const handleChange = (name: string) => (text: string) => {
        setProductInfo({ ...productInfo, [name]: text })
    };
    const handleSubmit = async () => {
        console.log(productInfo);
        const {error} = await yupValidate(newUserSchema, productInfo)
        if(error) return showMessage({message: error})
    }
    const handleOnImageSelection = async () => {
        try {
            const { assets } = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
                allowsMultipleSelection: true
            });

            if (!assets) return;
            console.log(JSON.stringify(assets, null, 2));
            const imageUris = assets.map(({ uri }) => uri)
            setImages([...images, ...imageUris]);
        } catch (error) {
            showMessage({ message: (error as any).message, type: 'danger', });
        }
    }
    return (
        <CustomKeyAvoidingView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Pressable onPress={handleOnImageSelection} style={styles.fileSelector}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="images" size={24} color="black" />
                        </View>
                        <Text style={styles.btnTitle}>Add Images</Text>
                    </Pressable>

                    {/* <FlatList
                        data={images}
                        //    keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image style={styles.selectedImage} source={{ uri: item }} />
                        )}
                        keyExtractor={(item) => item}
                        // horizontal
                        // showsHorizontalScrollIndicator={false}
                        
                        
                      /> */}
                    {/* <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <Image style={styles.selectedImage} source={{ uri: item }} />
                        )}
                        keyExtractor={(item) => item}
                    /> */}
                    <HorizontalImageList
                        images={images}
                        onLongPress={(img) => {
                            setSelectedImages(img);
                            setShowImageOptions(true);
                        }}
                    />
                </View>

                <FormInput value={name} placeholder="Product name"
                    onChangeText={handleChange('name')}
                />
                <FormInput value={price} placeholder="Price"
                    onChangeText={handleChange('price')}
                    keyboardType="numeric"
                />
                <DatePicker title="Purchasing Date: "
                    value={purchasingDate}
                    onChange={(purchasingDate) => setProductInfo({ ...productInfo, purchasingDate })} />
                <Pressable style={styles.categorySelector}
                    onPress={() => setShowCategoryModal(true)}>
                    <Text style={styles.categoryTitle}>{category || "Category"}</Text>
                    <AntDesign name="caretdown" size={24} color={colors.primary} />
                </Pressable>
                <FormInput value={description}
                    placeholder="Description"
                    multiline numberOfLines={4}
                    onChangeText={handleChange('description')}
                />
                <AppButton title="List New Product" onPress={handleSubmit} />
                {/* Image Options  */}
                <OptionModal
                    visible={showImageOptions}
                    onRequestClose={setShowImageOptions}
                    option={imageOptions}
                    // renderItem={(item) => {
                    //     return (
                    //         <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    //             <View style={{transform: [{scale: 0.4}]}}>{item.icon}</View>
                    //             <Text style={styles.category}>{item.name}</Text>    
                    //         </View>
                    //     )
                    // }}

                    renderItem={(item) => {
                        // return (
                        //     <CategoryOption {...item} />
                        // );
                        return <Text style={styles.imageOptions}>{item.value}</Text>
                    }}
                    // onPress={(item) => {
                    //     console.log(item);
                    // }}
                    // onPress={(item) =>
                    //     setProductInfo({ ...productInfo, category: item.name })}
                    onPress={(option) => {
                        if (option.id === 'remove') {
                           const newImages = images.filter(img => img !== selectedImage)
                           setImages([...newImages])
                        } else {
                            
                        }
                        setShowImageOptions(false);
                     }}
                />

            </View>
        </CustomKeyAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // marginBottom: 10,
        // marginHorizontal: 10,
        flex: 1,
    },
    imageContainer: {
        flexDirection: 'row'
    },
    fileSelector: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 7,
    },
    selectedImage: {
        width: 70,
        height: 70,
        borderRadius: 7,
        marginLeft: 5,
    },
    btnTitle: {
        color: colors.primary,
        marginTop: 5
    },
    category: {
        color: colors.primary,
        paddingVertical: 10
    },
    categorySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
        padding: 8,
        borderWidth: 1,
        borderColor: colors.deActive,
        borderRadius: 5
    },
    categoryTitle: {
        color: colors.primary
    },
    imageOptions: {
        fontWeight: '600',
        fontSize: 18, color: colors.primary,
        padding: 10
    }

});

export default NewListing;