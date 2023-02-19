import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface PostProps {
  title: string;
  body: string;
}

const Post: React.FC<PostProps> = ({title, body}) => {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
  body: {
    fontSize: 16,
  },
});

export default Post;
