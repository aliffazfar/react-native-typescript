import React, {FC, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {Button, Input, PostRender} from '../components';
import firebase from 'firebase';

interface Props {
  navigation: any;
}

const App: FC<Props> = props => {
  const [msg, setMsg] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any>([]);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const fetchCurrentUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const user = await firebase.firestore().collection('users').doc(uid).get();

    setUser({id: user.id, ...user.data()});
  };

  const fetchPosts = async () => {
    firebase
      .firestore()
      .collection('posts')
      .where('approved', '==', true)
      .onSnapshot(querySnapShot => {
        const documents = querySnapShot.docs;
        setPosts(documents);
      });
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts();
  }, []);

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
      <View style={{flex: 0.5, marginTop: 50}}>
        {posts.length > 0 ? (
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostRender
                msg={item.data().msg}
                timeStamp={item.data().timeStamp}
                approved={item.data().approved}
              />
            )}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Nothing To Display</Text>
          </View>
        )}
      </View>
      <View style={{flex: 0.5}}>
        <Text>Home Screen</Text>
        <Button title="Sign Out" onPress={signOut} />
        <View>
          <Input
            placeholder="Write Something Here"
            onChangeText={text => setMsg(text)}
          />
          <Button title="Post" onPress={post} />
        </View>
        {user ? (
          user.isAdmin ? (
            <View>
              <Button
                title="Dashboard"
                onPress={() => props.navigation.navigate('dashboard')}
              />
            </View>
          ) : null
        ) : null}
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
