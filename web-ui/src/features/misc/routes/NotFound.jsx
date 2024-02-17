import { CenteredLayout } from '../../../components/Layouts'
import { Typography } from '../../../components/Elements'

export const NotFound = () => {
  return (
    <CenteredLayout title="Not Found">
      <div className="text-center">
        <Typography variant="h3">404</Typography>
      </div>
    </CenteredLayout>
  )
}
