import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

const Splash = () => {
    return (
        <View style={styles.container}>
            <Text>Splash screen</Text>
        </View>
    )
}

export default Splash;