import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Post extends React.PureComponent {
  render() {
    const {post, settings, updateSettings} = this.props;

    const postStyles = StyleSheet.create({
      postContainerBoth: {
        borderTopColor: 'gray',
        borderTopWidth: 1,
        padding: 5,
        backgroundColor: 'white',
      },
      postContainerLH: {
        display: 'flex',
        flexDirection: 'row-reverse',
      },
      postContainerRH: {
        display: 'flex',
        flexDirection: 'row',
      },
      textContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
      },
      imageContainer: {
        width: '20%',
      },
      postImage: {
        width: 50,
        height: 50,
      },
      upvotes: {
        color: 'green',
      },
      downvotes: {
        color: 'red',
      },
      postScore: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      },
    });

    function titleRender() {
      let title = post.title.split('');
      if (title.length > 40) {
        return <Text>{title.slice(0, 40).join('') + '...'}</Text>;
      } else {
        return <Text>{post.title}</Text>;
      }
    }

    function scoreRender() {
      return (
        <View style={postStyles.postScore}>
          <Icon name="arrow-up-thick" size={10} />
          <Text>{post.score}</Text>
          <Icon name="arrow-down-thick" size={10} />
        </View>
      );
    }

    function imageRender() {
      if (post.thumbnail.match(RegExp(/https|http/g))) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(post.name);
              updateSettings('currentlyViewing', post);
              updateSettings('modalOpen', true);
              updateSettings('overlayOpen', true);
            }}>
            <Image
              source={{
                uri: post.thumbnail,
              }}
              style={postStyles.postImage}
            />
          </TouchableWithoutFeedback>
        );
      } else if (post.thumbnail === 'image') {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(post.name);
              updateSettings('currentlyViewing', post);
              updateSettings('modalOpen', true);
              updateSettings('overlayOpen', true);
            }}>
            <Image
              source={{
                uri: post.url,
              }}
              style={postStyles.postImage}
            />
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(post.name);
              updateSettings('currentlyViewing', post);
              updateSettings('modalOpen', true);
              updateSettings('overlayOpen', true);
            }}>
            <Icon name="reddit" style={postStyles.postImage} size={50} />
          </TouchableWithoutFeedback>
        );
      }
    }

    return (
      <View
        style={[
          postStyles.postContainerBoth,
          settings.leftHanded
            ? postStyles.postContainerLH
            : postStyles.postContainerRH,
        ]}>
        <View style={postStyles.textContainer}>
          {titleRender()}
          <Text style={postStyles.title}>{post.subreddit_name_prefixed}</Text>
          {scoreRender()}
        </View>
        <View style={postStyles.imageContainer}>{imageRender()}</View>
      </View>
    );
  }
}

export default Post;
