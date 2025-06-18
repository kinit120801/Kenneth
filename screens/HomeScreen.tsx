import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert, BackHandler, Dimensions, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {
  addComment,
  API_URL,
  createPost,
  fetchPosts,
  likePost,
  unlikePost,
  updateComment,
} from '../api/postApi';
import { searchUsers } from '../api/userApi';
import type { RootStackParamList } from '../App';
import CreatePostModal from '../components/CreatePostModal';
import PostItem from '../components/PostItem';
import styles from '../styles/styles';
import { Post, User } from '../types';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        return;
      }
      const response = await fetch(`${API_URL}/fetchuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
      setUserId(data.id.toString());
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch user information.');
    }
  };

  const fetchPostsHandler = async (reset = false) => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await fetchPosts(reset ? 1 : page);
      const newData: Post[] = Array.isArray(data) ? data : [];
      setPosts((prev) => {
        const combined = reset ? newData : [...prev, ...newData];
        const uniquePosts = Array.from(new Map(combined.map((post) => [post.id, post])).values());
        return uniquePosts;
      });
      if (!reset) setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() || !userId) return;
    try {
      setLoading(true);
      const response = await createPost(newPost);
      const newPostObj = {
        ...response.data.post,
        likes: response.data.post.likes ?? [],
        comments: response.data.post.comments ?? [],
      };
      setPosts((prev) => [newPostObj, ...prev]);
      setNewPost('');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: number, liked: boolean) => {
    if (!userId) return;
    try {
      liked ? await unlikePost(postId) : await likePost(postId);
      fetchPostsHandler(true);
    } catch (error) {
      console.error('Failed to like/unlike post:', error);
    }
  };

  const handleComment = async (postId: number, comment: string) => {
    if (!userId) return;
    try {
      await addComment(postId, comment);
      fetchPostsHandler(true);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleEditComment = async (commentId: number, content: string) => {
    try {
      const response = await updateComment(commentId, content);
      return response.data.comment ?? {
        id: commentId,
        content,
        user: user,
      };
    } catch (e) {
      Alert.alert('Error', 'Failed to update comment');
      return undefined;
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You are not logged in.');
        return;
      }
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      await AsyncStorage.removeItem('token');
      setUserId(null);
      setPosts([]);
      setNewPost('');
      setPage(1);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPostsHandler(true);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
      fetchPostsHandler(true);

      const onBackPress = () => true;
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    let isActive = true;
    if (searchQuery.trim() !== '') {
      (async () => {
        setSearching(true);
        try {
          const res = await searchUsers(searchQuery);
          if (isActive) setSearchResults(res.data);
        } catch {
          if (isActive) setSearchResults([]);
        } finally {
          if (isActive) setSearching(false);
        }
      })();
    } else {
      setSearchResults([]);
    }
    return () => { isActive = false; };
  }, [searchQuery]);

  return (
    <View style={{ flex: 1, backgroundColor: '#orange', paddingHorizontal: 20, paddingTop: 50 }}>
      {/* Decorative Background */}
      <View style={{ position: 'absolute', top: -40, left: -30, width: 150, height: 150, backgroundColor: '#orange', borderRadius: 75, opacity: 0.07 }} />
      <View style={{ position: 'absolute', bottom: 100, right: -40, width: 180, height: 180, backgroundColor: '#orange', borderRadius: 90, opacity: 0.05 }} />

      {userId ? (
        <>
          {/* ✅ Fixed Search Input */}
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#fff',
                borderRadius: 25,
                paddingHorizontal: 16,
                paddingVertical: 8,
                fontSize: 16,
                color: '#000',
              }}
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
          </View>

          {/* Header Row */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Image
                source={
                  user?.profile_picture
                    ? { uri: user.profile_picture.startsWith('http') ? user.profile_picture : `${API_URL.replace('/api', '')}${user.profile_picture}` }
                    : require('../assets/avatar.jpg')
                }
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#eee' }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.mindInput, { flex: 1 }]} onPress={() => setShowPostModal(true)}>
              <Text style={{ color: '#d8b4fe' }}>What's on your mind?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.burgerBtn}>
              <Icon name="menu" size={28} />
            </TouchableOpacity>
          </View>

          {/* Menu Modal */}
          <Modal visible={showMenu} transparent animationType="fade" onRequestClose={() => setShowMenu(false)}>
            <TouchableOpacity style={styles.menuOverlay} onPress={() => setShowMenu(false)}>
              <View style={styles.menuModal}>
                <TouchableOpacity onPress={() => { setShowMenu(false); navigation.navigate('ProfileScreen'); }} style={styles.menuItem}>
                  <Icon name="user" size={20} color="#d8b4fe" />
                  <Text style={{ marginLeft: 8, color: '#d8b4fe' }}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowMenu(false); navigation.navigate('PersonalDetailsScreen'); }} style={styles.menuItem}>
                  <Icon name="info" size={20} color="#d8b4fe" />
                  <Text style={{ marginLeft: 8, color: '#d8b4fe' }}>Personal Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                  <Icon name="log-out" size={20} color="#d8b4fe" />
                  <Text style={{ marginLeft: 8, color: '#d8b4fe' }}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Create Post Modal */}
          <CreatePostModal
            visible={showPostModal}
            value={newPost}
            onChangeText={setNewPost}
            onSubmit={async () => {
              await handleCreatePost();
              setShowPostModal(false);
            }}
            onClose={() => setShowPostModal(false)}
            loading={loading}
          />

          {/* Search Result OR Post Feed */}
          {searchQuery.trim() !== '' && !searching ? (
            searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      borderBottomWidth: 1,
                      borderColor: '#eee',
                      backgroundColor: '#fff',
                    }}
                    onPress={() => {
                      setSearchResults([]);
                      setSearchQuery('');
                      navigation.navigate('UserProfileScreen', { userId: String(item.id) });
                    }}
                  >
                    <Image
                      source={item.profile_picture ? { uri: item.profile_picture } : require('../assets/avatar.jpg')}
                      style={{ width: 36, height: 36, borderRadius: 18, marginRight: 10 }}
                    />
                    <View>
                      <Text style={{ fontWeight: 'bold' }}>{item.first_name} {item.last_name}</Text>
                      <Text>@{item.username}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>No User Found</Text>
              </View>
            )
          ) : (
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <PostItem
                  post={item}
                  userId={userId}
                  currentUser={user ?? undefined}
                  onLike={handleLike}
                  onComment={handleComment}
                  onRefresh={handleRefresh}
                  onEditComment={handleEditComment}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              onEndReached={() => {
                if (!loading && !isFetchingMore) {
                  setIsFetchingMore(true);
                  fetchPostsHandler();
                }
              }}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                loading ? <ActivityIndicator size="small" style={{ marginTop: 10 }} /> : null
              }
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          )}
        </>
      ) : (
        <ActivityIndicator style={{ marginTop: 20 }} />
      )}
    </View>
  );
};

export default HomeScreen;
