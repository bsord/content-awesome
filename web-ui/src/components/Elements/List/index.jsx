import { ListItem } from './ListItem'
import { ListItemPrefix } from './ListItemPrefix'
import { ListItemSuffix } from './ListItemSuffix'

const List = ({ variant, children, className, ...rest }) => {
  const variants = {
    default:
      'flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-blue-gray-700',
  }

  let classes = variants[variant] ?? variants.default
  classes = classes + ' ' + className

  return (
    <nav className={classes} {...rest}>
      {children}
    </nav>
  )
}

export { List, ListItem, ListItemPrefix, ListItemSuffix }
