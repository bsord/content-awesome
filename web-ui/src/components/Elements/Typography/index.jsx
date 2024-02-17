import React from 'react'

export const Typography = ({ variant, className, children, ...rest }) => {
  const variants = {
    h1: 'block antialiased tracking-normal font-sans text-5xl font-bold leading-tight',
    h2: 'block antialiased tracking-tight font-sans text-4xl font-bold leading-[1.3]',
    h3: 'block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug',
    h4: 'block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug',
    h5: 'block antialiased tracking-normal font-sans text-xl font-semibold leading-snug',
    h6: 'block antialiased tracking-normal font-sans text-sm font-medium leading-relaxed',
    lead: 'block antialiased font-sans tracking-tight text-lg font-normal leading-relaxed',
    paragraph: 'block antialiased font-sans text-base font-light leading-relaxed',
    small: 'block antialiased font-sans text-sm font-light leading-normal',
  }

  let classes = variants[variant] ?? variants.default

  classes = classes + ' ' + className

  let template

  switch (variant) {
    case 'h1':
      template = React.createElement(
        'h1',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break

    case 'h2':
      template = React.createElement(
        'h2',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break

    case 'h3':
      template = React.createElement(
        'h3',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
    case 'h4':
      template = React.createElement(
        'h4',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
    case 'h5':
      template = React.createElement(
        'h5',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
    case 'h6':
      template = React.createElement(
        'h6',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
    case 'lead':
      template = React.createElement(
        'p',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
    case 'paragraph':
      template = React.createElement(
        'p',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
    case 'small':
      template = React.createElement(
        'p',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
    default:
      template = React.createElement(
        'p',
        {
          ...rest,
          className: classes,
        },
        children
      )
      break
  }

  // 5. return
  return template
}
