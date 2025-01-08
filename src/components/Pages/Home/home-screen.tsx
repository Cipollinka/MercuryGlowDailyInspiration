import {
  Alert,
  Image,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QuotesData from '../../../assets/Data/quotes-data.json';
import {useState} from 'react';
import {handleSharedQuote} from './shared.ts';
import {useUser} from '../../../user';

interface HomeScreenProps {
  page: (value: ((prevState: string) => string) | string) => void;
}

export const HomeScreen = ({page}: HomeScreenProps) => {
  const {user, saveUser} = useUser();
  const [quoteValue, setQuoteValue] = useState(
    'You are the light in your own life.',
  );
  const handleRandomQuote = () => {
    const randomQuote = Math.floor(Math.random() * QuotesData.length);
    const newQuote = QuotesData[randomQuote].quote;

    // Додаємо нову цитату до масиву quotes
    const updatedQuotes = Array.isArray(user.quotes)
      ? [...user.quotes, newQuote]
      : [newQuote];

    // Оновлюємо стан користувача
    saveUser({...user, quotes: updatedQuotes});

    // Оновлюємо поточну цитату
    setQuoteValue(newQuote);
  };
  const handleMercuryPage = (go: string) => {
    page(go);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header_title}>Welcome [Nickname]</Text>
      <SafeAreaView style={styles.content_block}>
        <Text style={styles.title}>✨ Your Spark of the Day</Text>
        <Text style={styles.paragraph}>"{quoteValue}"</Text>
        <SafeAreaView style={styles.container_btn}>
          <TouchableOpacity
            onPress={handleRandomQuote}
            style={styles.discoverBtn}>
            <Text style={styles.discover_text}>Discover More Sparks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSharedQuote(quoteValue)}
            style={styles.sharedBtn}>
            <Image
              source={require('../../../assets/images/icons/shared_icon.png')}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <TouchableOpacity onPress={() => handleMercuryPage('son')} style={styles.path_button}>
        <Text style={styles.path_text}>✨ Mercury Path</Text>
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
    backgroundColor: 'rgba(249, 191, 29, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  path_text: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(1, 38, 82, 1)',
    textAlign: 'center',
  },
  discoverBtn: {
    backgroundColor: 'rgba(1, 38, 82, 1)',
    borderRadius: 500,
    width: 237,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discover_text: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(249, 191, 29, 1)',
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
