import { View, Text } from "react-native";
import PlaceForm from "../components/place/PlaceForm";
import { insertPlace } from "../utils/database";

const AddPlace = ({navigation}) => {

    const onCreatePlcaeHandler = async (place) => {
        await insertPlace(place)
        navigation.navigate('AllPlaces')
    }

    return (
        <View style={{flex:1}}>
            <PlaceForm onCreatePlace={onCreatePlcaeHandler}/>
        </View>
    )
}

export default AddPlace;