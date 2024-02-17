import { Typography } from '../Elements'

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Made with ❤️ in '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
