export const Checkbox = ({ variant, className, children, ...rest }) => {
  const variants = {
    default:
      "peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900",
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <div className="inline-flex items-center gap-x-2">
      <input className={classes} type="checkbox" {...rest} />
      {children}
    </div>
  )
}
