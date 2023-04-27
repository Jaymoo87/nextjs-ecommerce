import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import React from 'react';

const Home = () => {
  const { data: session } = useSession();

  if (!session) return;

  return (
    <Layout>
      <div className="flex justify-between overflow-hidden font-bold text-blue-900 rounded-lg font-bolder">
        <h2>Hello, {session?.user?.name}</h2>
        <div className="flex text-black bg-gray-200">
          <img src={session?.user?.image} className="w-8 h-8" />
          <span className="px-2 py-1"> {session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
