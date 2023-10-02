import { Hamburger, Home, Category } from "../../assets/icons";

function Sidenav() {
  return (
    <div className='lg:w-[8vw] max-sm:hidden max-md:hidden h-[100vh] flex flex-col items-center justify-between z-40 fixed bg-white shadow-custom'>
      <div className='flex flex-col mt-[2em]'>
        <img
          src={Hamburger}
          alt='hamburger icon'
          className='cursor-pointer w-[22px] h-[18.518px]'
        />
      </div>
      <div className='flex -mt-[6em] flex-col gap-[40px]'>
        <img
          src={Home}
          alt='home icon'
          className='cursor-pointer w-[36px] h-[35.087px]'
        />
        <img
          src={Category}
          alt='category icon'
          className='cursor-pointer w-[33px] h-[32.163px]'
        />
      </div>

      <div className=' bg-blue-700 w-[47px] mb-[3em]  h-[45.81px] rounded-full flex items-center justify-center text-white text-base font-semibold font-Poppins'>
        NT
      </div>
    </div>
  );
}

export default Sidenav;
