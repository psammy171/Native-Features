import { View, StyleSheet, Text, Image } from "react-native"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import Button from "./Button"
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../utils/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";


const styles = StyleSheet.create({
    imageHolder:{
        width:'100%',
        height:200,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D9D9D9',
        overflow:'hidden'
    },
    imageStyle:{
        width:'100%',
        height:'100%',
    },
    title:{
        marginTop:15,
        fontWeight:'bold'
    }
})

const LocationPicker = ({onLocationPick}) => {
    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()
    const [pickedLocation, setPickedLocation] = useState()
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    useEffect(() => {
        if(isFocused && route.params){
            const mapPickedLocation = {
                lat:route.params.latitude,
                lng:route.params.longitude
            }
            setPickedLocation(mapPickedLocation)
        }
    },[route, isFocused])

    const verifyPermission = async () => {
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient permission','You need to grant permission to use this app')
            return false
        }

        return true;
    }


    const getLocationHandler = async () => {
        const hasPermission = verifyPermission()

        if(!hasPermission)
            return;

        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude,
        })
    }

    const pickLocationHandler = () => {
        navigation.navigate('Map')
    }

    let imagePreview = <Text>Map Preview</Text>

    if(pickedLocation)
        imagePreview = <Image source={{uri:getMapPreview(pickedLocation.lat, pickedLocation.lng)}} style={styles.imageStyle}/>


    useEffect(() => {
        const handleLocation = async () => {
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                onLocationPick({...pickedLocation, address})
            }
        }
        handleLocation()
    },[pickedLocation, onLocationPick])

    return (
        <View>
            <Text style={styles.title}>Select Location</Text>
            <View style={styles.imageHolder}>
                {imagePreview}
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Button title='Locate User' iconName='location' iconSize={20} iconColor={'white'} onPress={getLocationHandler}/>
                <Button title='Pick on map' iconName='map' iconSize={20} iconColor={'white'} onPress={pickLocationHandler}/>
            </View>
        </View>
    )
}

export default LocationPicker;