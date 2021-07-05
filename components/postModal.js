import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  // Button,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {useUpdateSettings, useSettings} from '../state/AppSettingsContext';
import LoadingSpinner from './loadingSpinner';
import {supplyToken} from '../functions/loginFunctions';

import {WebView} from 'react-native-webview';

const TextPost = ({post}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{post.title}</Text>
        <Text>{post.selftext}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const ImagePost = ({post}) => {
  return (
    <Image
      source={{uri: post.url}}
      style={{width: '100%', height: '100%', resizeMode: 'contain'}}
    />
    // <Text>{post.url}</Text>
  );
};

const LinkPost = ({post}) => {
  const urlSplit = post.url.split(':');
  if (urlSplit[0] === 'http') {
    urlSplit[0] = 'https';
  }
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView source={{uri: urlSplit.join(':')}} />
    </View>
    // <Text>{JSON.stringify(urlSplit.join(':'))}</Text>
  );
};

const PostModal = () => {
  const settings = useSettings();
  // const updateSettings = useUpdateSettings();

  const styles = StyleSheet.create({
    modalContainer: {
      display: settings.modalOpen ? 'flex' : 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    postHeaderContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: 'black',
      borderBottomWidth: 1,
      borderStyle: 'solid',
    },
    postHeader: {},
  });

  function postTypeSorter() {
    if (settings.currentlyViewing.is_self) {
      return <TextPost post={settings.currentlyViewing} />;
    } else if (settings.currentlyViewing.is_gallery) {
      return <Text>This is a Gallery Post</Text>;
    } else if (settings.currentlyViewing.post_hint === 'image') {
      return <ImagePost post={settings.currentlyViewing} />;
    } else if (settings.currentlyViewing.post_hint === 'hosted:video') {
      return <Text>This is a Hosted Video post</Text>;
    } else if (settings.currentlyViewing.post_hint === 'rich:video') {
      return <Text>This is a Rich:Video</Text>;
    } else if (settings.currentlyViewing.post_hint === 'link') {
      return <LinkPost post={settings.currentlyViewing} />;
    } else {
      return <Text>This type of post is not yet defined</Text>;
    }
  }

  return (
    <View style={styles.modalContainer}>
      {settings.currentlyViewing ? postTypeSorter() : null}
    </View>
  );
};

export default PostModal;
