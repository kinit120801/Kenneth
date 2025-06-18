import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    backgroundColor: '#orange',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#orange',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 18,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  buttonText: {
    color: '#16161a',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
    textShadowColor: '#2cb67d',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#orange',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 22,
    backgroundColor: '#242629',
    fontSize: 16,
    color: '#fffffe',
    ...Platform.select({
      ios: {
        shadowColor: '#orange',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#orange',
    borderRadius: 8,
    marginBottom: 11,
    backgroundColor: '#242629',
  },
  picker: {
    color: '#fffffe',
    height: 50,
    width: '100%',
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#2cb67d',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  modalCard: {
    backgroundColor: '#16161a',
    borderRadius: 32,
    padding: 30,
    width: '92%',
    maxWidth: 440,
    maxHeight: '82%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#orange',
    ...Platform.select({
      ios: {
        shadowColor: '#f25f4c',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
      },
      android: {
        elevation: 18,
      },
    }),
  },
  inputWrapper: {
    position: 'relative',
    marginTop: 14,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  editIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
    zIndex: 2,
    color: '#f25f4c',
  },
});
