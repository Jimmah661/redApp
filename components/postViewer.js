import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LoadingSpinner from './loadingSpinner';
import Post from './PostViewer/post';
import {supplyToken} from '../functions/loginFunctions';
import {useSettings, useUpdateSettings} from '../state/AppSettingsContext';
import PostModal from './postModal';
// const window = Dimensions.get('window');

// TODO - Need to sort out a better refreshing view
// it's super jarring to clear the screen and go back to the loading spinnger

const PostViewer = ({children}) => {
  const settings = useSettings();
  const updateSettings = useUpdateSettings();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const after = useRef(null);
  // const loaded = useRef(false);

  function loadPosts() {
    supplyToken('redappAccessToken').then(token => {
      let url;
      let headers;
      if (token) {
        url = 'https://oauth.reddit.com/best';
        headers = {
          headers: {
            Authorization: `bearer ${token}`,
          },
        };
      } else {
        url = 'https://www.reddit.com/top.json';
      }
      if (after.current) {
        url += `?after=${after.current}`;
      }
      fetch(url, headers)
        .then(res => res.json())
        .then(jsonData => {
          setLoading(false);
          after.current = jsonData.data.after;
          setPosts(p => [...p, ...jsonData.data.children]);
        });
    });
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const refreshPosts = () => {
    setLoading(true);
    setPosts([]);
    after.current = null;
    loadPosts();
  };

  if (loading) {
    return (
      <View style={styles.spinner}>
        <LoadingSpinner size={80} />
      </View>
    );
  } else {
    return (
      <View style={styles.flexOne}>
        <FlatList
          data={posts}
          extraData={posts}
          keyExtractor={(item, index) => item.data.name}
          renderItem={item => (
            <Post
              post={item.item.data}
              settings={settings}
              updateSettings={updateSettings}
            />
          )}
          refreshing={loading}
          onRefresh={refreshPosts}
          // onEndReached={loadPosts}
          onEndReachedThreshold={0.3}
          inverted={settings.invertedScrolling}
        />
        <PostModal />
        {children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostViewer;
