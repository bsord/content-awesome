export const Input = ({ variant, className, children, ...rest }) => {
  const variants = {
    default:
      'relative peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900  !border-t-blue-gray-200 focus:!border-t-gray-900',
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <div className="relative h-11">
      <input className={classes} {...rest}>
        {children}
      </input>
    </div>
  )
}
