import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {data, MeditationsProps} from '../../../assets/Data/meditations-data.ts';
import {handleSharedQuote} from '../Home/shared.ts';
import {useUser} from '../../../user';

interface MeditationsScreenProps {
  page: (value: ((prevState: string) => string) | string) => void;
  onSelectedMeditation: (
    value: MeditationsProps,
  ) => void;
}

export const MeditationsScreen = ({
  page,
  onSelectedMeditation,
}: MeditationsScreenProps) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Mercury Meditations</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.meditations.map(item => (
            <View style={styles.container_content} key={item.id}>
              <Text style={styles.title_content}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <SafeAreaView style={styles.button_container}>
                <TouchableOpacity
                  onPress={() => {
                    page('meditation');
                    onSelectedMeditation(item);
                  }}
                  style={styles.meditationBtn}>
                  <Text style={styles.btn_text}>Take the meditation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSharedQuote(item.description)}
                  style={styles.sharedBtn}>
                  <Image
                    source={require('../../../assets/images/icons/shared_icon.png')}
                  />
                </TouchableOpacity>
              </SafeAreaView>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    marginBottom: 200,
    gap: 30,
  },
  title: {
    fontWeight: '900',
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
  },
  container_content: {
    width: 327,
    height: 300,
    backgroundColor: 'rgba(10, 57, 113, 1)',
    borderRadius: 32,
    marginBottom: 20,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 35,
  },
  title_content: {
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 7,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 29,
  },
  button_container: {
    flexDirection: 'row',
    gap: 4,
  },
  meditationBtn: {
    backgroundColor: 'rgba(1, 38, 82, 1)',
    width: 237,
    height: 52,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(249, 191, 29, 1)',
  },
  sharedBtn: {
    width: 52,
    height: 52,
    borderRadius: 22,
    backgroundColor: 'rgba(249, 191, 29, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
