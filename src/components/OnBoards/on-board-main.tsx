import {ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OnBoardData from '../../assets/Data/on-boards-data.json';
import {useEffect, useState} from 'react';
import {ScreenName, useNavigation} from '../../user/lib/hooks/use-navigation.tsx';
import {NickName} from './on-board-children/on-board-nickName.tsx';
import {useUser} from '../../user';

const PaginationIndicator = ({totalPages, currentPage}: any) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({length: totalPages}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentPage === index && styles.activeIndicator,
          ]}
        />
      ))}
    </View>
  );
};

export const OnBoardMain = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();
  const [validationInput, setValidationInput] = useState('');
  const [currentContent, setCurrentContent] = useState(0);

  const isNextDisabled = currentContent >= OnBoardData.length && !validationInput;

  useEffect(() => {
    if (user?.onBoards && user.onBoards.length >= OnBoardData.length) {
      if (user?.nickName && user.nickName.length > 0) {
        navigation.navigate(ScreenName.Main);
      }
    }
  }, [user?.onBoards, navigation]);

  const handleNextContent = () => {
    console.log('Поточний контент:', OnBoardData[currentContent]);
    saveUser({
      ...user,
      onBoards: [...user?.onBoards, currentContent], // Зберігаємо поточний етап
    });
    if (currentContent < OnBoardData.length) {
      setCurrentContent(currentContent + 1);
    }
  };
  console.log('User OnBoards', user?.onBoards);
  const handleSave = () => {
    saveUser({
      ...user,
      nickName: [...user?.nickName, validationInput], // Зберігаємо поточний етап
    });
    navigation.navigate(ScreenName.Main);
  };
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/bg.png')}>
        <View style={styles.container}>
          <SafeAreaView style={styles.content_block}>
            {currentContent < OnBoardData.length ? (
              <SafeAreaView>
                <Text style={styles.title}>
                  {OnBoardData[currentContent].title}
                </Text>
                <Text style={styles.paragraph}>
                  {OnBoardData[currentContent].description}
                </Text>
              </SafeAreaView>
            ) : (
              <NickName value={validationInput} setValue={setValidationInput} />
            )}
            <TouchableOpacity
              style={[styles.btn_next, {backgroundColor: isNextDisabled ? 'rgba(249, 191, 29, 0.5)' : 'rgba(249, 191, 29, 1)'}]}
              onPress={currentContent < OnBoardData.length ? handleNextContent : handleSave}>
              <Text style={styles.btnText}>
                {currentContent < OnBoardData.length ? 'Next' : 'Save'}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
          {currentContent < OnBoardData.length ? (
            <PaginationIndicator totalPages={5} currentPage={currentContent} />
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    height: 300,
    marginTop: 'auto',
    alignItems: 'center',
    gap: 10,
  },
  btn_next: {
    width: 237,
    height: 52,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content_block: {
    width: 327,
    height: 252,
    backgroundColor: 'rgba(10, 57, 113, 1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
  btnText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(1, 38, 82, 1)',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#555', // Колір неактивного індикатора
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#FFC107', // Колір активного індикатора
    width: 12, // Розмір активного індикатора
    height: 12,
  },
});
