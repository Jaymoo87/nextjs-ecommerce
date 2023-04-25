import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
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
  return <div>logged in {session?.user.email}</div>;
}
