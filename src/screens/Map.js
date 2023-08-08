import { StyleSheet, Alert } from "react-native";
import  MapView, { Marker} from 'react-native-maps';
import { useLayoutEffect, useState, useCallback } from "react";
import Icon from "../components/ui/Icon";

const styles = StyleSheet.create({
    map:{
        flex:1
    }
})

const Map = ({navigation, route}) => {
    const initialLocation = route.params && {
        latitude:route.params.initialLat,
        longitude:route.params.initialLng
    }

    const[selectedLocation, setSelectedLocation] = useState(initialLocation);

    if(selectedLocation)
        console.log(selectedLocation)

    const region = {
        latitude:initialLocation ? initialLocation.latitude : 16.69,
        longitude:initialLocation ? initialLocation.longitude :74.75,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421,
    }

    const selectLocationHandler = (event) => {
        if(initialLocation)
            return;
        const latitude = event.nativeEvent.coordinate.latitude
        const longitude = event.nativeEvent.coordinate.longitude
        setSelectedLocation({latitude, longitude})
    }

    const savePickedLocation = useCallback(() => {
        if(!selectedLocation){
            Alert.alert('No location picked','You have to pick a location (by tapping on the map) first')
            return;
        }
        navigation.navigate('AddPlace',selectedLocation)
    },[navigation, selectedLocation]);

    useLayoutEffect(() => {
        if(initialLocation)
            return;
        navigation.setOptions({
            headerRight:(({tintColor}) => <Icon name='save' color={tintColor} size={20} onPress={savePickedLocation}/>)
        })
    },[navigation, savePickedLocation])

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
            {selectedLocation && <Marker coordinate={selectedLocation}/>}
        </MapView>
    )
}

export default Map;