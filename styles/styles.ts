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
    borderColor: 'rgba(45, 1, 77, 1)',
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
    color: '#d6b4fc',
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
    marginTop: 20,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    padding: 16,
    backgroundColor: 'rgba(45, 1, 77, 1)',
 
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
    color: '#d6b4fc', 
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
    borderRadius: 50,
    padding: 10,
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
    backgroundColor: 'rgba(252, 249, 249, 0.08)',
    zIndex: 100,
  },
  menuModal: {
    position: 'absolute',
    top: 150,
    right: 16,
    backgroundColor: 'rgba(45, 1, 77, 1)',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 18,
    ...sharedShadow,
  },
  menuItem: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#b3a9e0',
    backgroundColor: 'transparent',
  },
  menuItemText: {
  marginLeft: 8,
  color: '#d8b4fe', // light purple
},

  burgerBtn: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#b3a9e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    ...sharedShadow,
  },
});

export default profileStyles;
