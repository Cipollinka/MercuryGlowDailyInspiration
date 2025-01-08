import {StyleSheet, Text, TextInput, View} from 'react-native';

interface NickNameProps {
  value: string;
  setValue: (value: ((prevState: string) => string) | string) => void;
}

export const NickName = ({value, setValue}: NickNameProps) => {
  return (
    <View>
      <TextInput
        style={styles.container}
        placeholder="Nickname"
        placeholderTextColor="rgba(113, 115, 116, 1)"
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 237,
    height: 52,
    backgroundColor: 'rgba(1, 38, 82, 1)',
    borderRadius: 500,
    paddingLeft: 20,
    paddingRight: 20,
    color:'white',
  },
});
