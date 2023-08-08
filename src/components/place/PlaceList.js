import { FlatList, View, Text, StyleSheet } from "react-native"
import PlaceItem from "./PlaceItem"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
    fallBackContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    fallBackText:{
        fontSize:16
    }
})

const PlaceList = ({places}) => {

    const navigation = useNavigation()

    if(!places || places.length === 0){
        return (
            <View style={styles.fallBackContainer}>
                <Text style={styles.fallBackText}>No places added yet</Text>
            </View>
        )
    }

    const onClickHandler = (id) => {
        navigation.navigate('PlaceDetails', {placeId:id})
    }

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <PlaceItem place={item} onSelect={onClickHandler}/>}
        />
    )
}

export default PlaceList;