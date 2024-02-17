export const ListItemPrefix = ({ variant, children, className, ...rest }) => {
  const variants = {
    default: 'grid place-items-center mr-4',
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
