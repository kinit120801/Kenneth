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
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={[
          sharedStyles.modalCard,
          {
            backgroundColor: '#1e1e2e',
            borderRadius: 16,
            padding: 20,
            width: '90%',
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 12,
            elevation: 10,
          },
        ]}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 12,
            color: '#f5f5f7',
          }}
        >
          Create Post
        </Text>
        <TextInput
          style={{
            width: '100%',
            minHeight: 100,
            borderColor: '#5A31F4',
            borderWidth: 1,
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
            textAlignVertical: 'top',
            backgroundColor: '#2a2a40',
            color: '#ffffff',
          }}
          placeholder="What's on your mind?"
          placeholderTextColor="#aaaacc"
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
              paddingVertical: 8,
              paddingHorizontal: 18,
              backgroundColor: '#5A31F4',
              borderRadius: 10,
              marginRight: 8,
            }}
            textStyle={{ color: '#ffffff', fontWeight: 'bold' }}
          />
          <AppButton
            title="Cancel"
            onPress={onClose}
            disabled={loading}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 18,
              backgroundColor: '#444458',
              borderRadius: 10,
            }}
            textStyle={{ color: '#ffffff', fontWeight: 'bold' }}
          />
        </View>
        {loading && <ActivityIndicator style={{ marginTop: 16 }} color="#5A31F4" />}
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default CreatePostModal;
