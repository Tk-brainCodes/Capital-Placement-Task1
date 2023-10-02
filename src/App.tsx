import Sidenav from "./components/shared/Sidenav";
import Navbar from "./components/shared/Navbar";
import ApplicationForm from "./pages/ApplicationForm";
import "./App.css";

function App() {
  return (
    <>
      <main className='w-full gap-4 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1'>
        <Sidenav />
        <Navbar />
      </main>
      <ApplicationForm />
    </>
  );
}

export default App;
