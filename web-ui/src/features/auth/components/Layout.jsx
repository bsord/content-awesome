import { Head } from '../../../components/Head'

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div className="h-screen w-full grid lg:grid-cols-3">
        <div className="flex justify-center items-center lg:col-span-2">
          <div className="w-full max-w-lg">{children}</div>
        </div>
        <div className="justify-center items-center h-full w-full hidden lg:block bg-[url('https://source.unsplash.com/random?wallpapers')] bg-cover" />
      </div>
    </>
  )
}
