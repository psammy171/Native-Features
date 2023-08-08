import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../utils/database";

const styles = StyleSheet.create({
    root:{
        padding:20
    },
    image:{
        width:'100%',
        height:200,
        borderRadius:8,
    },
    address:{
        fontSize:16,
        marginVertical:8,
    }
})

const PlaceDetails = ({navigation,route}) => {


    const [fetchedPlace, setFetchedPlace] = useState();
    const selectedPlaceId = route.params.placeId

    useEffect(() => {
        const loadPlaceDetails = async () => {
            const place = await fetchPlaceDetails(selectedPlaceId)
            setFetchedPlace(place)
        }
        loadPlaceDetails()
    },[selectedPlaceId])

    const viewOnMapHandler = () => {
        navigation.navigate('Map',{
            initialLat:fetchedPlace.location.lat,
            initialLng:fetchedPlace.location.lng,
        })
    }

    if(!fetchedPlace){
        return <View>
            <Text>Loading...</Text>
        </View>
    }

    return (
        <View style={styles.root}>
            <Image style={styles.image} source={{uri:fetchedPlace.imageUri}}/>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
            <Button title='View on map' iconName='map' iconColor='white' iconSize={20} onPress={viewOnMapHandler}/>
        </View>
    )
}

export default PlaceDetails;