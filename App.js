import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './src/screens/AllPlaces';
import AddPlace from './src/screens/AddPlace'
import { Ionicons } from '@expo/vector-icons';
import Icon from './src/components/ui/Icon';
import Map from './src/screens/Map';
import { useEffect, useState } from 'react';
import { init } from './src/utils/database';
import Splash from './src/screens/Splash';
import PlaceDetails from './src/screens/PlaceDetails';

const Stack = createNativeStackNavigator()

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  if(!dbInitialized)
    return <Splash/>;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:'#11710D'
        },
        headerTintColor:'white'
      }}>
        <Stack.Screen
          name='AllPlaces'
          component={AllPlaces}
          options={({navigation}) => ({
            headerRight:({color, size}) => <Icon name='add' color={'white'} size={24} onPress={() => navigation.navigate('AddPlace')}/>
          })}
        />
        <Stack.Screen
          name='AddPlace'
          component={AddPlace}
        />
        <Stack.Screen
          name='Map'
          component={Map}
        />
        <Stack.Screen
          name='PlaceDetails'
          component={PlaceDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
