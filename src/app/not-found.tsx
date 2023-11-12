import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="mt-12 flex h-full w-full justify-center px-6">
      <div className="flex h-full w-full max-w-screen-lg flex-col items-start justify-center">
        <p className="text-9xl font-bold text-app-yellow-800">404...</p>
        <span className="mt-2 text-3xl font-semibold text-app-grey-800">
          Page not found
        </span>

        <p className="mt-4 text-lg text-app-grey-800">
          {`We can't find the page you are looking for. To return to the home
          page, click the link below:`}
        </p>

        <Link
          href="/"
          className="ml-auto mr-auto mt-16 rounded bg-app-blue-500 px-4 py-3 font-semibold uppercase text-app-grey-100 hover:bg-app-blue-400"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
