import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Sound from 'react-native-sound'; // Імпорт бібліотеки
import {ProgressBar} from 'react-native-paper';
import {MeditationsProps} from '../../../assets/Data/meditations-data.ts';
import {handleSharedQuote} from '../Home/shared.ts';

interface MeditationDetailsProps {
  meditationItem: MeditationsProps | null;
}

export const MeditationDetails = ({meditationItem}: MeditationDetailsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 хвилин у секундах
  const [sound, setSound] = useState<Sound | null>(null); // Стан для аудіо

  // Таймер
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);


  // Форматування часу
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Відтворення / Пауза
  const togglePlayPause = () => {
    if (!isPlaying) {
      sound?.play(success => {
        if (!success) {
          console.error('Помилка при відтворенні аудіо');
        }
      });
    } else {
      sound?.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleSharedQuote(meditationItem?.description)}
        style={styles.shareButton}>
        <Image
          source={require('../../../assets/images/icons/shared_icon.png')}
        />
      </TouchableOpacity>
      {/* Заголовок */}
      <Text style={styles.title}>{meditationItem?.title}</Text>
      {/* Опис */}
      <Text style={styles.description}>{meditationItem?.description}</Text>
      {/* Час */}
      <Text style={styles.time}>{formatTime(timeLeft)}</Text>
      {/* Кнопки */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.controlButton}>
          <Image
            source={
              isPlaying
                ? require('../../../assets/images/icons/play_player.png')
                : require('../../../assets/images/icons/stop_player.png')
            }
          />
        </TouchableOpacity>
      </View>
      {/* Прогрес-бар */}
      <ProgressBar
        progress={(300 - timeLeft) / 300}
        color="#FFC107"
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  shareButton: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(249, 191, 29, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    right: -150,
    top: -100,
  },
  progressBar: {
    width: 350,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(10, 57, 113, 1)',
  },
});
