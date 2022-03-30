import React, {FC, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from '../components';
import firebase from 'firebase';

const App: FC = props => {
  const [msg, setMsg] = useState<string | null>(null);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const post = async () => {
    if (msg) {
      const data = {
        msg,
        timeStamp: Date.now(),
        approved: false,
      };

      try {
        await firebase.firestore().collection('posts').add(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(`Missing Fields`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
      <View>
        <Input
          placeholder="Write Something Here"
          onChangeText={text => setMsg(text)}
        />
        <Button title="Post" onPress={post} />
      </View>
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
