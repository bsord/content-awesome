import { Head } from '../Head'
export const CenteredLayout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div className="h-screen w-full grid">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
    </>
  )
}
