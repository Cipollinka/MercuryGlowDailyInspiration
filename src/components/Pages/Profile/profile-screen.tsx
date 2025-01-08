import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../../user';
import {
  ScreenName,
  useNavigation,
} from '../../../user/lib/hooks/use-navigation.tsx';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();

  console.log(user?.session);
  const handleDeleteDate = () => {
    saveUser({
      ...user,
      quotes: [],
      session: [],
      tasks: [],
      onBoards: [],
      nickName: '',
    });
    navigation.navigate(ScreenName.Loader);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title_name_user}>Welcome, [{user?.nickName}]</Text>
      <TouchableOpacity onPress={handleDeleteDate}>
        <Text style={styles.change_btn}>Delete data</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>🌅 Your Journey</Text>
      <SafeAreaView style={styles.results_list}>
        <SafeAreaView style={styles.result_item}>
          <Text style={styles.result_number}>{user?.quotes.length}</Text>
          <Text style={styles.result_text}>Sparks Collected</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.result_item}>
          <Text style={styles.result_number}>{user?.tasks.length}</Text>
          <Text style={styles.result_text}>Tasks Completed</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.result_item}>
          <Text style={styles.result_number}>{user?.session.length}</Text>
          <Text style={styles.result_text}>Calm Sessions</Text>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title_name_user: {
    fontSize: 24,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 1)',
  },
  change_btn: {
    fontWeight: '400',
    fontSize: 16,
    marginTop: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  paragraph: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 32,
    color: 'rgba(255, 255, 255, 1)',
  },
  results_list: {
    marginTop: 27,
    gap: 7,
  },
  result_item: {
    width: 307,
    height: 74,
    backgroundColor: 'rgba(10, 57, 113, 1)',
    borderRadius: 22,
    alignItems: 'center',
    paddingLeft: 31,
    gap: 23,
    flexDirection: 'row',
  },
  result_number: {
    fontSize: 24,
    fontWeight: '900',
    color: 'rgba(249, 191, 29, 1)',
  },
  result_text: {
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
