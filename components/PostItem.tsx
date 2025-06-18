import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { RootStackParamList } from '../App';
import CommentsModal from './CommentsModal';

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
          <Icon name="thumbs-up" size={22} color={likedByUser ? '#orange' : '#bbb'} />
          <Text style={[styles.actionText, likedByUser && { color: '#orange' }]}>
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
    borderWidth: 1,
    borderColor: '#2c2c3e',
    borderRadius: 14,
    marginBottom: 32,
    padding: 20,
    backgroundColor: '#1e1e2e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    backgroundColor: '#333',
  },
  username: {
    fontWeight: 'bold',
    color: '#orange',
    fontSize: 16,
  },
  contentText: {
    color: '#e2e2e2',
    fontSize: 15,
    marginVertical: 6,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#3c3c50',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 28,
  },
  actionText: {
    color: '#aaa',
    marginLeft: 6,
    fontSize: 14,
  },
});
export default PostItem;