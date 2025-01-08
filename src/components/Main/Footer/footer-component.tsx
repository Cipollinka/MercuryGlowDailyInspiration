import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface FooterProps {
  setViewPage: (goOver: string) => void;
  page: string; // Пропс для відображення активної сторінки
}

export const Footer = ({setViewPage, page}: FooterProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewPage('home')}>
        <Image
          source={
            page === 'home'
              ? require('../../../assets/images/icons/home_active_icon.png')
              : require('../../../assets/images/icons/home_icon.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewPage('son')}>
        <Image
          source={
            page === 'son'
              ? require('../../../assets/images/icons/son_active_icon.png')
              : require('../../../assets/images/icons/son_icon.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewPage('profile')}>
        <Image
          source={
            page === 'profile'
              ? require('../../../assets/images/icons/profile_active_icon.png')
              : require('../../../assets/images/icons/profile_icon.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewPage('meditations')}>
        <Image
          source={
            page === 'meditations' || page === 'meditation'
              ? require('../../../assets/images/icons/meditations_active_icon.png')
              : require('../../../assets/images/icons/meditations_icon.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    gap: 15,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    marginTop: 10,
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
