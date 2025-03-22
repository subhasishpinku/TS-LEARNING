import FormInput from "@ui/Forminput";
import { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, } from "react-native";
import { FlatList, Image } from "react-native";
import mime from 'mime'
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
import { newProductSchema, yupValidate } from "@utils/Validator";
import { newUserSchema } from "./SignUp";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import LoadingSpinner from "@ui/LoadingSpinner";
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
    const [busy, setBusy] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(false);

    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImages] = useState('');
    const { authClient } = useClient()

    const { category, description, name, price, purchasingDate } = productInfo;

    const handleChange = (name: string) => (text: string) => {
        setProductInfo({ ...productInfo, [name]: text })
    };
    // const handleSubmit = async () => {
    //     console.log(productInfo);
    //     const { error } = await yupValidate(newProductSchema, productInfo)
    //     if (error) return showMessage({ message: error, type: 'danger' })
    //     console.log(productInfo);
    //     const formData = new FormData();
    //     type productInfoKeys = keyof typeof productInfo

    //     for (let key in productInfo) {
    //         const value = productInfo[key as productInfoKeys]
    //         if (value instanceof Date)
    //             formData.append(key, value.toISOString())
    //         else
    //             formData.append(key, value)

    //         // appending imges
    //         const newImages = images.map((img, index) => ({
    //             name: 'image_' + index,
    //             type: mime.getType(img),
    //             uri: img
    //         }))
    //         for (let img of newImages) {
    //             formData.append("images", img as any);
    //         }
    //         const res = await runAxiosAsync(
    //             authClient.post('/product/list', formData, {
    //                 headers: {
    //                     'Content-Type': "multipart/form-data",
    //                 }
    //             })
    //         )

    //         console.log(res);

    //         // formData.append("name", productInfo.name);
    //         // formData.append("category", productInfo.category);
    //         // formData.append("name", productInfo.name);
    //         // formData.append("name", productInfo.name);
    //     }

    // }

    const handleSubmit1 = async () => {
        console.log(productInfo);

        // Validate form data
        const { error } = await yupValidate(newProductSchema, productInfo);
        if (error) return showMessage({ message: error, type: 'danger' });

        // Create FormData
        const formData = new FormData();
        type productInfoKeys = keyof typeof productInfo;

        // Append product info fields to FormData
        for (let key in productInfo) {
            const value = productInfo[key as productInfoKeys];
            if (value instanceof Date) {
                formData.append(key, value.toISOString());
            } else {
                formData.append(key, value);
            }
        }

        // Append images to FormData
        const newImages = images.map((img, index) => ({
            name: `image_${index}`,
            type: mime.getType(img) || 'image/jpeg',
            uri: img,
        }));

        for (let img of newImages) {
            formData.append("images", img as any);
        }

        try {
            // Make the POST request
            const res = await runAxiosAsync(
                authClient.post('/product/list', formData, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                    },
                })
            );
            console.log(res);
            if (res.success) {
                showMessage({ message: "Product listed successfully!", type: 'success' });
            } else {
                showMessage({ message: res.error || "Something went wrong", type: 'danger' });
            }
        } catch (error) {
            console.error(error);
            showMessage({ message: "Error submitting the product", type: 'danger' });
        }
    };


    const handleSubmit = async () => {
        console.log("Submitting product info:", productInfo);

        try {
            // Validate form data
            const { error } = await yupValidate(newProductSchema, productInfo);
            if (error) {
                showMessage({ message: error, type: 'danger' });
                return;
            }
            setBusy(true)
            // Create FormData
            const formData = new FormData();

            // Append product info fields
            Object.entries(productInfo).forEach(([key, value]) => {
                if (value instanceof Date) {
                    formData.append(key, value.toISOString());
                } else {
                    formData.append(key, value);
                }
            });

            // Append images to FormData
            images.forEach((img, index) => {
                const imageName = `image_${index}`;
                const imageType = mime.getType(img) || 'image/jpeg';
                formData.append('images', {
                    name: imageName,
                    type: imageType,
                    uri: img,
                } as any);
            });

            // Send POST request
            const res = await runAxiosAsync<{ message: string }>(
                authClient.post('/product/list', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            );
            setBusy(false)

            console.log("Response from API:", res);

            if (res) {
                showMessage({ message: "Product listed successfully!", type: 'success' });
                setProductInfo({...defaultInfo })
                setImages([])
            } else {
                const errorMsg = "Something went wrong while listing the product.";
                showMessage({ message: errorMsg, type: 'danger' });
            }
        } catch (error) {
            console.error("Error during submission:", error);
            showMessage({ message: "An error occurred while submitting the product.", type: 'danger' });
        }
    };
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
                <AppButton title="List Product" onPress={handleSubmit} />
                <OptionModal
                    visible={showCategoryModal}
                    onRequestClose={() => setShowCategoryModal(false)}
                    option={categories.map((cat) => ({ id: cat.name, value: cat.name }))}
                    renderItem={(item) => <Text style={styles.category}>{item.value}</Text>}
                    onPress={(item) => {
                        setProductInfo({ ...productInfo, category: item.value });
                        setShowCategoryModal(false);
                    }}
                />
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
            <LoadingSpinner visible={busy} />
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