import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Post from './Post';

interface PostData {
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => setPosts(json))
        .catch(error => console.error(error));
    }
    setIsLoading(false);
    return () => setPosts([]);
  }, [isLoading]);

  const filteredPosts = posts.filter(post => {
    if (!searchText) {
      return post;
    }
    const postTitle = post.title.toLowerCase();
    const postBody = post.body.toLowerCase();
    const searchTextLower = searchText.toLowerCase();
    return (
      postTitle.includes(searchTextLower) || postBody.includes(searchTextLower)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Posts from API</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsLoading(true)}>
          <Text style={styles.buttonText}>Refresh Posts</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchBox}
          placeholder="Search..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <FlatList
        data={filteredPosts}
        renderItem={({item}: any) => (
          <Post title={item.title} body={item.body} />
        )}
        keyExtractor={(item: any) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={() => setIsLoading(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PostList;
