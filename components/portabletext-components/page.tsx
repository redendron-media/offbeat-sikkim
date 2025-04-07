import React from 'react'
import { PortableTextComponents } from '@portabletext/react'

const renderWithLineBreaks = (children: any) => {
  if (typeof children === 'string') {
    return children.split('\n').map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ))
  }

  if (Array.isArray(children)) {
    return children.map((child: any, i: number) => {
      if (typeof child === 'string') {
        return child.split('\n').map((line, j, arr) => (
          <React.Fragment key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </React.Fragment>
        ))
      }
      return child
    })
  }

  return children
}

const CustomComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '16px', }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '16px', }}>
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '16px', }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="bodyl mb-2">
        {renderWithLineBreaks(children)}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 ml-5 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 ml-5 mb-4">{children}</ol>
    ),
  },
  listItem: ({ children }) => (
    <li>{renderWithLineBreaks(children)}</li>
  ),
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      return (
        <a
          href={href}
          className="text-primary  hover:text-primary-50 transition-colors duration-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    },
  },
}

export default CustomComponents
