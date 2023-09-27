import { Outlet } from "react-router-dom";
import Sidenav from "./components/shared/Sidenav";
import Navbar from "./components/shared/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <main className='w-full gap-4 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1'>
        <Sidenav />
        <Navbar />
      </main>
      <Outlet />
    </>
  );
}

export default App;
