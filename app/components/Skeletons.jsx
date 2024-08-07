
  export const BookSkeleton = () => (
    <div className="flex flex-col rounded-md bg-gray-200 p-2 sm:w-1/6 animate-pulse">
      <div className='flex sm:flex-col gap-2'>
        <div className="relative w-full rounded-md overflow-hidden bg-gray-300 h-64"></div>
        <div className='flex flex-col justify-between'>
          <div>
            <div className='h-6 bg-gray-300 rounded my-1'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
          </div>
          <div>
            <div className='flex gap-2 items-center'>
              <div className='h-6 bg-gray-300 rounded w-12'></div>
              <div className='h-4 bg-gray-300 rounded w-1/4'></div>
            </div>
            <div className='flex justify-between'>
              <div className='flex gap-2 items-center'>
                <div className='h-6 bg-gray-300 rounded w-12'></div>
                <div className='h-4 bg-gray-300 rounded w-1/4'></div>
              </div>
              <div className='h-8 bg-gray-300 rounded w-8'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );