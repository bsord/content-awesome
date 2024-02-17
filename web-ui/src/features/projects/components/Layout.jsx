import { Head } from '../../../components/Head';
import { Sidebar } from '../../../components/Sidebar';

import { Copyright } from '../../../components/Copyright';

export const Layout = ({ title, children }) => {
  return (
    <>
      <Head title={title} />
      <div className="h-screen flex overflow-hidden bg-gray-100 bg-blue-gray-50">
        <Sidebar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden justify-between">
          <div className="relative z-10 flex-shrink-0 flex h-16  shadow">
            <div className="flex px-4 flex justify-start">
              <div className="ml-4 flex items-center md:ml-6">
                <div>{title}</div>
              </div>
            </div>
            <div className="flex-1 px-4 flex justify-end">
              <div className="ml-4 flex items-center md:ml-6">[user navigation]</div>
              <div className="ml-4 flex items-center md:ml-6">[user navigation]</div>
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
