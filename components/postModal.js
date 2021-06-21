import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, SafeAreaView, Text, Image} from 'react-native';
import {useUpdateSettings, useSettings} from '../state/AppSettingsContext';
import LoadingSpinner from './loadingSpinner';
import {supplyToken} from '../functions/loginFunctions';

import {WebView} from 'react-native-webview';

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
      return <Text>This is a Text post</Text>;
    } else if (settings.currentlyViewing.is_gallery) {
      return <Text>This is a Gallery Post</Text>;
    } else if (settings.currentlyViewing.post_hint === 'image') {
      return <Text>This is an Image post</Text>;
    } else if (settings.currentlyViewing.post_hint === 'hosted:video') {
      return <Text>This is a Hosted Video post</Text>;
    } else {
      return <Text>This type of post is not yet defined</Text>;
    }
  }


  return (
    <View style={styles.modalContainer}>
      {settings.currentlyViewing ? (
        // <>
        //   <View style={styles.postHeaderContainer}>
        //     <Text>{settings.currentlyViewing.title}</Text>
        //   </View>
        //   <Text>{settings.currentlyViewing.post_hint}</Text>
        //   {settings.currentlyViewing.post_hint === 'image' ? <Image source={{uri: settings.currentlyViewing.url}} style={{width: '100%', height: '100%', resizeMode: 'contain', alignSelf: 'center', backgroundColor:'blue'}} /> : <Text>Not Image</Text>}
        // </>
        postTypeSorter()
      ) : null}
      {/* {settings.currentlyViewing ? (
        <WebView source={{uri: settings.currentlyViewing.url}} />
      ) : null} */}
    </View>
  );
};

export default PostModal;
