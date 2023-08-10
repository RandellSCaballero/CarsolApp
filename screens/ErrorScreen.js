import { Text, View, StatusBar } from 'react-native';
import { registerStyles } from '../styles/styles'

export default function Error() {

  return (
    <View style={[registerStyles.container]}>
      <StatusBar backgroundColor={'#ea071d'} translucent={true}/>
      <View style={registerStyles.logo}>
        <Text style={{
          color: "#020202",
          fontSize: 25,
          fontWeight: 'bold',
          fontStyle: 'italic'
        }}>Error</Text>
      </View>
    </View>
  );
}