import { routes } from "../../routes/route";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className=' ml-0 lg:ml-[6em] z-10 relative  h-[100px] mt-[6em]'>
      <nav className='w-[100vw] flex items-center px-[2.5em] justify-start shadow-custom2'>
        {routes.map(({ name, path }: { name: string; path: string }) => (
          <div
            onClick={() => navigate(path)}
            className={`relative h-[100px]  ${
              path === "application-form" ? "bg-[#00635B] text-white" : ""
            } w-[282.456px]  cursor-pointer`}
          >
            <div
              className={`absolute top-1/2 -right-1 transform -translate-y-1/2 translate-x-1/2 w-0 h-0  ${
                path === "application-form"
                  ? " border-t-[15px] border-t-transparent border-l-[15px] border-l-[#00635B] border-b-[15px] border-b-transparent "
                  : ""
              } `}
            ></div>

            <div className='absolute inset-0 flex items-center justify-center'>
              <p className=' text-[20px] font-Inter font-medium'>{name}</p>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
