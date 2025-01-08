import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DailyTips from '../../../assets/Data/daily-tips.json';
import { handleSharedQuote } from './../Home/shared.ts';
import { useUser } from '../../../user';

export const SonScreen = () => {
  const { user, saveUser } = useUser();
  const [tasks, setTasks] = useState(
    'Organize your workspace – Clear the clutter and create a calm environment',
  );
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 хвилин у секундах
  const [done, setDone] = useState(false);

  const handleRandomQuote = () => {
    const randomQuote = Math.floor(Math.random() * DailyTips.daily_tips.length);
    setTasks(DailyTips.daily_tips[randomQuote].tip);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeLeft > 0 && timeLeft < 5 * 60) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleDone = () => {
    if (timeLeft === 0) {
      // Додати виконане завдання до масиву завдань користувача
      const updatedTasks = [...(user?.tasks || []), tasks];
      saveUser({...user, tasks: updatedTasks}); // Оновити користувача в контексті
      console.log('Saving task:', tasks);
      Alert.alert('Success', 'Task saved successfully!'); // Повідомлення про успіх
      setDone(true);
      setTimeLeft(5 * 60); // Скидання таймера
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header_title}>🌟 Mercury Path</Text>
      <SafeAreaView style={styles.content_block}>
        <Text style={styles.title}>Today’s Focus:</Text>
        <Text style={styles.paragraph}>"{tasks}"</Text>
        <SafeAreaView style={styles.container_btn}>
          <TouchableOpacity
            onPress={() => {
              if (timeLeft === 0) {
                handleDone(); // Збереження виконаного завдання
              } else if (!done && timeLeft === 5 * 60) {
                setTimeLeft(prev => prev - 1); // Запуск таймера
              }
              setDone(false);
            }}
            style={[
              styles.discoverBtn,
              {
                backgroundColor: done
                  ? 'rgba(249, 191, 29, 1)'
                  : 'rgba(1, 38, 82, 1)',
              },
            ]}>
            <Text
              style={[
                styles.discover_text,
                {
                  color: done
                    ? 'rgba(1, 38, 82, 1)'
                    : 'rgba(249, 191, 29, 1)',
                },
              ]}>
              {timeLeft === 5 * 60 && !done
                ? 'Take the focus'
                : timeLeft > 0
                  ? formatTime(timeLeft)
                  : 'Done'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSharedQuote(tasks)}
            style={styles.sharedBtn}>
            <Image
              source={require('../../../assets/images/icons/shared_icon.png')}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <TouchableOpacity onPress={handleRandomQuote} style={styles.path_button}>
        <Image source={require('../../../assets/images/icons/remove_icon.png')} />
        <Text style={styles.path_text}>New path</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 100,
    gap: 10,
  },
  header_title: {
    fontSize: 24,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 1)',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  paragraph: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
  content_block: {
    width: 327,
    height: 232,
    backgroundColor: 'rgba(10, 57, 113, 1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
    paddingLeft: 12,
    gap: 20,
  },
  path_button: {
    width: 237,
    height: 52,
    borderRadius: 500,
    backgroundColor: 'rgba(10, 57, 113, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  path_text: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(249, 191, 29, 1)',
    textAlign: 'center',
  },
  discoverBtn: {
    borderRadius: 500,
    width: 237,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  discover_text: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  sharedBtn: {
    backgroundColor: 'rgba(249, 191, 29, 1)',
    borderRadius: 22,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
