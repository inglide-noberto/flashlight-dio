import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import imagex from './assets/icons/eco-light.png'; //forma alternativa de pegar img
import imageoff from './assets/icons/eco-light-off.png';

const App = () => {
  const [toogle, setToogle] = useState(false); // false

  const handleChangeToogle = () => setToogle((oldToogle) => !oldToogle);

  useEffect(() => {
    // liga flash do celular
    Torch.switchState(toogle);
  }, [toogle]);

  useEffect(()=>{ /**
   * Quando o celular for chacoalhado, mudaremos o toogle
   */
    const subscription = RNShake.addListener(()=>{
      setToogle((oldToogle) => !oldToogle);
    });
    //Essa função vai ser chamada quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toogle ? style.containerLight : style.container} >
      <TouchableOpacity
        onPress={(handleChangeToogle)}>
        <Image
          style={toogle ? style.lightingOn : style.lightingOff}
          source={toogle ? imagex : imageoff}
        />
        <Image
          style={style.dioLogo}
          source={
            toogle
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')}
        />
      </TouchableOpacity>
    </View >
  );

};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});