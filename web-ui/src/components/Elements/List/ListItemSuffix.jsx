export const ListItemSuffix = ({ variant, children, className, ...rest }) => {
  const variants = {
    default: 'grid place-items-center ml-auto justify-self-end',
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
