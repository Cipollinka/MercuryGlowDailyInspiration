import {Alert, Share} from 'react-native';

export const handleSharedQuote = async (value: any) => {
  try {
    await Share.share({
      message: `✨ Quote of the Day: "${value}`,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Error sharing the quote', error.message);
    } else {
      Alert.alert('Error sharing the quote', 'An unknown error occurred.');
    }
  }
};
