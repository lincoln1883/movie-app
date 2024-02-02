const Jumbotron = () => {
  const handleGetStarted = () => {
    alert("This is a demo app, login is not required.");
  };

  const handleLearnMore = () => {
    alert("Please visit https://www.themoviedb.org/ for more information.");
  };

  return (
    <section className="bg-center bg-no-repeat bg-[url('https://images.adsttc.com/media/images/5f7d/fef2/63c0/170a/9100/0273/slideshow/Jiangnan_Photography.jpg?1602092773')] bg-gray-700 bg-blend-multiply min-h-screen m-0.5">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Welcome to Movie App
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Explore the latest movies and TV shows.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={handleGetStarted}
          >
            Get started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            onClick={handleLearnMore}
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
