import React from 'react'
import { PortableTextComponents } from '@portabletext/react';

const CustomComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: '1.2' }}>
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.3' }}>
          {children}
        </h2>
      ),
      normal: ({ children }) => <p className='bodyl mb-2'>{children}</p>,
      bullet: ({ children }) => (
        <ul className='space-y-2 '>{children}</ul>
      ),
      li: ({ children }) => (
        <li>{children}</li>
      ),
    },
  };
export default CustomComponents