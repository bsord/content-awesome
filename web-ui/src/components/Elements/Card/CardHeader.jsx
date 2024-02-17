export const CardHeader = ({ variant, children, className, ...rest }) => {
  const variants = {
    default: 'relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden',
    shadow: 'relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden shadow-lg',
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
