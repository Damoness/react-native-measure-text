import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from 'react-native';

import React from 'react';

type Props = {
  label: string; //
} & TextInputProps;

const TextInputItem: React.FC<Props> = ({ label, ...textInputProps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.rightView}>
        <TextInput {...textInputProps} />
      </View>
    </View>
  );
};

export default TextInputItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },

  leftView: {
    width: 100,
  },
  labelText: {
    textAlign: 'center',
  },
  rightView: {
    minHeight: 100,
    flex: 1,
    backgroundColor: 'gray',
  },
});
