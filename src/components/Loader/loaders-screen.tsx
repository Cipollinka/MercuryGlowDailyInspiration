import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';

export const Loaders = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground(prev => prev + 1);
    }, 2000);

    if (currentBackground > 1) {
      clearInterval(interval);
      navigation.navigate(ScreenName.OnBoards);
    }

    return () => clearInterval(interval);
  }, [currentBackground, navigation]);

  return (
    <View style={styles.container}>
      {currentBackground === 0 && (
        <ImageBackground
          style={styles.imageBg}
          source={require('../../assets/images/loader_one.png')}
        />
      )}
      {currentBackground === 1 && (
        <ImageBackground
          style={styles.imageBg}
          source={require('../../assets/images/loader_two.png')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
});
