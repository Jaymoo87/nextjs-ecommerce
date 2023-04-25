import React from 'react';

import { useSession, signIn } from 'next-auth/react';

import Nav from '@/components/Nav';

const Layout = ({ children }) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <div className="flex items-center w-screen h-screen bg-blue-900">
          <div className="w-full text-center">
            <button onClick={() => signIn('google')} className="p-2 px-4 bg-white rounded-full">
              Log In with Google
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex w-screen h-screen bg-blue-950">
        {' '}
        <Nav />
        <div className="flex-grow p-4 mt-4 mb-4 mr-4 bg-white rounded-lg">{children}</div>
      </div>
    </>
  );
};

export default Layout;
