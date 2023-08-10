import { View, StatusBar } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {HomeStyles} from '../styles/styles'
import React, { useState, useEffect } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import tw from 'twrnc';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = React.useState(true)

  const [mapRegion, setMapRegion] = useState({
    latitude: 15.513542492724076,
    longitude: -88.02095660516773,
    latitudeDelta: 0.0011,
    longitudeDelta: 0.0012
  })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [])
  

  if( isLoading ){
    return(
     <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
       <AnimatedLottieView
       source={require('../assets/loadingCar.json')}
       autoPlay
       loop
       style={tw`w-[200] h-[200]`}
       />
     </View>
    ) 
   }else{
     return (
      <View style={[HomeStyles.container]}>
        <StatusBar backgroundColor={'#020202'} translucent={true}/>
        <MapView 
        style={[HomeStyles.map]}
        region={mapRegion}
        >
          <Marker 
            coordinate={mapRegion} 
            title='Taller Carsol'

          />
        </MapView>
      </View>
     );
   }
}