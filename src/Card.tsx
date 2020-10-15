import React from 'react';

type Props = {
  style?: any,
  children: React.ReactNode,
};

export default function Card({ style, ...props }: Props) {
  return <div style={{ ...styles.card, ...style }} {...props} />;
}

const styles = {
  card: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
  },
};
