import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { View } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import tw from 'twrnc';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [])

  if( isLoading ){
   return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <AnimatedLottieView
      source={require('./assets/loadingCar.json')}
      autoPlay
      loop
      style={tw`w-[200] h-[200]`}
      />
    </View>
   ) 
  }else{
    return (
            <Navigation/>
    );
  }
}
