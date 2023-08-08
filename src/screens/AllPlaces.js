import { View, Text } from "react-native";
import PlaceList from "../components/place/PlaceList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/database";

const AllPlaces = () => {

    const [places, setPlaces] = useState([])
    const isFocused = useIsFocused()

    useEffect(() => {
        const loadPlaces = async () => {
            const places = await fetchPlaces()
            setPlaces(places)
        }

        if(isFocused){
            loadPlaces()
        }
    },[isFocused])


    return (
        <View style={{flex:1}}>
            <PlaceList places={places}/>
        </View>
    )
}

export default AllPlaces;