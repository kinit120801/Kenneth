import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CommentsModal from './CommentsModal';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App';
import { API_URL } from '../api/postApi';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  profile_picture?: string;
};

type Comment = {
  id: number;
  content: string;
  user: User;
};

type Post = {
  id: number;
  user: User;
  content: string;
  likes: { user_id: string }[];
  comments: Comment[];
};

type PostItemProps = {
  post: Post;
  userId: string;
  currentUser?: User;
  onLike: (postId: number, liked: boolean) => Promise<void>;
  onComment: (postId: number, comment: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  onEditComment: (commentId: number, content: string) => Promise<void | Comment>;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userId,
  onLike,
  onComment,
  onRefresh,
  onEditComment,
  currentUser,
}) => {
  const [showComments, setShowComments] = useState(false);
  const likedByUser = !!userId && post.likes.some((like) => String(like.user_id) === userId);
  const displayUser =
    currentUser && String(post.user?.id) === String(currentUser.id)
      ? currentUser
      : post.user;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfileScreen', { userId: String(post.user.id) })}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Image
            source={
              displayUser.profile_picture
                ? { uri: displayUser.profile_picture }
                : require('../assets/avatar.jpg')
            }
            style={styles.avatar}
          />
          <Text style={styles.username}>
            {post.user.first_name} {post.user.last_name} ({post.user.username})
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.contentText}>{post.content}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(post.id, likedByUser)}
        >
          <Icon name="thumbs-up" size={22} color={likedByUser ? '#6A1B9A' : '#bbb'} />
          <Text style={[styles.actionText, likedByUser && { color: '#6A1B9A' }]}>
            Like{post.likes && post.likes.length > 0 ? ` (${post.likes.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowComments(true)}
        >
          <Icon name="message-circle" size={22} color="#bbb" />
          <Text style={styles.actionText}>
            Comment{post.comments && post.comments.length > 0 ? ` (${post.comments.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <CommentsModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        post={post}
        userId={userId}
        onComment={onComment}
        onRefresh={onRefresh}
        onEditComment={onEditComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#D1C4E9', // light purple border
    borderRadius: 10,
    marginBottom: 40,
    padding:30,
    backgroundColor: '#F3E5F5', // soft purple background
    shadowColor: '#6A1B9A',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    backgroundColor: '#E1BEE7',
  },
  username: {
    fontWeight: 'bold',
    color: '#4A148C', // darker purple for username
  },
  contentText: {
    color: '#4A148C',
    fontSize: 16,
    marginVertical: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#CE93D8',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  actionText: {
    color: '#777',
    marginLeft: 6,
  },
});

export default PostItem;
