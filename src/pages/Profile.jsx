import { useEffect } from 'react';

// The live site's /profile route is client-rendered and redirects to login when
// logged out; its server-rendered visible state is this loading skeleton
// (identical to /login). We replicate that visible static state.
export default function Profile() {
  useEffect(() => {
    document.title = 'Login | Agaram Foundation';
  }, []);

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="flex min-h-screen w-full bg-white">
        <div className="hidden lg:flex lg:w-1/2 bg-primary"></div>
        <div className="flex-1 flex items-center justify-center p-6 animate-pulse">
          <div className="w-full max-w-[420px] space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
            <div className="h-12 w-full bg-gray-200 rounded"></div>
            <div className="h-12 w-full bg-gray-200 rounded"></div>
            <div className="h-12 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
