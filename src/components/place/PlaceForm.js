import { useCallback, useState } from "react";
import { TextInput, View, ScrollView, Text, StyleSheet } from "react-native";
import ImagePicker from "../ui/ImagePicker";
import LocationPicker from "../ui/LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/Place";

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:24
    },
    label:{
        fontWeight:'bold'
    },
    input:{
        padding:10,
        borderRadius:5,
        fontSize:16,
        marginVertical:6,
        backgroundColor:'#D9D9D9',
        borderBottomColor:'#D9D9D9',
        borderBottomWidth:3,
    },
    inputFocus:{
        borderBottomColor:'#11710D',
    }
})

const PlaceForm = ({onCreatePlace}) => {

    const [title, setTitle] = useState('')
    const [isFocus, setIsFocus] = useState(false)
    const [imageUri, setImageUri] = useState('')
    const [pickedLocation, setPickedLocation] = useState()

    const changeTitleHandler = (enteredTitle) => {
        setTitle(enteredTitle)
    }

    const imageClickHandler = useCallback((imageUri) => {
        setImageUri(imageUri)
    },[])


    const locationPickHandler = useCallback((location) => {
        setPickedLocation(location)
    },[])

    const savePlaceHandler = () => {
        const placeData = new Place(title, imageUri, pickedLocation.address, {lat:pickedLocation.lat, lng:pickedLocation.lng})
        onCreatePlace(placeData)
    }

    return (
        <ScrollView style={styles.form}>
            <View >
                <Text style={styles.label}>Title</Text>
                <TextInput
                    onChangeText={changeTitleHandler}
                    style={[styles.input, isFocus ? styles.inputFocus : null]}
                    onBlur={() => setIsFocus(false)}
                    onFocus={() => setIsFocus(true)}
                />
            </View>
            <ImagePicker onImageClick={imageClickHandler}/>
            <LocationPicker onLocationPick={locationPickHandler}/>
            <Button title='Save Place' iconName='save' iconColor='white' iconSize={20} onPress={savePlaceHandler}/>
        </ScrollView>
    )
}

export default PlaceForm;