import React, { useState } from 'react';

import { useSession, signIn } from 'next-auth/react';

import Nav from './Nav';
import Logo from './Logo';

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  const toggleNav = () => {
    if (!showNav) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

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
      <div className="min-h-screen bg-gray-300">
        <div className="flex p-4 ">
          <button onClick={toggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex justify-center mr-10 grow">
            <Logo />
          </div>
        </div>
        <div className="flex w-screen h-screen bg-blue-950">
          <Nav show={showNav} />
          <div className="flex-grow p-4 mt-4 mb-4 mr-4 bg-white rounded-lg">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
