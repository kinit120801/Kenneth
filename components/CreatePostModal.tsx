import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AppButton from './AppButton';
import sharedStyles from '../styles/sharedStyles';

type Props = {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  loading?: boolean;
};

const CreatePostModal: React.FC<Props> = ({
  visible,
  value,
  onChangeText,
  onSubmit,
  onClose,
  loading = false,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={[
          sharedStyles.modalCard,
          {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            width: '90%',
          },
        ]}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12, color: '#5A31F4' }}>
          Create Post
        </Text>
        <TextInput
          style={{
            width: '100%',
            minHeight: 80,
            borderColor: '#5A31F4',
            borderWidth: 1.2,
            borderRadius: 10,
            padding: 10,
            marginBottom: 16,
            textAlignVertical: 'top',
            backgroundColor: '#F5F3FF',
            color: '#2C1A78',
          }}
          placeholder="What's on your mind?"
          placeholderTextColor="#8E79D8"
          multiline
          value={value}
          onChangeText={onChangeText}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
          <AppButton
            title="Post"
            onPress={onSubmit}
            disabled={loading}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              backgroundColor: '#2C1A78',
              borderRadius: 8,
              marginRight: 8,
            }}
            textStyle={{ color: '#fff', fontSize: 14 }}
          />
          <AppButton
            title="Cancel"
            onPress={onClose}
            disabled={loading}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              backgroundColor: '#2C1A78',
              borderRadius: 8,
            }}
            textStyle={{ color: '#fff', fontSize: 14 }}
          />
        </View>
        {loading && <ActivityIndicator style={{ marginTop: 12 }} color="#5A31F4" />}
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default CreatePostModal;
