import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const sharedShadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#2C1361',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
    },
    android: {
      elevation: 6,
    },
  }),
};

const profileStyles = StyleSheet.create({
  avatarWrapper: {
    alignItems: 'center',
    marginTop: 48,
    zIndex: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f3f0ff',
    backgroundColor: '#d9ceff',
    ...sharedShadow,
  },
  avatarCameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5A31F4',
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: '#f3f0ff',
    ...sharedShadow,
  },
  name: {
    fontWeight: '700',
    fontSize: 26,
    color: '#2C1361',
    marginTop: 18,
    letterSpacing: 0.8,
  },
  username: {
    color: '#9370db',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  postsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 26,
    backgroundColor: '#f3f0ff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#5A31F4',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 16,
    marginLeft: 20,
    color: '#2C1361',
    letterSpacing: 0.5,
  },
  postCard: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: '#d9ceff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    ...sharedShadow,
  },
  mindInput: {
    borderWidth: 1,
    borderColor: '#b3a9e0',
    borderRadius: 70,
    padding: 8,
    marginVertical: 0,
    fontSize: 10,
    backgroundColor: '#f3f0ff',
    color: '#2C1361',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#9370db',
    padding: 5,
    borderRadius: 14,
    ...sharedShadow,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44,19,97,0.08)',
    zIndex: 100,
  },
  menuModal: {
    position: 'absolute',
    top: 55,
    right: 16,
    backgroundColor: '#d9ceff',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 22,
    minWidth: 180,
    ...sharedShadow,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#b3a9e0',
    backgroundColor: 'transparent',
  },
  burgerBtn: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#b3a9e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    ...sharedShadow,
  },
});

export default profileStyles;
