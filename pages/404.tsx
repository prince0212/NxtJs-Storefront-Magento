/* eslint-disable react/no-unescaped-entities */
const ErrorPage = () => {
  return (
    <section className="text-gray-600 body-font relative text-center ">
      <div className="container m-16 px-52 py-16 mx-auto">
        <h1 className="sm:text-6xl font-bold mb-4 text-gray-900">Error 404</h1>
        <p className="text-gray-400">Woops. Looks like this page doesn't exist</p>
        <div className="mt-10">
          <a
            href="#"
            className="mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Go to home
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
