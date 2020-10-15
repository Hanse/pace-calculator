import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

type Props = {
  style?: any,
  children: React.ReactNode,
};

export default function Card({ style, ...props }: Props) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
});
