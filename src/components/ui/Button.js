import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from './Icon'

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        backgroundColor:'#11710D',
        borderRadius:6,
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:8,
    },
    icon:{
        marginHorizontal:8,
    },
    text:{
        fontSize:20,
        color:'white'
    },
    pressed:{
        opacity:0.5,
    }
})

const Button = ({title, iconName, iconSize, iconColor, onPress}) => {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Icon name={iconName} color={iconColor} size={iconSize} style={styles.icon}/>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default Button;