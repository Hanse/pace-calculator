// @flow

import { StyleSheet } from 'react-native';

const baseFontSize = 20;

export default StyleSheet.create({
  text: {
    fontFamily: 'system-ui, Helvetica, sans-serif',
    fontSize: baseFontSize,
    color: '#333',
    fontWeight: '400'
  },
  textSmall: {
    fontSize: baseFontSize * 0.9
  },
  textLarge: {
    fontSize: baseFontSize * 1.3
  },
  textBold: {
    fontWeight: '500'
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: baseFontSize * 1.6
  },
  paddingSmall: {
    padding: 5
  },
  row: {
    flexDirection: 'row'
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#ddd',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 5,
    fontSize: baseFontSize * 1.2,
    backgroundColor: '#fff',
    color: '#444',
    marginVertical: 5
  },
  picker: {
    marginVertical: 5,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  summary: {
    backgroundColor: '#fff8d3',
    padding: 15,
    borderColor: '#f2de7b',
    borderWidth: 2
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  }
});
