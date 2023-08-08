import { View, StyleSheet, Text, Image } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import Button from "./Button";

const styles = StyleSheet.create({
    imageHolder:{
        width:'100%',
        height:200,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        backgroundColor:'#D9D9D9'
    },
    imageStyle:{
        width:'100%',
        height:'100%'
    },
    title:{
        marginTop:15,
        fontWeight:'bold'
    }
})

const ImagePicker = ({onImageClick}) => {
    const [pickedImage, setPickedImage] = useState('')
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

    const verifyPermission = async () => {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient permission','You need to grant permission to use this app')
            return false
        }

        return true;
    }

    const launchCamera = async () => {
        const hasPermission = await verifyPermission()

        if(!hasPermission)
            return;

        const image = await launchCameraAsync({
            allowsEditing:true,
            aspect:[16, 9],
            quality:0.5,
        })
        if(!image.canceled)
            setPickedImage(image.assets[0].uri)
    }

    let imagePreview = <Text>Image Preview</Text>

    if(pickedImage){
        imagePreview = <Image source={{uri:pickedImage}} style={styles.imageStyle}/>  
    }

    useEffect(() => {
        onImageClick(pickedImage)
    },[pickedImage, onImageClick])

    return (
        <View>
            <Text style={styles.title}>Select Image</Text>
            <View style={styles.imageHolder}>
                {imagePreview}
            </View>
            <Button title="Capture" onPress={launchCamera} iconName="camera" iconColor='white' iconSize={20}/>
        </View>
    )
}

export default ImagePicker;