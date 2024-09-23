'use client';

const LoadingPage = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center w-full h-[18vh] text-primary dark:text-white text-6xl'>
      {/* <div className='relative flex gap-2'>
				<span className='relative inline-block uppercase flip'>l</span>
				<span className='relative inline-block uppercase flip'>o</span>
				<span className='relative inline-block uppercase flip'>a</span>
				<span className='relative inline-block uppercase flip'>d</span>
				<span className='relative inline-block uppercase flip'>i</span>
				<span className='relative inline-block uppercase flip'>n</span>
				<span className='relative inline-block uppercase flip'>g</span>
				<span className='relative inline-block uppercase flip'>.</span>
			</div> */}
      {/* <span className='bg-secondary rounded-sm px-1 animate-pulse text-4xl'>
				<span className='text-primary'>BA</span>
				<span className='text-white'>BAL&#39;O</span>
				<span className='text-primary'>JA</span>
			</span> */}
      {/* <span className='bg-secondary rounded-sm px-1 animate-bounce text-4xl'>
				<span className='text-primary'>BA</span>
				<span className='text-white'>BAL&#39;O</span>
				<span className='text-primary'>JA</span>
			</span> */}
      <div className='relative'>
        <span className='relative inline-block uppercase flip'>.</span>
        <span className='relative inline-block uppercase flip'>.</span>
        <span className='relative inline-block uppercase flip'>.</span>
        <span className='relative inline-block uppercase flip'>.</span>
        <span className='relative inline-block uppercase flip'>.</span>
        {/* <span className='relative inline-block uppercase flip'>n</span> */}
        {/* <span className='relative inline-block uppercase flip'>g</span> */}
        <span className='relative inline-block uppercase flip'>.</span>
      </div>
    </div>
  );
};

export default LoadingPage;
