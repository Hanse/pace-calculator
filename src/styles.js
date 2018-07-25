// @flow

import { StyleSheet } from 'react-native';

const baseFontSize = 20;

export default StyleSheet.create({
  text: {
    fontFamily: 'Lato, system-ui, Helvetica, sans-serif',
    fontSize: baseFontSize,
    color: '#333',
    fontWeight: '300'
  },
  textSmall: {
    fontSize: baseFontSize * 0.9
  },
  textLarge: {
    fontSize: baseFontSize * 1.3
  },
  textBold: {
    fontWeight: '700'
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
    padding: 10,
    borderRadius: 5,
    fontSize: baseFontSize * 1.2,
    backgroundColor: '#fff'
  },
  picker: {
    marginVertical: 10,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid'
  }
});
