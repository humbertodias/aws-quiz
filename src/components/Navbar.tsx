export default function Navbar() {
  return (
    <>
      <nav
        className="flex w-full fixed top-0 flex-wrap items-center justify-between bg-gray-800 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3 text-white">
          <div>AWS - Quiz</div>

          <a
            className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
            href="https://github.com/humbertodias/aws-quiz"
            target="_blank"
          >
            <img
              className="mr-2"
              src="/public/aws.svg"
              style={{ height: 32 }}
              title="TE Logo"
              loading="lazy"
            />
          </a>
        </div>
      </nav>
    </>
  );
}
