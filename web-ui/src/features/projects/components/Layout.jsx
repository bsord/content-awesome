import { Head } from '../../../components/Head';
import { Navbar } from '../../../components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { Copyright } from '../../../components/Copyright';
import { Typography } from '../../../components/Elements';
library.add(faFileLines)


export const Layout = ({ title, children }) => {
  return (
    <>
      <Head title={title} />
      <div className="h-screen flex overflow-hidden bg-gray-100 bg-blue-gray-50">
        
        <div className="flex flex-col w-0 flex-1 overflow-hidden justify-between">
          <div className="relative z-10 flex-shrink-0 flex h-16  shadow">
            <div className="flex flex justify-start">
              <div className="ml-4 flex items-center md:ml-6">
                <FontAwesomeIcon icon={faFileLines} size='lg'/>
                <Typography variant="h5" className='pl-2'>{title}</Typography >
              </div>
            </div>
            <div className="flex-1 px-4 flex justify-end">
              <Navbar />
            </div>
          </div>

          <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>

          <div className="mb-2">
            <Copyright />
          </div>
        </div>
      </div>
    </>
  );
};
