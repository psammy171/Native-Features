import { Pressable, Image, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    item:{
        backgroundColor:'white',
        marginHorizontal:20,
        marginVertical:20,
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:6
        },
        shadowRadius:6,
        shadowOpacity:0.5,
        borderRadius:6,
    },
    pressed:{
        opacity:0.5,
    },
    image:{
        width:'100%',
        height:200,
        borderTopRightRadius:6,
        borderTopLeftRadius:6,
    },
    title:{
        fontSize:20,
        padding:6,
        fontWeight:'bold',
        color:'#11710D',
    },
    address:{
        paddingHorizontal:6,
        paddingBottom:6,
    }
})

const PlaceItem = ({place, onSelect}) => {
    return (
        <View style={styles.item}>
            <Pressable onPress={onSelect.bind(this,place.id)} style={({pressed}) => [pressed && styles.pressed]}>
                <Image source={{uri: place.imageUri}} style={styles.image}/>
                <View>
                    <Text style={styles.title}>{place.title}</Text>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default PlaceItem;