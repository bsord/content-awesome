export const CardFooter = ({ variant, children, className, ...rest }) => {
  const variants = {
    default: 'p-6',
    divider: 'p-6 border-t border-blue-gray-50',
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
