import { Platform, StyleSheet } from 'react-native';

const baseFontSize = 20;

export default StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      web: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif',
    }),
    fontSize: baseFontSize,
    color: '#232323',
    fontWeight: '400',
  },
  textSmall: {
    fontSize: baseFontSize * 0.9,
  },
  textLarge: {
    fontSize: baseFontSize * 1.2,
  },
  textBold: {
    fontWeight: '500',
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: baseFontSize * 1.3,
  },
  paddingSmall: {
    padding: 5,
  },
  row: {
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#ccc',
    ...Platform.select({
      web: {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    }),
    padding: 10,
    borderRadius: 5,
    fontSize: baseFontSize * 1.2,
    backgroundColor: '#fff',
    color: '#444',
    marginVertical: 5,
  },
  picker: {
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    ...Platform.select({
      web: {
        height: 42,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  summary: {
    backgroundColor: '#2d3d60',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 25,
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    ...Platform.select({
      web: {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
});
