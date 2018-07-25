// @flow

import React from 'react';
import { View, Platform } from 'react-native';

type Props = {
  style?: any
};

export default function Card({ style, ...props }: Props) {
  return (
    <View
      style={[
        {
          padding: 20,
          borderRadius: 10,
          backgroundColor: '#fff',
          ...Platform.select({
            web: {
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)'
            }
          })
        },
        style
      ]}
      {...props}
    />
  );
}
