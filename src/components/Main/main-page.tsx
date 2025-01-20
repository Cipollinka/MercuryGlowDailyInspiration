import {ImageBackground, StyleSheet, View} from 'react-native';
import {Footer} from './Footer/footer-component.tsx';
import {useState} from 'react';
import {HomeScreen} from '../Pages/Home/home-screen.tsx';
import {SonScreen} from '../Pages/Son/son-screen.tsx';
import {ProfileScreen} from '../Pages/Profile/profile-screen.tsx';
import {MeditationsScreen} from '../Pages/Meditations/meditations-screen.tsx';
import {MeditationDetails} from '../Pages/Meditations/meditation-details.tsx';
import {MeditationsProps} from '../../assets/Data/meditations-data.ts';
import {useUser} from '../../user';

export const Main = () => {
  const {user, saveUser} = useUser();
  const [page, setPage] = useState('profile');
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationsProps | null>(null);

  // Функція для рендерингу сторінок
  const renderPages = () => {
    switch (page) {
      case 'home':
        return <HomeScreen page={setPage} />;
      case 'son':
        return <SonScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'meditations':
        return (
          <MeditationsScreen
            page={setPage}
            onSelectedMeditation={setSelectedMeditation}
          />
        );
      case 'meditation':
        return <MeditationDetails meditationItem={selectedMeditation} />;
      default:
        return <ProfileScreen />;
    }
  };

  // Обробка зміни сторінки через Footer
  const handlePageFooter = (goOver: string) => {
    if (goOver === 'meditation') {
      if (selectedMeditation) {
        // Оновлюємо session як масив
        saveUser({
          ...user,
          session: [...(user?.session || []), selectedMeditation],
        });
        console.log('Added to session:', selectedMeditation);
      } else {
        console.warn('No meditation selected!');
      }
    }
    console.log('Selected meditation:', selectedMeditation);
    setPage(goOver);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={
          require('../../assets/images/bg.png')
        }>
        <View style={styles.container}>
          {renderPages()}
          <Footer page={page} setViewPage={handlePageFooter} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
});
