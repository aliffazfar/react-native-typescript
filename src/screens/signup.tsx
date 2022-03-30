import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '../components';

const App: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Input placeholder="Name" onChangeText={text => console.log(text)} />
      <Input placeholder="Email" onChangeText={text => console.log(text)} />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={text => console.log(text)}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
