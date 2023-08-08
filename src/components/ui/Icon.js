import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const Icon = ({name, color, size, onPress, style}) => {
    return (
        <Pressable onPress={onPress} style={style}>
            <Ionicons name={name} color={color} size={size}/>
        </Pressable>
    )
}

export default Icon;