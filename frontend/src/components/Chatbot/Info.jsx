const Info = () => {
  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className=" h-full dark:bg-gray-800">
          <div className="flex flex-col items-center text-sm dark:bg-gray-800">
            <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
              <h1 className="text-2xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-5 flex gap-2 items-center justify-center sm:text-2xl"></h1>
            </div>
            <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
