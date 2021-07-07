import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {useTempSettings} from '../state/TempSettingsContext';
import {WebView} from 'react-native-webview';

const extraStyles = StyleSheet.create({
  textPost: {},
  imagePost: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  linkPost: {
    width: '100%',
    height: '100%',
  },
});

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
  return <Image source={{uri: post.url}} style={extraStyles.imagePost} />;
};

const LinkPost = ({post}) => {
  const urlSplit = post.url.split(':');
  if (urlSplit[0] === 'http') {
    urlSplit[0] = 'https';
  }
  return (
    <View style={extraStyles.linkPost}>
      <WebView source={{uri: urlSplit.join(':')}} />
    </View>
  );
};

const PostModal = () => {
  const tempSettings = useTempSettings();

  const styles = StyleSheet.create({
    modalContainer: {
      display: tempSettings.modalOpen ? 'flex' : 'none',
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
    if (tempSettings.currentlyViewing.is_self) {
      return <TextPost post={tempSettings.currentlyViewing} />;
    } else if (tempSettings.currentlyViewing.is_gallery) {
      return <Text>This is a Gallery Post</Text>;
    } else if (tempSettings.currentlyViewing.post_hint === 'image') {
      return <ImagePost post={tempSettings.currentlyViewing} />;
    } else if (tempSettings.currentlyViewing.post_hint === 'hosted:video') {
      return <Text>This is a Hosted Video post</Text>;
    } else if (tempSettings.currentlyViewing.post_hint === 'rich:video') {
      return <Text>This is a Rich:Video</Text>;
    } else if (tempSettings.currentlyViewing.post_hint === 'link') {
      return <LinkPost post={tempSettings.currentlyViewing} />;
    } else {
      return <Text>This type of post is not yet defined</Text>;
    }
  }

  return (
    <View style={styles.modalContainer}>
      {tempSettings.currentlyViewing ? postTypeSorter() : null}
    </View>
  );
};

export default PostModal;
