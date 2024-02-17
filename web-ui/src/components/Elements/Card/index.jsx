export const Card = ({ variant, children, className, ...rest }) => {
  const variants = {
    default: 'relative flex flex-col bg-clip-border rounded-xl ',
    shadow: 'relative flex flex-col bg-clip-border rounded-xl shadow-md',
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
