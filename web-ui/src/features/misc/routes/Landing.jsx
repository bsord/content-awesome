import { CenteredLayout } from '../../../components/Layouts'
import { Typography, Button } from '../../../components/Elements'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const navigate = useNavigate()
  return (
    <CenteredLayout title="Welcome">
      <div className="text-center gap-x-4">
        <Typography variant="h3">Welcome!</Typography>
        <Button
          onClick={() => {
            navigate('/auth/login')
          }}
          className="mt-6"
        >
          Sign In
        </Button>
      </div>
    </CenteredLayout>
  )
}
